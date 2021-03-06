angular.module('starter.services', [])


.factory('AuthService', function(DataService) {
  // Might use a resource here that returns a JSON array


  return {
    loginAuth: function(authData) {
      var userObj = {};
      console.log("Hi i am in loginAuth");
      console.log(authData);
      console.log(DataService.getAllUsers());
      userObj = DataService.getUserByUsername(authData.username);
      console.log(userObj);
      if (userObj != null) {
        if (userObj.password === authData.password) {
            console.log("valid user");
            console.log(userObj);
            return userObj;
        }
      } else {
        console.log("Invalid login");
        return null;
      }    
      
    },  
    signupAuth: function(authData) {
      console.log("Hi i am in signupAuth");
      console.log(authData);
      DataService.createUsers(authData);
      return true;
    },    
    forgotPassword: function(authData) {
      console.log("Hi i am in forgotPassword");
      console.log(authData);
      return true;
    }
  };
})


.factory('DataService', function() {
  // Might use a resource here that returns a JSON array

  var Itinerary = [
  {id: 0, name: 'Lakshmi Tanker Service', content: 'Delivered within 6 hours.',img:'img/initnery.jpg', price: 'Rs.2000/1000Ltr'},
  {id: 1, name: 'Amritha Waters', content: 'Delivered within 4 hours.',img:'img/initnery.jpg', price: 'Rs.2500/1000Ltr'}
  
  ];

  var PaymentProviders = [
      {id: 1, name:"Card Payment"},
      {id: 2, name:"PayTm"},
      {id: 3, name:"Airtel Money"},
      {id: 4, name:"PayU Money"}
  ];

  var History = [
    { id: 1, title: '15-Dec-2015', supplier: 'Aru Water supply', water:'10000Ltr', amount: '1200' },
    { id: 2, title: '16-Nov-2015', supplier: 'Saro Water supply', water:'10000Ltr', amount: '1200' },
    { id: 2, title: '14-Oct-2015', supplier: 'Saro Water supply', water:'10000Ltr', amount: '700' },
    { id: 2, title: '15-Sep-2015', supplier: 'Aru Water supply', water:'10000Ltr', amount: '800'  },
    { id: 2, title: '15-Aug-2015', supplier: 'Saro Water supply', water:'10000Ltr', amount: '1200' },
    { id: 2, title: '12-July-2015', supplier: 'Aru Water supply', water:'10000Ltr', amount: '1200'  }
  ];
 

  var Upcoming = [
      {id: 1, pickup:'Madurai', destination:'Chennai', startdate: '08-Feb-2016', enddate: '15-Feb-2016', budget: 'Rs.10000',vechicle:'Flight', time: '10.00am to 12.00pm(2 hours)', price: 'Rs.6000'},
      {id: 2, pickup:'Chennai', destination:'Bangalore', startdate: '18-Feb-2016', enddate: '20-Feb-2016', budget: 'Rs.10000',vechicle:'Flight', time: '10.00am to 12.00pm(2 hours)', price: 'Rs.6000'},
      {id: 3, pickup:'Mumbai', destination:'Delhi', startdate: '25-Feb-2016', enddate: '29-Feb-2016', budget: 'Rs.10000',vechicle:'Flight', time: '10.00am to 12.00pm(2 hours)', price: 'Rs.6000'},
      {id: 4, pickup:'Kerala', destination:'Hydrabad', startdate: '09-Feb-2016', enddate: '13-Feb-2016', budget: 'Rs.10000',vechicle:'Flight', time: '10.00am to 12.00pm(2 hours)', price: 'Rs.6000'}
      
  ];  

    var Tank = [
      {id: 1, type:'Overhead', capacity:'1000Ltr', sensorId: 'wasu0176', Waterlevel: 'Full'},
      {id: 2, type:'Sump', capacity:'8,000Ltr', sensorId: 'wasu0659', Waterlevel: 'Full'}
            
  ]; 

   // Private Functions
    function getUsersDB() {
        console.log("connecting to DB:Get");
        if(!localStorage.getItem('usersDB')){
            //window.localStorage['usersDB', JSON.stringify([])];
            localStorage.setItem('usersDB', JSON.stringify([]));
        }

        return JSON.parse(localStorage.getItem('usersDB'));
        //return JSON.parse(window.localStorage['usersDB']);
    }

    function setUsersDB(users) {
         console.log("connecting to DB:Set");

         localStorage.setItem('usersDB', JSON.stringify(users));
         //window.localStorage['usersDB', JSON.stringify(users)];
    }

  return {
    all: function() {
      return chats;
    },
    itinerary: function(){
      return Itinerary;
    },
    getHistory: function(){
      return History;
    },
    Upcoming: function(){
      return Upcoming;
    },
    getTank: function(){
      return Tank;
    },    
    get: function(Id) {
        
                for (var i = 0; i < Itinerary.length; i++) {
                    if (Itinerary[i].id === parseInt(Id)) {
                         return Itinerary[i];
                    }
                 }
        return null;    
    },
    getPay: function(){
      return PaymentProviders;
    },
    getAllUsers: function() {
      return getUsersDB();
    }, 
    getUserByUsername: function(username) {
      var userData = getUsersDB();
      for (var i = 0; i < userData.length; i++) {
        if (userData[i].username == username) {
          return userData[i];
        }
      }
      return null;
    }, 
    createUsers: function(user) {
      var users = getUsersDB();
      users.push(user);
      setUsersDB(users);
      console.log("Testing localstorage");
      console.log(getUsersDB());
    },  
    updateUsers: function(user) {
      var users = getUsersDB();
      for (var i = 0; i < users.length; i++) {
        if (users[i].username == user.username) {
          users[i].username = user.username;
          users[i].phone = user.phone;
          users[i].name = user.name;
          users[i].password = user.password;
          users[i].age = user.age;
          setUsersDB(users);
          console.log(users[i]);
        }
      }           
      console.log("Update function");
      console.log(getUsersDB());
    },               
    getAllOffers: function() {
      console.log("Hi i am in getAllOffers service");
      return offers;
    },  
    getOffer: function(offerId) {
      for (var i = 0; i < offers.length; i++) {
        if (offers[i].id === parseInt(offerId)) {
          return offers[i];
        }
      }
      return null;
    },    
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    }
    
  };
})


.factory('SocialAuthService', function(DataService) {

  var providers = [
                    {
                      'id': 0,
                      'name': 'facebook'
                    },
                    {
                      'id': 1,
                      'name': 'Googleplus'
                    },
                    {
                      'id': 2,
                      'name': 'Twitter'
                    }, 
                    {
                      'id': 3,
                      'name': 'LinkedIn'
                    }                                       
                  ];

    return {
      validateFacebook : function(authData) {
          console.log("SocialAuthService:(validateFacebook)=> ENTERED");
          // Main logic here 
          console.log("SocialAuthService:(validateFacebook)=> EXITED");
      },
      validateGoogle : function(authData) {
          console.log("SocialAuthService:(validateGoogle)=> ENTERED");
          // Main logic here 
          console.log("SocialAuthService:(validateGoogle)=> EXITED");
      },
      validateTwitter : function(authData) {
          console.log("SocialAuthService:(validateTwitter)=> ENTERED");
          // Main logic here 
          console.log("SocialAuthService:(validateTwitter)=> EXITED");
      },
      validateLinkedIn : function(authData) {
          console.log("SocialAuthService:(validateLinkedIn)=> ENTERED");
          // Main logic here 
          console.log("SocialAuthService:(validateLinkedIn)=> EXITED");
      }
    };
});
