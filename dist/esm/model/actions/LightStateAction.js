import { ObjectType, UInt8Type } from '../../types';
import { BridgeAction } from './BridgeAction';
import { LightState } from '../lightstate/LightState';
import { Light } from '../Light';
import { HueBridgeModelError } from '../../HueBridgeModelError';
const ATTRIBUTES = [
    new UInt8Type({ name: 'light' }),
    new ObjectType({ name: 'body' }),
    new ObjectType({ name: 'state' }),
];
export class LightStateAction extends BridgeAction {
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
        if (value instanceof Light) {
            this.setAttributeValue('light', value.id);
        }
        else {
            this.setAttributeValue('light', value);
        }
    }
    withState(state) {
        let value;
        if (state instanceof LightState) {
            value = state;
        }
        else {
            value = new LightState().populate(state);
        }
        this.setAttributeValue('state', value.getPayload());
        return this;
    }
    get body() {
        const state = this.getAttributeValue('state');
        if (state) {
            return state;
        }
        throw new HueBridgeModelError('No state has been set on the LightStateAction');
    }
}
;
