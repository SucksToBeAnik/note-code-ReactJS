import { IoIosCloseCircleOutline } from "react-icons/io";
import { motion } from "framer-motion";
import { FormEvent, useRef, useState } from "react";
import { GoIssueClosed } from "react-icons/go";
import { ImSpinner } from "react-icons/im";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import * as monaco from "monaco-editor";

import { setToast } from "../../store/slices/toastSlice";
import { Editor } from "@monaco-editor/react";
import { type CodeLanguage } from "../../store/slices/contentSlice";
import { createCode } from "../../server/queries/codes";

interface CodeCreateFormProps {
  folderId: string;
  onCloseForm: () => void;
}

const CodeCreateForm: React.FC<CodeCreateFormProps> = ({
  folderId,
  onCloseForm,
}) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();

  function handleEditorMount(editor: monaco.editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
  }

  const [language, setLanguage] = useState<CodeLanguage>("javascript");

  const { mutate: createNewCode, isPending: isLoading } = useMutation({
    mutationKey: ["codes"],
    mutationFn: ({ title, body }: { title: string; body: string }) => {
      return createCode(folderId, title, body, language);
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
          msg: "Code added!",
          type: "SUCCESS",
        })
      );
      onCloseForm();
    },
  });

  async function handleCodeCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const title = formData.get("title") as string;
    const body = editorRef.current?.getValue();

    if (title.length < 3) {
      dispatch(
        setToast({
          msg: "Title should at least be 3 characters long",
          type: "ERROR",
        })
      );
      return;
    }

    if (!body) {
      dispatch(
        setToast({
          msg: "No code is provided",
          type: "ERROR",
        })
      );

      return;
    } else {
      if (body.length < 3) {
        dispatch(
          setToast({
            msg: "Code content should at least be 3 characters",
            type: "ERROR",
          })
        );
        return;
      }
    }

    createNewCode({ title: title, body: body });
  }

  return (
    <div className="fixed top-0 left-0 right-0 h-screen w-screen z-[1000]">
      <div className="flex justify-center items-center bg-gray-800/80 backdrop-blur-sm w-full h-full">
        <motion.form
          onSubmit={handleCodeCreate}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-white m-4 w-full sm:w-3/5 min-h-full rounded-xl shadow p-8 relative"
        >
          <IoIosCloseCircleOutline
            onClick={onCloseForm}
            className="absolute right-4 top-2 text-3xl cursor-pointer"
          />
          <h1 className="text-center text-xl font-bold mb-4">Create Code</h1>

          <div className="flex flex-col gap-2 mb-4 relative">
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

            <select
              id="select-example"
              name="select-example"
              onChange={(e) => setLanguage(e.target.value as CodeLanguage)}
              defaultValue={language}
              className="block p-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md absolute right-1 top-10"
            >
              <option value={"python"}>Python</option>
              <option value={"javascript"}>Javascript</option>
              <option value={"typescript"}>Typescript</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="body" className="text-xl font-semibold">
              Code
            </label>
            <Editor
              height={"50vh"}
              theme="vs-dark"
              language={language}
              onMount={handleEditorMount}
            />
            {/* <textarea
              name="body"
              id="body"
              required
              rows={15}
              placeholder="Write your code..."
              className="border-b-4 rounded border-purple-700 p-2 outline-none resize-none shadow-xl"
            /> */}
          </div>

          <div className="border-2 rounded border-black bg-black relative w-32 h-10 mx-auto">
            <button
              type="submit"
              className="bg-purple-700 text-white rounded absolute w-32 h-10 -left-2 -top-2 hover:inset-0 shadow-xl transition-all border-2 border-black focus:outline-none flex justify-center items-center gap-1"
            >
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
    </div>
  );
};

export default CodeCreateForm;
