"use client";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

import { useEffect, useState } from "react";

import { fetchEmotionData } from "@/hooks/useFetchEmotion";
import LoadingSpinner from "./LoadingSpinner";

ChartJS.register(ArcElement, Tooltip, Legend);

interface EmotionData {
  happy: number;
  good: number;
  normal: number;
  tired: number;
  sad: number;
}

const EmotionDoughnutChart = () => {
  const [emotionData, setEmotionData] = useState<EmotionData | null>(null);
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchEmotionData();
      if (data) {
        setEmotionData(data);
      }
    };
    loadData();
  }, []);
  if (!emotionData) {
    return <LoadingSpinner />;
  }

  const totalCount = Object.values(emotionData).reduce((a, b) => a + b, 0);

  const chartData: ChartData<"doughnut"> = {
    labels: ["기쁨", "좋음", "보통", "지침", "슬픔"],
    datasets: [
      {
        label: "감정 비율",
        data: [
          (emotionData.happy / totalCount) * 100,
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
