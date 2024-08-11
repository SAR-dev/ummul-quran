export const getTodayDateInYYYYMMDD = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`
}

export const getDateTimeWithOffset = ({ date, time }: { date: string, time: string }) => {
    const now = new Date(`${date}T${time}:00`);
    const offset = now.getTimezoneOffset();
    const sign = offset > 0 ? '-' : '+';
    const absOffset = Math.abs(offset);
    const hours = String(Math.floor(absOffset / 60)).padStart(2, '0');
    const minutes = String(absOffset % 60).padStart(2, '0');
    const formattedOffset = `${sign}${hours}${minutes}`;

    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day = String(now.getUTCDate()).padStart(2, '0');
    const hour = String(now.getUTCHours()).padStart(2, '0');
    const minute = String(now.getUTCMinutes()).padStart(2, '0');
    const second = String(now.getUTCSeconds()).padStart(2, '0');
    const millisecond = String(now.getUTCMilliseconds()).padStart(3, '0');

    return `${year}-${month}-${day} ${hour}:${minute}:${second}.${millisecond} ${formattedOffset}`;
}


export const convertDateTimeToTimestamp = ({ date, time }: { date: string, time: string }) => {
    const dateTimeString = `${date}T${time}:00`;
    const dateObject = new Date(dateTimeString);
    return dateObject.getTime();
};