const AuthController = {};

AuthController.login = function(request, response){
    //login route
var users = [{
    username : 'payal',
    password : '123456P',
  },
  {
      username : 'test',
      password: 'abcdefP'
  }];
  //console.log(request.body);
  // now we want to check whether the user entered the data is present in users or not
  var username = request.body.username;
  var password = request.body.password;

  var user = null;
  users.forEach(function(value, index){
      if(value.username == username){
          if(value.password == password){
              user = value;
          }
      }
  });
  //console.log("user:", user);
  if(!user){
      return response.send({
          status : false,
          message : "invalid username or password"
      })
  }

  request.session.user = user;
//   OTPModel.sendOTP(user.phone, function(error, callback){
//       return response.send({
//           status : true,
//           message: "otp has been send to ur phone"
//       })
//   });





  // creating a session
  //console.log(request.session)
  request.session.user = user;

  return response.send({
      status : true,
      message : "successfully logged in"
  })
}
AuthController.verifyOTP = function(request,response){
    if(checkIfOTPisValid){
        request.session.user = user;
    }
    return response.send({
        status: false,
        message : "otp not valid"
    })
}

AuthController.logout = function(request, response){
    var session = request.session;
    session.destroy();

    return response.send({
        status: true,
        message: "logged out!!"
    })

}
// now first we have to check logged in or not then create the books
AuthController.checkedIfLoggedIn = function(request, response, next){
    console.log("checking seession->>>", request.session.user)

    //restrict 
    console.log("url", request.originalUrl)
    if(request.originalUrl === '/login'){
        return next();
    }

    console.log("session", request.session.user)
    if(typeof request.session.user === "undefined"){
        return response.send({
            status : false,
            message : "unauthorized request"
        })
    }
    else{
        return next();
    }
}

module.exports = AuthController