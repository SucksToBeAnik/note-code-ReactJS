import { RecordModel } from "pocketbase";
import { useAnimate, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { CiFolderOn, CiCirclePlus, CiCircleChevDown } from "react-icons/ci";
import NoteCreateForm from "../../form/note-create-form";
import FolderContent from "./folder-content";
import FodlerEditPopup from "./folder-edit-popup";
import CodeCreateForm from "../../form/code-create-form";

interface SingleFolderProps {
  folder: RecordModel;
  contentType: "NOTE" | "CODE";
}

const SingleFolder: React.FC<SingleFolderProps> = ({ folder, contentType }) => {
  const [showFolderEdit, setShowFolderEdit] = useState(false);
  const [scope, animate] = useAnimate();
  const [showFolderContent, setShowFolderContent] = useState<boolean>(false);
  const [showNoteCreateForm, setShowNoteCreateForm] = useState(false);
  const [showCodeCreateForm, setShowCodeCreateForm] = useState(false);

  function handleSwitchContentCreateForm() {
    if (contentType === "NOTE") {
      setShowNoteCreateForm((prev) => !prev);
    } else {
      setShowCodeCreateForm((prev) => !prev);
    }
  }

  function handleExpand() {
    setShowFolderContent((prev) => !prev);
  }

  useEffect(() => {
    if (contentType === "NOTE") {
      setShowCodeCreateForm(false);
    } else {
      setShowNoteCreateForm(false);
    }
  }, [contentType]);

  useEffect(() => {
    animate(scope.current, {
      rotate: Number(showFolderContent) * 180,
    });
  }, [showFolderContent, animate, scope]);

  return (
    <div className="shadow-sm rounded-2xl bg-zinc-100 p-4">
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "auto" }}
        className="flex justify-between items-center mb-2"
      >
        <div className="flex justify-normal gap-1">
          <CiFolderOn className="text-xl font-semibold" />
          <h1
            onClick={() => setShowFolderEdit(true)}
            className="font-medium cursor-pointer text-blue-900"
          >
            {folder.title}
          </h1>
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
        {showNoteCreateForm && (
          <NoteCreateForm
            folderId={folder.id}
            onCloseForm={handleSwitchContentCreateForm}
          />
        )}
        {showCodeCreateForm && <CodeCreateForm folderId={folder.id} onCloseForm={handleSwitchContentCreateForm} />}
      </motion.div>

      {showFolderContent && (
        <FolderContent
          contentType={contentType}
          contents={
            contentType === "NOTE" ? folder.expand?.notes : folder.expand?.codes
          }
        />
      )}

      {showFolderEdit && (
        <FodlerEditPopup
          folder={folder}
          closeFolderEditPopup={() => setShowFolderEdit(false)}
        />
      )}
    </div>
  );
};

export default SingleFolder;
