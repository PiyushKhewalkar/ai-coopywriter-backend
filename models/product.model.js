import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    category : {
        type: String,
        required : true
    },
    description : {
        type: String,
        required : true
    },
    targetMarket : {
        type: String
    },
    pressingProblem : {
        type: String
    },
    desiredOutcome : {
        type: String
    },
    usp : {
        type: String
    },
    specificMethod : {
        type: String
    },
    specificStats : {
        type: String
    },
    featuredIn : {
        type: String
    },
    credibleFigure : {
        type: String
    },
    uniqueMechanism : {
        type: String
    },
    numberofReviews : {
        type: Number
    },
    avgRating : {
        type: Number
    },
    totalCustomers : {
        type: Number
    },
    testimonials : {
        type: String
    }
},
{timestamps: true}
)

const Product = mongoose.model("Product", ProductSchema)

export default Product