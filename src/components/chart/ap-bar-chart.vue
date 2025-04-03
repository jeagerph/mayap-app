<script>
import { Bar } from 'vue-chartjs'

export default
{
    extends: Bar,
    props:
    {
        title:
        {
            type: String,
            default: 'Bar Chart'
        },
        xLegends:
        {
            type: Array,
            default: []
        },
        yLegends:
        {
            type: Array,
            default: []
        },

        backgroundColor:
        {
            type: Array,
            default: () => [
                '#228CDB',
                '#26CC6E',
                '#FF9E0F',
                '#00C5CE',
            ]
        },
        singleColorOnly:
        {
            type: Boolean,
            default: true,
        },

        borderWidth:
        {
            type: Number,
            default: 1,
        },
    },

    mounted()
    {
        this.renderChart(
            {
                labels: this.xLegends,
                datasets:
                [
                    {
                        label: this.title,
                        borderWidth: this.borderWidth,
                        backgroundColor: this.singleColorOnly
                            ? '#228CDB'
                            : this.backgroundColor,
                        data: this.yLegends
                    }
                ]
            },
            {
                scales:
                {
                    yAxes:
                    [
                        {
                            ticks:
                            {
                                beginAtZero: true,
                            },
                            gridLines:
                            {
                                display: true,
                            },
                        },
                    ],
                    xAxes:
                    [
                        {
                            gridLines:
                            {
                                display: false,
                            },
                        },
                    ],
                },
                legend:
                {
                    display: true,
                },
                responsive: true,
                maintainAspectRatio: false
            }
        );
    }
};
</script>
