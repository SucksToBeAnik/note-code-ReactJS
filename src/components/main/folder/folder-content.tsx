import { RecordModel } from "pocketbase";

import { motion } from "framer-motion";

import SingleContent from "./single-content";


const FolderContent = ({
    contents,
    contentType,
  }: {
    contents: RecordModel[];
    contentType: "NOTE" | "CODE";
  }) => {
    
  
    return (
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "auto" }}
        transition={{ duration: 0.1 }}
        className="flex flex-col gap-2 ml-4 pl-2 border-l-4 mb-2"
      >
        {!contents ? (
          <>
            {contentType === "NOTE" ? (
              <p className="text-sm text-gray-700">No notes</p>
            ) : (
              <p className="text-sm text-gray-700">No codes</p>
            )}
          </>
        ) : (
          <div className="space-y-2">
            {contents.map((content, idx) => {
              return <SingleContent key={idx} content={content} contentType={contentType} />
            })}
          </div>
        )}
      </motion.div>
    );
  };

  export default FolderContent;