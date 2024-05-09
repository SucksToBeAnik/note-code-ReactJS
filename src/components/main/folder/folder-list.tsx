import { RecordModel } from "pocketbase";
import SingleFolder from "./single-folder";
import { AnimatePresence, motion } from "framer-motion";

const FolderList = ({
  folders,
  contentType,
}: {
  folders: RecordModel[];
  contentType: "NOTE" | "CODE";
}) => {
  return (
    <div className="mt-4 p-1 text-black rounded space-y-2">
      {folders.length === 0 && (
        <p className="text-gray-600 text-sm">No folders</p>
      )}

      <AnimatePresence>
        {folders.map((folder, idx) => {
          return (
            <motion.div initial={{scale:0}} animate={{scale:1}} exit={{x:-1000, scale:0}} key={idx} className="flex flex-col">
              <SingleFolder folder={folder} contentType={contentType} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default FolderList;
