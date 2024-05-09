import FolderBar from "./folder/folder-bar";
import NoteCode from "./note-code";

const ProtectedContent = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-4 sm:col-span-2 xl:col-span-1">
        <FolderBar />
      </div>
      <div className="col-span-4 sm:col-span-2 xl:col-span-3">
        <NoteCode />
      </div>
    </div>
  );
};

export default ProtectedContent;
