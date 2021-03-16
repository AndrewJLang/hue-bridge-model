"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangedNumberType = void 0;
const BaseType_1 = require("./BaseType");
const BaseType_2 = require("./BaseType");
class RangedNumberType extends BaseType_1.BaseType {
    constructor(config) {
        super({ ...{ type: 'RangedNumber' }, ...config });
        if (BaseType_2.isValueDefined(config.min)) {
            // @ts-ignore
            this.min = config.min;
        }
        else {
            this.min = config.typeMin;
        }
        if (BaseType_2.isValueDefined(config.max)) {
            // @ts-ignore
            this.max = config.max;
        }
        else {
            this.max = config.typeMax;
        }
    }
    getValue(value) {
        const numberValue = super.getValue(value);
        // Value has been checked in the super function and is optional
        if (numberValue === null) {
            return null;
        }
        // Invalid input value
        if (Number.isNaN(numberValue)) {
            throw new TypeError(`Failure to convert value for ${this.name}, value, '${value}' is not a parsable number'`);
        }
        if (this.isValueInRange(numberValue)) {
            return numberValue;
        }
        else {
            throw new TypeError(`Value, '${numberValue}' is not within allowed limits: min=${this.min} max=${this.max} for '${this.name}'`);
        }
    }
    _convertToType(val) {
        return Number(val);
    }
    isValueInRange(value) {
        return value >= this.min && value <= this.max;
    }
    getRange() {
        // return this.max - this.min; //TODO brightness has a lower bound of 1, which can generate quirks
        return this.max;
    }
}
exports.RangedNumberType = RangedNumberType;
