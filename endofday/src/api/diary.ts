const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 일기 전송
export const sendDiary = async (formData: FormData): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/diary`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
    } catch (error) {
        console.error("일기 전송 실패:", error);
        throw new Error("Failed to write diary");
    }
};
