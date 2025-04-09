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

        const {name, avatarId, productId, channels, goal, offerLine} = req.body

        const selectedAvatar = await BuyerPersona.findById(avatarId)

        const selectedProduct = await Product.findById(productId)

        if (!selectedAvatar || !selectedProduct) return res.status(404).json({error: "Avatar or Product not found"})

        const campaign = new Campaign({
            name : name,
            product : selectedProduct.name,
            chosenAvatarId : avatarId,
            chosenProductId : productId,
            chosenChannels : channels,
            campaignContent : [],
            goal : goal,
            offerLine : offerLine
        })

        for (const channel of channels) {

            const campaignJson = await generateCampaignJson(selectedAvatar, selectedProduct, channel, goal, offerLine)

            campaign.campaignContent.push(campaignJson)

        }

        await campaign.save()

        return res.status(201).json({success: true, message: "campaign generated successfully", campaign})

        
    } catch (error) {
        return res.status(500).json({success : false, error : "Internal Server Error", details : error.message})
    }
}

export const deleteCampaign = async(req, res, next) => {
    try {

        const {campaignId} = req.params

        const campaign = await Campaign.findByIdAndDelete(campaignId)

        if (!campaign) return res.status(404).json({error : "Campaign Not Found"})

        return res.status(200).json({success : true, message: "campaign deleted succesfully"})
        
    } catch (error) {
        return res.status(500).json({success : false, error : "Internal Server Error", details : error.message})
    }
    
}