"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { logoutFromStore, loginFromStore } from "../../store/slices/authSlice";
import { logoutUser } from "../../server/queries/auth";
import { RxAvatar } from "react-icons/rx";

import pb from "../../server";
import { loginWithGithub } from "../../server/queries/auth";
import { ImSpinner } from "react-icons/im";
import { AiOutlineLogin } from "react-icons/ai";

interface User {
  name: string;
  avatarUrl: string;
}

interface MenuBarProps {
  toggleMenu: React.Dispatch<React.SetStateAction<"SHOW" | "HIDE">>;
}

const MenuBar: React.FC<MenuBarProps> = ({ toggleMenu }) => {
  const dispatch = useDispatch();

  const [user] = useState<User | null>(() => {
    const userModel = pb.authStore.model;

    if (userModel) {
      return {
        name: userModel.name,
        avatarUrl: userModel.avatarUrl,
      };
    } else {
      handleLogout();
    }

    return null;
  });

  function handleLogout() {
    logoutUser();
    dispatch(logoutFromStore());
  }

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginWithGithub,
    onSuccess: () => {
      dispatch(loginFromStore());
      toggleMenu("HIDE");
    },
  });

  function handleLogin() {
    mutate();
  }

  return (
    <div className="fixed top-0 left-0 h-screen w-screen">
      <div className="flex justify-center items-start bg-purple-700 text-white h-full">
        <div className="mt-52">
          {/* login or logout */}
          <h1 className="text-xl font-semibold mb-8">
            Hello,{" "}
            <span className="bg-black text-white p-1 rounded ml-1">
              {user ? user.name : "Stranger"}
            </span>
          </h1>
          <div className="flex justify-center items-center gap-2">
            {user ? (
              <img className="w-12 h-12 rounded-full" src={user.avatarUrl} />
            ) : (
              <RxAvatar className="w-10 h-10" />
            )}
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu("HIDE");
                }}
                className=" bg-white text-black px-2 py-1 rounded border-2 border-black"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="flex justify-center items-center gap-1 bg-white text-black border-2 border-black px-2 py-1 rounded"
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
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
