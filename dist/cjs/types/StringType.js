"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringType = void 0;
const BaseType_1 = require("./BaseType");
const BaseType_2 = require("./BaseType");
class StringType extends BaseType_1.BaseType {
    constructor(config) {
        super({ ...config, type: 'string' });
        if (BaseType_2.isValueDefined(config.minLength)) {
            this.minLength = config.minLength;
        }
        if (BaseType_2.isValueDefined(config.maxLength)) {
            this.maxLength = config.maxLength;
        }
    }
    getValue(value) {
        const checkedValue = super.getValue(value), valueDefined = BaseType_2.isValueDefined(checkedValue), optional = this.optional;
        // If we are optional and have no value, prevent further checks as they will fail
        if (optional && !valueDefined) {
            return checkedValue;
        }
        // 0 will not trigger this, but it is not a problem in this context
        if (this.minLength) {
            if (!valueDefined) {
                throw new TypeError(`No value provided for ${this.name}, must have a minimum length of ${this.minLength}`);
            }
            else { // @ts-ignore
                if (checkedValue.length < this.minLength) {
                    throw new TypeError(`'${value}' for ${this.name}, does not meet minimum length requirement of ${this.minLength}`);
                }
            }
        }
        // 0 will not trigger this, but it is not a problem in this context, although max length of 0 is not really valid
        if (this.maxLength) {
            // @ts-ignore
            if (valueDefined && checkedValue.length > this.maxLength) {
                throw new TypeError(`'${value}' for ${this.name}, does not meet maximum length requirement of ${this.maxLength}`);
            }
        }
        return checkedValue;
    }
    _convertToType(val) {
        return `${val}`;
    }
}
exports.StringType = StringType;
