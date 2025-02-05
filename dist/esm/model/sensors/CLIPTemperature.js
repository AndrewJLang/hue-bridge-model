import { UInt16Type } from '../../types';
import { CLIPSensor } from './CLIPSensor';
const CONFIG_ATTRIBUTES = [];
const STATE_ATTRIBUTES = [
    new UInt16Type({ name: 'temperature' }),
];
export class CLIPTemperature extends CLIPSensor {
    constructor(id) {
        super(CONFIG_ATTRIBUTES, STATE_ATTRIBUTES, id);
    }
    get temperature() {
        return this.getStateAttributeValue('temperature');
    }
    set temperature(value) {
        this._updateStateAttributeValue('temperature', value);
    }
}
