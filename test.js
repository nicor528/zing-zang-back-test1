const { SingUpEmail1 } = require("./apis/apiAuth");
const { createUser, createTable, getUser, createID, getID, getPat, addNewTextSong, addDataToObject, getTextSongs } = require("./apis/apiDynamoDB");
const { getFiles } = require("./apis/apiS3");
const { getRot, createSong } = require("./apis/apiSpotify");

async function test18(){
    const data = {
        user : {
            name: "nicolas"
        },
        email : "test1117@gmail.com",
        pass: "te"
    }
    fetch("http://localhost:4242/api/singup/singUpEmail", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
            },
        body: await JSON.stringify(data),
    }).then(async (data) => {
        console.log(await data.json())
    }).catch(error => {
        console.log(error)
    })
}

async function test19(){
    const data = {
        user : {
            name: "nicolas"
        },
        email : "test1117@gmail.com",
        uid: "123dasd3"
    }
    fetch("http://localhost:4242/api/singup/singUpGoogle", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
            },
        body: await JSON.stringify(data),
    }).then(async (data) => {
        console.log(await data.json())
    }).catch(error => {
        console.log(error)
    })
}

async function test20(){
    const data = {
        email : "test1116@gmail.com",
        pass: "test12"
    }
    fetch("http://localhost:4242/api/singin/singInEmail", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
            },
        body: await JSON.stringify(data),
    }).then(async (data) => {
        console.log(await data.json())
    }).catch(error => {
        console.log(error)
    })
}

async function test21(){
    const data = {
        uid: "123dasd3"
    }
    fetch("http://localhost:4242/api/singin/singInWithId", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
            },
        body: await JSON.stringify(data),
    }).then(async (data) => {
        console.log(await data.json())
    }).catch(error => {
        console.log(error)
    })
}

async function test22(){
    const data = {
        uid: "123dasd3",
        duration: "120",
        text: "a cool song",
        tittle: "mi master pice",
        id: "iqag02hi7VRQLwAG"
    }
    fetch("http://localhost:4242/api/Spotify/createTextSong", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
            },
        body: await JSON.stringify(data),
    }).then(async (data) => {
        console.log(await data.json())
    }).catch(error => {
        console.log(error)
    })
}

async function test23(){
    const data = {
        id: "iqag02hi7VRQLwAG"
    }
    fetch("http://localhost:4242/api/Spotify/requestTextSongs", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
            },
        body: await JSON.stringify(data),
    }).then(async (data) => {
        console.log(await data.json())
    }).catch(error => {
        console.log(error)
    })
}

test23();