import { z } from "zod";

// 🔹 Email Content


export const EmailContentSchema = z.object({
    channel : z.string(),
    emailContent : z.object({
      subject: z.string(),
      body: z.string(),
      cta: z.string()
    })   
  })
  
  // 🔹 Facebook Ad Content
export const FacebookAdContentSchema = z.object({
    channel : z.string(),
    facebookContent : z.object({
    headline: z.string(),
    body: z.string(),
    cta: z.string()
    })
  })
  
  // 🔹 SMS Content
export const SMSContentSchema = z.object({
    channel : z.string(),
    smsContent : z.object({
      message: z.string()
    })
    
  })



// main schema

export const campaignSchemas = {
  email : EmailContentSchema,
  sms : SMSContentSchema,
  facebook : FacebookAdContentSchema
}