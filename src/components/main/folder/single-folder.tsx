import { RecordModel } from "pocketbase";
import { useAnimate, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { CiFolderOn, CiCirclePlus,CiCircleChevDown } from "react-icons/ci";
import NoteCreateForm from "../../form/note-create-form";
import FolderContent from "./folder-content";

const SingleFolder = ({
    folder,
    contentType,
  }: {
    folder: RecordModel;
    contentType: "NOTE" | "CODE";
  }) => {
    const [scope, animate] = useAnimate();
    const [showFolderContent, setShowFolderContent] = useState<boolean>(false);
    const [showContentCreateForm, setShowContentCreateForm] = useState(false);
  
    function handleSwitchContentCreateForm() {
      setShowContentCreateForm((prev) => !prev);
    }
  
    function handleExpand() {
      setShowFolderContent((prev) => !prev);
    }
  
    useEffect(() => {
      animate(scope.current, {
        rotate: Number(showFolderContent) * 180,
      });
    }, [showFolderContent, animate, scope]);
  
    return (
      <>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          className="flex justify-between items-center mb-2"
        >
          <div className="flex justify-normal gap-1">
            <CiFolderOn className="text-xl" />
            <h1>{folder.title}</h1>
            <motion.span
              className="cursor-pointer ml-2"
              ref={scope}
              onClick={handleExpand}
            >
              <CiCircleChevDown className="text-2xl" />
            </motion.span>
          </div>
  
          {/* show content create pop up */}
          <CiCirclePlus
            onClick={handleSwitchContentCreateForm}
            className="text-2xl cursor-pointer hover:-translate-y-[2px] hover:scale-105 active:scale-90 transition-all"
          />
          {showContentCreateForm && contentType === "NOTE" && (
            <NoteCreateForm
              folderId={folder.id}
              onCloseForm={handleSwitchContentCreateForm}
            />
          )}
        </motion.div>
  
        {showFolderContent && (
          <FolderContent
            contentType={contentType}
            contents={
              contentType === "NOTE" ? folder.expand?.notes : folder.expand?.codes
            }
          />
        )}
      </>
    );
  };


  export default SingleFolder;