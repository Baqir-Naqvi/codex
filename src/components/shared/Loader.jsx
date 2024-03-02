import { Loader2 } from "lucide-react";

const Loader = ({message}) => {
  return (
    <div
      className="flex flex-col justify-center items-center h-screen w-full 
    bg-gray-100 fixed top-0 left-0 z-50 overflow-hidden opacity-75
  "
    >
      <Loader2
        size="50px"
        color="black"
        className="animate-spin duration-1000"
      />
        <p className="text-xl">{message}</p>
    </div>
  );
};

export default Loader;
