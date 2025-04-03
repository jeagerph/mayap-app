<script>
import { Doughnut } from 'vue-chartjs'

export default
{
    extends: Doughnut,
    props:
    {
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
                        borderWidth: this.borderWidth,
                        backgroundColor: this.backgroundColor,
                        data: this.yLegends
                    }
                ]
            },
            {
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
