import Moment from 'moment';
import { APP_CONFIG } from 'src/Constants/Config';

export const generateTimeSeries = (startTimeCount = 0, endTimeCount = 23) => {
    let timeSeries = [];
    for(let count = startTimeCount; count <= endTimeCount; count++) {
        let time = ('0' + count).slice(-2) + ':00';
        timeSeries.push(time);
    }
    return timeSeries;
}

export const validateActiveDay = (dayObject) => {
    let presentDay = Moment().format('dd').toLowerCase();
    console.log("presentDay", presentDay);
    return dayObject[presentDay] === true ? true : false;

} 

export const validateActiveTime = (startTime, endTime) => {   
    startTime = Moment(startTime, 'hh:mm');
    endTime = Moment(endTime, 'hh:mm');   
   
    /* console.log('startTime',startTime);
    console.log('endTime',endTime);
    console.log(Moment(currentTime).isBetween(startTime, endTime));
    console.log(Moment().isBefore(endTime));
    console.log(Moment().isAfter(startTime)); */

    return (Moment().isAfter(startTime) && Moment().isBefore(endTime)) ? true : false;
} 

export const transformDate = (date, format = APP_CONFIG.DATE_FORMAT) => {
    if (new Date(date).toLocaleString() === 'Invalid Date') { return 'Invalid Date'; }
    return Moment(date).format(format);
}

export const toCurrency = (number, options) => {
    const defaults = { locale: APP_CONFIG.LOCALE, style: 'currency', currency: APP_CONFIG.CURRENCY , minFraction: 0, maxFraction: 0};
    const _options = Object.assign({}, defaults, options)
    return new Intl.NumberFormat(_options.locale, _options).format(number)

}  

