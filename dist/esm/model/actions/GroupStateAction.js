import { ObjectType, Int8Type } from '../../types';
import { BridgeAction } from './BridgeAction';
import { Group } from '../groups/Group';
import { GroupState } from '../lightstate/GroupState';
import { HueBridgeModelError } from '../../HueBridgeModelError';
const ATTRIBUTES = [
    new Int8Type({ name: 'group' }),
    new ObjectType({ name: 'state' }),
];
export class GroupStateAction extends BridgeAction {
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
        if (value instanceof Group) {
            this.setAttributeValue('group', value.id);
        }
        else {
            this.setAttributeValue('group', value);
        }
    }
    withState(state) {
        let value;
        if (state instanceof GroupState) {
            value = state;
        }
        else {
            value = new GroupState().populate(state);
        }
        this.setAttributeValue('state', value.getPayload());
        return this;
    }
    get body() {
        const state = this.getAttributeValue('state');
        if (state) {
            return state;
        }
        throw new HueBridgeModelError('No state has been set on the GroupStateAction');
    }
}
;
