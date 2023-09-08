const { DynamoDBClient, CreateTableCommand, UpdateItemCommand, GetItemCommand } = require('@aws-sdk/client-dynamodb');
const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { fromEnv } = require('@aws-sdk/credential-provider-env');
const dotenv = require('dotenv');
const { PutCommand, DynamoDBDocumentClient, GetCommand, UpdateCommand } = require("@aws-sdk/lib-dynamodb");
const { fromIni } = require('@aws-sdk/credential-provider-ini');

// Carga las variables de entorno desde el archivo .env
dotenv.config();

/*async function main() {
  // Configura el cliente de DynamoDB con las credenciales desde las variables de entorno
  const dynamoDBClient = new DynamoDBClient({
    region: 'us-east-1', // Reemplaza con tu región deseada
    credentials: fromEnv(),
  });

  // Utiliza el cliente de DynamoDB para realizar operaciones en la base de datos
  const dynamoDB = new DynamoDB({ client: dynamoDBClient });

  // Resto del código para interactuar con DynamoDB
}*/

const dynamoDBClient = new DynamoDBClient({
    region: 'us-east-2', // Reemplaza con tu región deseada
    credentials: fromIni({ profile: "zing-zang-main" }),
});

const docClient = DynamoDBDocumentClient.from(dynamoDBClient);

  // Utiliza el cliente de DynamoDB para realizar operaciones en la base de datos
const dynamoDB = new DynamoDB({ client: dynamoDBClient });

//main();

function generateAlphanumericCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';

    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    return code;
}

function createID (uid) {
    return (
        new Promise (async (res, rej) => {
            const newCode = await generateAlphanumericCode();
            const command = await new PutCommand({
                TableName: "iox",
                Item: {
                    uid: uid,
                    id: newCode,
                }
            })
            docClient.send(command).then(response => {
                res(newCode)
            }).catch(error => {
                console.log(error)
                rej(error)
            })
        })
    )
}

function setPat (id, pat) {
    return (
        new Promise (async (res, rej) => {
            const command = await new PutCommand({
                TableName: "pat",
                Item: {
                    id: id,
                    pat: pat,
                }
            })
            docClient.send(command).then(response => {
                res()
            }).catch(error => {
                console.log(error)
                rej(error)
            })
        })
    )
}

function getPat (id) {
    return(
        new Promise (async (res, rej) => {
            const command = await new GetCommand({
                TableName: "pat",
                Key: {
                    id: id
                }
            })
            docClient.send(command).then(result => {
                res(result.Item.pat)
            }).catch(error => {
                console.log(error)
                rej(error)
            })
        })
    )
}

function verifyKey (id, key) {
    return(
        new Promise (async (res, rej) => {
            const newCode = await generateAlphanumericCode();
            const command = await new GetCommand({
                TableName: "keys",
                Key: {
                    id: id
                }
            })
            docClient.send(command).then(result => {
                const lastKey = result.Item.key
                if(lastKey == key){
                    res(newCode)
                }else{
                    rej(1)
                }
            }).catch(error => {
                console.log(error);
                rej(error)
            })
        })
    )
}

function getKey (id) {
    return(
        new Promise(async (res, rej) => {
            const command = await new GetCommand({
                TableName: "keys",
                Key: {
                    id: id
                }
            })
            docClient.send(command).then(result => {
                res(result.Item.key)
            }).catch(error => {
                console.log(error)
                rej(error)
            })
        })
    )
}

function setNewKey(id, newKey) {
    return(
        new Promise (async (res, rej) => {
            const command = await new PutCommand({
                TableName: "keys",
                Item: {
                    id: id,
                    key: newKey
                }
            })
            docClient.send(command).then(result => {
                console.log(result)
                res(result)
            }).catch(error => {
                console.log(error);
                rej(error)
            })
        })
    )
}

function getID (uid) {
    return(
        new Promise (async (res, rej) => {
            const command = await new GetCommand({
                TableName: "iox",
                Key: {
                    uid: uid
                }
            })
            docClient.send(command).then(result => {
                if(result.Item === undefined){
                    rej(1)
                }else{
                    res(result.Item.id)

                }
            }).catch(error => {
                console.log(error)
                rej(error)
            })
        })
    )
}

function setSubDate (id, date) {
    return(
        new Promise (async (res, rej) => {
            const command = await new PutCommand({
                TableName: "subsDate",
                Item: {
                    id: id,
                    date: date
                }
            })
        })
    )
}

function createUser (id, user, email, pass) {
    return(
        new Promise (async (res, rej) => {
            const command = await new PutCommand({
                TableName: "textSongs",
                Item: {
                    id: id,
                    songs: []
                }
            })
            docClient.send(command).then(response => {
                console.log(response)
                const command = new PutCommand({
                    TableName: "test",
                    Item: {
                        id: id,
                        name: user.name,
                        email: email,
                        pass: pass,
                        subscription: false,
                        IAtrained: false,
                    }
                })
                docClient.send(command).then(response => {
                    console.log(response)
                    res(response)
                }).catch(error => {console.log(error), rej(error)})
            }).catch(error => {console.log(error), rej(error)})
        })
    )
}

