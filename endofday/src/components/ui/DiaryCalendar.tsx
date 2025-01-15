"use client";
import Heading from "@/components/ui/Heading";
import React, { useState } from "react";
import Calendar from "react-calendar";
import { IoClose } from "react-icons/io5";
import "@/styles/calendar.css";
import LoadingSpinner from "./LoadingSpinner";
import { useFetchDiary } from "@/hooks/useDiary";
import { useRouter } from "next/navigation";

const DiaryCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { data, isPending, error } = useFetchDiary({});
  const router = useRouter();
  if (isPending) {
    return <LoadingSpinner />;
  }

  if (error) {
    console.error("다이어리 데이터 요청에 실패했습니다.", error);
  }

  if (!data || !data.items || data.items.length === 0) {
    return <div>{"데이터가 없습니다."}</div>;
  }

  // 선택된 날짜의 일기들 가져오기
  const selectedDateDiaries = selectedDate
    ? data.items.filter(
        (items) =>
          new Date(items.write_date).toDateString() ===
          selectedDate.toDateString()
      )
    : [];

  // 날짜 타일에 표시할 내용
  const getTileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const diaries = data.items.filter(
        (d) => new Date(d.write_date).toDateString() === date.toDateString()
      );

      return diaries.length > 0 ? (
        <div className=" flex flex-col gap-1 md:text-nowrap overflow-hidden m-2 items-start md:p-4 p-1 md:text-md text-sm font-semibold border md:h-[110px] h-[60px] min-w-8 border-lightgray rounded-md text-gray">
          {diaries.map((items, id) => (
            <p className="whitespace-nowrap truncate max-w-24" key={id}>
              {items.title}
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
                  {new Intl.DateTimeFormat("ko", {
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
                  {selectedDateDiaries.map((diary, id) => (
                    <li
                      key={id}
                      onClick={() => router.push(`/diary/${diary.id}`)}
                      className="p-2 border border-lightgray rounded cursor-pointer hover:bg-gray-100 flex  items-center gap-5"
                    >
                      <div className="flex h-full w-full">
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
