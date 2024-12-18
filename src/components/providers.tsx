import { FC, ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface providersProps {
  children: ReactNode;
}

const providers: FC<providersProps> = ({ children }) => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {children}
    </>
  );
};

export default providers;
