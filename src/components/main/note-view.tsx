import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { RecordModel } from "pocketbase";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

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
      className="p-4 border-2 border-black rounded m-2"
    >
      <>
        {content ? (
          <div className="min-h-[440px]">
            <ReactMarkdown className="prose mb-1" children={title || ""} />
            <span className="text-sm font-normal italic pl-4 border-l-2 border-black">
              Last updated on{" "}{content?.updated}
            </span>
            <ReactMarkdown className="prose my-4" children={body || ""} />
          </div>
        ) : (
          <p>No note selected</p>
        )}
      </>
    </motion.div>
  );
};

export default NoteView;
