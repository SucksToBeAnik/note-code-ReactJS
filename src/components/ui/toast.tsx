import { IoIosCloseCircleOutline } from "react-icons/io";
import {  motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setToast } from "../../store/slices/toastSlice";
import { useEffect } from "react";

interface ToastProps {
  msg: string;
  toastType: "ERROR" | "SUCCESS";
}

const Toast: React.FC<ToastProps> = ({ msg, toastType }) => {
  const dispatch = useDispatch();
  function handleToast() {
    dispatch(setToast(null));
  }

  useEffect(() => {
    setTimeout(() => {
      dispatch(setToast(null));
    }, 3000);
  }, [dispatch]);

  return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.1 }}
        className={`sticky z-[5000] bottom-0 rounded-t text-white text-sm min-w-40 ${
          toastType === "ERROR" && "bg-red-500"
        } ${toastType === "SUCCESS" && "bg-emerald-500"}`}
      >
        <p className="relative p-4">
          {msg}

          <IoIosCloseCircleOutline
            onClick={handleToast}
            className="text-lg absolute right-1 top-1 cursor-pointer h-5 w-5 inline-block"
          />
        </p>
      </motion.div>
  );
};

export default Toast;
