const connectToMongo=require('./db');
var cors=require("cors")
connectToMongo();
const express = require('express')
const app = express()
const port = 5000

app.use(express.json())
app.use(cors({
  origin:"https://notes-8dn83taj8-yash-baghelas-projects.vercel.app"
}))

//available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});