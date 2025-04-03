export const Text = {
    
    initials: (firstWord = '', secondWord = '') => `${firstWord.charAt(0)}${secondWord.charAt(0)}`,

    formatSlug: (string) =>
    {
        const slug = string.split('-');

        return { full: slug, code: slug[0] };
    },
    
    joinClass: (...args) =>
    {
        let classnames = '';

        for (let i = 0; i < args.length; i++)
        {
            if (args[i])
            {
                classnames += (`${args[i]} `);
            }
        }
    
        return classnames;
    },

    formUrl: (query, path, page) =>
    {
        if (query && Object.keys(query).length > 0)
        {
            Object.keys(query).forEach((key, index) => {
                path += !index ? '?' : '&';

                if (key == 'page')
                {
                    path += `page=${page}`;
                }
                else
                {
                    path += `${key}=${query[key]}`;
                }
            });

            if (!path.includes('page=')) path += `&page=${page}`;
        }
        else
        {
            path += `?page=${page}`;
        }

        return path;
    },

    titleCase: (string) =>
    {
        return string.split(' ')
                .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
                .join(' ');
    },

    currency: (amount) =>
    {
        var currency = new Intl.NumberFormat('en', { 
            style: 'currency', 
            currency: 'PHP', 
            minimumFractionDigits: 2, 
        });

        return currency.format(amount);
    },

    wordToValidKey: (string, prefix = 'input') =>
    {
        string = string.toLowerCase();

        string = string.trim();

        string = string.replace(/\s/g, '_');

        return `${prefix}_${string}`;
    },

    commaSeparated: (amount) =>
    {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    readableCurrencyRoundOff:  (num, digits = 2) => 
    {
        const lookup = [
            { value: 1, symbol: '' },
            { value: 1e3, symbol: 'k' },
            { value: 1e6, symbol: 'M' },
            { value: 1e9, symbol: 'G' },
            { value: 1e12, symbol: 'T' },
            { value: 1e15, symbol: 'P' },
            { value: 1e18, symbol: 'E' }
        ];

        const regEx = /\.0+$|(\.[0-9]*[1-9])0+$/;

        var item = lookup.slice().reverse().find(function(item)
        {
            return num >= item.value;
        });
        
        return item ? (num / item.value).toFixed(digits).replace(regEx, '$1') + item.symbol : '0';
    },

    readableFileSizeRoundOff:  (num, digits = 2) => 
    {
        const lookup = [
            { value: 1, symbol: 'KB' },
            { value: 1e3, symbol: 'MB' },
            { value: 1e6, symbol: 'GB' },
            { value: 1e9, symbol: 'TB' },
            { value: 1e12, symbol: 'PB' },
            { value: 1e15, symbol: 'EB' },
            { value: 1e18, symbol: 'SB' }
        ];

        const regEx = /\.0+$|(\.[0-9]*[1-9])0+$/;

        var item = lookup.slice().reverse().find(function(item)
        {
            return num >= item.value;
        });
        
        return item ? (num / item.value).toFixed(digits).replace(regEx, '$1') + item.symbol : '0';
    },

    readableTimeRecording(value, format = 'hh:mm:ss')
    {
        value = Number(value);
        var hours = Math.floor(value / 3600);
        var minutes = Math.floor(value % 3600 / 60);
        var seconds = Math.floor(value % 3600 % 60);
    
        if (format == 'hh:mm:ss')
        {
            var hoursDisplay = hours == 0
                ? "00"
                : (hours <= 9 ? `0${hours}` : hours)
            var minutesDisplay = minutes == 0
                ? "00"
                : (minutes <= 9 ? `0${minutes}` : minutes);
            var secondsDisplay = seconds == 0
                ? "00"
                : (seconds <= 9 ? `0${seconds}` : seconds);
            
            return `${hoursDisplay}:${minutesDisplay}:${secondsDisplay}`;
        }
        else
        {
            var hoursDisplay = hours == 0
                ? "00"
                : (hours <= 9 ? `0${hours}` : hours)
            var minutesDisplay = minutes == 0
                ? "00"
                : (minutes <= 9 ? `0${minutes}` : minutes);
            var secondsDisplay = seconds == 0
                ? "00"
                : (seconds <= 9 ? `0${seconds}` : seconds);
            
            return `${hoursDisplay}:${minutesDisplay}:${secondsDisplay}`;
        }
    }

    
};
