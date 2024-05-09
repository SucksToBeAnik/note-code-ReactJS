import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCodeByID } from "../../server/queries/codes";
import { deleteNoteByID } from "../../server/queries/notes";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CiTrash } from "react-icons/ci";
import { ImSpinner } from "react-icons/im";
import { resetContent } from "../../store/slices/contentSlice";
import { useDispatch } from "react-redux";
import { setToast } from "../../store/slices/toastSlice";

interface ContentDeleteConfirmationProps {
  contentID: string;
  contnetType: "NOTE" | "CODE";
  closeShowDeleteConfirmation: () => void;
}

const ContentDeleteConfirmation: React.FC<ContentDeleteConfirmationProps> = ({
  contentID,
  contnetType,
  closeShowDeleteConfirmation,
}) => {
  const dispatch = useDispatch();
  const client = useQueryClient();

  const { mutate: deleteContent, isPending } = useMutation({
    mutationKey: ["notes"],
    mutationFn: () => {
      if (contnetType === "NOTE") {
        return deleteNoteByID(contentID);
      } else {
        return deleteCodeByID(contentID);
      }
    },
    onSuccess: () => {
      dispatch(resetContent());
      dispatch(
        setToast({
          msg: `${contnetType === "NOTE" ? "Note" : "Code"} deleted!`,
          type: "SUCCESS",
        })
      );
      closeShowDeleteConfirmation();
      client.invalidateQueries({
        queryKey: ["folders"],
      });
    },

    onError: (error) => {
      dispatch(
        setToast({
          msg: error.message,
          type: "ERROR",
        })
      );
    },
  });

  function handleDelete() {
    deleteContent();
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop:blur-sm z-50 bg-gray-600/80">
      <div className="p-4 pt-6 rounded bg-white relative">
        <p className="text-xl mb-3">Are you sure you want to delete this?</p>
        <button
          onClick={handleDelete}
          className="bg-red-400 w-28 p-1 rounded text-white mx-auto block "
        >
          <p className="flex justify-center items-center gap-1">
            <span>Confirm</span>

            {isPending ? (
              <ImSpinner className="animate-[spin_linear_2s_infinite] w-4 text-2xl" />
            ) : (
              <CiTrash className="w-4 text-2xl font-bold" />
            )}
          </p>
        </button>

        <IoIosCloseCircleOutline
          className="absolute right-1 top-1 text-2xl cursor-pointer"
          onClick={closeShowDeleteConfirmation}
        />
      </div>
    </div>
  );
};

export default ContentDeleteConfirmation;
