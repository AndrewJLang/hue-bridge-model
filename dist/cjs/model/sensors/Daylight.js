"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Daylight = void 0;
const Sensor_1 = require("./Sensor");
const types_1 = require("../../types");
const CONFIG_ATTRIBUTES = [
    new types_1.BooleanType({ name: 'configured' }),
    new types_1.Int8Type({ name: 'sunriseoffset', defaultValue: 30, min: -120, max: 120 }),
    new types_1.Int8Type({ name: 'sunsetoffset', defaultValue: -30, min: -120, max: 120 }),
    new types_1.StringType({ name: 'long' }),
    new types_1.StringType({ name: 'lat' }),
], STATE_ATTRIBUTES = [
    new types_1.BooleanType({ name: 'daylight' }),
    new types_1.StringType({ name: 'lastupdated' }),
];
class Daylight extends Sensor_1.Sensor {
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
exports.Daylight = Daylight;
