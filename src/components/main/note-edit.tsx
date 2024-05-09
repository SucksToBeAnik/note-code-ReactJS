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
import { ImSpinner } from "react-icons/im";
import { BsPencilSquare } from "react-icons/bs";
import ContentDeleteConfirmation from "../ui/content-delete-confirmation";
import { setToast } from "../../store/slices/toastSlice";

interface NoteEditProps {
  content: RecordModel | null;
}

const NoteEdit: React.FC<NoteEditProps> = ({ content }) => {
  const dispatch = useDispatch();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { title, body } = useSelector(
    (state: RootState) => state.contentReducer.currentContent
  );

  const { mutate, isPending } = useMutation({
    mutationKey: [content?.id],
    mutationFn: ({
      newTitle,
      newBody,
    }: {
      newTitle: string;
      newBody: string;
    }) => {
      return updateNoteByID(content?.id, newTitle, newBody);
    },
    onSuccess: () => {
      dispatch(
        setToast({
          msg: "Note updated!",
          type: "SUCCESS",
        })
      );
    },
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const newTitle = formData.get("title") as string;
    const newBody = formData.get("body") as string;

    if (newTitle.length < 3) {
      dispatch(
        setToast({
          msg: "Title should be longer",
          type: "ERROR",
        })
      );
    } else if (newBody.length < 5) {
      dispatch(
        setToast({
          msg: "Note content should at least be 5 characters",
          type: "ERROR",
        })
      );
    } else {
      mutate({ newTitle: newTitle, newBody: newBody });
    }
  }

  return (
    <motion.form
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.1 }}
      onSubmit={handleSubmit}
    >
      {content ? (
        <>
          <input
            type="text"
            name="title"
            value={title || ""}
            className="px-4 py-2 outline-none rounded w-full border-b-4 border-purple-700 mb-8 shadow-lg"
            onChange={(e) => {
              dispatch(updateCurrentContentTitle(e.target.value));
            }}
          />
          <textarea
            name="body"
            rows={13}
            className="px-4 py-2 outline-none resize-none rounded w-full border-b-4 border-purple-700 shadow-lg tracking-wide"
            value={body || ""}
            onChange={(e) => {
              dispatch(updateCurrentContentBody(e.target.value));
            }}
          />

          <div className="flex justify-start items-center gap-10 mt-8">
            <div className="border-2 rounded border-black bg-black relative w-32 h-10">
              <button
                disabled={content?.body === body && content?.title === title}
                type="submit"
                className="bg-purple-700 text-white rounded absolute w-32 h-10 -left-2 -top-2 hover:inset-0 shadow-xl transition-all border-2 border-black focus:outline-none disabled:cursor-not-allowed"
              >
                <div className="flex justify-center items-center gap-1">
                  <span>Update</span>
                  {isPending ? (
                    <ImSpinner className="animate-[spin_linear_2s_infinite] w-4" />
                  ) : (
                    <BsPencilSquare className="w-4" />
                  )}
                </div>
              </button>
            </div>

            <div className="border-2 rounded border-black bg-black relative w-32 h-10">
              <button
                onClick={() => setShowDeleteConfirm(true)}
                type="button"
                className="bg-purple-700 text-white rounded absolute w-32 h-10 -left-2 -top-2 hover:inset-0 shadow-xl transition-all border-2 border-black focus:outline-none"
              >
                Delete
              </button>
            </div>
          </div>

          {showDeleteConfirm && (
            <ContentDeleteConfirmation
              contentID={content.id}
              contnetType="NOTE"
              closeShowDeleteConfirmation={() => setShowDeleteConfirm(false)}
            />
          )}
        </>
      ) : (
        <p className="border-l-4 border-black/70 rounded p-4 shadow-lg w-full">No note selected</p>
      )}
    </motion.form>
  );
};

export default NoteEdit;
