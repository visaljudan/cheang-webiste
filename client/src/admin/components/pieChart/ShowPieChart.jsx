import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { useEffect } from "react";
Chart.register(ArcElement);

const PeiChart = () => {
  useEffect(() => {
    const dataList = {
      labels: ["Female", "Male"],
      datasets: [
        {
          data: [40, 60], // Replace these values with your actual data
          backgroundColor: ["#FF6384", "#36A2EB"], // Customize colors as needed
          hoverBackgroundColor: ["#ff7f00", "#ff7f00"],
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          display: false,
        },
      },
    };
  });

  return (
    <div className="pei-container">
      <Pie data={dataList} options={options} />
    </div>
  );
};

export default PeiChart;
