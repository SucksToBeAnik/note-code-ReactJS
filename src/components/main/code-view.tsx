import { RecordModel } from "pocketbase";
import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface CodeViewProps {
  code: RecordModel | null;
}
const CodeView: React.FC<CodeViewProps> = ({ code }) => {
  const currentContent = useSelector(
    (state: RootState) => state.contentReducer.currentContent
  );
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="p-4 rounded border-b-4 "
    >
      <>
        {code ? (
          <div className="min-h-[440px]">
            <h1 className="text-xl font-bold md:text-4xl">{currentContent.title}</h1>
            <span className="text-sm text-gray-500 font-normal italic border-black">
              last updated on {code?.updated.slice(0, 16)}
            </span>

            <code className="mt-4 p-4 pt-8 rounded-xl bg-black text-white block relative">
              {currentContent.body}
              <span className="absolute top-2 right-2 p-1 rounded bg-white text-black text-sm">
                {currentContent.language}
              </span>
            </code>
          </div>
        ) : (
          <p className="w-full">No content selected</p>
        )}
      </>
    </motion.div>
  );
};

export default CodeView;
