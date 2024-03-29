const connectToMongo=require('./db');
var cors=require("cors")
connectToMongo();
const express = require('express')
const app = express()
const port = 5001

app.use(express.json())
app.use(cors())

//available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.get("/",(r,res)=>{
  res.send("server running")
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});