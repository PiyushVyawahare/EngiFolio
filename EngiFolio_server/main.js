const express = require("express");
const db = require("./database");
const userModelInstance = require("./database/models/user.js");
const sendMail = require("./utils/sendMail");
const cors = require("cors");
const bcrypt = require("bcrypt");
const userModel = userModelInstance.model;
const userTypeEnums = userModelInstance.userRoleEnums;
const otpModel = require("./database/models/otp.js");
const jwt = require("jsonwebtoken");  
const dotenv = require("dotenv");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")







var app = express();

app.use(function(req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}))
app.use(bodyParser.json())
app.use(cookieParser())
db.init();
dotenv.config();

const jwtExpirySeconds = 300;

app.get("/", function(req, res){
  const token = req.cookies.token;
  if(!token)
    return res.status(401).end()
  var payload = jwt.verify(token, process.env.TOKEN_SECRET)
  res.status(200).end(JSON.stringify(payload));
})


app.post('/register', function(req, res){
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var cpassword = req.body.cpassword;

  if(!name || !email || !password || !cpassword){
		res.status(400).end();
		return;
	}

  if(password !== cpassword){
		res.status(401).end();
		return;
	}

  userModel.findOne({email: email})
  .then(function(user){
    if(user)
      res.status(409).end();
    else{
      bcrypt
      .hash(password, 10)
      .then((hashedPassword) => {
        userModel.create({
          email: email,
          name: name,
          password: hashedPassword,
          isVerified: false,
          userType: userTypeEnums.customer
        })
        .then(function(user){
          
          sendMail(
            email, 
            "Welcome to EngiFolio | Verify email",
            generateOtp(user._id),
            "verify email",
            function(err){
              if(err){
                res.status(500).end();
              }
              else{
                res.status(200).end(JSON.stringify({userId: user._id, email: user.email}));
              }
            }
          )
        })
      })
    }
  })
  
});

app.post("/resendOtp", function(req, res){
  userModel.findOne({_id: req.body.userId}).then(function(user){

    sendMail(
      user.email, 
      "Welcome to EngiFolio | Verify email",
      generateOtp(req.body.userId),
      "verify email",
      function(err){
        if(err){
          res.status(500).end();
        }
        else{
          res.status(201).end();
        }
      }
    )
  })
})
  
  
function generateOtp(userId){
  let otp = ""+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10);
  bcrypt
  .hash(otp, 10)
  .then((hashedOtp) => {
    otpModel.updateOne(
      {userId: userId},
      {
        userId: userId,
        otp: hashedOtp,
      },
      {upsert : true}
    )
    .then(function(res){
      console.log(res);
    })
    .catch(function(err){
      console.log(err);
    })
  })
  
  return otp;
}

app.post("/verifyUser", function(req, res){
  var userId = req.body.userId;
  var otp = req.body.otp;

  if(!userId || !otp){
		res.status(400).end();
		return;
	}

  otpModel.findOne({userId: userId})
  .then(function(user){
    if(user && user.expireAt > Date.now()){
      bcrypt
      .compare(otp, user.otp)
      .then(function(data){
        if(data == true){
          deleteOtpFromDatabase(userId);
          makeUserVerified(userId);
          res.status(200).end();
        }
        else{
          res.status(401).end();
        }
      })
      .catch(function(err){
        res.status(401).end();
      })
    }
    else{
      res.status(404).end();  
    }
  })
  .catch(function(err){
    res.status(404).end();  
  })
})


function deleteOtpFromDatabase(userId){
  otpModel.deleteMany({userId: userId})
  .then(function(del){
    console.log("deleted")
  })
}

function makeUserVerified(userId){
  userModel.updateOne(
    {_id: userId},
    {isVerified: true}
  ).then(function(resu){
    console.log(resu)
  })
}


app.post("/login", function(req, res){
  var email = req.body.email;
  var password = req.body.password;

  userModel.findOne({email: email})
  .then(function(user){
    if(user){
      if(user.isVerified === true){
        bcrypt
        .compare(password, user.password)
        .then(function(flag){
          if(flag === true){
            var token = jwt.sign(
              {
                email: user.email, 
                name: user.name,
                isLoggedIn: true,
              }, process.env.TOKEN_SECRET,
              {expiresIn: 3600}
            );
            // console.log(token);
            //console.log(token);
            // var decoded = jwt.verify(
            //   token,
            //   process.env.TOKEN_SECRET,
            // )
            // console.log(decoded);
            res.cookie("token", token, {maxAge: 3600000});
            res.status(200).end();
          }
          else
            res.status(401).end();
        })
        .catch(function(err){
          console.log(err);
        }) 
      }
      else{
        sendMail(
          user.email, 
          "Welcome to EngiFolio | Verify email",
          generateOtp(user._id),
          "verify email",
          function(err){
            if(err){
              res.status(500).end();
            }
            else{
              res.status(201).end(JSON.stringify({userId: user._id, email: user.email}));
            }
          }
        )
      }
    }
    else{
      res.status(404).end();
    }
  })
  .catch(function(err){
    console.log(err);
  });
});

app.get("/logout", function(req, res){
  res.clearCookie("token");
  res.status(200).end("Successfully logged out");
})


app.listen(8000, function(){
	console.log("server running at port http://localhost:3000");
})