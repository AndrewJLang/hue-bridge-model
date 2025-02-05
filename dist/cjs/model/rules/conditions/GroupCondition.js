"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectOperator = exports.SelectAttribute = exports.GroupCondition = void 0;
const Group_1 = require("../../groups/Group");
const RuleCondition_1 = require("./RuleCondition");
const operators_1 = require("./operators");
const HueBridgeModelError_1 = require("../../../HueBridgeModelError");
class GroupCondition {
    constructor(id) {
        this.groupStateAttribute = null;
        this._operator = null;
        if (id instanceof Group_1.Group) {
            this.id = id.id;
        }
        else {
            this.id = id;
        }
    }
    when() {
        return new SelectAttribute(this);
    }
    getRuleCondition() {
        validateState(this);
        const data = {
            address: `/groups/${this.id}/state/${this.groupStateAttribute}`,
            // @ts-ignore
            operator: this._operator,
        };
        if (this.value !== undefined && this.value !== null) {
            data['value'] = this.value;
        }
        return new RuleCondition_1.RuleCondition(data);
    }
    get operator() {
        return this._operator;
    }
    setOperator(value) {
        const operator = operators_1.getOperator(value);
        if (operator) {
            this._operator = operator;
        }
        else {
            throw new HueBridgeModelError_1.HueBridgeModelError(`Failed to resolve an operator for: '${JSON.stringify(value)}'`);
        }
    }
    _setRequiredValue(value) {
        if (value === null) {
            throw new HueBridgeModelError_1.HueBridgeModelError('A value is required when using this operator');
        }
        this.value = value;
    }
}
exports.GroupCondition = GroupCondition;
;
function validateState(condition) {
    let message = null;
    if (condition.id === null || condition.id === undefined) {
        message = 'a group id is required';
    }
    else if (!condition.groupStateAttribute) {
        message = 'a state of the group is required';
    }
    else if (!condition.operator) {
        message = 'an operator for the group state value is required';
    }
    //TODO some operators require a value, others do not, might need to validate that here too, should have a function on the operator to check is a value is required
    if (message) {
        throw new HueBridgeModelError_1.HueBridgeModelError(`Invalid Condition, ${message}`);
    }
}
class SelectAttribute {
    constructor(condition) {
        this._condition = condition;
        this._selectOperator = new SelectOperator(condition);
    }
    allOn() {
        this._condition.groupStateAttribute = 'all_on';
        return this._selectOperator;
    }
    anyOn() {
        this._condition.groupStateAttribute = 'any_on';
        return this._selectOperator;
    }
}
exports.SelectAttribute = SelectAttribute;
class SelectOperator {
    constructor(condition) {
        this._condition = condition;
    }
    equals(val) {
        this._condition.setOperator('eq');
        this._condition._setRequiredValue(val);
        return this._condition;
    }
    changed() {
        this._condition.setOperator('dx');
        // Clear any value that might have been set in the past
        this._condition.value = undefined;
        return this._condition;
    }
    changedDelayed(val) {
        this._condition.setOperator('ddx');
        this._condition._setRequiredValue(val); //TODO not sure this is required for ddx
        return this._condition;
    }
}
exports.SelectOperator = SelectOperator;
