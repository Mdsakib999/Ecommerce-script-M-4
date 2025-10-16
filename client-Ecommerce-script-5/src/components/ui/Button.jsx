import { Link, useLocation } from "react-router";
export default function Button({ children, to, onSmash, type = "indigo-400" }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  // type indigo-400 secondary or different
  return (
    <Link
      onClick={onSmash}
      to={to}
      className={`flex mx-auto items-center ease-in-out duration-300 transition-all  text-md justify-center w-max rounded-md  ${
        type === "secondary"
          ? "bg-transparent py-2  px-4 border border-secondary text-secondary hover:bg-ultra-violet font-semibold hover:text-white hover:border-transparent rounded"
          : type === "indigo-400"
          ? "bg-transparent py-2  px-4 border border-indigo-400 text-indigo-400 hover:bg-indigo-400 font-semibold hover:text-white hover:border-transparent rounded"
          : type === "outline"
          ? " bg-transparent  text-indigo-400 mr-4 font-semibold border-2 border-transparent hover:border-b-indigo-400 pb-1 pt-2 rounded-none transform transition-colors duration-300"
          : type === "danger"
          ? "bg-transparent text-red-500 font-semibold border-3 border-[#FF595E] rounded-lg"
          : ""
      }
      ${isActive ? "text-indigo-500 border-b-indigo-500" : ""} `}
    >
      {children}
    </Link>
  );
}
