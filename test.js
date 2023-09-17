const { SingUpEmail1 } = require("./apis/apiAuth");
const { createUser, createTable, getUser, createID, getID, getPat, addNewTextSong, addDataToObject, getTextSongs } = require("./apis/apiDynamoDB");
const { getFiles, test } = require("./apis/apiS3");
const { getRot, createSong } = require("./apis/apiSpotify");

async function test18(){
    const data = {
        user : {
            name: "nicolas"
        },
        email : "test11114@gmail.com",
        pass: "test12"
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
        uid: "123dasasd3"
    }
    fetch("http://3.129.111.250:4242/api/singup/singUpGoogle", {
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
    fetch("http://3.129.111.250:4242/api/singin/singInEmail", {
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
    fetch("http://3.129.111.250:4242/api/singin/singInWithId", {
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
        duration: "120",
        text: "a cool song",
        title: "mi master pice2",
        id: "MjrK0Yx7O2UlkLqU"
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

async function test24(){
    const data = {
        id: "MjrK0Yx7O2UlkLqU",
        key: "1oovbp1z5ExvCf3o"
    }
    fetch("http://3.129.111.250:4242/api/security/verifyDemo", {
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

async function testGetAllVideos () {
    fetch("http://localhost:4242/api/tiktok/requestAllVideos", {
        method: "GET",
        headers: {
            "Content-Type" : "application/json"
            },
    }).then(async (data) => {
        const videos = await data.json()
        console.log(videos)
    }).catch(error => {
        console.log(error)
    })
}

async function addVideo () {
    const data = {
        id: "MjrK0Yx7O2UlkLqU",
        link: "outputs/MjrK0Yx7O2UlkLqU/apple.png",
        description: "asd",
        title: "asd",
        postProfile: "asd"
    }

    fetch("http://localhost:4242/api/tiktok/addVideo", {
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

async function likeVideo() {
    const data = {
        id: "ZPoni2FUQ6UQU4XB",
        videoID: "GyVFDYVL8uFy0fqi",
        ownerID: "4"
    }
    fetch("http://3.129.111.250:4242/api/tiktok/likevideo", {
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

async function saveVideo () {
    const data = {
        id: "MjrK0Yx7O2UlkLqU",
        videoID: "GyVFDYVL8uFy0fqi",
        ownerID: "4",
        link: "example.com"
    }
    fetch("http://3.129.111.250:4242/api/tiktok/saveVideo", {
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

async function getSavedVideos () {
    const data = {
        id: "MjrK0Yx7O2UlkLqU",
    }
    fetch("http://3.129.111.250:4242/api/tiktok/requestSavedVideos", {
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

async function getLikedSongs () {
    const data = {
        id: "iqag02hi7VRQLwAG",
    }
    fetch("http://localhost:4242/api/Spotify/getAllLikedSongs", {
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

async function likeSong () {
    const data = {
        id: "iqag02hi7VRQLwAG",
        ownerID: "m56jBT1HlYaOtpn4",
        link: "https://static-eu.gcp.mubert.com/b2b/recorder/zingzanglab/e17d1c2de3a24affb69004f659295c1a.mp3"
    }
    fetch("http://localhost:4242/api/Spotify/likeSong", {
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

async function deleteSong () {
    const data = {
        id: "iqag02hi7VRQLwAG",
        title: "mi master pice3"
    }
    fetch("http://localhost:4242/api/Spotify/deleteSong", {
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

async function unlike () {
    const data = {
        id: "123",
        title: "NEw SON",
        ownerID: "iqag02hi7VRQLwAG"
    }
    fetch("http://localhost:4242/api/Spotify/unLikeSong", {
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

async function saveSong () {
    const data = {
        id: "123",
        title: "NEw SON",
        ownerID: "iqag02hi7VRQLwAG"
    }
    fetch("http://localhost:4242/api/Spotify/saveSong", {
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

async function getAllSavedSongs () {
    const data = {
        id: "123"
    }
    fetch("http://localhost:4242/api/Spotify/getAllSavedSongs", {
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

async function unSaveSong () {
    const data = {
        id: "123",
        title: "NEw SON",
        ownerID: "iqag02hi7VRQLwAG"
    }
    fetch("http://localhost:4242/api/Spotify/unSaveSong", {
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

async function addIAsong () {
    const data = {
        id: "MjrK0Yx7O2UlkLqU",
        title: "NEw SON",
        albumCover: "asdasd",
        link: "outputs/MjrK0Yx7O2UlkLqU/apple.png"
    }
    fetch("http://localhost:4242/api/IAsongs/addIAsong", {
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

async function getAllSongsUser () {
    const data = {
        id: "MjrK0Yx7O2UlkLqU",
    }
    fetch("http://localhost:4242/api/Spotify/getAllSongsUser", {
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

async function createPat () {
    const data = {
        id: "MjrK0Yx7O2UlkLqU",
    }
    fetch("http://localhost:4242/api/tiktok/requestUserVideos", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
            },
        body: await JSON.stringify(data),
    }).then(async (data) => {
        const videos = await data.json();
        console.log(videos.data)
    }).catch(error => {
        console.log(error)
    })
}

async function test50 () {
    const data = {
        path: "outputs/MjrK0Yx7O2UlkLqU/apple.png",
    }
    fetch("http://3.129.111.250:4242/api/security/requestDownloadLink", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
            },
        body: await JSON.stringify(data),
    }).then(async (data) => {
        const videos = await data.json();
        console.log(videos.data)
    }).catch(error => {
        console.log(error)
    })
}

test50();

//getAllSongsUser();