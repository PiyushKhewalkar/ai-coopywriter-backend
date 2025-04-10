import express from "express"
import cors from "cors"

// environment variables
import {PORT, NODE_ENV} from "./config/env.js"

//database
import connectToDatabase from "./database/mongodb.js"

// routes
import personaRouter from "./routes/persona.routes.js"
import productRouter from "./routes/product.routes.js"
import campaignRouter from "./routes/campaign.routes.js"

const app = express()
app.use(cors());

app.use(express.json());

app.use("/api/persona", personaRouter)
app.use("/api/product", productRouter)
app.use("/api/campaign", campaignRouter)

app.get("/", (req, res) => {
  res.send("Home directory")
})

app.listen(PORT, async()=>{
  console.log(`Your app is running at http://www.localhost:${PORT} in ${NODE_ENV} mode`)
  await connectToDatabase()
})