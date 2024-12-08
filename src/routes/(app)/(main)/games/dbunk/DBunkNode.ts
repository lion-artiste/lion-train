import type { GAME_INFOS } from "$lib/games/helpers/types";
import type DBunkParameters from "./parameters";
import { dBToGain } from "$lib/games/helpers/functions";

export default class DBunkNode {

    protected _infos: GAME_INFOS;
    protected _parameters: typeof DBunkParameters;
    protected _actx: BaseAudioContext | undefined;
    protected _inputGainNode: GainNode | undefined;
    protected _gainNode: GainNode | undefined;
    protected _min: number;
    protected _max: number;
    protected _minDiff: number;
    protected _maxDiff: number;
    
    protected _value1: number;
    protected _value2: number;
    protected _rightValue: 1 | 2;
    protected _state: boolean;

    constructor(infos: GAME_INFOS, parameters: typeof DBunkParameters, actx: BaseAudioContext | null = null) {
        this._infos = infos;
        this._parameters = parameters;
        this._min = parameters.min_gain.value ?? parameters.min_gain.default;
        this._max = parameters.max_gain.value ?? parameters.max_gain.default;
        this._minDiff = parameters.min_diff.value ?? parameters.min_diff.default;
        this._maxDiff = parameters.max_diff.value ?? parameters.max_diff.default;
        this._value1 = 0;
        this._value2 = 0;
        this._rightValue = 1;
        this._state = false;

        if (actx) {
            this.initialize(actx);
        }
    }

    initialize(actx: BaseAudioContext): void {
        this._actx = actx;
        this._gainNode = new GainNode(actx, { gain: 1.0 });
        this._inputGainNode = new GainNode(actx, { gain: 0.7 });
        this._inputGainNode.connect(this._gainNode);
        this.getNewValueToFind();
    }

    inputNode() : AudioNode | null {
        return (this._inputGainNode) ?? null;
    }

    connect(to: AudioNode) : AudioNode | null {
        return this._gainNode ? this._gainNode.connect(to) : null;
    }

    _setValueToFind(value: number, time = 0.1) {
        if (this._actx && this._gainNode) this._gainNode.gain.setTargetAtTime(dBToGain(value), this._actx.currentTime, time);
    }

    /**
     * Generates two new dB reduction values, chooses the rightState, and stores them internally
     * @returns an array of the two new dB reduction values
     */
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

        this._value1 = value1;
        this._value2 = value2;
        this._rightValue = 1 + Math.round(Math.random()) as 1 | 2;

        return [this._value1, this._value2];
    }

    switch(state: true | false | null = null, time: number = 0.1) {
        if (state === null) {
            this._state = !this._state;
        } else {
            this._state = state;
        }

        this._setValueToFind( (this._state) ? (this._rightValue == 1) ? this._value1 : this._value2 : 0.0, time );
    }

    getRightValue() {
        return this._rightValue;
    }

    getWonPoints(answer: 1 | 2) : number {
        if (answer != this._rightValue) return 0;
        let diff = Math.abs(this._value1 - this._value2);
        if (diff >= 10) return 100;
        return (10 - diff + 1) * 100;
    }
}