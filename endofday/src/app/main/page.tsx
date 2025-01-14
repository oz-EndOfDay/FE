"use client";
import EmotionDoughnutChart from "@/components/ui/EmotionDoughnutChart";
import Heading from "@/components/ui/Heading";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import MainContentBox from "@/components/ui/MainContentBox";
import { useFetchDiary } from "@/hooks/useDiary";
import { RootState } from "@/store/store";

import { useSelector } from "react-redux";

type DiaryItem = {
  id: number;
  title: string;
  write_date: string;
  content: string;
};

type ApiResponse = {
  items: DiaryItem[];
  page: number;
  pages: number;
  size: number;
  total: number;
};

const Main = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const { data, isPending, error } = useFetchDiary({
    size: 100,
  });

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (error) {
    console.error("다이어리 데이터 요청에 실패했습니다.", error);
  }

  if (!data || !data.items || data.items.length === 0) {
    return (
      <div className="mt-8 flex flex-col gap-10 ">
        <Heading tag="h1" className="text-center">
          {`${userInfo?.nickname}님, 환영합니다!`}
        </Heading>

        <Heading tag="h3" className="text-center">
          {"아직 작성하신 일기가 없습니다. 첫 번째 일기를 작성해보세요!"}
        </Heading>

        <br />
        <div className="flex gap-10 justify-center items-center w-full flex-col md:flex-row">
          <MainContentBox
            title="총 작성된 일기"
            data="0"
            description="지금까지 작성한 모든 기록"
          />
          <MainContentBox
            title="이번 달에 작성된 일기"
            data="0"
            description="지난달 대비 + 0 증가"
          />
        </div>
        <Heading tag="h1" className="text-center">
          일기를 통해 본 나의 감정 흐름
        </Heading>

        <div className="flex flex-col gap-16 justify-center items-center ">
          <div className="md:mt-60 mt-auto md:text-xl">
            {"작성된 일기가 없어 분석 데이터를 제공할 수 없습니다."}
          </div>
        </div>
      </div>
    );
  }
  // 특정 월의 일기 개수를 계산하는 함수
  const countDiariesByMonth = (
    data: ApiResponse,
    year: number,
    month: number
  ): number => {
    const diariesForMonth = data.items.filter((item) => {
      const writeDate = new Date(item.write_date);
      return writeDate.getFullYear() === year && writeDate.getMonth() === month;
    });

    return diariesForMonth.length;
  };

  // 이번 달과 지난달의 일기 개수 차이를 계산하는 함수
  const calculateMonthlyDifference = (
    data: ApiResponse | undefined
  ): string => {
    if (!data) return "데이터가 없습니다."; // 데이터가 없으면 메시지 반환

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    // 이번 달 일기 개수
    const thisMonthCount = countDiariesByMonth(data, currentYear, currentMonth);

    // 지난달 일기 개수
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1; // 0월이면 11월(작년 12월)
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const lastMonthCount = countDiariesByMonth(data, lastMonthYear, lastMonth);

    // 차이 계산
    const difference = thisMonthCount - lastMonthCount;

    if (difference > 0) {
      return `지난달대비 + ${difference} 증가`;
    } else if (difference < 0) {
      return `지난달 대비 ${difference} 감소`;
    } else {
      return "지난달과 동일합니다.";
    }
  };

  // 계산된 값들
  const monthlyDifferenceMessage = calculateMonthlyDifference(data);
  const diariesThisMonthCount = data
    ? countDiariesByMonth(data, new Date().getFullYear(), new Date().getMonth())
    : 0;

  return (
    <div className="mt-8 flex flex-col gap-10 ">
      <Heading
        tag="h1"
        className="text-center"
      >{`${userInfo?.nickname}님, 환영합니다!`}</Heading>

      <Heading
        tag="h3"
        className="text-center"
      >{`이번 달에 ${diariesThisMonthCount}개의 일기를 작성하셨네요. 계속해서 멋진 기록을 남겨주세요!`}</Heading>
      <br />
      <div className="flex gap-10 justify-center items-center w-full flex-col md:flex-row">
        <MainContentBox
          title="총 작성된 일기"
          data={`${data?.total}`}
          description="지금까지 작성한 모든 기록"
        />
        <MainContentBox
          title="이번 달에 작성된 일기"
          data={`${diariesThisMonthCount}`}
          description={monthlyDifferenceMessage}
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
    </div>
  );
};

export default Main;
