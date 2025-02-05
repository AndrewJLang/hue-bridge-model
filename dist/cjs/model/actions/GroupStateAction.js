"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupStateAction = void 0;
const types_1 = require("../../types");
const BridgeAction_1 = require("./BridgeAction");
const Group_1 = require("../groups/Group");
const GroupState_1 = require("../lightstate/GroupState");
const HueBridgeModelError_1 = require("../../HueBridgeModelError");
const ATTRIBUTES = [
    new types_1.Int8Type({ name: 'group' }),
    new types_1.ObjectType({ name: 'state' }),
];
class GroupStateAction extends BridgeAction_1.BridgeAction {
    constructor(group) {
        super(ATTRIBUTES, 'PUT');
        this.withGroup(group);
    }
    get address() {
        return `/groups/${this.group}/action`;
    }
    get group() {
        return this.getAttributeValue('group');
    }
    withGroup(value) {
        if (value instanceof Group_1.Group) {
            this.setAttributeValue('group', value.id);
        }
        else {
            this.setAttributeValue('group', value);
        }
    }
    withState(state) {
        let value;
        if (state instanceof GroupState_1.GroupState) {
            value = state;
        }
        else {
            value = new GroupState_1.GroupState().populate(state);
        }
        this.setAttributeValue('state', value.getPayload());
        return this;
    }
    get body() {
        const state = this.getAttributeValue('state');
        if (state) {
            return state;
        }
        throw new HueBridgeModelError_1.HueBridgeModelError('No state has been set on the GroupStateAction');
    }
}
exports.GroupStateAction = GroupStateAction;
;
