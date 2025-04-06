// 🔹 Email Content
const EmailContentSchema = z.object({
    subject: z.string(),
    body: z.string(),
    cta: z.string()
  })
  
  // 🔹 Facebook Ad Content
  const FacebookAdContentSchema = z.object({
    headline: z.string(),
    body: z.string(),
    cta: z.string()
  })
  
  // 🔹 SMS Content
  const SMSContentSchema = z.object({
    message: z.string()
  })