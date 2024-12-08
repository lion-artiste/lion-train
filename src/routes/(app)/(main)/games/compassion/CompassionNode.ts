import { dBToGain } from "$lib/games/helpers/functions";
import type { GAME_INFOS } from "$lib/games/helpers/types";
import type baseParameters from "./parameters";

export default class CompassionNode {

    protected _infos: GAME_INFOS;
    protected _parameters: typeof baseParameters;

    protected _actx: BaseAudioContext | undefined;
    protected _preGainNode: GainNode | undefined;

    protected _compNode1: DynamicsCompressorNode | undefined;
    protected _gainCompensationNode1: GainNode | undefined;

    protected _compNode2: DynamicsCompressorNode | undefined;
    protected _gainCompensationNode2: GainNode | undefined;

    protected _outputGainNode: GainNode | undefined;

    protected _gainComp1: number;
    protected _gainComp2: number;
    protected _manualComp2: number;

    protected _min: number;
    protected _max: number;
    protected _minDiff: number;
    protected _maxDiff: number;

    protected _game_mode: "attack" | "release" | "knee" | "ratio" | "threshold";
    protected _attack: number;
    protected _release: number;
    protected _ratio: number;
    protected _knee: number;
    protected _threshold: number;

    protected _value1: number;
    protected _value2: number;
    protected _rightState: 1 | 2;

    protected _intervalId: NodeJS.Timeout | null;

    protected _state: 1 | 2;

    constructor(infos: GAME_INFOS, parameters: typeof baseParameters, actx: BaseAudioContext | null = null) {
        this._infos = infos;
        this._parameters = parameters;
        this._game_mode = parameters.game_mode.value ?? parameters.game_mode.default;
        this._attack = (parameters.attack.value ?? parameters.attack.default) / 1000;
        this._release = (parameters.release.value ?? parameters.release.default) / 1000;
        this._ratio = parameters.ratio.value ?? parameters.ratio.default;
        this._knee = parameters.knee.value ?? parameters.knee.default;
        this._threshold = parameters.threshold.value ?? parameters.threshold.default;
        this._min = parameters.min_value.value ?? parameters.min_value.default;
        this._max = parameters.max_value.value ?? parameters.max_value.default;
        this._minDiff = parameters.min_diff.value ?? parameters.min_diff.default;
        this._maxDiff = parameters.max_diff.value ?? parameters.max_diff.default;

        if (this._min < this._parameters[this._game_mode].min) throw new Error("Min value too low");
        if (this._max > this._parameters[this._game_mode].max) throw new Error("Max value too high");
        if (this._max < this._min) throw new Error("Max should not be lower than min");
        if (this._minDiff < 0) throw new Error("Min difference value can not be negative");
        if (this._maxDiff < this._minDiff) throw new Error("Max difference can not be higher than min difference");

        this._state = 1;
        this._rightState = 1;
        this._value1 = 0;
        this._value2 = 0;
        this._gainComp1 = 0;
        this._gainComp2 = 0;
        this._manualComp2 = 0;
        this._intervalId = null;

        if (actx) {
            this.initialize(actx);
        }
    }

    initialize(actx: BaseAudioContext): void {
        this._actx = actx;

        this._preGainNode = new GainNode(actx, { gain: 1.0 });
        this._compNode1 = new DynamicsCompressorNode(actx, { attack: this._attack, release:this._release, threshold:this._threshold, ratio: this._ratio, knee: this._knee});
        this._gainCompensationNode1 = new GainNode(actx, { gain: 0.0 });
        this._compNode2 = new DynamicsCompressorNode(actx, { attack: this._attack, release:this._release, threshold:this._threshold, ratio: this._ratio, knee: this._knee});
        this._gainCompensationNode2 = new GainNode(actx, { gain: 0.0 });
        this._outputGainNode = new GainNode(actx, { gain: 1.0 });

        this._preGainNode.connect(this._compNode1);
        this._preGainNode.connect(this._compNode2);
        this._compNode1.connect(this._gainCompensationNode1);
        this._compNode2.connect(this._gainCompensationNode2);
        this._gainCompensationNode1.connect(this._outputGainNode);
        this._gainCompensationNode2.connect(this._outputGainNode);
        this.getNewValueToFind();
    }

    inputNode() : AudioNode | null {
        return (this._preGainNode) ?? null;
    }

    connect(to: AudioNode) : AudioNode | null {
        return this._outputGainNode ? this._outputGainNode.connect(to) : null;
    }

    _computeAutomaticGainCompensation(state: 1 | 2): number {
        let threshold = (this._game_mode == "threshold") ? (state == 1) ? this._value1 : this._value2 : this._threshold;
        let ratio = (this._game_mode == "ratio") ? (state == 1) ? this._value1 : this._value2 : this._ratio;
        return dBToGain((-1) * 0.5 * threshold * (1 - (1 / ratio)));
    }

    _setAutomaticGainCompensations(): void {
        this._gainComp1 = this._computeAutomaticGainCompensation(1);
        //console.log("_gainComp1 : ", this._gainComp1);
        this._gainComp2 = this._computeAutomaticGainCompensation(2);
        //console.log("_gainComp2 : ", this._gainComp2);
        let outputGain = 1 / Math.max(this._gainComp1, this._gainComp2);
        if (this._outputGainNode && this._actx) this._outputGainNode.gain.setValueAtTime(outputGain, this._actx.currentTime);
        //console.log("Output gain : ", outputGain);
    }

