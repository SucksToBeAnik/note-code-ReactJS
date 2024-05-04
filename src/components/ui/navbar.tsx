import { FaRegFileCode } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useMutation } from "@tanstack/react-query";
import Avatar from "./avatar";
import { loginWithGithub } from "../../server/queries/auth";
import { loginFromStore } from "../../store/slices/authSlice";
import { AiOutlineLogin } from "react-icons/ai";
import { ImSpinner } from "react-icons/im";


const Navbar = () => {
  

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: RootState) => state.authReducer.isLoggedIn
  );
  const { mutate, isPending, isError, isIdle } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginWithGithub,
    onSuccess: () => {
      dispatch(loginFromStore());
    },
  });

  function handleLogin() {
    mutate();
    
  }

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
      {/* searchbar fro bug screen */}
      <div>
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
    </div>
  );
};

export default Navbar;
