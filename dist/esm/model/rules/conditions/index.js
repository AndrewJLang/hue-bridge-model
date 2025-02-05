//TODO verify we have all conditions covered
import { RuleCondition } from './RuleCondition';
import { GroupCondition } from './GroupCondition';
import { HueBridgeModelError } from '../../../HueBridgeModelError';
import { SensorCondition } from './SensorCondition';
export { createRuleCondition };
function createRuleCondition(data) {
    if (data) {
        if (data instanceof SensorCondition || data instanceof GroupCondition) {
            return data.getRuleCondition();
        }
        else if (data instanceof RuleCondition) {
            return data;
        }
        else {
            return new RuleCondition(data);
        }
    }
    else {
        throw new HueBridgeModelError('No data provided to build RuleCondition instance from.');
    }
}
