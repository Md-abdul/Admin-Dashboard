import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const UserPieChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/users");
        const data = response.data;

        const cityCounts = data.reduce((acc, user) => {
          const city = user.address.city;
          if (!acc[city]) acc[city] = 0;
          acc[city]++;
          return acc;
        }, {});

        const labels = Object.keys(cityCounts);
        const dataValues = Object.values(cityCounts);

        setChartData({
          labels,
          datasets: [
            {
              label: "Users per City",
              data: dataValues,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
                "#FFCD56",
                "#36A2EB",
                "#4BC0C0",
                "#FF6384",
              ],
              hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
                "#FFCD56",
                "#36A2EB",
                "#4BC0C0",
                "#FF6384",
              ],
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
      <div className="w-full max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full sm:w-full md:w-[30rem] max-w-xl mx-auto p-4 bg-white rounded-lg shadow-lg xl:h-[21rem] mb-5">
      <div className="flex justify-center">
        <div className="h-48 md:h-60 lg:h-80">
          <Pie data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default UserPieChart;
