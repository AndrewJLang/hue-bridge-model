"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HueDate = void 0;
const timeUtil_1 = require("./timeUtil");
const HueBridgeModelError_1 = require("../HueBridgeModelError");
const AttributeObject_1 = require("../AttributeObject");
const UInt8Type_1 = require("../types/UInt8Type");
const ChoiceType_1 = require("../types/ChoiceType");
const DATE_STRING_REGEX = new RegExp(`^${timeUtil_1.getDatePattern()}`);
const MONTHS = [
    'January',
    'Feburary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
const ATTRIBUTES = [
    new UInt8Type_1.UInt8Type({ name: 'year', min: 1900, max: 3000 }),
    new ChoiceType_1.ChoiceType({ name: 'month', validValues: MONTHS }),
    new UInt8Type_1.UInt8Type({ name: 'day', min: 0, max: 31 }),
];
class HueDate extends AttributeObject_1.AttributeObject {
    constructor(value) {
        super(ATTRIBUTES);
        if (value instanceof Date) {
            this.fromDate(value);
        }
        else {
            this.fromString(value);
        }
    }
    get year() {
        return this.getAttributeValue('year');
    }
    get yearString() {
        return `${this.year}`;
    }
    set year(value) {
        this.setAttributeValue('year', value);
    }
    get month() {
        const idx = MONTHS.indexOf(this.getAttributeValue('month'));
        //TODO make mandatory then will not need this?
        if (idx === -1) {
            throw new HueBridgeModelError_1.HueBridgeModelError(`Month value has not been set`);
        }
        return idx + 1;
    }
    get monthString() {
        const month = this.month;
        return `${month}`.padStart(2, '0');
    }
    /**
     * Sets the Month for the Date.
     * @param value {number | string} If a number, it is a 1 based index on the month number (1 === Jan), otherwise as a String the name of the month.
     * @returns {BridgeObject}
     */
    set month(value) {
        const monthNumber = parseInt(`${value}`);
        if (Number.isNaN(monthNumber)) {
            this.setAttributeValue('month', value);
        }
        else {
            const monthName = MONTHS[monthNumber - 1];
            this.setAttributeValue('month', monthName);
        }
    }
    get day() {
        return this.getAttributeValue('day');
    }
    get dayString() {
        return `${this.day}`.padStart(2, '0');
    }
    set day(value) {
        this.setAttributeValue('day', value);
    }
    toString() {
        return `${this.yearString}-${this.monthString}-${this.dayString}`;
    }
    fromString(value) {
        if (!value) {
            return this.fromDate(new Date());
        }
        else {
            const parsed = DATE_STRING_REGEX.exec(value);
            if (parsed) {
                // @ts-ignore
                this.year = parsed.groups.year;
                // @ts-ignore
                this.month = parsed.groups.month;
                // @ts-ignore
                this.day = parsed.groups.day;
                return this;
            }
            return this.fromDate(new Date());
        }
    }
    fromDate(value) {
        this.year = value.getUTCFullYear();
        this.month = value.getUTCMonth() + 1;
        this.day = value.getUTCDate();
        return this;
    }
}
exports.HueDate = HueDate;
