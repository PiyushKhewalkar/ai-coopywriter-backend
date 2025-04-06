import OpenAI from "openai";

import { OPENAI_API_KEY } from "../config/env.js";

import { zodResponseFormat } from "openai/helpers/zod"

import personaZodResponseFormat from "../utils/persona.zod.js";

import { campaignSchemas } from "../utils/campaigns.zod.js";

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

export const generateCampaignJson = async(avatar, product, channel) => {

  console.log("Generating Campaign json")

  // get the zod of chosen channel
  const campaignZodResponseFormat = campaignSchemas[channel]

  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are a marketing strategist with deep expertise in creating channel-specific, high-converting campaigns.

Your task is to generate a compelling marketing message tailored for the channel: ${channel}.  
Use the customer avatar and product information below to create emotionally engaging, persuasive, and personalized content.

But remember not to use customer avatar the real customer. Don't use the persona names, and specified demographics in the message, instead use placeholders

---

👤 Customer Avatar - Don't write "to-him" write for people like him:

- Name: ${avatar.name}
- Age Range: ${avatar.ageRange}
- Gender: ${avatar.gender}
- Location: ${avatar.location}
- Marital Status: ${avatar.maritalStatus}
- Income Level: ${avatar.incomeLevel}
- Education: ${avatar.educationLevel}
- Job Title: ${avatar.jobTitle}
- Industry: ${avatar.industry}
- Short Bio: ${avatar.twoOrThreeLinerDescription}

**Goals & Aspirations**
- Primary Goal: ${avatar.goalsAndAspirations.primaryGoal}
- Secondary Goals: ${avatar.goalsAndAspirations.secondaryGoals.join(", ")}
- Long-Term Vision: ${avatar.goalsAndAspirations.longTermVision}

**Pain Points**
- Biggest Problems: ${avatar.painPointsAndChallenges.biggestProblems.join(", ")}
- Frustrations: ${avatar.painPointsAndChallenges.frustration.join(", ")}
- Common Objections: ${avatar.painPointsAndChallenges.commonObjections.join(", ")}

**Buying Behavior**
- Active Platforms: ${avatar.buyingBehaviour.platforms.join(", ")}
- Influencers Followed: ${avatar.buyingBehaviour.influencersFollowed.join(", ")}
- Content Preferences: ${avatar.buyingBehaviour.contentTypes.join(", ")}
- Decision Process: ${avatar.buyingBehaviour.decisionMakingProcess.join(" ")}

**Psychological Triggers**
- Emotional: ${avatar.psychologicalTriggers.emotionalTriggers.join(", ")}
- Logical: ${avatar.psychologicalTriggers.logicalTriggers.join(", ")}
- Social Proof Preferences: ${avatar.psychologicalTriggers.socialProofPreferences.join(", ")}

**Tone Preference**: ${avatar.solutionFit.messagingTone}

---

📦 Product Details:

- Name: ${product.name}
- Category: ${product.category}
- Description: ${product.description}
- Target Market: ${product.targetMarket}
- Pressing Problem Solved: ${product.pressingProblem}
- Desired Outcome for the Customer: ${product.desiredOutcome}
- USP: ${product.usp}
- Specific Method: ${product.specificMethod}
- Featured In: ${product.featuredIn}
- Scientific Studies / Research / Stats : ${product.specificStats}
- Credible Figure: ${product.credibleFigure}
- Unique Mechanism: ${product.uniqueMechanism}
- Testimonials: ${product.testimonials || "None provided"}
- Total number of Reviews : ${product.numberOfReviews || null}
- Total Number of customers : ${product.numberOfCustomers || null}
- Average Rating : ${product.avgRating || null}

---

Now write a persuasive message tailored to ${channel}, using the information above to emotionally connect with the customer and position the product as the ideal solution to their needs.
`
      }

    ],
    response_format: zodResponseFormat(campaignZodResponseFormat, "campaign")
  })

  const response = completion.choices[0]?.message?.parsed || {}

  console.log(response);

  return response
}