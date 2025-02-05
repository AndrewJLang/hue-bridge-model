import UInt8Type from '../../types/UInt8Type';
import ChoiceType from '../../types/ChoiceType';
import ListType from '../../types/ListType';
import BooleanType from '../../types/BooleanType';
import StringType from '../../types/StringType';
import Int16Type from '../../types/Int16Type';
import Sensor from './Sensor';

const CONFIG_ATTRIBUTES = [
  new BooleanType({name: 'reachable'}),
  new UInt8Type({name: 'battery'}),
  new ChoiceType({name: 'alert', validValues: ['none', 'select', 'lselect'], defaultValue: 'none'}),
  new ListType({name: 'pending', entryType: new StringType({name: 'pendingChange'}), minEntries: 0})
];

const STATE_ATTRIBUTES = [
  new Int16Type({name: 'buttonevent'}),
];

// Hue Dimmer Switch
export default class ZLLSwitch extends Sensor {

  constructor(id: number | string) {
    super(CONFIG_ATTRIBUTES, STATE_ATTRIBUTES, id);
  }

  get battery(): number {
    return this.getConfigAttributeValue('battery');
  }

  set battery(value) {
    this._updateConfigAttributeValue('battery', value);
  }

  get alert(): string {
    return this.getConfigAttributeValue('alert');
  }

  set alert(value) {
    this._updateConfigAttributeValue('alert', value);
  }

  get reachable(): boolean {
    return this.getConfigAttributeValue('reachable');
  }

  set reachable(value) {
    this._updateConfigAttributeValue('reachable', value);
  }

  get pending(): string {
    return this.getConfigAttributeValue('pending');
  }

  get buttonevent(): number {
    return this.getStateAttributeValue('buttonevent');
  }
};