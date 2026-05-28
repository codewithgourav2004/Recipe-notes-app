//server ko start krna 
//db se connect krna
//username=gourav   
//password-Tl3dNDBBPUvM4jPn
//mongodb+srv://gourav:Tl3dNDBBPUvM4jPn@cluster0.3gsysl8.mongodb.net/


require("dotenv").config()
const app=require("./src/app")
const connectToDb=require("./src/config/database")


connectToDb()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})