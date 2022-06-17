const express=require("express");
const Router=express.Router();
const homeSchema=require("../models/homeSchema")
Router.get("/",(req,res)=>{
res.render("register",{title:"Fill Form",password:"",email:""})
})

// signup

Router.post("/register",async(req,res)=>{
    try{
       const {
        name,
        number,
        email,
        password,
        cpassword
       }=req.body;
    //    console.log(name)

    if(password === cpassword){
        // console.log("ok")
        const userData=new homeSchema({
            name,
        number,
        email,
        password
        })
        // if(name==null || email==null || number==null || password ==null || password==null){
        //     res.render("register",{title:"Please fill the all input box",password:"",email:""})
        // }
        userData.save(err=>{
           if(err){
            console.log("Error")
            // res.render("register",{title:"Sorry",password:"",email:""})
           }
           else{
            res.render("register",{title:"Register Done",password:"",email:""})
           
           }
        })


        const useremail=await homeSchema.findOne({email:email})
            // console.log(useremail.email)
            if(email===useremail.email){
                res.render("register",{title:"",password:"",email:"This email is already there please enter different-one"})

            }
            else{

            }
    }
    else{
        res.render("register",{title:"",password:"Password not match",email:""})
    }
    }
    catch(error){
        res.render("register",{title:"Please filled the correct data",password:"",email:""})
    }
})


//SignIn

Router.post('/login',(req,res)=>{
    
    const {
        email,
        password    
    } = req.body;

    homeSchema.findOne({email:email},(err,result)=>{
        
        if(email === result.email && password === result.password){
            res.render('dashbord', {name : result.name})
        }else{
            console.log(err)

        }
    })
})
module.exports=Router;