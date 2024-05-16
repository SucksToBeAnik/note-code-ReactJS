import { IoIosCloseCircleOutline } from "react-icons/io";

interface CodeOutputProps {
  success: boolean;
  output: string;
  language: string;
  handleCloseOutput: () => void;
}
const CodeOutput: React.FC<CodeOutputProps> = ({
  output,
  success,
  language,
  handleCloseOutput,
}) => {
  return (
    <div className="fixed inset-0 h-screen w-screen z-[1000]">
      <div className="flex justify-center items-center w-full h-full backdrop:blur-md bg-gray-600/90">
        <div className="p-4 rounded bg-black text-white w-3/4 md:w-2/4 relative">
          <div className="flex justify-start items-center gap-2 mb-6">
            <span className="bg-purple-700 rounded text-sm p-1">
              {language}
            </span>
            <span
              className={`${
                success ? "bg-emerald-600" : "bg-red-400"
              } p-1 text-sm rounded shadow`}
            >
              {success ? "success" : "error"}
            </span>
          </div>
          <code className="block pl-4 border-l-4 border-l-white">{output}</code>

          <IoIosCloseCircleOutline
            onClick={handleCloseOutput}
            className="absolute top-1 right-1 w-6 h-6 block cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default CodeOutput;
