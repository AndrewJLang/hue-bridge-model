import { Sensor } from './Sensor';
import { BooleanType, Int8Type, StringType } from '../../types';
const CONFIG_ATTRIBUTES = [
    new BooleanType({ name: 'configured' }),
    new Int8Type({ name: 'sunriseoffset', defaultValue: 30, min: -120, max: 120 }),
    new Int8Type({ name: 'sunsetoffset', defaultValue: -30, min: -120, max: 120 }),
    new StringType({ name: 'long' }),
    new StringType({ name: 'lat' }),
], STATE_ATTRIBUTES = [
    new BooleanType({ name: 'daylight' }),
    new StringType({ name: 'lastupdated' }),
];
export class Daylight extends Sensor {
    constructor(id) {
        super(CONFIG_ATTRIBUTES, STATE_ATTRIBUTES, id);
    }
    set long(value) {
        this._updateConfigAttributeValue('long', value);
    }
    set lat(value) {
        this._updateConfigAttributeValue('lat', value);
    }
    get configured() {
        return this.getConfigAttributeValue('configured');
    }
    get sunriseoffset() {
        return this.getConfigAttributeValue('sunriseoffset');
    }
    set sunriseoffset(value) {
        this._updateConfigAttributeValue('sunriseoffset', value);
    }
    get sunsetoffset() {
        return this.getConfigAttributeValue('sunsetoffset');
    }
    set sunsetoffset(value) {
        this._updateConfigAttributeValue('sunsetoffset', value);
    }
    get daylight() {
        return this.getStateAttributeValue('daylight');
    }
    set daylight(value) {
        this._updateStateAttributeValue('daylight', !!value);
    }
}
