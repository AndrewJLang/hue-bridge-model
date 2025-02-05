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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFromJson = exports.createFromBridge = exports.instanceChecks = exports.ruleConditions = exports.actions = exports.ruleConditionOperators = exports.lightStates = void 0;
const ConditionOperators = __importStar(require("./model/rules/conditions/operators"));
const mapTypesToModel_1 = require("./model/mapTypesToModel");
const operators_1 = require("./model/rules/conditions/operators");
const HueBridgeModelError_1 = require("./HueBridgeModelError");
const BridgeConfiguration_1 = require("./model/BridgeConfiguration");
const Group_1 = require("./model/groups/Group");
const Sensor_1 = require("./model/sensors/Sensor");
const Light_1 = require("./model/Light");
const Scene_1 = require("./model/scenes/Scene");
const GroupScene_1 = require("./model/scenes/GroupScene");
const LightScene_1 = require("./model/scenes/LightScene");
const Rule_1 = require("./model/rules/Rule");
const ResourceLink_1 = require("./model/ResourceLink");
const Schedule_1 = require("./model/Schedule");
const LightState_1 = require("./model/lightstate/LightState");
const GroupState_1 = require("./model/lightstate/GroupState");
const SceneLightState_1 = require("./model/lightstate/SceneLightState");
const SensorCondition_1 = require("./model/rules/conditions/SensorCondition");
const GroupCondition_1 = require("./model/rules/conditions/GroupCondition");
const LightStateAction_1 = require("./model/actions/LightStateAction");
const GroupStateAction_1 = require("./model/actions/GroupStateAction");
const SensorStateAction_1 = require("./model/actions/SensorStateAction");
const SceneAction_1 = require("./model/actions/SceneAction");
__exportStar(require("./HueBridgeModelError"), exports);
__exportStar(require("./model/BridgeObject"), exports);
__exportStar(require("./model/BridgeObjectWithId"), exports);
__exportStar(require("./model/ResourceLink"), exports);
__exportStar(require("./model/Light"), exports);
__exportStar(require("./model/Schedule"), exports);
__exportStar(require("./model/groups/Group"), exports);
__exportStar(require("./model/groups/Entertainment"), exports);
__exportStar(require("./model/groups/LightGroup"), exports);
__exportStar(require("./model/groups/Lightsource"), exports);
__exportStar(require("./model/groups/Luminaire"), exports);
__exportStar(require("./model/groups/Room"), exports);
__exportStar(require("./model/groups/Zone"), exports);
__exportStar(require("./model/scenes/GroupScene"), exports);
__exportStar(require("./model/scenes/LightScene"), exports);
__exportStar(require("./model/lightstate/LightState"), exports);
__exportStar(require("./model/lightstate/GroupState"), exports);
__exportStar(require("./model/lightstate/SceneLightState"), exports);
__exportStar(require("./model/sensors/Sensor"), exports);
__exportStar(require("./model/sensors/CLIPGenericFlag"), exports);
__exportStar(require("./model/sensors/CLIPGenericStatus"), exports);
__exportStar(require("./model/sensors/CLIPHumidity"), exports);
__exportStar(require("./model/sensors/CLIPLightlevel"), exports);
__exportStar(require("./model/sensors/CLIPOpenClose"), exports);
__exportStar(require("./model/sensors/CLIPPresence"), exports);
__exportStar(require("./model/sensors/CLIPSwitch"), exports);
__exportStar(require("./model/sensors/CLIPTemperature"), exports);
__exportStar(require("./model/sensors/Daylight"), exports);
__exportStar(require("./model/sensors/ZGPSwitch"), exports);
__exportStar(require("./model/sensors/ZLLLightlevel"), exports);
__exportStar(require("./model/sensors/ZLLPresence"), exports);
__exportStar(require("./model/sensors/ZLLSwitch"), exports);
__exportStar(require("./model/sensors/ZLLTemperature"), exports);
__exportStar(require("./model/sensors/GeoFence"), exports);
__exportStar(require("./model/rules/Rule"), exports);
__exportStar(require("./model/rules/conditions/SensorCondition"), exports);
__exportStar(require("./model/rules/conditions/GroupCondition"), exports);
__exportStar(require("./model/actions/LightStateAction"), exports);
__exportStar(require("./model/actions/SensorStateAction"), exports);
__exportStar(require("./model/actions/GroupStateAction"), exports);
__exportStar(require("./model/actions/SceneAction"), exports);
__exportStar(require("./model/scenes/Scene"), exports);
__exportStar(require("./model/BridgeConfiguration"), exports);
__exportStar(require("./model/Capabilities"), exports);
exports.lightStates = {
    LightState: LightState_1.LightState,
    GroupLightState: GroupState_1.GroupState,
    SceneLightState: SceneLightState_1.SceneLightState,
};
exports.ruleConditionOperators = {
    equals: ConditionOperators.Equals,
    changed: ConditionOperators.Dx,
    changedDelayed: ConditionOperators.Ddx,
    greaterThan: ConditionOperators.GreaterThan,
    lessThan: ConditionOperators.LessThan,
    stable: ConditionOperators.Stable,
    notStable: ConditionOperators.NotStable,
    in: ConditionOperators.In,
    notIn: ConditionOperators.NotIn,
    getOperator: operators_1.getOperator,
};
exports.actions = {
    light: function (light) {
        return new LightStateAction_1.LightStateAction(light);
    },
    group: function (group) {
        return new GroupStateAction_1.GroupStateAction(group);
    },
    sensor: function (sensor) {
        return new SensorStateAction_1.SensorStateAction(sensor);
    },
    scene: function (scene) {
        return new SceneAction_1.SceneAction(scene);
    }
};
exports.ruleConditions = {
    sensor: function (sensor) {
        return new SensorCondition_1.SensorCondition(sensor);
    },
    group: function (id) {
        return new GroupCondition_1.GroupCondition(id);
    },
};
exports.instanceChecks = {
    isLightInstance: function (obj) {
        return obj instanceof Light_1.Light;
    },
    isSceneInstance: function (obj) {
        return obj instanceof Scene_1.Scene;
    },
    isGroupSceneInstance: function (obj) {
        return obj instanceof GroupScene_1.GroupScene;
    },
    isLightSceneInstance: function (obj) {
        return obj instanceof LightScene_1.LightScene;
    },
    isRuleInstance: function (obj) {
        return obj instanceof Rule_1.Rule;
    },
    isResourceLinkInstance: function (obj) {
        return obj instanceof ResourceLink_1.ResourceLink;
    },
    isScheduleInstance: function (obj) {
        return obj instanceof Schedule_1.Schedule;
    },
    isSensorInstance: function (obj) {
        return obj instanceof Sensor_1.Sensor;
    },
    isGroupInstance: function (obj) {
        return obj instanceof Group_1.Group;
    },
    isBridgeConfigurationInstance: function (obj) {
        return obj instanceof BridgeConfiguration_1.BridgeConfiguration;
    },
};
function createFromBridge(type, id, payload) {
    const ModelObject = mapTypesToModel_1.TYPES_TO_MODEL[type];
    if (!ModelObject) {
        throw new HueBridgeModelError_1.HueBridgeModelError(`Unknown type '${type}' to create Bridge Model Object from.`);
    }
    // @ts-ignore
    const instance = new ModelObject(id);
    instance._populate(payload);
    return instance;
}
exports.createFromBridge = createFromBridge;
//TODO defined a type for object
function createFromJson(payload) {
    const payloadDataType = payload.node_hue_api;
    if (!payloadDataType) {
        throw new HueBridgeModelError_1.HueBridgeModelError('Missing payload Data Type definition');
    }
    const type = payloadDataType.type, version = payloadDataType.version || 0;
    if (!type) {
        throw new HueBridgeModelError_1.HueBridgeModelError('Invalid payload, missing type from the Data Type');
    }
    if (version === 0) {
        throw new HueBridgeModelError_1.HueBridgeModelError(`Unsupported version number ${version}, for JSON payload`);
    }
    // Default to using bridge data construction until we diverge
    return createFromBridge(type, payload.id, payload);
}
exports.createFromJson = createFromJson;
