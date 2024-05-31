import { ApexOptions } from 'apexcharts';
const lineChart: any = {
    series: [
        {
            name: 'Tổng Khách hàng ', // total customer in that month
            data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
            offsetY: 0,
        },
    ],

    options: {
        chart: {
            width: '100%',
            height: 350,
            type: 'area',
            toolbar: {
                show: false,
            },
        },

        legend: {
            show: false,
        },

        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
        },

        yaxis: {
            labels: {
                style: {
                    fontSize: '14px',
                    fontWeight: 600,
                    colors: ['#8c8c8c'],
                },
            },
        },

        xaxis: {
            labels: {
                style: {
                    fontSize: '14px',
                    fontWeight: 600,
                    colors: [
                        '#8c8c8c',
                        '#8c8c8c',
                        '#8c8c8c',
                        '#8c8c8c',
                        '#8c8c8c',
                        '#8c8c8c',
                        '#8c8c8c',
                        '#8c8c8c',
                        '#8c8c8c',
                    ],
                },
            },
            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        },

        tooltip: {
            y: {
                formatter: function (val: any) {
                    return val;
                },
            },
        },
    },
};

export default lineChart;
