// All the valid resource types that the Hue API documentation provides
import { BridgeObjectWithId } from './BridgeObjectWithId';
import { BooleanType, ChoiceType, StringType, UInt16Type } from '../types';
import { HueBridgeModelError } from '../HueBridgeModelError';
const VALID_RESOURCELINK_TYPES = [
    'lights',
    'sensors',
    'groups',
    'scenes',
    'rules',
    'schedules',
    'resourcelinks',
];
const ATTRIBUTES = [
    new UInt16Type({ name: 'id' }),
    new StringType({ name: 'name', minLength: 1, maxLength: 32 }),
    new StringType({ name: 'description', minLength: 0, maxLength: 64 }),
    new ChoiceType({ name: 'type', validValues: ['Link'], defaultValue: 'Link' }),
    new UInt16Type({ name: 'classid' }),
    new StringType({ name: 'owner' }),
    new BooleanType({ name: 'recycle' }),
];
export class ResourceLink extends BridgeObjectWithId {
    constructor(id) {
        super(ATTRIBUTES, id);
        this._links = {};
    }
    set name(value) {
        this.setAttributeValue('name', value);
    }
    get name() {
        return this.getAttributeValue('name');
    }
    get description() {
        return this.getAttributeValue('description');
    }
    set description(value) {
        this.setAttributeValue('description', value);
    }
    get type() {
        return this.getAttributeValue('type');
    }
    get classid() {
        return this.getAttributeValue('classid');
    }
    set classid(value) {
        this.setAttributeValue('classid', value);
    }
    get owner() {
        return this.getAttributeValue('owner');
    }
    get recycle() {
        return this.getAttributeValue('recycle');
    }
    set recycle(value) {
        this.setAttributeValue('recycle', value);
    }
    get links() {
        // Prevent editing of the link representation
        return Object.assign({}, this._links);
    }
    resetLinks() {
        this._links = {};
        return this;
    }
    addLink(type, id) {
        const links = this._links, validatedLinkType = validateLinkType(type);
        if (!links[validatedLinkType]) {
            links[validatedLinkType] = [];
        }
        links[validatedLinkType].push(id);
        return this;
    }
    removeLink(type, id) {
        const links = this._links, validatedLinkType = validateLinkType(type), linkType = links[validatedLinkType];
        if (linkType) {
            const idx = linkType.indexOf(`${id}`);
            if (idx > -1) {
                linkType.splice(idx, 1);
            }
        }
        return this;
    }
    toStringDetailed() {
        let result = super.toStringDetailed();
        const links = this.links;
        result += `\n  links: ${JSON.stringify(links)}`;
        return result;
    }
    getJsonPayload() {
        const dataLinks = this.links, data = super.getJsonPayload();
        // Add the links to the object
        data['links'] = JSON.parse(JSON.stringify(dataLinks));
        return data;
    }
    getHuePayload() {
        const data = super.getHuePayload(), resourceLinkLinks = this.links, links = [];
        // Convert the links back into the Hue Bride address form
        Object.keys(resourceLinkLinks).forEach(resource => {
            const resourceIds = resourceLinkLinks[resource];
            if (resourceIds) {
                resourceIds.forEach(resourceId => {
                    links.push(`/${resource}/${resourceId}`);
                });
            }
        });
        data['links'] = links;
        return data;
    }
    _populate(data) {
        // Links are taken apart and separated out from the data
        const rawData = Object.assign({}, data);
        const linkData = rawData.links;
        delete rawData.links;
        super._populate(rawData);
        this._links = processLinks(linkData);
        return this;
    }
}
;
function processLinks(linkData) {
    const result = {};
    if (linkData) {
        // This is the correct format for the bridge data
        if (Array.isArray(linkData)) {
            linkData.forEach(link => {
                const parts = /\/(.*)\/(.*)/.exec(link);
                if (parts) {
                    const linkType = parts[1], linkId = parts[2], validatedLinkType = validateLinkType(linkType);
                    let links = result[validatedLinkType];
                    if (!links) {
                        links = [];
                        result[validatedLinkType] = links;
                    }
                    links.push(linkId);
                }
            });
        }
        else {
            // We end up here if deserializing our own copy of a resource link
            Object.keys(linkData).forEach(key => {
                const validatedLinkType = validateLinkType(key);
                result[validatedLinkType] = linkData[key];
            });
        }
    }
    return result;
}
function validateLinkType(type) {
    if (!type) {
        throw new HueBridgeModelError('A ResourceLink Type must be provided');
    }
    const typeLowerCase = type.toLowerCase(), idx = VALID_RESOURCELINK_TYPES.indexOf(typeLowerCase);
    if (idx === -1) {
        throw new HueBridgeModelError(`Invalid resource link type ${type}`);
    }
    return typeLowerCase;
}
