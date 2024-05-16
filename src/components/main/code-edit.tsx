import { Editor } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { RecordModel } from "pocketbase";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useRef, useState } from "react";
import {
  updateCurrentContentBody,
  updateCurrentContentLanguage,
  updateCurrentContentTitle,
  type CodeLanguage,
} from "../../store/slices/contentSlice";
import { runCode, type RunCodeProps } from "../../server/piston_api";
import { setToast } from "../../store/slices/toastSlice";
import { useMutation } from "@tanstack/react-query";
import CodeOutput from "./code-output";
import { updateCodeByID } from "../../server/queries/codes";
import { FaTerminal } from "react-icons/fa";
import { ImSpinner } from "react-icons/im";
import { BsPencilSquare } from "react-icons/bs";
import { motion } from "framer-motion";

interface CodeEditProps {
  code: RecordModel | null;
}

const CodeEdit: React.FC<CodeEditProps> = ({ code }) => {
  const currentContent = useSelector(
    (state: RootState) => state.contentReducer.currentContent
  );
  const dispatch = useDispatch();
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();
  const [codeOutput, setShowCodeOutput] = useState<{
    success: boolean;
    output: string;
    language: string;
  } | null>(null);

  const { mutate: mutateRunCode, isPending: isCodeRunning } = useMutation({
    mutationKey: ["runCode"],
    mutationFn: (data: RunCodeProps) => runCode(data),
    onSuccess: (res) => {
      return setShowCodeOutput({
        success: Boolean(!res.run.code),
        output: res.run.output,
        language: res.language,
      });
    },
    onError: (error) => {
      return dispatch(
        setToast({
          msg: error.message,
          type: "ERROR",
        })
      );
    },
  });

  const { mutate: updateCode, isPending: isCodeUpdating } = useMutation({
    mutationKey: ["codes", "folders"],
    mutationFn: (data: {
      title: string;
      body: string;
      language: CodeLanguage;
    }) => updateCodeByID(code?.id, data),
    onSuccess: () => {
      return dispatch(
        setToast({
          msg: "Code updated",
          type: "SUCCESS",
        })
      );
    },
    onError: (error) => {
      return dispatch(
        setToast({
          msg: error.message,
          type: "ERROR",
        })
      );
    },
  });

  function handleEditorMount(editor: monaco.editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
  }

  function handleUpdate() {
    if (!currentContent.title) {
      dispatch(
        setToast({
          msg: "Title cannot be empty",
          type: "ERROR",
        })
      );
      return;
    }
    if (currentContent.title) {
      if (currentContent.title.length < 3) {
        dispatch(
          setToast({
            msg: "Title should at least be 3 characters long!",
            type: "ERROR",
          })
        );
        return;
      }
    }
    if (!currentContent.body) {
      dispatch(
        setToast({
          msg: "Title cannot be empty",
          type: "ERROR",
        })
      );
      return;
    }
    if (currentContent.body) {
      if (currentContent.body.length < 3) {
        dispatch(
          setToast({
            msg: "Title should at least be 3 characters long!",
            type: "ERROR",
          })
        );
        return;
      }
    }

    if (!currentContent.language) {
      dispatch(
        setToast({ msg: "You have not selected any Language", type: "ERROR" })
      );
      return;
    }

    const updatedCode = {
      language: currentContent.language,
      title: currentContent.title,
      body: currentContent.body,
    };

    updateCode(updatedCode);
  }

  function handleRunCode() {
    if (!currentContent.language) {
      dispatch(
        setToast({
          msg: "Please select an language",
          type: "ERROR",
        })
      );
      return;
    }
    if (!currentContent.title) {
      dispatch(
        setToast({
          msg: "Title cannot be empty",
          type: "ERROR",
        })
      );
      return;
    }
    if (!currentContent.body) {
      dispatch(
        setToast({
          msg: "There is no code to run",
          type: "ERROR",
        })
      );
      return;
    }

    const codeToRun = {
      language: currentContent.language,
      title: currentContent.title,
      body: currentContent.body,
    };

    mutateRunCode(codeToRun);
  }

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative mb-4">
        <input
          type="text"
          onChange={(e) => dispatch(updateCurrentContentTitle(e.target.value))}
          value={currentContent.title || ""}
          className="p-4 shadow border-b-4 border-b-purple-700 w-full rounded focus:outline-none"
          placeholder="Update title"
        />
        <select
          id="select-example"
          name="select-example"
          onChange={(e) =>
            dispatch(
              updateCurrentContentLanguage(e.target.value as CodeLanguage)
            )
          }
          defaultValue={currentContent.language}
          className="block p-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md absolute right-2 top-2 h-2/3"
        >
          <option value={"python"}>Python</option>
          <option value={"javascript"}>Javascript</option>
          <option value={"typescript"}>Typescript</option>
        </select>
      </div>

      <Editor
        height={"50vh"}
        language={currentContent.language}
        value={currentContent.body || ""}
        theme="vs-dark"
        onMount={handleEditorMount}
        onChange={(value) => value && dispatch(updateCurrentContentBody(value))}
      />

      <div className="flex justify-start items-center gap-8">
        <div className="border-2 rounded border-black bg-black relative w-32 h-10 mt-4">
          <button
            onClick={handleRunCode}
            type="button"
            className="bg-purple-700 text-white rounded absolute w-32 h-10 -left-2 -top-2 hover:inset-0 shadow-xl transition-all border-2 border-black focus:outline-none"
          >
            <div className="flex justify-center items-center gap-2">
              <span>Run Code</span>
              {isCodeRunning ? (
                <ImSpinner className="animate-[spin_linear_2s_infinite]" />
              ) : (
                <FaTerminal />
              )}
            </div>
          </button>
        </div>
        <div className="border-2 rounded border-black bg-black relative w-32 h-10 mt-4">
          <button
            onClick={handleUpdate}
            type="button"
            className="bg-purple-700 text-white rounded absolute w-32 h-10 -left-2 -top-2 hover:inset-0 shadow-xl transition-all border-2 border-black focus:outline-none"
          >
            <div className="flex justify-center items-center gap-2">
              <span>Update</span>
              {isCodeUpdating ? (
                <ImSpinner className="animate-[spin_linear_2s_infinite]" />
              ) : (
                <BsPencilSquare />
              )}
            </div>
          </button>
        </div>
      </div>

      {codeOutput && (
        <CodeOutput
          handleCloseOutput={() => setShowCodeOutput(null)}
          output={codeOutput.output}
          success={codeOutput.success}
          language={codeOutput.language}
        />
      )}
    </motion.div>
  );
};

export default CodeEdit;
