import type { GAME_INFOS, GameNode } from "$lib/games/helpers/types";
import type baseParameters from "./parameters"

export default class PantasticNode implements GameNode {
    protected _infos: GAME_INFOS;
    protected _parameters: typeof baseParameters;
    protected _actx: BaseAudioContext | undefined;
    protected _stereoPanNode: StereoPannerNode | undefined;
    protected _gainCompensationNode: GainNode | undefined;
    protected _min: number;
    protected _max: number;
    protected _valueToFind: number | undefined;
    protected _state: boolean;

    constructor(infos: GAME_INFOS, parameters: typeof baseParameters, actx: BaseAudioContext | null = null) {
        this._infos = infos;
        this._parameters = parameters;
        this._min = parameters.min_pan.value ?? parameters.min_pan.default;
        this._max = parameters.max_pan.value ?? parameters.max_pan.default;
        this._state = false;
        if (actx) {
            this.initialize(actx);
        }
    }

    initialize(actx: BaseAudioContext): void {
        this._actx = actx;
        this._stereoPanNode = new StereoPannerNode(actx, { pan: 0.0 });
        this._gainCompensationNode = new GainNode(actx, { gain: 0.7 });
        this._stereoPanNode.connect(this._gainCompensationNode);
        //this.getNewValueToFind();
    }

    inputNode() : AudioNode | null {
        return (this._stereoPanNode) ?? null;
    }

    connect(to: AudioNode) : AudioNode | null {
        return this._gainCompensationNode ? this._gainCompensationNode.connect(to) : null;
    }

    _setValueToFind(value: number) {
        let normalizedValue = value / 100;
        if (this._actx && this._stereoPanNode) this._stereoPanNode.pan.setValueAtTime(normalizedValue, this._actx.currentTime);
    }

    getNewValueToFind() {
        let pan = Math.round((this._max - this._min)  * Math.random() + this._min);
        //console.log("Value to find : ", pan);
        this._valueToFind = pan;
        this._setValueToFind(pan);
        return pan;
    }

    activate(time: number = 0.0) : boolean {
        this._state = true;
        if (this._actx && this._stereoPanNode && this._valueToFind) this._stereoPanNode.pan.setTargetAtTime(this._valueToFind / 100, this._actx.currentTime, time);
        return this._state;
    }

    deactivate(time: number = 0.0) : boolean {
        this._state = false;
        if (this._actx && this._stereoPanNode)  this._stereoPanNode.pan.setTargetAtTime(0.0, this._actx.currentTime, time);
        return this._state;
    }

    switch(action: true | false | null = null, time: number = 0.3) : boolean {
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
        return this._valueToFind;
    }

    PositionToValue(p: number, min: number | null = null, max: number | null = null) : number {
        return Math.round(Math.min(Math.max(200 * p - 100, min ?? this._min), max ?? this._max));
    }

    ValueToPosition(value: number) : number {
        return (value + 100) / 200;
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