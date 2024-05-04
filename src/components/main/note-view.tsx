import { useQuery } from "@tanstack/react-query";
import { getNoteById } from "../../server/queries/notes";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

const NoteView = ({ id }: { id: string | null }) => {
  const { data, isLoading } = useQuery({
    queryKey: [id],
    queryFn: () => {
      if (id) {
        return getNoteById(id);
      }
      return null;
    },
  });

  console.log('DATA',data);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="p-4 border-2 border-black rounded m-2"
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {data ? (
            <div>
              <h1 className="text-xl font-bold">{data?.title}</h1>
              <span className="text-sm font-normal italic pl-4 border-l-2 border-black">
                Last updated on{data?.updated}
              </span>
              <ReactMarkdown
                className="prose my-4"
                children={data?.body || ''}
              />
            </div>
          ) : (
            <p>No note selected</p>
          )}
        </>
      )}
    </motion.div>
  );
};

export default NoteView;
