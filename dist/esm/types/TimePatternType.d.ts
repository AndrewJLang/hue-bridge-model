import { BaseType, TypeConfig } from './BaseType';
import { BridgeTime } from '../time/BridgeTime';
export declare class TimePatternType extends BaseType<BridgeTime> {
    constructor(config: TypeConfig<string>);
    getValue(value: any): import("./BaseType").NullableTypeValue<BridgeTime>;
    _convertToType(val: any): import("../time").AbsoluteTime | import("../time").RecurringTime | import("../time").Timer | import("../time").TimeInterval | import("../time").RandomizedTime | import("../time").RecurringTimer | import("../time").RandomizedTimer | import("../time").RecurringRandomizedTimer;
}