    getNewValueToFind(): [value1: number, value2: number] {

        let range = Math.abs(this._max - this._min);
        let value1 = 0;

        if (2 * this._minDiff > range) { // Avoid number too in the middle
            value1 = Math.round((this._min + this._minDiff) + Math.random() * (range - this._minDiff));
        } else {
            value1 = Math.round(this._min + Math.random() * (range));
        }
        //console.log("Value1  : ", value1);

        let intervals = [];

        let high_min = value1 + this._minDiff;
        if (high_min <= this._max) {
            let high_max = Math.min(this._max, value1 + this._maxDiff);
            intervals.push([high_min, high_max]);
        }

        let low_min = value1 - this._minDiff;
        if (low_min >= this._min) {
            let low_max = Math.max(this._min, value1 - this._maxDiff);
            intervals.push([low_max, low_min]);
        }

        //console.log("Intervals : ", intervals);

        if (intervals.length == 0) throw new Error("Impossible to find a couple of values");

        let interval = intervals[Math.floor(Math.random() * intervals.length)];
        let value2 = Math.round(interval[0] + Math.random() * (interval[1] - interval[0]));
        //console.log("Value2 : ", value2);

        this._value1 = value1;
        this._value2 = value2;

        switch (this._game_mode) {
            case "attack":
                this._rightState = (this._value1 < this._value2) ? 1 : 2;
                if (this._actx && this._compNode1) this._compNode1.attack.setValueAtTime(this._value1/1000, this._actx.currentTime);
                if (this._actx && this._compNode2) this._compNode2.attack.setValueAtTime(this._value2/1000, this._actx.currentTime);
                break;
            case "release":
                this._rightState = (this._value1 < this._value2) ? 1 : 2;
                if (this._actx && this._compNode1) this._compNode1.release.setValueAtTime(this._value1/1000, this._actx.currentTime);
                if (this._actx && this._compNode2) this._compNode2.release.setValueAtTime(this._value2/1000, this._actx.currentTime);
                break;
            case "ratio":
                this._rightState = (this._value1 > this._value2) ? 1 : 2;
                if (this._actx && this._compNode1) this._compNode1.ratio.setValueAtTime(this._value1, this._actx.currentTime);
                if (this._actx && this._compNode2) this._compNode2.ratio.setValueAtTime(this._value2, this._actx.currentTime);
                break;
            case "knee":
                this._rightState = (this._value1 > this._value2) ? 1 : 2;
                if (this._actx && this._compNode1) this._compNode1.knee.setValueAtTime(this._value1, this._actx.currentTime);
                if (this._actx && this._compNode2) this._compNode2.knee.setValueAtTime(this._value2, this._actx.currentTime);
                break;
            case "threshold":
                this._rightState = (this._value1 < this._value2) ? 1 : 2;
                if (this._actx && this._compNode1) this._compNode1.threshold.setValueAtTime(this._value1, this._actx.currentTime);
                if (this._actx && this._compNode2) this._compNode2.threshold.setValueAtTime(this._value2, this._actx.currentTime);
                break;
            default:
                break;
        }
        this._setAutomaticGainCompensations();
        return [this._value1, this._value2];
    }

    /**
     * Switches the internal state of the Node between 1 and 2
     * @param state - The desired state (1 or 2), or null to toggle current state
     * @param time - The duration of the switch in seconds, defaults to 0.1
     * @returns void
     */
    switch(state: 1 | 2 | null = null, time: number = 0.1) {

        if (state === null) {
            this._state = (this._state == 1) ? 2 : 1;
        }
        else {
            this._state = (state == 1) ? 1 : 2;
        }

        if (!this._actx) return;

        if (this._state == 1) {
            this._gainCompensationNode1?.gain.setTargetAtTime(this._gainComp1, time, this._actx.currentTime)
            this._gainCompensationNode2?.gain.setTargetAtTime(0.0, time, this._actx.currentTime)
            //console.log("Switch to 1");
        } else {
            this._gainCompensationNode1?.gain.setTargetAtTime(0.0, time, this._actx.currentTime)
            this._gainCompensationNode2?.gain.setTargetAtTime(this._gainComp2 + this._manualComp2, time, this._actx.currentTime);
            //console.log("Switch to 2");
        }
    }

    getRightValue() {
        return this._rightState;
    }

    getWonPoints() : number {
        if (this._state != this._rightState) return 0;
        let diff = Math.abs(this._value1 - this._value2);
        switch (this._game_mode) {
            case "threshold":
                return Math.max(Math.min( Math.round( (-900/39) * diff + (39900/39) ), 1000), 100);
            case "attack":
            case "release":
                return Math.max(Math.min( Math.round( (-900/980) * diff + (998000/980) ), 1000), 100);
            case "ratio":
                return Math.max(Math.min( Math.round( (-900/18) * diff + (19800/18) ), 1000), 100);
            default:
                return 500
        }
    }

    startMeterGainReduction() {
        let intervalId = setInterval(() => {
            let node = (this._state == 1) ? this._compNode1 : this._compNode2 ;
            if (node) console.log(node.reduction);
        }, 500);
        this._intervalId = intervalId;
    }

    stopMeterGainReduction() {
        if (this._intervalId) clearInterval(this._intervalId);
    }
}