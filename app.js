var dbRef = firebase.database().ref();

function signIn(){
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(data){
            window.location.href='page.html';
            
        })
        .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
}
function signUp(event){
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
     let firstName = document.getElementById("firstName").value;
     let lastName = document.getElementById("lastName").value;
    let birthDate = document.getElementById("birthDate").value;
    let height= document.getElementById("height").value;
    let weight = document.getElementById("weight").value;
    let phoneNumber = document.getElementById("phoneNumber").value;
    let blood = document.getElementById("blood").value;
let gender;
    if(document.getElementById("femaleRadio").checked){
        gender= "Female";
    }
    else{
        gender= "Male";

    }
let info;
if(document.getElementById("donorRadio").checked){
    info="Donor"
}
else{
    info="Requester";
}

    firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then((success) => {
            let userObj = {
                firstName,
                lastName,
                birthDate,
                height,
                weight,
                phoneNumber,
                blood,
                gender,
                email,
                info
            }
            console.log(userObj);
            let userUid = firebase.auth().currentUser.uid
            firebase.database().ref('users/' + userUid)
                .set(userObj)
                .then(() => {
                    window.location = 'page.html'
                 
                })

        })
    .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
        // ...
    });
}


function data(){
    firebase.database().ref('users/').on('child_added', function(data){
        var row1=document.createElement("tr");
        var col1= document.createElement("td");
        var text1=document.createTextNode(data.val().firstName);
        col1.appendChild(text1);
        row1.appendChild(col1);
        var body=document.getElementById("tbody");


        var col2= document.createElement("td");
        var text2=document.createTextNode(data.val().gender);
        col2.appendChild(text2);
        row1.appendChild(col2);


        var col3= document.createElement("td");
        var text3=document.createTextNode(data.val().blood);
        col3.appendChild(text3);
        row1.appendChild(col3);


        var col4= document.createElement("td");
        var text4=document.createTextNode(data.val().info);
        col4.appendChild(text4);
        row1.appendChild(col4);


        var col5= document.createElement("td");
        var text5=document.createTextNode(data.val().phoneNumber);
        col5.appendChild(text5);
        row1.appendChild(col5);
        body.appendChild(row1);

    })

     
}
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }