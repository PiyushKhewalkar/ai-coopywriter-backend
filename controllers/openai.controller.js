import OpenAI from "openai";

import { OPENAI_API_KEY } from "../config/env.js";

import { zodResponseFormat } from "openai/helpers/zod"

import personaZodResponseFormat from "../utils/persona.zod.js";

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
});

const generatePersonaJson = async(product, targetMarket, problem, industry) => {
    const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
            
            What do they sell : ${product}
            Target market : ${targetMarket}
            problem their product or service solves : ${problem}
            industry they focus on : ${industry}


            Given the Information, you are an expert market researcher specializing in creating highly detailed buyer personas. 

Given the industry and service, generate a **realistic and well-defined buyer persona** that accurately reflects the ideal customer profile. The persona should include deep insights into their **goals, pain points, buying behavior, and psychological triggers**, ensuring it aligns with the provided industry and service.

Make sure the persona is detailed, non-generic, and practical, resembling a real-life customer. The response must strictly follow the structured format defined in the responseFormat schema.`
          }
    
        ],
        response_format: zodResponseFormat(personaZodResponseFormat, "buyerpersona")
      })
    
      const response = completion.choices[0]?.message?.parsed || {}
    
      console.log(response);
    
      return response
}

export default generatePersonaJson