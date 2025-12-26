
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

/**
 * Edits an image using the Gemini 2.5 Flash Image model based on a provided text prompt.
 * Uses the @google/genai SDK following strict initialization guidelines.
 */
export const editImageWithGemini = async (
  base64Image: string,
  prompt: string
): Promise<string> => {
  // Always initialize a fresh client instance with the required process.env.API_KEY.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Prepare image data for transmission by splitting the data URL
  const imageData = base64Image.split(',')[1];
  const mimeType = base64Image.split(';')[0].split(':')[1];

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: imageData,
              mimeType: mimeType,
            },
          },
          {
            text: `Please edit this image based on the following instruction: ${prompt}. Output only the resulting edited image.`,
          },
        ],
      },
    });

    // Extract the resulting image from the generated response candidates
    const candidate = response.candidates?.[0];
    if (!candidate?.content?.parts) {
      throw new Error("No response parts received from Gemini.");
    }

    // Iterate through candidates to find the image payload (which may not be the first part)
    for (const part of candidate.content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }

    throw new Error("Gemini returned text but no edited image part.");
  } catch (error) {
    console.error("Gemini Image Editing Error:", error);
    throw error;
  }
};
