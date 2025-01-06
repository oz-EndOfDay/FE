import React from "react";
import Button from "@/components/ui/Button";

// Diary 목업 데이터 타입 정의
interface Diary {
  id: number;
  date: string;
  title: string;
  mood: "기쁨" | "좋음" | "보통" | "지침" | "슬픔";
  weather: "맑음" | "구름조금" | "흐림" | "비" | "눈";
  content: string;
}

// 목업 데이터
const Diaries: Diary[] = [
  {
    id: 1,
    date: "2025-01-01",
    title: "새해 첫날",
    mood: "기쁨",
    weather: "맑음",
    content:
      "새해가 밝았다. 주문진에 가서 해 뜨는 걸 보고 한정식을 먹고 돌아와서 회에 쐬주를 때렸다. 좋은 30살의 시작이었다.",
  },
  {
    id: 2,
    date: "2025-01-05",
    title: "테스트",
    mood: "지침",
    weather: "맑음",
    content: "테스트 중",
  },
  {
    id: 3,
    date: "2025-01-16",
    title: "프로젝트 마감",
    mood: "지침",
    weather: "맑음",
    content:
      "으아아아아아악. 말 줄임표 테스트를 해볼거다 텍스트가 두 줄이 넘으면 말 줄임표 기호가 떠야한다. 얍",
  },
  {
    id: 4,
    date: "2025-01-25",
    title: "여행 가고 싶다",
    mood: "보통",
    weather: "구름조금",
    content: "일본 가서 라멘이랑 규동이랑 돈까스 먹고 싶다.",
  },
  {
    id: 5,
    date: "2025-01-26",
    title: "바쁜 하루",
    mood: "지침",
    weather: "비",
    content: "바쁘다 바빠 현대사회",
  },
  {
    id: 6,
    date: "2025-01-26",
    title: "바쁜 하루2",
    mood: "지침",
    weather: "비",
    content: "바쁘다 바빠 현대사회",
  },
  {
    id: 7,
    date: "2025-01-26",
    title: "바쁜 하루3",
    mood: "지침",
    weather: "비",
    content: "바쁘다 바빠 현대사회",
  },
];

const DiaryRemoveTable: React.FC = () => {
  return (
    <div className=" bg-white p-10 w-full shadow-md rounded-md">
      <table>
        <thead className=" border-b-2">
          <tr>
            <th className="p-1">No</th>
            <th className="min-w-16">이미지</th>
            <th className="min-w-16">제목</th>
            <th className="min-w-16">내용</th>
            <th className="md:w-36 min-w-16 ">날짜</th>
            <th className="min-w-16 md:w-20">유형</th>
            <th className="min-w-16">복구</th>
          </tr>
        </thead>

        <tbody>
          {Diaries.map((diary, index) => (
            <tr key={diary.id}>
              <td className="text-center p-1">{index + 1}</td>
              <td className="p-4">
                <div className=" bg-gray md:w-20 md:h-20 h-14 w-14 rounded-md p-1"></div>
              </td>
              <td className=" p-2 font-bold">{diary.title}</td>
              <td className="text-ellipsis line-clamp-2 md:mt-10 mt-5">
                {diary.content}
              </td>
              <td className="text-center">{diary.date}</td>
              <td>
                <Button className="p-2" type="button" variant="sand">
                  복구
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DiaryRemoveTable;
