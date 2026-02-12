
import { GoogleGenAI, Type } from "@google/genai";
import { CartItem, AIResponse } from "./types";

// Guideline: Always create a new GoogleGenAI instance before making an API call 
// to ensure it uses the most up-to-date API key from the environment.

export async function getRecipeSuggestions(cartItems: CartItem[]): Promise<AIResponse> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const itemsList = cartItems.map(item => `${item.quantity}x ${item.name}`).join(', ');
  
  const prompt = `I have these groceries in my cart: ${itemsList}. 
  Suggest a creative recipe I can cook using primarily these ingredients. 
  If I'm missing something important, mention it as a "pro tip".`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview", // Use pro for complex instruction following and recipe generation
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recipeName: { type: Type.STRING },
            ingredients: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            instructions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            estimatedTime: { type: Type.STRING },
            tips: { type: Type.STRING }
          },
          required: ["recipeName", "ingredients", "instructions", "estimatedTime", "tips"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Gemini returned an empty response.");
    }
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Gemini recipe generation failed:", error);
    // Fallback response for better UX
    return {
      recipeName: "Farm Fresh Medley",
      ingredients: cartItems.map(i => i.name),
      instructions: [
        "Rinse all ingredients thoroughly.",
        "Saute in Abhyuday Wood-Pressed Oil until tender.",
        "Season with salt and pepper to taste."
      ],
      estimatedTime: "15 mins",
      tips: "Always use fresh ingredients for the best H3+ quality experience."
    };
  }
}

export async function getNutritionInsight(productName: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Provide a very brief (2 sentences max) nutritional fun fact about ${productName}.`;
    
    try {
      const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: prompt
      });
      return response.text || "No insights found for this product.";
    } catch (error) {
      console.error("Gemini nutrition insight failed:", error);
      return "Nutritional facts are currently unavailable.";
    }
}
