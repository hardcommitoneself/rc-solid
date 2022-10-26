import Chart, { ChartData, ChartTooltipItem } from 'chart.js';
import { createEffect, onMount } from 'solid-js';
import 'chartjs-plugin-labels';
import { JackpotDeposit } from 'src/store/jackpot';
import { priceFormatter } from 'src/utils';

//Chart?.defaults?.global?.elements?.arc?.borderWidth = 0;

type WheelProps = {
    deposits: JackpotDeposit[];
}

const Wheel = (props: WheelProps) => {
    let canvasElement: HTMLCanvasElement | undefined;
    let chart: Chart | undefined;

    onMount(() => {
        if (canvasElement) {
            let ctx = canvasElement.getContext('2d');
            if (!ctx) return;

            let options = {
                cutoutPercentage: 75,
                responsive: true,
                legend: {
                    display: false,
                },
                animation: {
                    animateScale: false,
                    animateRotate: true,
                },
                tooltips: {
                    xPadding: 5,
                    displayColors: false,
                    callbacks: {
                      label: function (tooltipItem: ChartTooltipItem, data: ChartData) {
                        // @ts-ignore
                        return data.labels[tooltipItem.index];
                      },
                    },
                },
                elements: {
                    arc: {
                        borderWidth: 0
                    }
                }
            };

            let data = {
                datasets: [
                    {
                        data: [100],
                        backgroundColor: ['#1d2134'],
                        borderColor: '#1d2134',
                    },
                ],
            };

            chart = new Chart(ctx, {
                type: 'doughnut',
                data: data,
                options: options,
            });
        }
    });

    createEffect(() => {
        let dataSet = [],
            colorSet = [],
            labelSet = [],
            imgSet = [],
            totalItems = 0,
            totalValue = 0;

        if (props.deposits.length > 0) {
            /*
            let deposits = props.deposits.sort(function (a, b) {
                return b.id - a.id;
            });
            */

            for (const deposit of props.deposits) {
                totalValue += deposit.value;
                totalItems += deposit.items.length;
                imgSet.push({
                    src: `https://avatars.steamstatic.com/${deposit.profile.avatar}_full.jpg`,
                    width: 24,
                    height: 24,
                });
                labelSet.push(`${deposit.profile.username} - ${priceFormatter.format(deposit.value / 100)}`);
                colorSet.push(deposit.color);
                dataSet.push(deposit.value);
            }
        } else {
            dataSet.push(1e3);
            colorSet.push('#1d2134');
            labelSet.push('empty');
        }

        if (chart) {
            chart.data = {
                datasets: [
                    {
                        data: dataSet,
                        backgroundColor: colorSet,
                        borderColor: '#1d2134',
                    },
                ],

                labels: labelSet,
            };

            chart.options.plugins = {
                labels: {
                    render: 'image',
                    images: imgSet,
                },
            };

            chart.update();
        }
    });

    return (
        <div class="w-full max-w-md flex-shrink-0">

            <div>
                <canvas ref={canvasElement} width="99%" height="100%" />
            </div>
        </div>
    );
};

export default Wheel;