
import { GoogleGenAI } from "@google/genai";

export const getFinancialAdvice = async (userContext: string, userLanguage: string = 'portuguese') => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Você é o assistente virtual da Zifolio, um especialista em finanças para o mercado de Angola.
      O usuário perguntou: "${userContext}".
      A língua de origem nacional do usuário é: ${userLanguage}.
      
      INSTRUÇÕES IMPORTANTES:
      1. Comece a resposta com uma saudação curta e calorosa na língua ${userLanguage}.
      2. Dê conselhos práticos sobre o mercado de Angola.
      3. Use termos locais como Kwanza (Kz), kumbu, damba, etc.
      4. Se possível, inclua um provérbio ou expressão típica da cultura associada à língua ${userLanguage} que se aplique a finanças.
      5. Responda predominantemente em Português de Angola, mas salpique a resposta com termos da língua ${userLanguage}.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Desculpe, tive um problema ao processar seu conselho agora. Tente novamente mais tarde!";
  }
};

export const getPersonalizedDailyTip = async (profile: string, name: string, language: string = 'portuguese') => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Você é o mentor financeiro da Zifolio. 
      O usuário chama-se ${name}, tem o perfil ${profile} e sua língua de origem é ${language}.
      
      Gere uma dica CURTA e IMPACTANTE (máximo 3 parágrafos) para hoje.
      - A dica deve ser focada no perfil ${profile}.
      - Use o contexto de Angola (BODIVA, Títulos do Tesouro, inflação, etc.).
      - Integre naturalmente saudações e termos da língua ${language} para criar conexão cultural.
      - Seja motivador e respeite a diversidade étnica de Angola.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Daily Tip Error:", error);
    return "Mantenha o foco no seu plano financeiro hoje. O segredo da riqueza é a constância!";
  }
};
