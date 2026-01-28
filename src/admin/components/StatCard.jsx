
  
const variants = {
  dark: "from-blue-500 to-blue-500",
  medium: "from-blue-500 to-blue-400",
  light: "from-blue-400 to-sky-300",
  lighter: "from-blue-400 to-sky-200",

  // dark: "from-blue-100 to-blue-200",
  // medium: "from-blue-200 to-blue-300",
  // light: "from-blue-300 to-blue-400",
  // lighter: "from-blue-400 to-blue-500",
};

export default function StatCard({ title, value, variant = "medium" }) {
  return (
    <div
      className={`
        cursor-pointer
        bg-gradient-to-br ${variants[variant]}
        text-white
        rounded-2xl
        p-6
        shadow-md
        transition-all duration-300 ease-out
        hover:shadow-xl
        hover:-translate-y-1
        active:scale-95
      `}
    >
      <p className="text-sm opacity-90">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

