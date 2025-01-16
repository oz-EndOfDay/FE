"use client";
import Modal from "@/components/ui/Modal";
import {FriendItem} from "@/types/friend";

interface FriendModalsProps {
    modalState: "" | "confirm" | "success" | "alreadyExchanging" | "startExchange";
    onClose: () => void;
    onDeleteConfirm: () => void;
    onNavigateDiary: () => void;
    selectedFriend: FriendItem | null;
}

const FriendModals = ({modalState, onClose, onDeleteConfirm, onNavigateDiary, selectedFriend}: FriendModalsProps) => {
    return (
        <>
            {modalState === "confirm" && (
                <Modal
                    title="친구를 삭제하시겠습니까?"
                    description="친구 삭제시 교환일기의 모든 데이터가 삭제 됩니다."
                    onCancel={onClose}
                    onConfirm={onDeleteConfirm}
                    cancelText="취소"
                    confirmText="확인"
                />
            )}
            {modalState === "success" && (
                <Modal
                    title="친구삭제가 완료되었습니다"
                    description="삭제하신 일기는 내 정보 > 휴지통에서 보실 수 있으며, 7일 안에 복구 가능합니다."
                    onConfirm={onClose}
                    confirmText="확인"
                    confirmType={true}
                />
            )}
            {modalState === "alreadyExchanging" && (
                <Modal
                    title="이미 교환일기를 하고있는 친구네요!"
                    description={`${selectedFriend?.friend_nickname}님의 교환일기 리스트 페이지로 이동합니다.`}
                    onConfirm={onNavigateDiary}
                    confirmText="확인"
                    confirmType={true}
                />
            )}
            {modalState === "startExchange" && (
                <Modal
                    title={`${selectedFriend?.friend_nickname}님과 교환일기를 쓰러 가볼까요?`}
                    description="교환일기 작성 페이지로 이동합니다."
                    onConfirm={onNavigateDiary}
                    confirmText="확인"
                    confirmType={true}
                />
            )}
        </>
    );
};

export default FriendModals;
