"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
const BridgeObjectWithId_1 = require("../BridgeObjectWithId");
const types_1 = require("../../types");
const ruleConditions = __importStar(require("./conditions/index"));
const index_1 = require("../actions/index");
const ATTRIBUTES = [
    new types_1.StringType({ name: 'id' }),
    new types_1.StringType({ name: 'name', maxLength: 32 }),
    new types_1.StringType({ name: 'owner' }),
    new types_1.StringType({ name: 'created' }),
    new types_1.BooleanType({ name: 'recycle' }),
    new types_1.StringType({ name: 'lasttrigered' }),
    new types_1.StringType({ name: 'timestriggered' }),
    new types_1.ChoiceType({
        name: 'status',
        validValues: ['enabled', 'disabled', 'resourcedeleted', 'looperror'],
        defaultValue: 'enabled'
    }),
];
class Rule extends BridgeObjectWithId_1.BridgeObjectWithId {
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
exports.Rule = Rule;
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
    return index_1.createAction(action);
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
