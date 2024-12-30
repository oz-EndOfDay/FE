import {useRouter} from "next/router";

export default function DiaryDetail() {
    const router = useRouter();
    const {id} = router.query; // URL에서 id 추출

    // 데이터 가져오기 (예: API 호출로 다이어리 데이터 로드)
    // const diary = fetchDiaryById(id); // 실제 구현 필요

    return (
        <div>
            <h1>Diary Detail</h1>
            <p>Diary ID: {id}</p>
            {/* 데이터를 불러와 표시 */}
            {/* <p>{diary.content}</p> */}
        </div>
    );
}
