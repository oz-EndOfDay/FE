"use client";
import EmotionDoughnutChart from "@/components/ui/EmotionDoughnutChart";
import Heading from "@/components/ui/Heading";
import Input from "@/components/ui/Input";
import MainContentBox from "@/components/ui/MainContentBox";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const Main = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  return (
    <div className="mt-8 flex flex-col gap-10 ">
      <Heading
        tag="h1"
        className="text-center"
      >{`${userInfo?.nickname}님, 환영합니다!`}</Heading>

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
          description={`지난달 대비 +3 증가`}
        />
        <MainContentBox
          title="가장 많이 작성한 요일"
          data="수요일"
          description={`평균 작성 횟수: 2.3회/요일`}
        />
      </div>
      <br />
      <Heading tag="h1" className="text-center">
        일기를 통해 본 나의 감정 흐름
      </Heading>

      <div className="flex flex-col gap-16 justify-center items-center ">
        <div className="md:h-[700px] md:w-[700px] h-[300px] w-[300px]">
          <EmotionDoughnutChart />
        </div>
      </div>
      <Input
        id="week_select"
        label="주 선택"
        type="text"
        placeholder="주 선택"
      />
      <Input
        id="month_select"
        label="월 선택"
        type="text"
        placeholder="월 선택"
      />
    </div>
  );
};

export default Main;
