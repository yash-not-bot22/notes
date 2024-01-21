const connectToMongo=require('./db');
var cors=require("cors")
connectToMongo();
const express = require('express')
const app = express()
const port = 5000

app.use(express.json())
app.use(cors({
  origin:"https://notes-zeta-six.vercel.app/login"
}))

//available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});