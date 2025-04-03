const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// const daysFull = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const daysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const Dater = {
    format: (date, format = 'M d, Y') =>
    {
        const initDate = new Date(date);
        let getDate = initDate.getDate();
        const getMonth = initDate.getMonth();
        const getYear = initDate.getFullYear();
        
        if (getDate <= 9) getDate = `0${getDate}`;

        switch (format)
        {
            case 'M d, Y':
            {
                return `${monthsShort[getMonth]} ${getDate}, ${getYear}`;
            }

            case 'F d, Y':
            {
                return `${monthsFull[getMonth]} ${getDate}, ${getYear}`;
            }

            case 'jS F Y':
            {
                let jS = '';

                const arrayOfDate = Array.from(String(getDate), Number);

                if (arrayOfDate.length === 1 && getDate === 1) jS = `${getDate}st day of`;
                else if (arrayOfDate.length === 1 && getDate === 2) jS = `${getDate}nd day of`;
                else if (arrayOfDate.length === 1 && getDate === 3) jS = `${getDate}rd day of`;
                else if (arrayOfDate.length === 1 && getDate > 3) jS = `${getDate}st day of`;
                else if (arrayOfDate.length > 1 && arrayOfDate[0] === 1) jS = `${getDate}th day of`;
                else if (arrayOfDate.length > 1 && arrayOfDate[0] > 1 && arrayOfDate[1] === 1) jS = `${getDate}st day of`;
                else if (arrayOfDate.length > 1 && arrayOfDate[0] > 1 && arrayOfDate[1] === 2) jS = `${getDate}nd day of`;
                else if (arrayOfDate.length > 1 && arrayOfDate[0] > 1 && arrayOfDate[1] === 3) jS = `${getDate}rd day of`;
                else if (arrayOfDate.length > 1 && arrayOfDate[0] > 1 && arrayOfDate[1] > 3) jS = `${getDate}th day of`;

                return `${jS} ${monthsFull[getMonth]}, ${getYear}`;
            }

            case 'd-m-Y':
            {
                return `${getDate}-${monthsShort[getMonth].toUpperCase()}-${getYear}`;
            }

            case 'yyyy-mm-dd':
            {
                let newMonth = getMonth + 1;
                if (newMonth <= 9) newMonth = `0${newMonth}`;
                return `${getYear}-${newMonth}-${getDate}`;
            }

            case 'mmddyy':
            {
                let newMonth = getMonth + 1;
                if (newMonth <= 9) newMonth = `0${newMonth}`;
                return `${newMonth}${getDate}${getYear.toString()[2]}${getYear.toString()[3]}`;
            }

            case 'mmyyyy':
            {
                let newMonth = getMonth + 1;
                if (newMonth <= 9) newMonth = `0${newMonth}`;
                return `${newMonth}${getYear}`;
            }

            default:
            {
                return `${monthsShort[getMonth]} ${getDate}, ${getYear}`;
            }
        }
    },

    formatTime: (time) =>
    {
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1)
        {
            time = time.slice (1);
            time[5] = +time[0] < 12 ? 'AM' : 'PM';
            time[0] = +time[0] % 12 || 12;
        }
        
        return time.join ('');
    },

    weekToday: () =>
    {
        const target = new Date();

        const dayNr = (target.getDay() + 6) % 7;

        target.setDate((target.getDate() - dayNr) + 3);

        const firstThursday = target.valueOf();

        target.setMonth(0, 1);

        if (target.getDay() !== 4)
        {
            target.setMonth(0, (1 + ((4 - target.getDay()) + 7)) % 7);
        }

        return 1 + Math.ceil((firstThursday - target) / 604800000);
    },

    rawToday: () =>
    {
        const today = new Date();
        const fullYear = today.getFullYear();
        const month = ((today.getMonth() + 1) < 10 ? `0${(today.getMonth() + 1)}` : (today.getMonth() + 1));
        const date = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();

        return `${fullYear}-${month}-${date}`;
    },

    rawTime: (format = 'H:i:s') =>
    {
        const today = new Date();
        
        let hours = today.getHours();
        let minutes = today.getMinutes();
        let seconds = today.getSeconds();

        hours = hours < 10 ? `0${hours}`: hours;
        minutes = minutes < 10 ? `0${minutes}`: minutes;
        seconds = seconds < 10 ? `0${seconds}`: seconds;

        switch(format)
        {
            case 'H:i:s':
            {
                return `${hours}:${minutes}:${seconds}`;
            }

            case 'H:i':
            {
                return `${hours}:${minutes}`;
            }

            default:
            {
                return `${hours}:${minutes}:${seconds}`;
            }
        }
    },

    rawDay: () =>
    {
        const today = new Date();
        const day = today.getDay();
        
        return daysFull[day].substr(0, 3);
    },

    displayTime: () =>
    {
        const today = new Date();
        return today.toLocaleString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    },

    secToDays: (seconds) =>
    {
        return Math.floor(Number(seconds) / (3600*24));
    },

    age: (date) =>
    {
        const today = new Date();
        var birthDate = new Date(date);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    },

    trim: (date) =>
    {
        if (date.length > 9)
        {
            return date.substr(0,10);
        }

        return date;
    },

    getYear: (date = '') =>
    {
        let currentDate = new Date(date?date:Dater.rawToday());

        return currentDate.getFullYear();
    },

    firstAndLastDateOfWeek: (customDate = null) =>
    {
        let date = new Date();

        if (customDate) date = new Date(customDate);

        let firstDay = (date.getDate() - date.getDay()) + 1;
        let lastDay = firstDay + 7;

        let firstDate = new Date(date.setDate(firstDay));
        let lastDate = new Date(date.setDate(lastDay));

        let firstRawDate = `${firstDate.getFullYear()}-`;
            firstRawDate += `${(firstDate.getMonth()+1) < 10 ? '0' + (firstDate.getMonth() + 1) : firstDate.getMonth() + 1}-`;
            firstRawDate += `${firstDate.getDate() < 10 ? '0' + firstDate.getDate() : firstDate.getDate()}`;

        let lastRawDate = `${lastDate.getFullYear()}-`;
            lastRawDate += `${(lastDate.getMonth()+1) < 10 ? '0' + (lastDate.getMonth() + 1) : lastDate.getMonth() + 1}-`;
            lastRawDate += `${lastDate.getDate()}`;

        return {
            firstDate: firstRawDate,
            lastDate: lastRawDate,
        }
    },

    firstAndLastDateOfMonth()
    {
        const date = new Date();
        let firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
        let lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        let firstRawDate = `${firstDate.getFullYear()}-`;
            firstRawDate += `${(firstDate.getMonth()+1) < 10 ? '0' + (firstDate.getMonth() + 1) : firstDate.getMonth() + 1}-`;
            firstRawDate += `${firstDate.getDate() < 10 ? '0' + firstDate.getDate() : firstDate.getDate()}`;

        let lastRawDate = `${lastDate.getFullYear()}-`;
            lastRawDate += `${(lastDate.getMonth()+1) < 10 ? '0' + (lastDate.getMonth() + 1) : lastDate.getMonth() + 1}-`;
            lastRawDate += `${lastDate.getDate()}`;

        return {
            firstDate: firstRawDate,
            lastDate: lastRawDate,
        }
    },

    addDays(days, startingDate = null)
    {
        let date = new Date(
            startingDate
                ? startingDate
                : Dater.rawToday()
        );

        date.setDate(date.getDate() + days);

        return Dater.format(date, 'yyyy-mm-dd');
    },

    isExpired(expirationDate, comparisonDate = '')
    {
        if (!comparisonDate) comparisonDate = Dater.rawToday();

        let eDate = new Date(expirationDate);
        let cDate = new Date(comparisonDate);

        return eDate < cDate;
    },

    getMonthName(currentDate = null, type = 'full')
    {
        let date = new Date(
            currentDate
                ? currentDate
                : Dater.rawToday()
        );

        let month = date.getMonth();

        return type == 'short'
            ? monthsShort[month]
            : monthsFull[month];
    }
};
