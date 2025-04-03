<template>
    <span class="time">{{this.moment}}</span>
</template>


<script>
export default
{
    props:
    {
        datetime: String,

        color:
        {
            default: 'default',
        },
    },

    data()
    {
        return {
            moment: '',

            readable:
            {
                postfixes: {
                    '<': ' ago',
                    '>': ' from now',
                },
                1000: {
                    singular: 'a few moment',
                    plural: 'a few moments',
                },
                60000: {
                    singular: 'about a minute',
                    plural: '# minutes',
                },
                3600000: {
                    singular: 'about an hour',
                    plural: '# hours',
                },
                86400000: {
                    singular: 'a day',
                    plural: '# days',
                },
                604800000: {
                    singular: 'a week',
                    plural: '# weeks',
                },
                2419200000: {
                    singular: 'a month',
                    plural: '# months',
                },
                31540000000: {
                    singular: 'a year',
                    plural: '# years',
                },
            },
        };
    },

    computed:
    {
        exactDate()
        {
            const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const date = new Date(this.datetime);
            return `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
        },
    },

    created()
    {
        this.timeago();
    },

    methods:
    {
        timeago()
        {
            const $timespans = [1000, 60000, 3600000, 86400000, 604800000, 2419200000, 31540000000];

            const $parsedTime = Date.parse(this.datetime.replace(/-00:?00$/, ''));

            if ($parsedTime && Date.now())
            {
                const $timeAgo = $parsedTime - Date.now();
                const $diff = Math.abs($timeAgo);
                const $postfix = this.readable.postfixes[($timeAgo < 0) ? '<' : '>'];
                let $timespan = $timespans[0];

                for (let $i = 1; $i < $timespans.length; $i++)
                {
                    if ($diff > $timespans[$i])
                    {
                        $timespan = $timespans[$i];
                    }
                }

                const $n = Math.round($diff / $timespan);

                if ($timespan >= 86400000 && $n > 7)
                {
                    this.moment = this.exactDate;
                }
                else
                {
                    const x = this.readable[$timespan][$n > 1 ? 'plural' : 'singular'].replace('#', $n) + $postfix;

                    this.moment = x;
                }

                setTimeout(() =>
                {
                    this.timeago();
                },
                10000);
            }
        },
    },
};
</script>
