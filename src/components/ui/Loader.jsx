export const Spinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export const SkeletonLoader = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
    </div>
  );
};

export const ProgressBarLoader = () => {
  return (
    <div className="w-full h-1 bg-gray-200 overflow-hidden">
      <div className="h-1 bg-pink-600 w-1/2 animate-[progress_2s_linear_infinite]"></div>
    </div>
  );
};

export const DotsLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center">
        <div className="flex space-x-2 justify-center items-center">
          <span className="h-3 w-3 bg-pink-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="h-3 w-3 bg-pink-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="h-3 w-3 bg-pink-600 rounded-full animate-bounce"></span>
        </div>
      </div>
    </div>
  );
};

export const RippleLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center">
        <div className="relative w-12 h-12">
          <div className="absolute w-full h-full rounded-full border-2 border-pink-600 animate-ping"></div>
          <div className="absolute w-full h-full rounded-full border-2 border-pink-400"></div>
        </div>
      </div>
    </div>
  );
};

export const ButtonLoader = ({ children }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-4 h-4 border-2 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
      {children}
    </div>
  );
};
