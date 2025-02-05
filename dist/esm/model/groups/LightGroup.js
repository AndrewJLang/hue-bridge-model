import { Group } from './Group';
import { ListType, StringType } from '../../types';
const ATTRIBUTES = [
    new StringType({ name: 'type', defaultValue: 'LightGroup' }),
    new ListType({ name: 'lights', minEntries: 1, entryType: new StringType({ name: 'lightId' }) }),
];
export class LightGroup extends Group {
    constructor(id) {
        super(ATTRIBUTES, id);
    }
    set lights(value) {
        this.setAttributeValue('lights', value);
    }
    get lights() {
        return this.getAttributeValue('lights');
    }
}
