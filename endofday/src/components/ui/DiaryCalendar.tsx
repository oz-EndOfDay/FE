"use client";
import Heading from "@/components/ui/Heading";
import React, { useState } from "react";
import Calendar from "react-calendar";
import { IoClose } from "react-icons/io5";
import "@/styles/calendar.css";

// Diary 목업 데이터 타입 정의
interface Diary {
  date: string;
  title: string;
  mood: "기쁨" | "좋음" | "보통" | "지침" | "슬픔";
  weather: "맑음" | "구름조금" | "흐림" | "비" | "눈";
  content: string;
}

// 목업 데이터
const mockDiaries: Diary[] = [
  {
    date: "2025-01-01",
    title: "새해 첫날",
    mood: "기쁨",
    weather: "맑음",
    content:
      "새해가 밝았다. 주문진에 가서 해 뜨는 걸 보고 한정식을 먹고 돌아와서 회에 쐬주를 때렸다. 좋은 30살의 시작이었다.",
  },
  {
    date: "2025-01-05",
    title: "테스트",
    mood: "지침",
    weather: "맑음",
    content: "테스트 중",
  },
  {
    date: "2025-01-16",
    title: "프로젝트 마감",
    mood: "지침",
    weather: "맑음",
    content:
      "으아아아아아악. 말 줄임표 테스트를 해볼거다 텍스트가 두 줄이 넘으면 말 줄임표 기호가 떠야한다. 얍",
  },
  {
    date: "2025-01-25",
    title: "여행 가고 싶다",
    mood: "보통",
    weather: "구름조금",
    content: "일본 가서 라멘이랑 규동이랑 돈까스 먹고 싶다.",
  },
  {
    date: "2025-01-26",
    title: "바쁜 하루",
    mood: "지침",
    weather: "비",
    content: "바쁘다 바빠 현대사회",
  },
  {
    date: "2025-01-26",
    title: "바쁜 하루2",
    mood: "지침",
    weather: "비",
    content: "바쁘다 바빠 현대사회",
  },
  {
    date: "2025-01-26",
    title: "바쁜 하루3",
    mood: "지침",
    weather: "비",
    content: "바쁘다 바빠 현대사회",
  },
];

const DiaryCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // 선택된 날짜의 일기들 가져오기
  const selectedDateDiaries = selectedDate
    ? mockDiaries.filter(
        (diary) =>
          new Date(diary.date).toDateString() === selectedDate.toDateString()
      )
    : [];

  // 날짜 타일에 표시할 내용
  const getTileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const diaries = mockDiaries.filter(
        (d) => new Date(d.date).toDateString() === date.toDateString()
      );

      return diaries.length > 0 ? (
        <div className=" flex flex-col gap-1 md:text-nowrap overflow-hidden m-2 items-start md:p-4 p-1 md:text-md text-sm font-semibold border md:h-[110px] h-[60px] min-w-8 border-lightgray rounded-md text-gray">
          {diaries.map((diary, index) => (
            <p className="line-clamp-1" key={index}>
              {diary.title}
            </p>
          ))}
        </div>
      ) : (
        <div className="text-md text-nowrap m-2 border md:h-[110px] h-[60px] min-w-8 border-lightgray rounded-md "></div>
      );
    }
    return null;
  };

  // 날짜 타일의 스타일 지정
  const getTileClassName = ({ date }: { date: Date }) => {
    const day = date.getDay(); // 요일 (0=일요일, 6=토요일)
    if (day === 0) return "text-red-500"; // 일요일
    if (day === 6) return "text-blue-500"; // 토요일
    return "";
  };

  // 모달 열기
  const openModal = () => setModalOpen(true);

  // 모달 닫기
  const closeModal = () => setModalOpen(false);
  return (
    <div className="flex flex-col items-center w-full gap-10  p-6">
      <Heading tag="h1">나의 기록</Heading>
      <div className=" shadow-md rounded-[20px] ">
        <Calendar
          onChange={(value) => {
            setSelectedDate(value as Date);
            openModal();
          }}
          locale="ko" //없으면 오류남
          value={selectedDate}
          tileContent={getTileContent}
          tileClassName={getTileClassName}
          calendarType="gregory" // 일요일 시작
          formatDay={(locale, date) =>
            date.toLocaleString("en", { day: "numeric" })
          } // ~일 없애기
        />
      </div>

      {/* 모달 */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
            <div>
              <div className="flex justify-between items-center gap-4">
                <h2 className="text-xl font-semibold">
                  {new Intl.DateTimeFormat("en", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }).format(selectedDate!)}{" "}
                  일기
                </h2>
                <button
                  className=" text-gray-500 hover:text-gray-800 pb-2"
                  onClick={closeModal}
                >
                  <IoClose size={25} />
                </button>
              </div>
              {selectedDateDiaries.length > 0 ? (
                <ul className="space-y-2">
                  {selectedDateDiaries.map((diary, index) => (
                    <li
                      key={index}
                      className="p-2 border border-lightgray rounded cursor-pointer hover:bg-gray-100 flex  items-center gap-5"
                    >
                      <div className=" w-[70px] h-[70px] bg-lightgray rounded-lg flex-shrink-0 text-center"></div>
                      <div>
                        <p className="font-semibold">{diary.title}</p>
                        <p className="text-ellipsis line-clamp-2">
                          {diary.content}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex justify-center items-center h-20 ">
                  <p>작성한 일기가 없습니다.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiaryCalendar;
