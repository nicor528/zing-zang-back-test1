const { DynamoDBClient, CreateTableCommand } = require('@aws-sdk/client-dynamodb');
const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { fromEnv } = require('@aws-sdk/credential-provider-env');
const dotenv = require('dotenv');
const { PutCommand, DynamoDBDocumentClient, GetCommand } = require("@aws-sdk/lib-dynamodb");
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
                res(result.Item.id)
            }).catch(error => {
                console.log(error)
                rej(error)
            })
        })
    )
}

function createUser (id, user) {
    return(
        new Promise (async (res, rej) => {
            const command = await new PutCommand({
                TableName: "test",
                Item: {
                    id: id,
                    name: user.name,
                    email: user.email,
                    subscription: false,
                    IAtrained: false,
                }
            })
            docClient.send(command).then(response => {
                console.log(response)
                res(response)
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
                console.log(result)
                res(result)
            }).catch(error => {
                console.log(error)
            })
        })
    )
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
    getID

}