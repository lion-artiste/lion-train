import type { GAME_INFOS, GAME_PARAMETERS, GameNode } from "$lib/games/helpers/types";

export default class BigBoostyNode implements GameNode {

    protected _infos: GAME_INFOS;
    protected _parameters: GAME_PARAMETERS;
    protected _actx: BaseAudioContext | undefined;
    protected _eqNode: BiquadFilterNode | undefined;
    protected _gainCompensationNode: GainNode | undefined;
    protected _gain: number;
    protected _Q: number;
    protected _min: number;
    protected _max: number;
    protected _valueToFind: number | undefined;
    protected _state: boolean;

    constructor(infos: GAME_INFOS, parameters: GAME_PARAMETERS, actx: BaseAudioContext | null = null) {
        this._infos = infos;
        this._parameters = parameters;
        this._gain = (parameters.gain.value ?? parameters.gain.default) as number;
        this._Q = (parameters.q.value ?? parameters.q.default) as number;
        this._min = (parameters.min_freq.value ?? parameters.min_freq.default) as number;
        this._max = (parameters.max_freq.value ?? parameters.max_freq.default) as number;
        this._state = false;
        if (actx) {
            this.initialize(actx);
        }
    }

    initialize(actx: BaseAudioContext): void {
        this._actx = actx;
        this._eqNode = new BiquadFilterNode(actx, { type: "peaking", frequency:1000, gain:0.0, Q: this._Q});
        this._gainCompensationNode = new GainNode(actx, { gain: 0.7 });
        this._eqNode.connect(this._gainCompensationNode);
        this.getNewValueToFind();
    }

    inputNode() : AudioNode | null {
        return (this._eqNode) ?? null;
    }

    connect(to: AudioNode) : AudioNode | null {
        return this._gainCompensationNode ? this._gainCompensationNode.connect(to) : null;
    }

    _getGainCompensation(frequency: number | undefined): number {
        //console.log("Frequency : ", frequency);
        if (!frequency) return this._gain;
        let S_highs = 1 / (1 + Math.exp(-(frequency - 6000)));
        let S_lows = 1 / (1 + Math.exp(-(frequency - 300))) - 1;
        //console.log("Gain : " + this._gain * (1 + S_highs * 0.5 + S_lows * 0.5) + "dB");
        return this._gain * (1 + S_highs * 0.5 + S_lows * 0.5);
    }

    _setValueToFind(value: number) {
        if (this._actx && this._eqNode) this._eqNode.frequency.setValueAtTime(value, this._actx.currentTime);
    }

    getNewValueToFind() {
        let baseIntervals = [[20,200],[200,500],[200,500],[500,1000],[500,1000],[1000,2000],[1000, 2000],[2000,5000],[2000,5000],[5000,10000],[5000,10000],[10000,20000]];
        let intervals: number[][] = [];
        for (const i of baseIntervals) {
            if (i[1] >= this._min && i[0] <= this._max) { // if interval in range
                intervals.push([Math.max(i[0], this._min), Math.min(i[1], this._max)])
            }
        }
        //console.log("Intervals : ", intervals)
        let interval = intervals[Math.floor(Math.random()*intervals.length)];
        let frequency = Math.round(Math.random() * (interval[1] - interval[0] + 1) + interval[0]);
        this._valueToFind = frequency;
        this._setValueToFind(frequency);
        return frequency;
    }

    activate(time: number = 0.0) : boolean {
        this._state = true;
        if (this._actx && this._eqNode) this._eqNode.gain.setTargetAtTime(this._getGainCompensation(this._valueToFind), this._actx.currentTime, time);
        return this._state;
    }

    deactivate(time: number = 0.0) : boolean {
        this._state = false;
        if (this._actx && this._eqNode)  this._eqNode.gain.setTargetAtTime(0.0, this._actx.currentTime, time);
        return this._state;
    }

    switch(action: true | false | null = null, time: number = 0.0) : boolean {
        if (action === null) {
            if (this._state) {
                return this.deactivate(time);
            } else {
                return this.activate(time);
            }
        }
        if (action) {
            return this.activate(time);
        }
        return this.deactivate(time);
    }

    getRightValue() {
        return this._eqNode?.frequency.value;
    }

    PositionToValue(p: number, min: number | null = null, max: number | null = null) : number {
        let f = 100 * Math.pow(2,9 * p - 1);
        if (f < 100) {
            f = 1.6 * f - 60;
        }
        else if (f > 12800) {
            f = 0.5625 * f + 5600;
        }
        return Math.min(Math.max(Math.round(f), min ?? this._min), max ?? this._max);
    }

    ValueToPosition(value: number) : number {
        if (value < 100) {
            value = 0.625 * value + 37.5;
        } else if (value > 12800) {
            value = (value - 5600) / 0.5625;
        }
        return (1 / 9) * ( Math.log2(value / 100) + 1 );
    }

    _bounded(left: any, value: any, right: any): any {
        if (typeof left == "number") {
            return Math.min(Math.max(value,left), right);
        }
    }

    getWonPoints(information: {position: number, left: number, right: number}) : number {
        if (!this._valueToFind) return 0;
        
        let leftValue = this.PositionToValue(information.left);
        let rightValue = this.PositionToValue(information.right);
        let centerValue = this.PositionToValue(information.position);

        if (this._valueToFind < leftValue || this._valueToFind > rightValue) return 0;
        if (this._valueToFind === centerValue) return 1000;

        let closestBorder = (this._valueToFind > centerValue) ? rightValue : leftValue;
        let distance = Math.abs(centerValue - closestBorder) / Math.abs(centerValue - this._valueToFind);
        return Math.round(Math.min(Math.max(100 * distance, 0), 1000));
    }
}