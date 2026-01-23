import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// REQUIRED registration
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const Trendchart = () => {
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    axios
      .get("https://smart-review-backend.onrender.com/drawChart")
      .then((res) => {
        setDataChart(res.data.data);
      })
      .catch((error) => {
        console.log("Chart API error:", error.message);
      });
  }, []);

  const chartData = {
    labels: dataChart.map(item =>
  new Date(item._id).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short"
  })
),
    datasets: [
      {
        label: "Reviews per Day",
        data: dataChart.map(item => item.count),
        borderColor: "#0d6efd",
        backgroundColor: "rgba(13,110,253,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className="card p-3 shadow-sm" style={{height:"280px"}}>
      <h4 className="mb-3">📈 Review Trend</h4>

      {dataChart.length === 0 ? (
        <p>No chart data available</p>
      ) : (
        <Line data={chartData}
        
        options={{
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 }
      }
    }
  }}
        
        
        />
      )}
    </div>
  );
};

export default Trendchart;
