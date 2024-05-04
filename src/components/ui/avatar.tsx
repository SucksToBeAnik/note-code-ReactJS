import { useDispatch } from "react-redux";
import { logoutUser } from "../../server/queries/auth";
import { logoutFromStore } from "../../store/slices/authSlice";
import pb from "../../server";
import { useState } from "react";
import { ImSpinner } from "react-icons/im";
import { RxAvatar } from "react-icons/rx";
import { motion } from "framer-motion";

interface User {
  name: string;
  email: string;
  avatarUrl: string;
}

const Avatar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [user, setUser] = useState<User | null>(() => {
    const userModel = pb.authStore.model;

    if (userModel) {
      return {
        name: userModel.name,
        email: userModel.email,
        avatarUrl: userModel.avatarUrl,
      };
    } else {
      handleLogout();
    }

    return null;
  });

  const dispatch = useDispatch();
  function handleLogout() {
    logoutUser();
    dispatch(logoutFromStore());
  }

  return (
    <div
      onClick={() => setShowLogout((prev) => !prev)}
      className="w-12 h-12 cursor-pointer relative"
    >
      {user ? (
        <>
          <img
            src={user.avatarUrl}
            className="w-full rounded-full shadow-xl bg-cover hover:scale-105 transition-all"
          />
          {showLogout && (
            <motion.div
              initial={{ y: -50, x: 80 }}
              animate={{ y: 5, x: 80 }}
              className="p-2 rounded absolute w-52 bg-purple-500 text-white shadow right-0 translate-x-1/2 "
            >
              <div className="flex gap-1 justify-start items-center font-semibold">
                <RxAvatar className="text-xl" />
                <p>{user.name}</p>
              </div>

              <button
                onClick={handleLogout}
                className="bg-white px-2 py-1 w-full text-black rounded shadow mt-4"
              >
                Logout
              </button>
            </motion.div>
          )}
        </>
      ) : (
        <ImSpinner className="animate-[spin_linear_2s_infinite] w-4" />
      )}
    </div>
  );
};

export default Avatar;
