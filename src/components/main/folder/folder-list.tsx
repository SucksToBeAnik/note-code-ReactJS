import { RecordModel } from "pocketbase";
import SingleFolder from "./single-folder";

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
      {folders.map((folder, idx) => {
        return (
          <div key={idx} className="flex flex-col">
            <SingleFolder folder={folder} contentType={contentType} />
          </div>
        );
      })}
    </div>
  );
};

export default FolderList;
