import { Loader2 } from "lucide-react";

const Loader = ({ message }) => {
  return (
    <div
      className="flex flex-col items-center justify-center w-full h-full text-center" >
      <Loader2
        size="50px"
        color="black"
        className="animate-spin duration-1000 absolute top-1/2 left-1/2"
      />
      <p className="text-xl text-black">{message}</p>
    </div>
  );
};

export default Loader;
