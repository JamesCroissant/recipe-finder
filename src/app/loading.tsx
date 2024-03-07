'use client'
import { FadeLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex justify-center my-16">
      <FadeLoader color="#22c55e" />
    </div>
  );
};

export default Loading