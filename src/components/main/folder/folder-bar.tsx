import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CiCircleChevDown, CiCirclePlus } from "react-icons/ci";

import { createFolder, getFolders } from "../../../server/queries/folders";
import { useEffect, useRef, useState } from "react";
import { RecordModel } from "pocketbase";
import { motion, useAnimate } from "framer-motion";

import { ImSpinner } from "react-icons/im";

import FolderList from "./folder-list";
import { useDispatch } from "react-redux";
import { setToast } from "../../../store/slices/toastSlice";

const FolderBar = () => {
  const [folders, setFolders] = useState<RecordModel[]>();
  const [folderType, setFolderType] = useState<"NOTE" | "CODE">("NOTE");
  const [showFolderBarContent, setShowFolderBarContent] = useState(true);
  const queryClient = useQueryClient();
  const ref = useRef<HTMLDivElement>(null);
  const [scope, animate] = useAnimate();

  const dispatch = useDispatch();

  const folderButtonVariants = {
    NOTE: {
      x: 0,
    },
    CODE: {
      x: ref.current?.offsetWidth,
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
      return dispatch(
        setToast({
          msg: error.message,
          type: "ERROR",
        })
      );
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

  useEffect(() => {
    // console.log("Inside effect");
    // console.log(Number(showFolderBarContent) * 180);
    animate(scope.current, {
      rotate: Number(!showFolderBarContent) * 180,
    });
  }, [animate, scope, showFolderBarContent]);

  return (
    <div className="rounded p-2 shadow bg-purple-700 text-white m-4 relative">
      <motion.span
        onClick={() => {
          setFolderType("NOTE");
          return setShowFolderBarContent((prev) => !prev);
        }}
        ref={scope}
        className="absolute top-3 right-3 cursor-pointer"
      >
        <CiCircleChevDown className="text-2xl" />
      </motion.span>

      <div className="flex justify-center items-center gap-1 mb-6 mt-4">
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

      {showFolderBarContent && (
        <motion.div
          layout
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.1 }}
        >
          <div className="grid grid-cols-2">
            <div className="col-span-1 relative z-20 text-white" ref={ref}>
              <button
                onClick={() => setFolderType("NOTE")}
                className={`${
                  folderType === "NOTE" && "text-black"
                } rounded p-2 z-20 `}
              >
                NoteFolder
              </button>
              <motion.div
                variants={folderButtonVariants}
                animate={folderType}
                className="rounded-xl shadow bg-white absolute col-span-1 inset-0 -z-10"
              ></motion.div>
            </div>
            <button
              onClick={() => setFolderType("CODE")}
              className={`${
                folderType === "CODE" && "text-black"
              } rounded p-2 col-span-1 z-20`}
            >
              CodeFolder
            </button>
          </div>
          {isLoading || !folders ? (
            <div className="flex justify-start items-center gap-1 mt-4">
              <span>Getting folders</span>
              <ImSpinner className="animate-[spin_linear_2s_infinite]" />
            </div>
          ) : (
            <FolderList folders={folders} contentType={folderType} />
          )}
        </motion.div>
      )}
    </div>
  );
};

export default FolderBar;
