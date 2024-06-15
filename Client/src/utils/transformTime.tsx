import moment from 'moment-timezone';

function transformTime(time: string) {
    return moment(time).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm:ss');
}

export default transformTime;
