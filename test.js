const { SingUpEmail1 } = require("./apis/apiAuth");
const { createUser, createTable, getUser, createID, getID, getPat, addNewTextSong, addDataToObject, getTextSongs } = require("./apis/apiDynamoDB");
const { getFiles } = require("./apis/apiS3");
const { getRot, createSong } = require("./apis/apiSpotify");

function test () {
    createUser("123", {name: "test2", email: "test2@test.com"}).then(data => {
        console.log("ok")
    }).catch(error => {console.log("noOk")})
}

function test2 () {
    getUser("12345").then(result => {
        console.log("ok")
        console.log(result.Item)
    }).catch(error => {
        console.log("noOk")
    })
}

function test3 () {
    createID("12345A").then(result => {
        console.log(result)
    }).catch(error => {
        console.log("noOk", error)
    })
}

function test4() {
    getID("12345A").then(result => {
        console.log(result)
    }).catch(error => {
        console.log(error)
    })
}

function test5() {
    getFiles("a").then(result => {
        console.log("ok")
    }).catch(error => {
        console.log("NoOk")
    })
}

function test6 () {
    getID("12345A").then(id => {
        getUser(id).then(user => {
            console.log(user.Item)
            //res.status(200).send()
        }).catch(error => {console.log(error)})
    }).catch(error => {console.log(error)})
}

function test7 () {
    const uid = "1234AB";
    const user = {
        name : "nicolas",
        lastName: "riquelme",
        email: "test1@gmail.com"
    }
    createID(uid).then(id => {
        createUser(id, user).then(user => {
            console.log(user)
            /*res.status(200).send({
                data : {
                    xu1 : uid,
                    k3y: id
                }
            })*/
        }).catch(error => {
            console.log(error)
        })
    }).catch(error => {console.log(error)})
}

function test8 () {
    fetch("http://3.129.111.250:4242/singUpEmail", {
        method: "POST",
          headers: {
              "Content-Type" : "application/json"
              },
        body: JSON.stringify({email: "test3000@gmail.com", pass: "123", user: {name: "asd"}}),
    }).then(data => {
        console.log("test")
        console.log(data)
    }).catch(error => {
        console.log(error)
    })
}

function test9 () {
    const id = "2";
    
    verifyKey(id, key).then(newKey => {
        setNewKey(id, newKey).then(data => {
            console.log(data)
        }).catch(error => {res.status(400).send({error : "bad conection with DB"})})
    }).catch(error => {res.status(400).send({error : "bad conection with DB"})})
}

function test10() {
    const data = {
        user : {
            name: "nicolas"
        },
        email: "test200@gmail.com",
        pass: "test12"
    }

    fetch("http://localhost:4242/singUpEmail", {
        method: "POST",
          headers: {
              "Content-Type" : "application/json"
              },
        body: JSON.stringify(data),
    }).then(async (data) => {
        console.log("test")
        const x = await data.json()
        console.log(x)
    }).catch(error => {
        console.log(error)
    })
}

//createTable();

function test11 () {
    const data = {
        id: "3",
        key: "KKmno3je9IdMDdzO"
    }
    fetch("http://3.129.111.250:4242/verifyRequest", {
        method: "POST",
          headers: {
              "Content-Type" : "application/json"
              },
        body: JSON.stringify(data),
    }).then(async (data) => {
        console.log("test")
        console.log(data)
        const x = await data.json()
        console.log(x)
    }).catch(error => {
        console.log(error)
    })
}

function test12() {
    const data = {
        uid : "123456a",
        email: "test200@gmail.com",
        user : {
            name: "nicolas"
        }
    }
    fetch("http://3.129.111.250:4242/singUpGoogle", {
        method: "POST",
          headers: {
              "Content-Type" : "application/json"
              },
        body: JSON.stringify(data),
    }).then(async (data) => {
        console.log("test")
        const x = await data.json()
        console.log(x)
    }).catch(error => {
        console.log(error)
    })
}

function test13() {
    const data = {
        id: "3",
        key : "9gxmnRjLDCZFBfIm"
    }
    return(
        new Promise (async (res, rej) => {
            fetch("http://3.129.111.250:4242/verifyRequest", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                    },
                body: JSON.stringify(data),
            }).then(async (data) => {
                console.log("test")
                const x = await data.json()
                console.log(x)
                if(data.status === 20){
                    res()
                }else{
                    rej()
                }
            }).catch(error => {
                console.log(error)
                rej(error)
            })
        })
    )
}

function test14() {
    getRot("", "").then(data => {
        console.log("ok")
    }).catch(() => {console.log("NOOK")})
}

function test15 () {
    createSong("emluZ3phbmdsYWIuMjA1MDg0NjQuNmRjNWQwMGE4YTczNzAxNzI4Yzc4Yjc3YjY0MjY0ZDRmOTRmYzlhZS4xLjM.dec513b282648c378b048c01497c5bddccaf238a0c3c094ae1f9e14e0aee6e67",
    "track", "60", "128", "a love song").then(() => {
        console.log("OK")
    }).catch(() => {console.log("NOOK")})
}

function test16 () {
    const mode = "track";
    const duration = "60";
    const bitrate = "128";
    const text = "a really love song";
    const id = "MjrK0Yx7O2UlkLqU";
    const tittle = "example22";
    getPat(id).then(pat => {
        createSong(pat, mode, duration, bitrate, text).then(tasks => {
            addNewTextSong(id, tasks[0].task_id, tasks[0].download_link, tittle).then(data => {
                console.log("OOK")
            }).catch(error => {console.log("NOOK")})
        }).catch(error => {console.log("NOOK")})
    }).catch(error => {console.log("NOOK")})
}

function test17 () {
    getTextSongs("MjrK0Yx7O2UlkLqU").then(data => {
        console.log(data)
    })
}

function test18(){
    const data = {
        email: "test123@gmail.com",
        id: "4"
    }
    fetch("http://3.129.111.250:4242/api/Spotify/createPat", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
            },
        body: JSON.stringify(data),
    }).then((data) => {
        console.log(data)
    }).catch(error => {
        console.log(error)
    })
}

test18();