import SignupForm from "@/components/ui/SignupForm";
import React from "react";

const signUp = () => {
  return (
    <div className="flex items-center justify-center md:min-h-[calc(100vh-10rem)] overflow-hidden ">
      <SignupForm />
    </div>
  );
};

export default signUp;
