import SignupForm from "@/components/ui/SignupForm";
import React from "react";

const SignUp = () => {
  return (
    <>
      <div className=" w-[90vw] h-[100vh] flex flex-col justify-center items-center gap-10">
        <SignupForm />
      </div>
    </>
  );
};

export default SignUp;
