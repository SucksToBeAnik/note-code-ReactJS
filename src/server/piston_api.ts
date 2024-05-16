import { type CodeLanguage } from "../store/slices/contentSlice";

export interface RunCodeProps {
  language: CodeLanguage;
  title: string;
  body: string;
}

const languageVersions = {
  typescript: {
    version: "5.0.3",
    extension: "ts",
  },
  javascript: {
    version: "1.32.3",
    extension: "js",
  },
  python: {
    version: "3.10.0",
    extension: "py",
  },
};

interface RunCodeReturnType {
  run: {
    stdout: string;
    stderr: string;
    code: 0 | 1;
    signal: null | string;
    output: string;
  };
  language: string;
  version: string;
}

export async function runCode(data: RunCodeProps) {
  try {
    const header = new Headers();
    header.append("Content-Type", "application/json");
    const res = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      body: JSON.stringify({
        language: data.language,
        version: languageVersions[data.language].version,
        files: [
          {
            name: data.title
              .replace(" ", "_")
              .concat(`.${languageVersions[data.language].extension}`),
            content: data.body,
          },
        ],
      }),
    });

    const jsonData: RunCodeReturnType = await res.json();

    return jsonData;
  } catch (error) {
    throw new Error("Something went wrong!");
  }
}
