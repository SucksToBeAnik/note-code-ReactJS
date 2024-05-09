import { useState } from "react";
import HeroImage from "../../assets/hero.jpg";
import { motion } from "framer-motion";

import MarkdownPreview from '@uiw/react-markdown-preview';

const Hero = () => {
  const text = "With minimal steps";

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 min-h-[500px] w-full container max-w-screen-xl mx-auto">
      <motion.div
        initial={{ x: -1000 }}
        animate={{
          x: 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:row-span-2 col-span-1 bg-purple-800 rounded-md text-white p-4 pl-8 place-content-center rounded-r-full"
      >
        <h1 className="text-2xl md:text-6xl tracking-wider mb-2 md:mb-4">
          Take useful{" "}
          <span className="bg-white text-black p-1 rounded shadow border-2 text-sm md:text-3xl border-black uppercase">
            notes
          </span>
        </h1>
        <h1 className="text-2xl md:text-5xl tracking-wider mb-8 ">
          Write complex{" "}
          <span className="bg-zinc-200 text-black p-1 rounded shadow border-2 text-sm md:text-3xl border-black uppercase">
            codes
          </span>
        </h1>
        <p className=" pl-4 border-l-4 text-md overflow-hidden md:text-2xl font-semibold">
          {Array.from(text).map((char, idx) => {
            return (
              <motion.span
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: idx * 0.1,
                  repeat: Infinity,
                  duration: 5,
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </p>
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="md:row-span-1 col-span-1 place-self-center"
      >
        {/* Image */}
        <img src={HeroImage} className="h-80 w-80" />
      </motion.div>

      <motion.div
        initial={{ x: 1000 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-purple-800 text-white rounded-t-2xl md:rounded-2xl shadow-lg p-4 min-h-full md:ml-8"
      >
        <div className="grid grid-cols-2 gap-4">
          <HeroPageMarkdown />
        </div>
      </motion.div>
    </div>
  );
};

const HeroPageMarkdown = () => {
  const [mdText, setMdText] = useState("");

  return (
    <>
      <div className="col-span-2 md:col-span-1 gap-2">
        <h1 className="text-2xl font-semibold uppercase mb-3">
          Markdown Support
        </h1>
        <textarea
          onChange={(e) => setMdText(e.target.value)}
          defaultValue={mdText}
          rows={5}
          className="w-full border-b-4 border-white bg-transparent shadow-lg outline-none text-white p-2 resize-none"
          placeholder="Write Something..."
        />
      </div>

      <div className="col-span-2 min-h-[150px] md:h-auto md:col-span-1 text-white pl-4 border-l-2 mx-2">
        <MarkdownPreview source={mdText} style={{backgroundColor: "transparent"}} />
      </div>
    </>
  );
};

export default Hero;
