
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/carts");
        const data = response.data;

        const productQuantities = data.reduce((acc, cart) => {
          cart.products.forEach((product) => {
            const { productId, quantity } = product;
            if (!acc[productId]) acc[productId] = 0;
            acc[productId] += quantity;
          });
          return acc;
        }, {});

        const labels = Object.keys(productQuantities);
        const dataValues = Object.values(productQuantities);

        setChartData({
          labels,
          datasets: [
            {
              label: "Quantity of Products Purchased",
              data: dataValues,
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
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
    return (
      <div className="w-full max-w-xl mx-auto p-4 text-center">Loading...</div>
    );
  }

  return (
    <>
    <div className="w-full max-w-xl mx-auto p-4 rounded-lg shadow-lg base:h-24 bg-white">
      <h1 className="text-2xl font-semibold mb-3 text-left">Purchased Product</h1>
      <div className="relative h-80">
        <Bar
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
    </>
  );
};

export default BarChart;
