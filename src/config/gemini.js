import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// ✅ Hardcoded API key for testing (replace with your actual key)
const apiKey = "AIzaSyCrZpjY3f1wRh4W1GZzLy-j24XWLocyw3Y";
console.log("Gemini API Key Loaded:", apiKey ? "✅ Yes" : "❌ No");

// ✅ Force the SDK to use v1 endpoint
const genAI = new GoogleGenerativeAI(apiKey, {
  apiBaseUrl: "https://generativelanguage.googleapis.com/v1",
});

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-pro", // or "gemini-1.5-flash"
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  console.log(result.response.text());
  return result.response.text();
}

export default run;
