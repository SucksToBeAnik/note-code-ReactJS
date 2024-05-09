import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RecordModel } from "pocketbase";
import { useState } from "react";
import { GoIssueClosed } from "react-icons/go";
import { ImSpinner } from "react-icons/im";
import { IoCloseCircle } from "react-icons/io5";
import {
  deleteFolderByID,
  updateFolderByID,
} from "../../../server/queries/folders";
import { useDispatch } from "react-redux";
import { setToast } from "../../../store/slices/toastSlice";
import { CiTrash } from "react-icons/ci";

interface FolderEditPopupProps {
  folder: RecordModel;
  closeFolderEditPopup: () => void;
}

const FodlerEditPopup: React.FC<FolderEditPopupProps> = ({
  folder,
  closeFolderEditPopup,
}) => {
  const client = useQueryClient();
  const dispatch = useDispatch();
  const [showEditDelete, setShowEditDelete] = useState<"EDIT" | "DELETE">(
    "EDIT"
  );
  const [folderTitle, setFolderTitle] = useState<string>(folder?.title);

  const { mutate: handleEditFolder, isPending: isUpdating } = useMutation({
    mutationKey: ["folders"],
    mutationFn: () => updateFolderByID(folder.id, folderTitle),
    onSuccess: () => {
      dispatch(setToast({ msg: "Folder updated!", type: "SUCCESS" }));

      client.invalidateQueries({
        queryKey: ["folders"],
      });
      closeFolderEditPopup();
    },
    onError: (error) =>
      dispatch(setToast({ msg: error.message, type: "ERROR" })),
  });

  const { mutate: handleDeleteFolder, isPending: isDeleting } = useMutation({
    mutationKey: ["folders"],
    mutationFn: () => deleteFolderByID(folder.id),
    onSuccess: () =>{
      client.invalidateQueries({
        queryKey:['folders']
      })
      dispatch(setToast({ msg: "Folder deleted!", type: "SUCCESS" }))

      closeFolderEditPopup()
    },
    onError: (error) => {
      return dispatch(setToast({ msg: error.message, type: "ERROR" }));
    },
  });

  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-gray-700/50 z-[100]">
      <div className="bg-white rounded p-4 relative w-4/5 md:w-3/5 xl:w-2/5">
        <div className="grid grid-cols-2 gap-2 my-4">
          <button
            onClick={() => setShowEditDelete("EDIT")}
            className={`${
              showEditDelete === "EDIT" && "border-2 border-purple-700"
            } rounded p-2 border-b-2`}
          >
            Edit
          </button>
          <button
            onClick={() => setShowEditDelete("DELETE")}
            className={`${
              showEditDelete === "DELETE" && "border-2 border-purple-700"
            } rounded p-2 border-b-2`}
          >
            Delete
          </button>
        </div>

        <IoCloseCircle
          className="absolute top-1 right-1 text-2xl cursor-pointer"
          onClick={closeFolderEditPopup}
        />

        <div className="min-h-[200px] p-4">
          {showEditDelete === "EDIT" && (
            <div>
              <p className="mb-2 text-black/80 text-md font-semibold">
                Folder Title
              </p>
              <input
                type="text"
                value={folderTitle}
                onChange={(e) => setFolderTitle(e.target.value)}
                className="p-2 outline-none border-b-4 w-full shadow relative border-purple-700"
              />

              <div
                onClick={() => handleEditFolder()}
                className="border-2 rounded border-black bg-black relative w-32 h-10 mt-8"
              >
                <button
                  disabled={folderTitle === folder?.title}
                  className="bg-purple-700 text-white rounded absolute w-32 h-10 -left-2 -top-2 hover:inset-0 shadow-xl transition-all border-2 border-black focus:outline-none flex justify-center items-center gap-1 disabled:cursor-not-allowed"
                >
                  <span>Save</span>
                  {isUpdating ? (
                    <ImSpinner className="animate-[spin_linear_2s_infinite] w-4" />
                  ) : (
                    <GoIssueClosed className="w-4" />
                  )}
                </button>
              </div>
            </div>
          )}

          {showEditDelete === "DELETE" && (
            <div>
              <p className="text-lg font-semibold pl-2 border-l-2">Are you sure you want to delete this folder?</p>
              <div
                onClick={() => handleDeleteFolder()}
                className="border-2 rounded border-black bg-black relative w-32 h-10 mt-8"
              >
                <button className="bg-red-400 text-white rounded absolute w-32 h-10 -left-2 -top-2 hover:inset-0 shadow-xl transition-all border-2 border-black focus:outline-none flex justify-center items-center gap-1 disabled:cursor-not-allowed">
                  <span>Delete</span>
                  {isDeleting ? (
                    <ImSpinner className="animate-[spin_linear_2s_infinite] w-5 h-5 inline-block" />
                  ) : (
                    <CiTrash className="h-5 w-5 inline-block" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FodlerEditPopup;
