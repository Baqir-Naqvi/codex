// const pageLoader = () => {
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
//     </div>
//   );
// };

// export default pageLoader;

import { Loader2 } from "lucide-react";

const pageLoader = ({ message }) => {
  return (
    <div
      className="flex flex-col justify-center items-center h-screen w-full 
    bg-gray-100 fixed top-0 left-0 z-50 overflow-hidden text-gray-900
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

export default pageLoader;
