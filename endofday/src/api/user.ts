"use server";

import {cookies} from "next/headers";

export const getUserInfo = async () => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const cookieStore = cookies();
    const accessToken = cookieStore.get("access_token");

    const response = await fetch(`${API_BASE_URL}/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken?.value}`,
        },
        // credentials: "include",
    });

    if (!response.ok) {
        throw new Error(`회원 정보를 가져오는데 실패했습니다. Error: ${response.status} - ${response.statusText}`);
    }

    const userData = await response.json();
    console.log(userData);
    return userData;
};
