"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooleanType = void 0;
const BaseType_1 = require("./BaseType");
class BooleanType extends BaseType_1.BaseType {
    constructor(config) {
        super({ ...{ type: 'boolean' }, ...config });
    }
    getValue(val) {
        if (BaseType_1.isValueDefined(val)) {
            return Boolean(val);
        }
        else {
            if (this.hasDefaultValue()) {
                return Boolean(this.defaultValue);
            }
            else {
                if (this.optional) {
                    return val;
                }
                else {
                    throw new TypeError(`No value provided and '${this.name}' is not optional`);
                }
            }
        }
    }
}
exports.BooleanType = BooleanType;
