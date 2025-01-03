"use client";
import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface EmotionData {
  joy: number;
  good: number;
  normal: number;
  tired: number;
  sad: number;
}

const EmotionDoughnutChart: React.FC = () => {
  //useEffect를 통해 데이터 불러올 예정
  const [emotionData] = useState<EmotionData>({
    joy: 12,
    good: 8,
    normal: 5,
    tired: 3,
    sad: 2,
  });

  const totalCount = Object.values(emotionData).reduce((a, b) => a + b, 0);

  const chartData: ChartData<"doughnut"> = {
    labels: ["기쁨", "좋음", "보통", "지침", "슬픔"],
    datasets: [
      {
        label: "감정 비율",
        data: [
          (emotionData.joy / totalCount) * 100,
          (emotionData.good / totalCount) * 100,
          (emotionData.normal / totalCount) * 100,
          (emotionData.tired / totalCount) * 100,
          (emotionData.sad / totalCount) * 100,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,

    plugins: {
      legend: {
        position: "top",
      },
    },
    cutout: "50%",
  };

  return <Doughnut data={chartData} options={options} />;
};

export default EmotionDoughnutChart;
