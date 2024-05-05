import { motion } from "framer-motion";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import NoteView from "./note-view";
import CodeView from "./code-view";
import NoteEdit from "./note-edit";

const NoteCode = () => {
  const [viewEdit, setViewEdit] = useState<"VIEW" | "EDIT">("VIEW");
  const {
    contentType,
    content
  } = useSelector((state: RootState) => state.contentReducer.contentToView);

  const viewEditButtonVariants = {
    VIEW: {
      x: 0,
    },
    EDIT: {
      x: 80,
    },
  };

  return (
    <div>
      <div className="flex justify-start items-center gap-8 text-md font-semibold m-4">
        <button
          onClick={() => setViewEdit("VIEW")}
          className={`relative py-2 px-4 ${
            viewEdit === "VIEW" && "text-white"
          }`}
        >
          <span className="uppercase">View</span>
          <motion.div
            variants={viewEditButtonVariants}
            animate={viewEdit}
            className="bg-purple-700 p-4 rounded shadow absolute inset-0 -z-40"
          ></motion.div>
        </button>
        <button
          onClick={() => setViewEdit("EDIT")}
          className={`relative uppercase ${
            viewEdit === "EDIT" && "text-white"
          }`}
        >
          Edit
        </button>
      </div>

      {viewEdit === "VIEW" && (
        <>
          {contentType === "NOTE" ? (
            <NoteView key={content?.id} content={content} />
          ) : (
            <CodeView />
          )}
        </>
      )}
      {viewEdit === "EDIT" && (
        <>
          {contentType === "NOTE" ? (
            <NoteEdit key={content?.id} content={content} />
          ) : (
            <CodeView />
          )}
        </>
      )}
    </div>
  );
};

export default NoteCode;
