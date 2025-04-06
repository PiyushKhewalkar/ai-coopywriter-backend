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

        const {name, avatarId, productId, selectedChannels} = req.body

        const selectedAvatar = await BuyerPersona.findById(avatarId)

        const selectedProduct = await Product.findById(productId)

        if (!selectedAvatar || !selectedProduct) return res.status(404).json({error: "Avatar or Product not found"})

        const campaign = new Campaign({
            name : name,
            chosenAvatarId : avatarId,
            chosenProductId : productId,
            chosenChannels : selectedChannels,
            campaignContent : []
        })

        for (const channel of selectedChannels) {

            const campaignJson = await generateCampaignJson(selectedAvatar, selectedProduct, channel)

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