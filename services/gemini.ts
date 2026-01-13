
import { GoogleGenAI, Type } from "@google/genai";
import { Scholarship, CollegeInfo, Opportunity, EssayFeedback } from "../types";

// The API key must be obtained exclusively from process.env.API_KEY.
// Use a function to ensure we always have the freshest client if needed.
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const findScholarships = async (profile: string): Promise<{ scholarships: Scholarship[], citations: any[] }> => {
  const ai = getAI();
  const prompt = `Based on this student profile: "${profile}", find 5 relevant and currently open scholarships. 
  Include specific details like amount, deadline, and eligibility. 
  Provide the result in a valid JSON format with a root key "scholarships". 
  Use search to find real, current data.`;

  // Search Grounding: Only tools: googleSearch is permitted. 
  // Config rules: DO NOT use responseMimeType: "application/json" with search grounding as it can conflict with grounding metadata output.
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  try {
    // Extract JSON from text as search grounding might include conversational text or markdown blocks.
    const text = response.text || '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const data = JSON.parse(jsonMatch ? jsonMatch[0] : text);
    return { 
      scholarships: data.scholarships || [],
      citations: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (e) {
    console.error("Failed to parse scholarships", e);
    return { scholarships: [], citations: [] };
  }
};

export const researchCollege = async (collegeName: string): Promise<CollegeInfo | null> => {
  const ai = getAI();
  const prompt = `Research the college "${collegeName}". Provide detailed information in JSON format including:
  name, location, rank, acceptanceRate, tuition, notablePros (array of strings), notableCons (array of strings), and url (official website).
  Use real-time search data.`;

  // Search Grounding: response.text may not be valid JSON if responseMimeType is used, so we handle extraction manually.
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
    }
  });

  try {
    const text = response.text || '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    return JSON.parse(jsonMatch ? jsonMatch[0] : text);
  } catch (e) {
    console.error("Failed to parse college info", e);
    return null;
  }
};

export const getEssayFeedback = async (essay: string): Promise<EssayFeedback | null> => {
  const ai = getAI();
  const prompt = `Act as an Ivy League admissions officer. Provide deep, critical feedback on this college application essay: "${essay}". 
  Evaluate the narrative, voice, and alignment with top-tier expectations. Provide a score out of 10.`;

  // Complex reasoning task for Gemini 3 Pro with thinking budget.
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      thinkingConfig: { thinkingBudget: 16000 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
          suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
          grammarCheck: { type: Type.STRING }
        },
        required: ["score", "strengths", "weaknesses", "suggestions", "grammarCheck"]
      }
    }
  });

  try {
    return JSON.parse(response.text || 'null');
  } catch (e) {
    console.error("Failed to parse essay feedback", e);
    return null;
  }
};

export const scoutOpportunities = async (query: string): Promise<Opportunity[]> => {
  const ai = getAI();
  const prompt = `Search for 5 internships, summer camps, or research opportunities for high school/college students based on: "${query}". 
  Return results as a JSON array of objects with title, organization, type, location, description, and link.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
    }
  });

  try {
    const text = response.text || '';
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    return JSON.parse(jsonMatch ? jsonMatch[0] : text);
  } catch (e) {
    console.error("Failed to parse opportunities", e);
    return [];
  }
};
