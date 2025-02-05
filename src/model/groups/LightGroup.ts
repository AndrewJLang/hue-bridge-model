import Group from './Group';
import StringType from '../../types/StringType';
import ListType from '../../types/ListType';


const ATTRIBUTES = [
  new StringType({name: 'type', defaultValue: 'LightGroup'}),
  new ListType({name: 'lights', minEntries: 1, entryType: new StringType({name: 'lightId'})}),
];

export default class LightGroup extends Group {

  constructor(id?: string | number) {
    super(ATTRIBUTES, id);
  }

  set lights(value) {
    this.setAttributeValue('lights', value);
  }

  get lights(): string[] {
    return this.getAttributeValue('lights');
  }
};