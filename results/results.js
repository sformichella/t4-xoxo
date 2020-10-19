import { renderHeader } from '../header/header.js';
import { wins, losses, ties } from '../data/data.js';
import arrayOfRounds from '../data/data.js';

renderHeader();

const chartWins = wins;
const chartLosses = losses;
const chartTies = ties;
const labels = ['Wins', 'Losses', 'Ties'];
const chartData = [chartWins, chartLosses, chartTies];

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {                        //eslint-disable-line
    type: 'pie',
    data: {
        labels: labels,
        datasets: [{
            label: '# of Votes',
            data: chartData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
