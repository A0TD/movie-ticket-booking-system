import express from 'express'
import cookieParser from 'cookie-parser'
import ('dotenv/config')

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(cookieParser())


app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})