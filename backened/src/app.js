// kaam-server ko create krna

const express = require("express");
const cors=require("cors")
const app = express();
const path=require("path")
const noteModel = require("./models/notes.model");
app.use(express.static("./public"))

app.use(cors({
    origin: "https://recipe-notes-app.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));

app.use(express.json());


// POST /notes
// req.body => { title, description }

app.post("/post", async (req, res) => {

    try {

        const { title, discription } = req.body;

        const note = await noteModel.create({
            title,
            discription
        });

        res.status(201).json({
            message: "Note created Successfully",
            note
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });

    }

});

//get /notes

app.get("/post",async (req,res)=>{
  const notes=  await noteModel.find()

  res.status(200).json({
message:"notes feteched sucessfully",
notes
  })
//   console.log(req.query.name)
})

//delte note with the id 

app.delete('/post/:id',async(req,res)=>{
    const id =req.params.id
    console.log(id)

    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"note delte sucessfully"
    })
})

//note update krna-patch api


app.patch('/post/:id', async(req,res)=>{
    const id=req.params.id
    const {discription}=req.body

    await noteModel.findByIdAndUpdate(id,{discription})

    res.status(200).json({
        message:"note updated successfully"
    })
})
app.put("/post/:id", async (req, res) => {

  try {

    const { title, discription } = req.body

    const updatedNote = await noteModel.findByIdAndUpdate(
      req.params.id,
      {
        title,
        discription
      },
      { new: true }
    )

    res.json({
      success: true,
      updatedNote
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    })
  }
 
})
console.log(__dirname)




module.exports = app;