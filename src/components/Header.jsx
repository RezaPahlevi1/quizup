function Header() {
  return (
    <header className="bg-slate-900 text-white py-12 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-center tracking-tight">
          Quiz<span className="text-cyan-400">Up</span>
        </h1>
        <p className="text-center text-sm mt-3 text-slate-400 font-light">
          Test your knowledge and have fun!
        </p>
      </div>
    </header>
  );
}

export default Header;
