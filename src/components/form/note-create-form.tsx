import { IoIosCloseCircleOutline } from "react-icons/io";
import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import Toast from "../ui/toast";
import { createNote } from "../../server/queries/notes";
import { GoIssueClosed } from "react-icons/go";
import { ImSpinner } from "react-icons/im";
import {  useMutation, useQueryClient } from "@tanstack/react-query";

interface NoteCreateFormProps {
  folderId: string;
  onCloseForm: () => void;
}

const NoteCreateForm: React.FC<NoteCreateFormProps> = ({
  folderId,
  onCloseForm,
}) => {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { mutate, isPending: isLoading } = useMutation({
    mutationKey: ["notes"],
    mutationFn: ({ title, body }: { title: string; body: string }) => {
      return createNote(folderId, title, body);
    },
    onError: (error) => {
      setFormError(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:['folders']
      })
      setSuccess("Note added!");
      onCloseForm()
    },
  });

  async function handleNoteCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const title = formData.get("title") as string;
    const body = formData.get("body") as string;

    if (title.length < 4) {
      setFormError("Title should be longer");
    } else {
      mutate({ title: title, body: body });
    }
  }

  return (
    <div className="flex justify-center items-center fixed inset-0 bg-gray-800/90 backdrop-blur-sm z-30">
      <motion.form
        onSubmit={handleNoteCreate}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, duration: 0.2 }}
        action=""
        className="bg-white w-4/5 md:w-3/5 rounded-xl shadow p-4 relative"
      >
        <IoIosCloseCircleOutline
          onClick={onCloseForm}
          className="absolute right-4 top-2 text-3xl cursor-pointer"
        />
        <h1 className="text-center text-xl font-bold mb-4">Create Note</h1>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="title">Title</label>
          <input
            required
            type="text"
            name="title"
            className="border-2 border-purple-700  rounded p-2 outline-none shadow"
          />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="body">Content</label>
          <textarea
            name="body"
            id="body"
            rows={15}
            className="border-2 border-purple-700 p-2 outline-none rounded-br-full rounded shadow"
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

      {formError && (
        <Toast
          msg={formError}
          toastType="ERROR"
          onCloseToast={() => setFormError(null)}
        />
      )}
      {success && (
        <Toast
          msg={success}
          toastType="SUCCESS"
          onCloseToast={() => setSuccess(null)}
        />
      )}
    </div>
  );
};

export default NoteCreateForm;
