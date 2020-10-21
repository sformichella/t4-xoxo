import { renderHeader } from '../header/header.js';
import { getFromLocalStorage } from '../utils.js';

renderHeader();

const chartWins = getFromLocalStorage('Wins');
const chartLosses = getFromLocalStorage('Losses');
const chartCats = getFromLocalStorage('Cats');
const labels = ['Wins', 'Losses', 'Cats'];
const chartData = [chartWins, chartLosses, chartCats];
const mainChart = document.getElementById('myChart');
const histogramChart = document.getElementById('histogram');
const noData = document.getElementById('no-data');
const h2Tags = document.getElementsByClassName('titles');
const nextContent = document.getElementById('next-content');


let ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {         //eslint-disable-line
    type: 'pie',
    data: {
        labels: labels,
        datasets: [{
            label: 'Count of Games',
            data: chartData,
            backgroundColor: [
                'rgba(255, 255, 0, 0.5)',
                'rgba(255, 0, 0, 0.5)',
                'rgba(0, 255, 255, 0.5)',
            ],
            borderColor: [
                'rgba(255, 255, 0, 1)',
                'rgba(255, 0, 0, 1)',
                'rgba(0, 255, 255, 1)',
            ],
            borderWidth: 5
        }]
    },
    options: {
        scales: {
        }
    }
});

//Building data structures for histogram of turns/game
const movesPerGame = ['0-Turn', '1-Turn', '2-Turn', '3-Turn', '4-Turn', '5-Turn', '6-Turn', '7-Turn', '8-Turn', '9-Turn'];
let moveCounter = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const mostRecentRound = getFromLocalStorage('roundsData');

mostRecentRound.forEach(round => {
    const mostRecentBoard = round.board;
    let movesPerSingleGame = 0;
    mostRecentBoard.forEach(singleGame => {
        if (singleGame.player === 'computer' || singleGame.player === 'player') {
            movesPerSingleGame += 1;
        }
    });
    moveCounter[movesPerSingleGame] += 1;
});


//if statement to increment index based on
let histogram = document.getElementById('histogram').getContext('2d');
var myChartHistogram = new Chart(histogram, {         //eslint-disable-line
    type: 'bar',
    data: {
        labels: movesPerGame,
        datasets: [{
            label: 'Count of Games',
            data: moveCounter,
            backgroundColor: [
                'rgba(255, 255, 0, 0.5)',
                'rgba(255, 0, 0, 0.5)',
                'rgba(0, 255, 255, 0.5)',
                'rgba(255, 255, 0, 0.5)',
                'rgba(255, 0, 0, 0.5)',
                'rgba(0, 255, 255, 0.5)',
                'rgba(255, 255, 0, 0.5)',
                'rgba(255, 0, 0, 0.5)',
                'rgba(0, 255, 255, 0.5)',
                'rgba(255, 255, 0, 0.5)'
            ],
            borderColor: [
                'rgba(255, 255, 0, 1)',
                'rgba(255, 0, 0, 1)',
                'rgba(0, 255, 255, 1)',
                'rgba(255, 255, 0, 1)',
                'rgba(255, 0, 0, 1)',
                'rgba(0, 255, 255, 1)',
                'rgba(255, 255, 0, 1)',
                'rgba(255, 0, 0, 1)',
                'rgba(0, 255, 255, 1)',
                'rgba(255, 255, 0, 1)'
            ],
            borderWidth: 5
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


//Handing no data
if (chartLosses === null && chartWins === null && chartCats === null) {
    //if no data, hide chart, display instructions to play game
    mainChart.style.display = 'none';
    histogramChart.style.display = 'none';
    h2Tags[0].style.display = 'none';
    h2Tags[1].style.display = 'none';
    nextContent.style.display = 'none';
    noData.textContent = 'Click \'Reset\' and play some games to populate game history.';
}

