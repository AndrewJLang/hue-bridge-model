"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightStateAction = void 0;
const types_1 = require("../../types");
const BridgeAction_1 = require("./BridgeAction");
const LightState_1 = require("../lightstate/LightState");
const Light_1 = require("../Light");
const HueBridgeModelError_1 = require("../../HueBridgeModelError");
const ATTRIBUTES = [
    new types_1.UInt8Type({ name: 'light' }),
    new types_1.ObjectType({ name: 'body' }),
    new types_1.ObjectType({ name: 'state' }),
];
class LightStateAction extends BridgeAction_1.BridgeAction {
    constructor(light) {
        super(ATTRIBUTES, 'PUT');
        this.light = light;
    }
    get address() {
        return `/lights/${this.light}/state`;
    }
    get light() {
        return this.getAttributeValue('light');
    }
    set light(value) {
        if (value instanceof Light_1.Light) {
            this.setAttributeValue('light', value.id);
        }
        else {
            this.setAttributeValue('light', value);
        }
    }
    withState(state) {
        let value;
        if (state instanceof LightState_1.LightState) {
            value = state;
        }
        else {
            value = new LightState_1.LightState().populate(state);
        }
        this.setAttributeValue('state', value.getPayload());
        return this;
    }
    get body() {
        const state = this.getAttributeValue('state');
        if (state) {
            return state;
        }
        throw new HueBridgeModelError_1.HueBridgeModelError('No state has been set on the LightStateAction');
    }
}
exports.LightStateAction = LightStateAction;
;
