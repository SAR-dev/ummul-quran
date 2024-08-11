export const getTodayDateInYYYYMMDD = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`
}

export const getUTCHoursOffset = () => {
    const offset = new Date().getTimezoneOffset();
    const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, '0');
    const minutes = String(Math.abs(offset) % 60).padStart(2, '0');
    const sign = offset <= 0 ? '+' : '-';

    return `${sign}${hours}${minutes}`;
}

export const getDateTimeWithOffset = ({ date, time }: { date: string, time: string }) => {
    const now = new Date(`${date}T${time}:00`);
    const offset = now.getTimezoneOffset();
    const sign = offset > 0 ? '-' : '+';
    const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, '0');
    const minutes = String(Math.abs(offset) % 60).padStart(2, '0');
    const formattedOffset = `${sign}${hours}${minutes}`;

    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day = String(now.getUTCDate()).padStart(2, '0');
    const hour = String(now.getUTCHours()).padStart(2, '0');
    const minute = String(now.getUTCMinutes()).padStart(2, '0');
    const second = String(now.getUTCSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hour}:${minute}:${second} ${formattedOffset}`;
}


export const convertDateTimeToTimestamp = ({ date, time }: { date: string, time: string }) => {
    const dateTimeString = `${date}T${time}:00`;
    const dateObject = new Date(dateTimeString);
    return dateObject.getTime();
};

export const formatTimestamp = (timestamp: Date) => {
    const date = new Date(timestamp);

    // Extract components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // hour '0' should be '12'
    const formattedHours = String(hours).padStart(2, '0');

    // Combine components into desired format
    return `${year}-${month}-${day} ${formattedHours}:${minutes} ${ampm}`;
}

export const formatDateRange = (date1: Date, date2: Date) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    // Extract components
    const year1 = d1.getFullYear();
    const year2 = d2.getFullYear();

    const month1 = d1.toLocaleString('en-US', { month: 'short' });
    const month2 = d2.toLocaleString('en-US', { month: 'short' });

    const day1 = String(d1.getDate()).padStart(2, '0');
    const day2 = String(d2.getDate()).padStart(2, '0');

    // Compare dates
    if (year1 === year2 && month1 === month2 && day1 === day2) {
        // Dates are the same
        return `${year1}-${month1}-${day1}`;
    } else {
        // Dates are different
        return `${year1}-${month1}-${day1} (*)`;
    }
}


export const formatTimeRange = (date1: Date, date2: Date) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    // Helper function to format time
    function formatTime(date: Date) {
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // Convert hour '0' to '12'
        const formattedHours = String(hours).padStart(2, '0');

        return `${formattedHours}:${minutes} ${ampm}`;
    }

    const time1 = formatTime(d1);
    const time2 = formatTime(d2);

    // Extract date components to check if dates are different
    const year1 = d1.getFullYear();
    const month1 = String(d1.getMonth() + 1).padStart(2, '0');
    const day1 = String(d1.getDate()).padStart(2, '0');

    const year2 = d2.getFullYear();
    const month2 = String(d2.getMonth() + 1).padStart(2, '0');
    const day2 = String(d2.getDate()).padStart(2, '0');

    if (year1 === year2 && month1 === month2 && day1 === day2) {
        // Dates are the same, just return the time range
        return `${time1}-${time2}`;
    } else {
        // Dates are different
        return `${time1}-${time2} (*)`;
    }
}