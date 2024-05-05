import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CiCirclePlus } from "react-icons/ci";

import { createFolder, getFolders } from "../../../server/queries/folders";
import { useEffect, useState } from "react";
import { RecordModel } from "pocketbase";
import { motion } from "framer-motion";

import { ImSpinner } from "react-icons/im";
import Toast from "../../ui/toast";

import FolderList from "./folder-list";

const FolderBar = () => {
  const [folders, setFolders] = useState<RecordModel[]>();
  const [folderType, setFolderType] = useState<"NOTE" | "CODE">("NOTE");
  const queryClient = useQueryClient();

  const [folderCreateError, setFolderCreateError] = useState<string | null>(
    null
  );

  const folderButtonVariants = {
    NOTE: {
      x: 3,
    },
    CODE: {
      x: 130,
    },
  };

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["folders"],
    queryFn: getFolders,
  });

  const { mutate: handleAddFolder, isPending } = useMutation({
    mutationKey: ["folders"],
    mutationFn: createFolder,
    onError: (error) => {
      setFolderCreateError(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["folders"],
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setFolders(data);
    }
  }, [data, isSuccess]);

  return (
    <div className="rounded p-2 shadow bg-purple-700 text-white min-h-[550px] mx-4">
      <div className="flex justify-center items-center gap-1 mb-6">
        <h1 className="text-xl font-bold">Folder</h1>
        {isPending ? (
          <ImSpinner className="animate-[spin_linear_2s_infinite]" />
        ) : (
          <CiCirclePlus
            onClick={() => handleAddFolder()}
            className="block text-3xl cursor-pointer"
          />
        )}
      </div>
      <div className="grid grid-cols-2">
        <div className="col-span-1 relative z-20">
          <button
            onClick={() => setFolderType("NOTE")}
            className={`text-white ${
              folderType === "NOTE" && " !text-black"
            } rounded p-2 z-20 `}
          >
            NoteFolder
          </button>
          <motion.div
            variants={folderButtonVariants}
            animate={folderType}
            className="rounded shadow bg-white absolute col-span-1 inset-0 -z-10"
          ></motion.div>
        </div>
        <button
          onClick={() => setFolderType("CODE")}
          className={`text-white ${
            folderType === "CODE" && "!text-black"
          } rounded p-2 col-span-1 z-20`}
        >
          CodeFolder
        </button>
      </div>
      {isLoading || !folders ? (
        <div>Loading...</div>
      ) : (
        <FolderList folders={folders} contentType={folderType} />
      )}

      {folderCreateError && (
        <Toast
          msg={folderCreateError}
          toastType="ERROR"
          onCloseToast={() => setFolderCreateError(null)}
        />
      )}
    </div>
  );
};


export default FolderBar;