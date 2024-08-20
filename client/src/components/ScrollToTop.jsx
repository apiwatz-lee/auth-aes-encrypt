import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowUp as ArrowUp } from "react-icons/md";

const ScrollToTop = () => {
  const [isShow, setIsShow] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsShow(true);
      } else {
        setIsShow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="fixed bottom-10 right-10 text-white xl:right-40  ">
      <button
        onClick={handleScrollToTop}
        className={`p-3 rounded-full bg-red-700 duration-300 opacity-0 hover:bg-red-800 hover:scale-105 ${
          isShow && `opacity-95`
        }`}
      >
        <ArrowUp className="text-xl" />
      </button>
    </div>
  );
};

export default ScrollToTop;
