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

//createTable();

test5();