"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectType = void 0;
const BaseType_1 = require("./BaseType");
const BaseType_2 = require("./BaseType");
class ObjectType extends BaseType_1.BaseType {
    constructor(config) {
        super({ ...config, type: 'object' });
        this.types = config.types;
        if (!BaseType_2.isValueDefined(config.types)) {
            this.childRequiredKeys = [];
        }
        else {
            const childRequiredKeys = [];
            // @ts-ignore
            config.types.forEach(type => {
                if (!type.optional) {
                    childRequiredKeys.push(type.name);
                }
            });
            this.childRequiredKeys = childRequiredKeys;
        }
    }
    _convertToType(val) {
        const result = this._getObject(val);
        this._validateRequiredKeys(result);
        if (Object.keys(result).length === 0) {
            if (this.optional) {
                return null;
            }
            else {
                throw new TypeError(`Empty object created from data provided, but the object is not optional`);
            }
        }
        return result;
    }
    _getObject(val) {
        // We have a free form object type
        if (!this.types) {
            return Object.assign({}, val);
        }
        const result = {};
        // Build the object based off the definitions for the keys
        this.types.forEach(typeAttribute => {
            const name = typeAttribute.name, typeValue = typeAttribute.getValue(val[name]);
            if (BaseType_2.isValueDefined(typeValue)) {
                result[name] = typeValue;
            }
        });
        return result;
    }
    _validateRequiredKeys(result) {
        if (this.childRequiredKeys.length > 0) {
            const valueKeys = Object.keys(result);
            this.childRequiredKeys.forEach(requiredKey => {
                if (valueKeys.indexOf(requiredKey) === -1) {
                    throw new TypeError(`Required key '${requiredKey}' is missing from the object`);
                }
            });
        }
    }
}
exports.ObjectType = ObjectType;
