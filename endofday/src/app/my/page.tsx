import MyPageForm from "@/components/ui/MyPageForm";
import React from "react";

const myPage = () => {
  return (
    <div className="flex items-center justify-center md:min-h-[calc(100vh-10rem)] overflow-hidden ">
      <MyPageForm />
    </div>
  );
};

export default myPage;
