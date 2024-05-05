import { motion } from "framer-motion";
import { RecordModel } from "pocketbase";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  updateCurrentContentTitle,
  updateCurrentContentBody,
} from "../../store/slices/contentSlice";
import { useMutation } from "@tanstack/react-query";
import { updateNoteByID } from "../../server/queries/notes";
import { FormEvent, useState } from "react";
import Toast from "../ui/toast";
import { ImSpinner } from "react-icons/im";

interface NoteEditProps {
  content: RecordModel | null;
}

const NoteEdit: React.FC<NoteEditProps> = ({ content }) => {
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const { title, body } = useSelector(
    (state: RootState) => state.contentReducer.currentContent
  );
  const dispatch = useDispatch();

  const { mutate, isPending } = useMutation({
    mutationKey: [content?.id],
    mutationFn: ({ newTitle, newBody }: { newTitle: string; newBody: string }) => {
      return updateNoteByID(content?.id, newTitle, newBody);
    },
    onSuccess: ()=>{
      setFormSuccess("Note updated!")
    }
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const newTitle = formData.get("title") as string;
    const newBody = formData.get("body") as string;



    if (newTitle.length < 3) {
      setFormError("Title should be longer");
    } else if (newBody.length < 5) {
      setFormError("Note content should at least be 5 characters");
    } else {
      mutate({ newTitle: newTitle, newBody: newBody });
    }
  }

  return (
    <motion.form
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="m-2"
      onSubmit={handleSubmit}
    >
      {content ? (
        <>
          <input
            type="text"
            name="title"
            value={title || ""}
            className="px-4 py-2 outline-none rounded w-full border-2 border-black mb-4"
            onChange={(e) => {
              dispatch(updateCurrentContentTitle(e.target.value));
            }}
          />
          <textarea
            name="body"
            rows={14}
            className="px-4 py-2 outline-none rounded w-full border-2 border-black"
            value={body || ""}
            onChange={(e) => {
              dispatch(updateCurrentContentBody(e.target.value));
            }}
          />

          <button
            disabled={content?.body === body && content?.title === title}
            className="mt-4 bg-purple-700 p-2 text-white rounded shadow uppercase font-semibold disabled:cursor-not-allowed disabled:bg-purple-700/40 flex justify-center items-center gap-1"
          >
            <span>Update</span>
            {isPending && (
              <ImSpinner className="animate-[spin_linear_2s_infinite] w-4" />
            )}
          </button>
        </>
      ) : (
        <p className="border-2 border-black rounded p-4">No note selected</p>
      )}

      {formError && (
        <Toast
          msg={formError}
          toastType="ERROR"
          onCloseToast={() => setFormError(null)}
        />
      )}
      {formSuccess && (
        <Toast
          msg={formSuccess}
          toastType="SUCCESS"
          onCloseToast={() => setFormSuccess(null)}
        />
      )}
    </motion.form>
  );
};

export default NoteEdit;
