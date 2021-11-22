require('serve-favicon');
const express=require('express');
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const path=require("path")
const logger=require("morgan");
const cookieParser=require("cookie-parser")
const bodyParser=require("body-parser")

const appointments=require("./routes/routes")
const scheduler=require ('./ScheduleTask')


dotenv.config();
const app = express();
port=process.env.PORT ||4000
// setting up engine file
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug')


// middlewares
app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')))
app.locals.moment=require('moment')

app.use('/appointments',appointments);
app.use('/',appointments)
// connect db
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
     useUnifiedTopology:true
     })
.then((result)=>console.log(" db connected"))
.catch((err) =>console.log(err));

// catch 404 error
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.error(err);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});
scheduler.start();
module.exports =app;


app.listen(process.env.PORT,()=>{
    console.log(`listenninf to port ${port}`)
})