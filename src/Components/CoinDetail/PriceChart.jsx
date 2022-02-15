import styled from "styled-components";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { useData } from "../../context/dataContext";

ChartJS.register(...registerables);



const PriceChart = ({id, priceHistory}) => {

    console.log('from chart', priceHistory);
    const {timePeriod} = useData();

    const chartData = {
        labels: priceHistory.map(coin => {
            let date = new Date(coin.timestamp * 1000);
            let time = date.getHours() > 12 
            ? `${date.getHours() - 12}:${date.getMinutes()}PM`
            : `${date.getHours()}:${date.getMinutes()}AM`;
            return timePeriod === '24h' || timePeriod === '3h' ? time : date.toLocaleDateString();
        }),
        datasets: [{
            data: priceHistory.map(coin => coin.price),
            label: `Price in the past ${timePeriod}`,
            borderColor: '#eac100',
            borderWidth: 3,
            
        }]
    }

    const options = {
        elements: {
            point: {
                radius: 1
            },
        
        },

        plugins: {
            legend: {
                display: false
            }
        },

        scales: {
            y: {
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, ticks) {
                        return '$' + value;
                    }
                }}
        },

        animations: {
            borderColor: {
                type: 'color',
                from: '#eac100',
                to: '#665402',
                loop: true,
                duration: '400',
            }
        }
    }

  return (
      <ChartContainer>
            <Line data={chartData} options={options} />
    </ChartContainer>
  )
}

export default PriceChart;

const ChartContainer = styled.section`
    width: 100%;
    padding: 1rem;

    @media(max-width: 1000px) {
        margin-top: 20px;
    }
   
`