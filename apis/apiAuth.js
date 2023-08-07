const {auth} = require("./apiFirebase");
const {getAuth, 
    signInWithRedirect,
    GoogleAuthProvider, 
    signInWithPopup, 
    FacebookAuthProvider, 
    TwitterAuthProvider,
    signInWithCredential, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} = require("firebase/auth"); 

function SingUpGoogle (token) {
    return(
        new Promise (async (res, rej) => {
            const credential = GoogleAuthProvider.credential(token);
            signInWithCredential(auth, credential).then(result => {
                console.log(result)
            })
        })
    )
}

function SingUpEmail (email, pass) {
    return(
        new Promise (async (res, rej) => {
            createUserWithEmailAndPassword(auth, email, pass).then(userCredential => {
                const user = userCredential.user;
                console.log(user.uid)
                res(user)
            }).catch(error => {
                console.log(error)
                rej(error)
            })
        })
    )
}


module.exports = {
    SingUpGoogle,
    SingUpEmail,

}