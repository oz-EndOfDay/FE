"use client";

import {userDeleteInfo} from "@/api/user";
import SmallButton from "./SmallButton";
import {useRouter} from "next/navigation";
import {useState} from "react";
import Modal from "./Modal";
import {deleteCookies} from "@/api/logout";
import {useDispatch} from "react-redux";
import {clearAuth} from "@/store/auth/authSlice";

export const UserDeleteButton = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);

    const handleLogout = async () => {
        try {
            await deleteCookies();
            dispatch(clearAuth());
        } catch (error) {
            console.error("쿠키 삭제 중 오류 발생:", error);
            alert("감사합니다.");
        }

        // 브라우저 로컬 데이터 삭제 및 리다이렉트는 항상 수행
        localStorage.clear();
        sessionStorage.clear();
    };

    const handleDelete = async () => {
        try {
            const response = await userDeleteInfo();
            if (!response) {
                throw new Error("사용자 정보를 받아오지 못했습니다. 다시 시도 해주세요.");
            }
            setModal2(true);
            setModal(false);
        } catch (Error) {
            console.error(Error);
        }
    };
    const handleCancel = () => {
        setModal(false);
    };
    const handleConfirm = () => {
        setModal2(false);
        handleLogout();
        router.push("/");
    };

    return (
        <>
            <SmallButton
                variant="text"
                onClick={() => setModal(true)}
            >
                회원탈퇴
            </SmallButton>
            {modal && (
                <Modal
                    title="정말로 회원을 탈퇴하시겠습니까?"
                    description="회원 탈퇴시 7일 후에 모든 데이터가 삭제됩니다."
                    onCancel={handleCancel}
                    onConfirm={handleDelete}
                    cancelText="취소"
                    confirmText="확인"
                />
            )}
            {modal2 && (
                <Modal
                    title="회원이 탈퇴되었습니다"
                    description="회원 탈퇴시 7일 후에 모든 데이터가 삭제됩니다."
                    onConfirm={handleConfirm}
                    confirmText="확인"
                    confirmType={true}
                />
            )}
        </>
    );
};
