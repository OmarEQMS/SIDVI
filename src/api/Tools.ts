import moment from 'moment-timezone';

import { Defaults } from './API';

// Dates
export function getDateNow(): Date {
    return moment().tz(Defaults.timezone).format(Defaults.dateformat);
}

export function getDateTimeNow(): Date {
    return moment().tz(Defaults.timezone).format(Defaults.timeformat);
}

export function getDate(): Date {
    return moment().tz(Defaults.timezone).toDate();
}

export function createDate(date: string) {
    return moment(date).tz(Defaults.timezone).format(Defaults.dateformat);
}

export function createDateTime(date: string) {
    return moment(date).tz(Defaults.timezone).format(Defaults.timeformat);
}
