"use client";
import Modal from "@/components/ui/Modal";
import CloseModal from "@/components/ui/CloseModal";
import {EmotionAnalysisResponse} from "@/types/diary";

interface DiaryModalsProps {
    modalState: "confirm" | "success" | "mood" | "";
    onClose: () => void;
    onDeleteConfirm: () => void;
    analysisResult: EmotionAnalysisResponse | null;
    myNickname: string | undefined;
}

const DiaryModals = ({modalState, onClose, onDeleteConfirm, analysisResult, myNickname}: DiaryModalsProps) => {
    return (
        <>
            {modalState === "confirm" && (
                <Modal
                    title="일기를 삭제하시겠습니까?"
                    description="작성하신 일기는 7일 동안 보관 후 삭제됩니다."
                    onCancel={onClose}
                    onConfirm={onDeleteConfirm}
                    cancelText="취소"
                    confirmText="확인"
                />
            )}
            {modalState === "success" && (
                <Modal
                    title="일기가 삭제되었습니다"
                    description="삭제하신 일기는 내 정보 > 휴지통에서 보실 수 있으며, 7일 안에 복구 가능합니다."
                    onConfirm={onClose}
                    confirmText="확인"
                    confirmType={true}
                />
            )}
            {modalState === "mood" && (
                <CloseModal
                    title={`${myNickname}님의 감정분석`}
                    subTitle={`${myNickname}님에게 해주고 싶은말`}
                    subContent={analysisResult?.advice_analysis_result || "분석 결과가 없습니다."}
                    onClose={onClose}
                >
                    {analysisResult?.diary_analysis_result || "분석 결과가 없습니다."}
                </CloseModal>
            )}
        </>
    );
};

export default DiaryModals;
