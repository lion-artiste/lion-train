import BigBoostyNode from "../big-boosty/BigBoostyNode";

export default class WhatTheCutNode extends BigBoostyNode {

    activate(time: number = 0.0) : boolean {
        this._state = true;
        if (this._actx && this._eqNode) this._eqNode.gain.setTargetAtTime((-1) * this._getGainCompensation(this._valueToFind), this._actx.currentTime, time);
        return this._state;
    }
}