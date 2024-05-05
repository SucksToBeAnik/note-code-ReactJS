import { RecordModel } from "pocketbase";
import { CiFileOn } from "react-icons/ci";
import { FaRegFileCode } from "react-icons/fa";
import { ImSpinner } from "react-icons/im";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { getNoteById } from "../../../server/queries/notes";
import { getCodeById } from "../../../server/queries/codes";
import { setContent } from "../../../store/slices/contentSlice";

interface SingleContentProps {
  content: RecordModel;
  contentType: "NOTE" | "CODE";
}

const SingleContent: React.FC<SingleContentProps> = ({
  content,
  contentType,
}) => {
  const dispatch = useDispatch();

  const { mutate: handleSelectContent, isPending } = useMutation({
    mutationKey: ["content"],
    mutationFn: ({ contentID }: { contentID: string }) => {
      if (contentType === "NOTE") {
        return getNoteById(contentID);
      } else {
        return getCodeById(contentID);
      }
    },
    onSuccess: (res) => {
      dispatch(setContent({ contentType: contentType, content: res || null }));
    },
  });

  return (
    <div
      onClick={() => handleSelectContent({ contentID: content.id })}
      className="flex justify-start items-center gap-1 cursor-pointer"
    >
      {contentType === "NOTE" ? <CiFileOn /> : <FaRegFileCode />}
      <div className="flex justify-between items-center w-full">
        <h1>{content.title}</h1>
        {isPending && (
          <ImSpinner className="animate-[spin_linear_2s_infinite] w-4 text-xl" />
        )}
      </div>
    </div>
  );
};

export default SingleContent;
