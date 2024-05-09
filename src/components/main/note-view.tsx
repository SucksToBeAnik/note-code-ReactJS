import { motion } from "framer-motion";
import { RecordModel } from "pocketbase";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import MarkdownPreview from "@uiw/react-markdown-preview";

interface NoteViewProps {
  content: RecordModel | null;
}

const NoteView: React.FC<NoteViewProps> = ({ content }) => {
  const { title, body } = useSelector(
    (state: RootState) => state.contentReducer.currentContent
  );

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="p-4 shadow-lg rounded border-l-4 border-black/70"
    >
      <>
        {content ? (
          <div className="min-h-[440px]">
            <h1 className="text-xl font-bold md:text-4xl">{title || ""}</h1>
            <span className="text-sm text-gray-500 font-normal italic border-black">
              last updated on {content?.updated.slice(0, 16)}
            </span>
            <MarkdownPreview
              className="my-4"
              source={body || ""}
              style={{ backgroundColor: "transparent", color: "darkslategray" }}
            />
          </div>
        ) : (
          <p className="w-full">No note selected</p>
        )}
      </>
    </motion.div>
  );
};

export default NoteView;
