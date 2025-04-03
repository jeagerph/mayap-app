
<script>
import { Line } from 'vue-chartjs'

export default
{
    extends: Line,
    props:
    {
        title:
        {
            type: String,
            default: 'Line Chart'
        },
        legends:
        {
            type: Array,
            default: [],
        },
        datasets:
        {
            type: Array,
            default: [
            {
                label: 'Sample',
                borderColor: '#228CDB',
                borderWidth: 3,
                fill: false,
                lineTension: 0,
                data: [
                    23,
                    16,
                    28,
                    123,
                    56,
                    21,
                ]
            },
            ]
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
                labels: this.legends,
                datasets: this.datasets
            },
            {
                responsive: true,
                maintainAspectRatio: false
            }
        );
    }
};
</script>
