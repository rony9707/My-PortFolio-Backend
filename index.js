const express = require('express')

const mongoose = require('mongoose')

const cookieParser = require('cookie-parser')

const app = express();

//Define Routes here
const songRoute = require('./routes/getSong')
const sentEmailRoute = require('./routes/sentEmailToUser')
const connectWithMesentEmailRoute = require('./routes/sentEmailconnectWithMe')


const cors = require('cors')

require('dotenv').config()



//Use dot env
PORT = process.env.PORT
connectionString = process.env.DBConnectionString
frontEndConnectionString = process.env.frontEndConnectionString



//Date Variables
const options = {
  timeZone: 'Asia/Kolkata',
  timeZoneName: 'short',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: false,
};

function getCurrentFormattedDate() {
  const formatter = new Intl.DateTimeFormat('en-US', options);
  return formatter.format(new Date());
}


app.get('/',(req,res)=>{
  const formattedDate = getCurrentFormattedDate();
  res.send(`Server is running... Date is: ${formattedDate}`);
})


// Start using Node------------------------------------------------------------------------
// Middleware
app.use(cors());

//Connect to angular
app.use(cors({
  credentials: false,
  origin:[frontEndConnectionString]
}))


app.use(cookieParser())
app.use(express.json())


app.use("/songApi",songRoute)
app.use("/sentEmail",sentEmailRoute)
app.use("/sentEmailToMe",connectWithMesentEmailRoute)

 

//Connection Code
mongoose.connect(connectionString, {
  useNewUrlParser: true
})
  .then(() => {
    console.log("Connected to database")
   
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  })
