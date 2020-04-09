import moment from 'moment-timezone';

import { Defaults } from './API';

export function createDate(date: Date) {
    return moment(date).tz(Defaults.timezone).format(Defaults.dateformat);
}

export function createDateTime(date: Date) {
    return moment(date).tz(Defaults.timezone).format(Defaults.timeformat);
}
