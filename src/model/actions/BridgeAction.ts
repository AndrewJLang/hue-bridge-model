import BridgeObject from '../BridgeObject';
import ChoiceType from '../../types/ChoiceType';
import { BridgeActionPayload } from './index';
import Type from '../../types/Type';

const ATTRIBUTES = [
  new ChoiceType({name: 'method', validValues: ['PUT', 'POST', 'DELETE']}),
  new ChoiceType({name: 'target', validValues: ['rule', 'schedule']}),
];

export type BridgeActionData = {
  address: string,
  method: string,
  body?: object,
}

export default abstract class BridgeAction extends BridgeObject {

  protected constructor(attributes: Type<any>[], method: string) {
    super([...ATTRIBUTES, ...attributes]);
    this.withMethod(method);
  }

  get method() {
    return this.getAttributeValue('method');
  }

  //TODO maybe unnecessary
  get isRuleAction() {
    return this.getAttributeValue('target') === 'rule';
  }

  //TODO maybe unnecessary
  get isScheduleAction() {
    return this.getAttributeValue('target') === 'schedule';
  }

  abstract get address(): string;

  abstract get body(): object;

  withMethod(value: string) {
    return this.setAttributeValue('method', value);
  }

  //TODO revisit this
  get payload(): BridgeActionPayload {
    return {
      address: this.address,
      method: this.method,
      body: this.body
    };
  }

  toString() {
    return JSON.stringify(this.payload);
  }
};