function getUser (id) {
    return(
        new Promise (async (res, rej) => {
            const command = await new GetCommand({
                TableName: "test",
                Key: {
                    id: id
                }
            })
            docClient.send(command).then(result => {
                res(result.Item)
            }).catch(error => {
                console.log(error)
                rej(error)
            })
        })
    )
}

function addTextSongToUser (id, tiitle) {
    return(
        new Promise (async (res, rej) => {
            const command = await new GetCommand({
                TableName: "test",
                Key: {
                    id: id
                }
            })
            docClient.send(command).then(result => {
                const newUser = {...result.Item,
                    
                }
            }).catch(error => {
                console.log(error)
                rej(error)
            })
        })
    )
}

function getTextSongs (id) {
    return (
        new Promise (async (res, rej) => {
            const command = await new GetCommand({
                TableName: "textSongs",
                Key: {
                    id: id
                }
            })
            docClient.send(command).then(result => {
                console.log(result)
                res(result.Item)
            }).catch(error => {
                console.log(error);
                rej(error)
            })
        })
    )
}

function addNewTextSong (id, id2, link, tittle) {
    return(
        new Promise (async (res, rej) => {
            const command = await new GetCommand({
                TableName: "textSongs",
                Key: {
                    id: id
                }
            })
            docClient.send(command).then(result => {
                console.log(result.Item.songs)
                const newUser = {
                    songs :  [...result.Item.songs,
                        {
                            tittle: tittle,
                            id: id2,
                            link: link
                        }
                    ]
                }
                const command = new PutCommand({
                    TableName: "textSongs",
                    Item: {
                        id: id,
                        ...newUser
                    }
                })
                docClient.send(command).then(result => {
                    console.log(result)
                    res(result)
                }).catch(error => {
                    console.log(error);
                    rej(error)
                })
            }).catch(error => {
                console.log(error)
                rej(error)
            })
        })
    )
}

async function addDataToObject(id, id2, tittle, link2) {
    return(
        new Promise (async (res, rej) => {
            const link = link2.replace(/[^a-zA-Z0-9-_]/g, '')
            const getItemParams = {
                TableName: 'test', // Reemplaza 'tu_tabla' por el nombre de tu tabla
                Key: {
                    id: { S: id }
                }
            };
        
            try {
                const { Item } = await docClient.send(new GetItemCommand(getItemParams));
        
                if (Item) {
                    // Objeto recuperado con éxito
                    const existingObject = Item;
        
                    // Crea el objeto que deseas agregar
                    const newObject = {
                        id: { S: id2 },
                        link: { S: link },
                        tittle: { S: tittle }
                    };
        
                    // Agrega el nuevo objeto al objeto existente
                    existingObject[tittle] = newObject[tittle];
        
                    // Ahora, actualiza el objeto modificado en DynamoDB
                    const updateParams = {
                        TableName: 'test',
                        Key: {
                            id: { S: id }
                        },
                        UpdateExpression: `SET ${tittle} = :value`,
                        ExpressionAttributeValues: {
                            ':value': newObject[tittle]
                        },
                        ReturnValues: 'ALL_NEW' // Esto devolverá el elemento actualizado
                    };
        
                    const updatedItem = await docClient.send(new UpdateItemCommand(updateParams));
                    console.log('Objeto actualizado con éxito:', updatedItem);
                    res()
                } else {
                    console.error('Objeto no encontrado.');
                }
            } catch (error) {
                console.error('Error al interactuar con DynamoDB:', error);
                rej()
            }
        })
    )
    
}

function editInfoUser (user) {

}

function createTable () {
    return (
        new Promise (async (res, rej) => {
            const command = await new CreateTableCommand({
                TableName: "test2",
                // For more information about data types,
                // see https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.NamingRulesDataTypes.html#HowItWorks.DataTypes and
                // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Programming.LowLevelAPI.html#Programming.LowLevelAPI.DataTypeDescriptors
                AttributeDefinitions: [
                {
                    AttributeName: "DrinkName",
                    AttributeType: "S",
                },
                ],
                KeySchema: [
                {
                    AttributeName: "DrinkName",
                    KeyType: "HASH",
                },
                ],
                ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1,
                },
            })
            await docClient.send(command).then(result => {
                console.log(result)
                res(result)
            }).catch(error => {console.log(error), rej(error)})
        })
    )

}

module.exports = {
    createUser,
    createTable,
    getUser,
    createID,
    getID,
    editInfoUser,
    verifyKey,
    setNewKey,
    setSubDate,
    generateAlphanumericCode,
    getKey,
    setPat,
    getPat,
    addNewTextSong,
    addDataToObject,
    getTextSongs

}