import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import data from './assets/data/data.json';

const App = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (data && data[selectedCurrency]) {
      const exchangeRates = data[selectedCurrency].exchangeRates.map(rate => parseFloat(rate));
      const timestamps = data[selectedCurrency].timestamps.map(timestamp => new Date(timestamp).toLocaleDateString());
      const series = [{
        name: 'Exchange Rate',
        data: exchangeRates
      }];
      const options = {
        chart: {
          type: 'line',
          height: 350
        },
        xaxis: {
          categories: timestamps
        }
      };
      setChartData({ series, options });
    }
  }, [selectedCurrency]);

  return (
    <div>
      <div>
        <h2>{selectedCurrency}</h2>
        {chartData && <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />}
      </div>
      <div className="currencyInfo">
        {selectedCurrency && data[selectedCurrency] && (
          <div className={selectedCurrency.toLowerCase()}>
            <h1>{selectedCurrency}</h1>
            <span>{data[selectedCurrency].description}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
