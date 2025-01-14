import Heading from "@/components/ui/Heading";
import Image from "next/image";
import {DiaryListEntry} from "@/types/diary";

type DiaryItemProps = {
    data: DiaryListEntry;
    type?: string;
};

const DiaryItem: React.FC<DiaryItemProps> = ({data, type}) => {
    const dateString = data.write_date; // "2025-01-12"
    const dateObj = new Date(dateString);
    const dayOfWeek = dateObj.toLocaleDateString("en-US", {weekday: "short"});
    console.log(data);
    return type === "exchange" ? (
        <div className="relative flex items-center bg-white p-4 border-lightgray border rounded-xl">
            <div className="flex flex-shrink-0 border-lightgray flex-basis-auto relative border rounded-xl w-[3.75rem] h-[3.75rem]">
                <Image
                    src="/photo"
                    fill
                    className="object-contain"
                    alt="교환일기사진"
                />
            </div>
            <div
                className="pl-3"
                style={{maxWidth: "calc(100% - 60px)"}}
            >
                <Heading
                    tag="p"
                    className="font-semibold"
                >
                    작성자: {data.author === "Me" ? "나" : "친구"}
                </Heading>
                <Heading tag="p">{data.title}</Heading>
                <Heading
                    tag="p"
                    className="truncate"
                >
                    {data.content}
                </Heading>
            </div>
            <div className="absolute top-4 right-4">
                <Heading
                    tag="p"
                    className="text-sm text-gray"
                >
                    마지막 교환 날짜 : {data.write_date}
                </Heading>
            </div>
        </div>
    ) : (
        <div className="flex items-center bg-white p-3 border-lightgray border rounded-xl">
            <div className="flex flex-col border-lightgray justify-center items-center border rounded-xl w-[3.75rem] h-[3.75rem]">
                <span className="text-gray">{dayOfWeek}</span>
                <span className="text-gray">{data.write_date.slice(-2)}</span>
            </div>
            <div
                className="pl-3"
                style={{maxWidth: "calc(100% - 60px)"}}
            >
                <Heading
                    tag="p"
                    className="font-semibold"
                >
                    {data.title}
                </Heading>
                <p
                    className="truncate-content mt-1"
                    dangerouslySetInnerHTML={{__html: data.content}}
                ></p>
            </div>
        </div>
    );
};

export default DiaryItem;
