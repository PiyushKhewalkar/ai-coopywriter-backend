import { Router } from "express";

const campaignRouter = Router()

campaignRouter.get("/", getAllCampaigns)

campaignRouter.get("/:campaignId", getCampaign)

campaignRouter.post("/generate", generateCampaign)

campaignRouter.delete("/:campaignId", deleteCampaign)

export default campaignRouter