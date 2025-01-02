import DoughnutChart from "@/components/ui/DoughnutChart";
import Heading from "@/components/ui/Heading";
import MainContentBox from "@/components/ui/MainContentBox";
import { ChartData } from "chart.js";

const main = () => {
  const data: ChartData<"doughnut"> = {
    labels: ["기쁨", "좋음", "보통", "지침", "슬픔"],
    datasets: [],
  };
  return (
    <div className="mt-8 flex flex-col gap-10 w-[100%]">
      <Heading
        tag="h1"
        className="text-center"
      >{`따봉맨님, 환영합니다!`}</Heading>

      <Heading
        tag="h3"
        className="text-center"
      >{`이번 달에 n개의 일기를 작성하셨네요. 계속해서 멋진 기록을 남겨주세요!`}</Heading>
      <br />
      <div className="flex gap-10 justify-between items-center w-full flex-col md:flex-row">
        <MainContentBox
          title="총 작성된 일기"
          data="50"
          description="지금까지 작성된 모든 기록"
        />
        <MainContentBox
          title="이번 달에 작성된 일기"
          data="12"
          description={`지난달 대비 n 증가`}
        />
        <MainContentBox
          title="가장 많이 작성한 요일"
          data="수요일"
          description={`평균 작성 횟수: n회/요일`}
        />
      </div>
      <DoughnutChart data={data} />
    </div>
  );
};

export default main;
