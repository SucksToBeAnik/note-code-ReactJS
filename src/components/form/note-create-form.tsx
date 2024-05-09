import { IoIosCloseCircleOutline } from "react-icons/io";
import { motion } from "framer-motion";
import { FormEvent} from "react";
import { createNote } from "../../server/queries/notes";
import { GoIssueClosed } from "react-icons/go";
import { ImSpinner } from "react-icons/im";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch} from "react-redux";

import { setToast } from "../../store/slices/toastSlice";

interface NoteCreateFormProps {
  folderId: string;
  onCloseForm: () => void;
}

const NoteCreateForm: React.FC<NoteCreateFormProps> = ({
  folderId,
  onCloseForm,
}) => {
  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  const { mutate, isPending: isLoading } = useMutation({
    mutationKey: ["notes"],
    mutationFn: ({ title, body }: { title: string; body: string }) => {
      return createNote(folderId, title, body);
    },
    onError: (error) => {
      dispatch(
        setToast({
          msg: error.message,
          type: "ERROR",
        })
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["folders"],
      });
      dispatch(
        setToast({
          msg: "Note added!",
          type: "SUCCESS",
        })
      );
      onCloseForm();
    },
  });

  async function handleNoteCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const title = formData.get("title") as string;
    const body = formData.get("body") as string;

    if (title.length < 3) {
      dispatch(
        setToast({
          msg: "Title should be longer",
          type: "ERROR",
        })
      );
    } else if (body.length < 5) {
      dispatch(
        setToast({
          msg: "Note content should at least be 5 characters",
          type: "ERROR",
        })
      );
    } else {
      mutate({ title: title, body: body });
    }
  }

  return (
    <div className="flex justify-center items-center bg-gray-800/80 backdrop-blur-sm z-[1000] fixed inset-0">
      <motion.form
        onSubmit={handleNoteCreate}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="bg-white w-full m-4 sm:w-3/5 min-h-full rounded-xl shadow p-8 relative"
      >
        <IoIosCloseCircleOutline
          onClick={onCloseForm}
          className="absolute right-4 top-2 text-3xl cursor-pointer"
        />
        <h1 className="text-center text-xl font-bold mb-4">Create Note</h1>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="title" className="text-xl font-semibold">
            Title
          </label>
          <input
            required
            type="text"
            name="title"
            placeholder="Add a title..."
            className="border-b-4 border-purple-700 p-2 outline-none shadow-xl"
          />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="body" className="text-xl font-semibold">
            Content
          </label>
          <textarea
            name="body"
            id="body"
            required
            rows={15}
            placeholder="Write something..."
            className="border-b-4 rounded border-purple-700 p-2 outline-none resize-none shadow-xl"
          />
        </div>

        <div className="w-28 mx-auto">
          <button className="p-2 border-2 border-purple-700 rounded-lg flex justify-center items-center gap-1">
            <span>Save</span>
            {isLoading ? (
              <ImSpinner className="animate-[spin_linear_2s_infinite]" />
            ) : (
              <GoIssueClosed />
            )}
          </button>
        </div>
      </motion.form>
      
    </div>
   
  );
};

export default NoteCreateForm;
