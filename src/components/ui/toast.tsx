import { IoIosCloseCircleOutline } from "react-icons/io";
import { motion } from "framer-motion";

interface ToastProps {
  msg: string;
  toastType: "ERROR" | "SUCCESS";
  onCloseToast: () => void;
}

const Toast: React.FC<ToastProps> = ({ msg, toastType, onCloseToast }) => {
  return (
    <motion.div
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      transition={{duration:0.1}}
      className={`absolute bottom-4 right-4 rounded text-white text-sm ${
        toastType === "ERROR" && "bg-red-500"
      } ${toastType === "SUCCESS" && "bg-emerald-500"}`}
    >
      <p className="relative p-4">
        {msg}

        <IoIosCloseCircleOutline
          onClick={onCloseToast}
          className="text-lg absolute right-0 top-0 cursor-pointer"
        />
      </p>
    </motion.div>
  );
};

export default Toast;
