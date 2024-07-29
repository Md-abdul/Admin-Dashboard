import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        const data = response.data;

        const categoryCounts = data.reduce((acc, product) => {
          const category = product.category;
          if (!acc[category]) acc[category] = 0;
          acc[category]++;
          return acc;
        }, {});

        const labels = Object.keys(categoryCounts);
        const dataValues = Object.values(categoryCounts);

        setChartData({
          labels,
          datasets: [
            {
              label: "Number of Products",
              data: dataValues,
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0.2)",
              fill: false,
              tension: 0.1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!chartData) {
    return <div>Loading...</div>;
  }


  return (
    <div className="w-full max-w-xl mx-auto p-4 rounded-lg shadow-lg xl:mt-0 sm:mt-5 bg-white">
      <h1 className="text-2xl font-semibold mb-3 text-left">Total Products</h1>
      <div className="h-80">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top",
              },
              tooltip: {
                callbacks: {
                  label: function (tooltipItem) {
                    return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                  },
                },
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  color: "#333",
                },
              },
              y: {
                grid: {
                  color: "rgba(0, 0, 0, 0.1)",
                },
                ticks: {
                  color: "#333",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default LineChart;
