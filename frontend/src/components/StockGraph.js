import { Bar, HorizontalBar } from "react-chartjs-2";

function StockGraph({ gameState }) {

  const data = {
    labels: gameState.regions.map((x, i) => "region " + (i + 1)),
    datasets: [
      {
        label: 'Stock',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: gameState.regions.map((x, i) => x.stock),
      },
    ],
  };

  return (
    <div className="stockgraph">
      <HorizontalBar
        data={data}
        options={{
          responsive: true,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                maintainAspectRatio: false
              }
            }]
          }
        }}
      />
    </div>
  );
}

export default StockGraph;