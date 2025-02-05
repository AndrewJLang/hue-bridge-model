"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimePatternType = void 0;
const BaseType_1 = require("./BaseType");
const time_1 = require("../time");
const HueBridgeModelError_1 = require("../HueBridgeModelError");
const BridgeTime_1 = require("../time/BridgeTime");
class TimePatternType extends BaseType_1.BaseType {
    constructor(config) {
        super({ ...config, type: 'timePattern' });
    }
    getValue(value) {
        const checkedValue = super.getValue(value), isDefined = BaseType_1.isValueDefined(checkedValue), optional = this.optional;
        // If we are optional and have no value, prevent further checks as they will fail
        if (optional && !isDefined) {
            return checkedValue;
        }
        if (value instanceof BridgeTime_1.BridgeTime) {
            return value.toString();
        }
        else if (time_1.isTimePattern(value)) {
            return time_1.createFromString(value).toString();
        }
        else {
            //TODO may need to cater for a string
            throw new HueBridgeModelError_1.HueBridgeModelError(`Cannot convert value "${value}" to a valid TimePatten`);
        }
    }
    _convertToType(val) {
        return time_1.createFromString(`${val}`);
    }
}
exports.TimePatternType = TimePatternType;
