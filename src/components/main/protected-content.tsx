import Folder from "./folder";
import NoteCode from "./note-code";

const ProtectedContent = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-4 md:col-span-1">
        <Folder />
      </div>
      <div className="col-span-4 md:col-span-3">
        <NoteCode />
      </div>
    </div>
  );
};

export default ProtectedContent;
