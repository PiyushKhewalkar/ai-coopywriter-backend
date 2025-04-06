import Campaign from "../models/campaign.model.js"
import BuyerPersona from "../models/persona.model.js"
import Product from "../models/product.model.js"

import { generateCampaignJson } from "./openai.controller.js"

export const getAllCampaigns = async(req, res, next) => {
    try {

        const campaigns = await Campaign.find()

        return res.status(200).json({success : true, campaigns})
        
    } catch (error) {
        return res.status(500).json({success : false, error : "Internal Server Error", details : error.message})
    }
}

export const getCampaign = async(req, res, next) => {
    try {

        const {campaignId} = req.params

        const campaign = await Campaign.findById(campaignId)

        if (!campaign) return res.status(404).json({error : "Campaign Not Found"})

        return res.status(200).json({success : true, campaign})
        
    } catch (error) {
        return res.status(500).json({success : false, error : "Internal Server Error", details : error.message})
    }
    
}

export const generateCampaign = async(req, res, next) => {
    try {

        /**
         * 
        
        1. get the selected avatar, product and channels

        2. call AI API and get response

        3. return the response

         */

        const {avatarId, productId, selectedChannels} = req.body

        const selectedAvatar = await BuyerPersona.findById(avatarId)

        const selectedProduct = await Product.findById(productId)

        if (!selectedAvatar || !selectedProduct) return res.status(404).json({error: "Avatar or Product not found"})

        const campaignJson = await generateCampaignJson(selectedAvatar, selectedProduct, selectedChannels)

        // save the campaign to database

        // return the campaign
        
    } catch (error) {
        return res.status(500).json({success : false, error : "Internal Server Error", details : error.message})
    }
}