import moment from 'moment-timezone';

import { Defaults } from "../api";

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

export function createDate(date: Date) {
    return moment(date).tz(Defaults.timezone).format(Defaults.dateformat);
}

export function createDateTime(date: Date) {
    return moment(date).tz(Defaults.timezone).format(Defaults.timeformat);
}

// Otros
export function generateCode(alphabet: string, length: number): string { // 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let code = "";
    for ( let i = 0; i < length; i++ ) {
        code = code + alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return code;
}

export function fileToBase64(mimetype: string, buffer: any): any { //string
    return `data:${mimetype};base64,${Buffer.from(buffer).toString('base64')}`;
}

// Array Modifier
export function shuffleArray<T>(array: Array<T>): Array<T> {
    let currentIndex = array.length - 1;
    let tempElement: T;

    while (currentIndex >= 0){
        let randomIndex = Math.floor(Math.random() * (currentIndex + 1)); 
        tempElement = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = tempElement;
        currentIndex--;
    }
    return array;
}
export function resizeArray<T>(array: Array<T>, size: number): Array<T> {
    if(array.length>size){
        array = array.slice(0, size);
    }else{
        array.push(...array.slice(0, size - array.length));
    }
    return array;
}

// JSON Modifier
export function deleteProperty(data: any, deleteP: string[]){ 
    if (typeof data === 'object') {
        deleteP.forEach((item:string) => {
            delete data[item]; 
        });
    }    
    return data;
}

export function deleteDeepNulls(data: any) {
    if (typeof data === 'object') {
        Object.keys(data).forEach((key) => {
            if (data[key] == null || (typeof data[key] === 'number' && isNaN(data[key]))) {
                delete data[key]
            } else {
                deleteDeepNulls(data[key])
            }
        });
    }
    return data
}

//Substitute ref to the real schema in the specification
export function ref2Schema(schema: any, data: any){
    let ref;
    if (typeof data === 'object') {        
        Object.keys(data).forEach((key) => {
            if (key=='$ref') {
                ref = data[key].split('/');                  
            }else{
                data[key] = ref2Schema(schema, data[key]);        
            }
        });
    }
    if(ref!=undefined){ return schema[ref[ref.length-1]]; };
    return data;
}
