export const winningStatistics = {
  type: 'bar',
  data: {
    labels: ['Wins', 'Losses'],
    datasets: [
      {
        label: 'Statistics',
        data: [0, 0],
        backgroundColor: ['rgba(123, 239, 178, 1)', 'rgba(54,73,93,.5)'],
        borderColor: ['#36495d', '#36495d'],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    lineTension: 1,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            padding: 25,
          },
        },
      ],
    },
  },
};

export default winningStatistics;
