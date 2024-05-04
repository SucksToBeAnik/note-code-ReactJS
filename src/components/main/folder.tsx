import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CiCirclePlus } from "react-icons/ci";
import { CiFileOn } from "react-icons/ci";
import { FaRegFileCode } from "react-icons/fa";

import { CiCircleChevDown } from "react-icons/ci";
import { CiFolderOn } from "react-icons/ci";
import { createFolder, getFolders } from "../../server/queries/folders";
import { useEffect, useState } from "react";
import { RecordModel } from "pocketbase";
import { motion, useAnimate } from "framer-motion";
import { useDispatch } from "react-redux";
import { setContent } from "../../store/slices/contentSlice";
import NoteCreateForm from "../form/note-create-form";
import { ImSpinner } from "react-icons/im";
import Toast from "../ui/toast";

const Folder = () => {
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

// new component
const FolderList = ({
  folders,
  contentType,
}: {
  folders: RecordModel[];
  contentType: "NOTE" | "CODE";
}) => {
  return (
    <div className="mt-4 p-2 bg-white text-black rounded space-y-4">
      {folders.length === 0 && (
        <p className="text-gray-600 text-sm">No folders</p>
      )}
      {folders.map((folder, idx) => {
        return (
          <div key={idx} className="border-b-2 ">
            <SingleFolder folder={folder} contentType={contentType} />
          </div>
        );
      })}
    </div>
  );
};

const SingleFolder = ({ folder, contentType }) => {
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
      <motion.div initial={{height:0}} animate={{height:'auto'}} className="flex justify-between items-center mb-2">
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

const FolderContent = ({
  contents,
  contentType,
}: {
  contents: RecordModel[];
  contentType: "NOTE" | "CODE";
}) => {
  const dispatch = useDispatch();

  function handleSelectContent(contentId: string) {
    dispatch(
      setContent({
        id: contentId,
        type: contentType,
      })
    );
  }

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
        <>
          {contents.map((content, idx) => {
            return (
              <div
                onClick={() => handleSelectContent(content.id)}
                key={idx}
                className="flex justify-start items-center gap-1 cursor-pointer"
              >
                {contentType === "NOTE" ? <CiFileOn /> : <FaRegFileCode />}
                <h1>{content.title}</h1>
              </div>
            );
          })}
        </>
      )}
    </motion.div>
  );
};

export default Folder;
