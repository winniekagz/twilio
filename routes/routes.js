const express=require("express")
const momentTimeZone=require('moment-timezone');
const moment=require('moment');
const Appointment = require("../models/appointment");
const router=express.Router()

const getTimeZones = function() {
  return momentTimeZone.tz.names();
};

router.get("/",function(req,res,next){
    Appointment.find().then(function(appointments){
        res.render("appointments/index",{appointments:appointments});
    });
})

router.get("/create",function(req,res,next){
    res.render("appointments/create",{
        timeZones:getTimeZones(),
        appointments:new Appointments
    })
})

router.post("/",function(req,res,next){
    const name=req.body.name;
    const phoneNumber=req.body.phoneNumber;
    const notification=req.body.notification;
    const timeZone=req.body.timeZone;
    const time=moment(req.body.time, "MM-DD=YYY  hh:mma");

    const appointment=new Appointment({
        name:name,
        phoneNumber:phoneNumber,
        notification:notification,
        timeZone:timeZone,
        time:time


    });
    appointment.save()
    .then(function(){
        res.redirect("/")
    });

});
 router.post("/:id/edit",function(req,res,next){
     const id=req.params.id;
     const name=req.body.name;
     const phoneNumber=req.body.name;
     const notification=req.body.notification;
     const timeZone=req.body.timeZone;
     const time=moment(req.body.time,"MM-DD-YYY hh:mma")

     Appointment.findOne({_id:id})
     .then(function(appointment){
         appointment.name=name;
         appointment.phoneNumber=phoneNumber;
         appointment.notification=notification;
         appointment.timeZone=timeZone;
         appointment.time=time;

         appointment.save()
         .then(function(){
             res.redirect('/')
         });
     });
 });

 router.post('/:id/delete',function(req,res,next){
     const id=req.params.id;

     Appointment.remove({_id:id})
     .then(function(){
         res.redirect("/")
     });
 });
module.exports=router