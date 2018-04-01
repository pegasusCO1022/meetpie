var config = {
    apiKey: "AIzaSyAZVk8YI5PR8nfXyoSjvCbBTBB01_RhbTY",
    authDomain: "meetpie-3c64a.firebaseapp.com",
    databaseURL: "https://meetpie-3c64a.firebaseio.com",
    projectId: "meetpie-3c64a",
    storageBucket: "meetpie-3c64a.appspot.com",
    messagingSenderId: "941417946944"
};
firebase.initializeApp(config);

var database = firebase.database();

function addUser() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var displayName = user.displayName;
            var email = user.email;
            var photoURL = user.photoURL;
            var uid = user.uid;

            user.getIdToken().then(function (accessToken) {
                var user = {
                    displayName: displayName,
                    email: email,
                    photoURL: photoURL,
                    uid: uid
                }
            
                database.ref().push(user);
            });
        } 
    }, function (error) {
        console.log(error);
    });
};

$("window").on('load', initApp);