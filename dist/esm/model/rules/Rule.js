import { BridgeObjectWithId } from '../BridgeObjectWithId';
import { BooleanType, ChoiceType, StringType } from '../../types';
import * as ruleConditions from './conditions/index';
import { createAction } from '../actions/index';
const ATTRIBUTES = [
    new StringType({ name: 'id' }),
    new StringType({ name: 'name', maxLength: 32 }),
    new StringType({ name: 'owner' }),
    new StringType({ name: 'created' }),
    new BooleanType({ name: 'recycle' }),
    new StringType({ name: 'lasttrigered' }),
    new StringType({ name: 'timestriggered' }),
    new ChoiceType({
        name: 'status',
        validValues: ['enabled', 'disabled', 'resourcedeleted', 'looperror'],
        defaultValue: 'enabled'
    }),
];
export class Rule extends BridgeObjectWithId {
    constructor(id) {
        super(ATTRIBUTES, id);
        this._conditions = buildConditions();
        this._actions = buildActions();
    }
    get name() {
        return this.getAttributeValue('name');
    }
    set name(value) {
        this.setAttributeValue('name', value);
    }
    get created() {
        return this.getAttributeValue('created');
    }
    get owner() {
        return this.getAttributeValue('owner');
    }
    get lasttriggered() {
        return this.getAttributeValue('lasttriggered');
    }
    get timestriggered() {
        return this.getAttributeValue('timestriggered');
    }
    get status() {
        return this.getAttributeValue('status');
    }
    set recycle(val) {
        this.setAttributeValue('recycle', val);
    }
    get recycle() {
        return this.getAttributeValue('recycle');
    }
    get conditions() {
        return this._conditions;
    }
    addCondition(condition) {
        this._conditions.push(buildCondition(condition));
        return this;
    }
    removeConditionAt(idx) {
        this._conditions.splice(idx, 1);
    }
    resetConditions() {
        this._conditions = buildConditions();
    }
    get actions() {
        return this._actions;
    }
    addAction(action) {
        this._actions.push(buildAction(action));
        return this;
    }
    removeActionAt(idx) {
        this._actions.splice(idx, 1);
    }
    resetActions() {
        this._actions = buildActions();
    }
    getConditionsPayload() {
        const result = [];
        this.conditions.forEach(condition => {
            result.push(condition.payload);
        });
        return result;
    }
    getActionsPayload() {
        const result = [];
        this.actions.forEach(action => {
            result.push(action.payload);
        });
        return result;
    }
    toStringDetailed() {
        let result = super.toStringDetailed();
        result += '\n  Conditions:';
        this.conditions.forEach(condition => {
            result += `\n    ${condition.toString()}`;
        });
        result += '\n  Actions:';
        this.actions.forEach(action => {
            result += `\n    ${action.toString()}`;
        });
        return result;
    }
    _populate(data) {
        super._populate(data);
        this._conditions = buildConditions(data ? data.conditions : null);
        this._actions = buildActions(data ? data.actions : null);
        return this;
    }
    getHuePayload() {
        const data = super.getHuePayload();
        data.conditions = this.getConditionsPayload();
        data.actions = this.getActionsPayload();
        return data;
    }
    getJsonPayload() {
        const data = super.getJsonPayload();
        data.conditions = this.getConditionsPayload();
        data.actions = this.getActionsPayload();
        return data;
    }
}
;
function buildCondition(condition) {
    return ruleConditions.createRuleCondition(condition);
}
function buildConditions(conditions) {
    const result = [];
    if (conditions) {
        conditions.forEach(condition => {
            result.push(buildCondition(condition));
        });
    }
    return result;
}
function buildAction(action) {
    return createAction(action);
}
function buildActions(actions) {
    const result = [];
    if (actions) {
        actions.forEach(action => {
            result.push(buildAction(action));
        });
    }
    return result;
}
