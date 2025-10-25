function Loader() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 border-4 border-slate-700 border-t-cyan-500 rounded-full animate-spin"></div>
      <p className="text-slate-300 font-medium">Loading questions...</p>
    </div>
  );
}

export default Loader;
