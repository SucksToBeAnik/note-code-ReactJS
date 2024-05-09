import { FaRegFileCode } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useMutation } from "@tanstack/react-query";
import Avatar from "./avatar";
import { loginWithGithub } from "../../server/queries/auth";
import { loginFromStore } from "../../store/slices/authSlice";
import { AiOutlineLogin } from "react-icons/ai";
import { ImSpinner } from "react-icons/im";
import { useState } from "react";
import { motion } from "framer-motion";
import MenuBar from "./menubar";

const Navbar = () => {
  const [showMneu, setShowMenu] = useState<"SHOW" | "HIDE">("HIDE");
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: RootState) => state.authReducer.isLoggedIn
  );
  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginWithGithub,
    onSuccess: () => {
      dispatch(loginFromStore());
    },
  });

  function handleLogin() {
    mutate();
  }

  const topVariants = {
    SHOW: {
      rotate: 45,
    },
    HIDE: {
      rotate: 0,
    },
  };
  const midVariants = {
    SHOW: {
      opacity: 0,
    },
    HIDE: {
      opacity: 1,
    },
  };

  const bottomVariants = {
    SHOW: {
      rotate: -45,
    },
    HIDE: {
      rotate: 0,
    },
  };

  return (
    <div className="container max-w-screen-xl mx-auto flex justify-between items-center p-4 rounded mt-4 mb-8 shadow">
      {/* icon */}
      <div className="flex justify-center items-center gap-2">
        <FaRegFileCode className="text-3xl" />
        <span className="text-sm font-semibold uppercase">
          Note
          <span className="bg-purple-700 rounded p-1 text-white ml-1">
            Code
          </span>
        </span>
      </div>
      {/* searchbar fro big screen */}
      <div className="hidden md:block">
        <input />
      </div>

      {/* Login/Logout for big screen */}
      <div className="hidden md:block">
        {isLoggedIn ? (
          <Avatar />
        ) : (
          <button
            onClick={handleLogin}
            className="flex justify-center items-center gap-1 bg-purple-700 text-white py-1 px-2 rounded"
          >
            {isPending ? (
              <ImSpinner className="animate-[spin_linear_2s_infinite] w-4" />
            ) : (
              <AiOutlineLogin className="w-4" />
            )}
            <span>Login</span>
          </button>
        )}
      </div>

      {/* hamburger for small screen */}
      <div className="md:hidden z-[100]">
        <div
          onClick={() => {
            if (showMneu === "SHOW") {
              setShowMenu("HIDE");
            } else {
              setShowMenu("SHOW");
            }
          }}
          className="space-y-1 w-8 h-10 z-[150] relative cursor-pointer"
        >
          <motion.div
            variants={topVariants}
            animate={showMneu}
            className={`h-[3px] w-8 rounded origin-left shadow-xl ${
              showMneu === "SHOW"
                ? "bg-white border-2 border-black p-[1px]"
                : "bg-purple-700"
            }`}
          ></motion.div>
          <motion.div
            variants={midVariants}
            animate={showMneu}
            className={`h-[3px] w-8 rounded bg-purple-700`}
          ></motion.div>
          <motion.div
            variants={bottomVariants}
            animate={showMneu}
            className={`h-[3px] w-8 rounded origin-left ${
              showMneu === "SHOW"
                ? "bg-white border-2 border-black p-[1px]"
                : "bg-purple-700"
            }`}
          ></motion.div>
        </div>

        {showMneu === "SHOW" && <MenuBar toggleMenu={setShowMenu} />}
      </div>
    </div>
  );
};

export default Navbar;
