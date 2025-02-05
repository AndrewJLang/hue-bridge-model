import { BooleanType, ChoiceType, Int16Type, ListType, StringType, UInt8Type } from '../../types';
import { Sensor } from './Sensor';
const CONFIG_ATTRIBUTES = [
    new BooleanType({ name: 'reachable' }),
    new UInt8Type({ name: 'battery' }),
    new ChoiceType({ name: 'alert', validValues: ['none', 'select', 'lselect'], defaultValue: 'none' }),
    new ListType({ name: 'pending', entryType: new StringType({ name: 'pendingChange' }), minEntries: 0 })
];
const STATE_ATTRIBUTES = [
    new Int16Type({ name: 'buttonevent' }),
];
// Hue Dimmer Switch
export class ZLLSwitch extends Sensor {
    constructor(id) {
        super(CONFIG_ATTRIBUTES, STATE_ATTRIBUTES, id);
    }
    get battery() {
        return this.getConfigAttributeValue('battery');
    }
    set battery(value) {
        this._updateConfigAttributeValue('battery', value);
    }
    get alert() {
        return this.getConfigAttributeValue('alert');
    }
    set alert(value) {
        this._updateConfigAttributeValue('alert', value);
    }
    get reachable() {
        return this.getConfigAttributeValue('reachable');
    }
    set reachable(value) {
        this._updateConfigAttributeValue('reachable', value);
    }
    get pending() {
        return this.getConfigAttributeValue('pending');
    }
    get buttonevent() {
        return this.getStateAttributeValue('buttonevent');
    }
}
