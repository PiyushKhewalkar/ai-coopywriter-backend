import mongoose from "mongoose";

const { Schema } = mongoose;

const EmailContentSchema = new Schema({
    subject: String,
    body: String,
    cta: String
  }, { _id: false });

  const FacebookAdContentSchema = new Schema({
    headline: String,
    body: String,
    cta: String
  }, { _id: false });


  const SMSContentSchema = new Schema({
    message: String
  }, { _id: false });

  const CampaignContentSchema = new Schema({
    channel: {
      type: String,
      enum: ['email', 'sms', 'facebook']
    },
    emailContent: EmailContentSchema,
    facebookAdContent: FacebookAdContentSchema,
    smsContent: SMSContentSchema
  }, { _id: false });
  
  
  

const CampaignSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    product : {
      type : String
    },
    chosenAvatarId: {
        type: Schema.Types.ObjectId,
        ref: 'Avatar',
        required: true
    },

    chosenProductId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },

    chosenChannels: [{
        type: String,
        required: true,
        enum: ['email', 'sms', 'facebook']
    }],

    campaignContent: [CampaignContentSchema]

}, {timestamps:true})

const Campaign = mongoose.model("Campaign", CampaignSchema)

export default Campaign