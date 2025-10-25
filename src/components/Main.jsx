function Main({ children }) {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-12 relative z-10">
      {children}
    </main>
  );
}

export default Main;
