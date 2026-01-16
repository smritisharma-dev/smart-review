import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const StatusPieChart = ({ data }) => {
  const chartData = {
    labels: ["Pending", "Approved", "Rejected"],
    datasets: [
      {
        data: [data.pending, data.approved, data.rejected],
        backgroundColor: ["yellow", "green", "red"],
        borderWidth: 1
      }
    ]
  };

  return (
    <div style={{ width: "250px",height:"250px" , margin: "auto" }}>
      <h6 className="text-center">Review Status</h6>
      <Pie data={chartData} />
    </div>
  );
};

export default StatusPieChart;
