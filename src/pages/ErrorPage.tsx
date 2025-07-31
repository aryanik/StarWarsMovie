import type { FC } from "react";

interface ErrorPageProps {
  error: {
    message?: string;
  };
  resetErrorBoundary: () => void;
}

const ErrorPage: FC<ErrorPageProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="flex flex-col white-background h-screen w-screen items-center justify-center mb-4">
      <span className="hidden">{error?.message}</span>
      <div>
        <button
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2  mt-4 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:white-text dark:white-text focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
          onClick={resetErrorBoundary}
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 white-background  rounded-md group-hover:bg-opacity-0">
            GO TO Home
          </span>
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
