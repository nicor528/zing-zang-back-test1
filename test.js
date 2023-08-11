const { createUser, createTable, getUser, createID, getID } = require("./apis/apiDynamoDB");
const { getFiles } = require("./apis/apiS3");

function test () {
    createUser("123", {name: "test", email: "test@test.com"}).then(data => {
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
    fetch("http://3.129.111.250:4242/test", {
        method: "GET",
          headers: {
              "Content-Type" : "application/json"
              },
        //body: JSON.stringify({email: "test3000@gmail.com", pass: "123"}),
    }).then(data => {
        console.log("test")
        console.log(data)
    }).catch(error => {
        console.log(error)
    })
}

//createTable();

test8();