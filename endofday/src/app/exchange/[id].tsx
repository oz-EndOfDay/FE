import {useRouter} from "next/router";

export default function ExchangeDiaryDetail() {
    const router = useRouter();
    const {id} = router.query; // URL에서 id 추출

    return (
        <div>
            <h1>Diary Detail</h1>
            <p>Diary ID: {id}</p>
            {/* 데이터를 불러와 표시 */}
            {/* <p>{diary.content}</p> */}
        </div>
    );
}
