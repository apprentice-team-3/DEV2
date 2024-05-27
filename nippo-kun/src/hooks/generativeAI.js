import { useEffect, useState } from "react";

const { GoogleGenerativeAI } = require("@google/generative-ai");

export default function useGenerativeAI() {
  const [outputText, setOutputText] = useState("");
  const [run, setRun] = useState(null);

  useEffect(() => {
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);

    const runFunction = async () => {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = "Write a story about a magic backpack.";

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      setOutputText(text);
    };

    setRun(() => runFunction);
  }, []);

  return { outputText, run };
}
