<template>
    <div>
        <small class="ap-text-bold" style="font-size: 14px;">{{day}} {{date}}</small>
        <h4 class="ap-text-bold ap-margin-remove">{{time}}</h4>
    </div>
</template>

<script>
import { Dater } from '@/utils';

export default
{
    props:
    {
        format:
        {
            type: String,
            default: 'D F d, Y H:i:s'
        }
    },

    created()
    {
        this.initialize();
    },

    data()
    {
        return {
            day: 'Mon',
            date: 'Jan 01, 1970',
            time: '00:00:00',
        };
    },

    methods:
    {
        initialize()
        {
            this.day = Dater.rawDay();
            this.date = Dater.format(Dater.rawToday());
            this.time = Dater.displayTime();

            setTimeout(() => {
                this.initialize();
            }, 500);
        },
    },
};
</script>
