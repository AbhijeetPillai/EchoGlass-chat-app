const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center p-12 bg-gradient-to-br from-indigo-900/20 via-black/20 to-gray-900/40 backdrop-blur-md border-l border-indigo-600/20">
      <div className="max-w-md text-center">
        {/* Animated Grid Pattern */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl transition-all duration-700
                ${i % 2 === 0 ? "bg-indigo-600/20 animate-pulse" : "bg-indigo-500/10"}
              `}
            />
          ))}
        </div>

        {/* Headings */}
        <h2 className="text-3xl font-bold text-indigo-400 mb-4 tracking-wider">
          {title}
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
