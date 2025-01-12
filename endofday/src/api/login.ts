"use server";

import {LoginFormData} from "@/utils/registrationSchema";
import {cookies} from "next/headers";

export const login = async (data: LoginFormData) => {
    const cookieStore = await cookies();

    const response = await fetch("https://endofday.store/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const token = await response.json();
    cookieStore.set("accessToken", token.access_token, {
        httpOnly: true,
        secure: true,
    });
    cookieStore.set("refreshToken", token.refresh_token, {
        httpOnly: true,
        secure: true,
    });

    return token;
};
