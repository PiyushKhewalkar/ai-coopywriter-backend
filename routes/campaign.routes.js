import { Router } from "express";

const campaignRouter = Router()

import { getAllCampaigns, getCampaign, generateCampaign, deleteCampaign } from "../controllers/campaign.controller";

campaignRouter.get("/", getAllCampaigns)

campaignRouter.get("/:campaignId", getCampaign)

campaignRouter.post("/generate", generateCampaign)

campaignRouter.delete("/:campaignId", deleteCampaign)

export default campaignRouter