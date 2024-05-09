import { IoIosCloseCircleOutline } from "react-icons/io";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setToast } from "../../store/slices/toastSlice";

interface ToastProps {
  msg: string;
  toastType: "ERROR" | "SUCCESS"
}

const Toast: React.FC<ToastProps> = ({ msg, toastType }) => {
  const dispatch = useDispatch()
  function handleToast(){
    dispatch(setToast(null))
  }


  return (
    <motion.div
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      transition={{duration:0.1}}
      className={`absolute z-[2000] bottom-4 right-4 rounded text-white text-sm min-w-40 ${
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
