// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRCfXFcYcuTPc9iavodsvexgJsmj3kan0",
  authDomain: "kite-21200.firebaseapp.com",
  databaseURL: "https://kite-21200-default-rtdb.firebaseio.com",
  projectId: "kite-21200",
  storageBucket: "kite-21200.appspot.com",
  messagingSenderId: "831718092429",
  appId: "1:831718092429:web:541bcb879aa7b214fc7cc4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");
 

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                      console.log(firebase_message_id);
                      console.log(message_data);
                      name = message_data['name'];
                      message = message_data['message'];
                      like = message_data['like'];

                      name_with_tag = "<h4>"+ name + " <img class='user_tick' src='tick.png'> </h4>";
                      message_with_tag = "<h4 class='message_h4'>" + message +   "</h4>";
                      like_button = "<button class='btn btn-primary' id="+ firebase_message_id+" value="+ like + " onclick='updateLike(this.id)'>  " ;
                      span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'> Like : " + like + "</span></button> <hr>";
                      row =  name_with_tag +  message_with_tag + like_button + span_with_tag ;
                      document.getElementById("output").innerHTML += row;
                        //End code
                  }
            });
      });
}
getData();
 

function send(){
      msg = document.getElementById("msg").value ;
      firebase.database().ref(room_name).push({
            name:user_name,h
            message : msg,
            like:0
      });
}

function updateLike(message_id){
  
      console.log("Clicked on liked button " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_Likes = Number(likes) + 1 ;
      console.log(updated_Likes);
      firebase.database().ref(room_name).child(message_id).update({
            like : updated_Likes
      });

}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}
