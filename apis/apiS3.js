const { fromIni } = require("@aws-sdk/credential-provider-ini");
const { S3Client, ListBucketsCommand, ListObjectsCommand, ListObjectsV2Command } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
    region: "eu-west-2", // Reemplaza con la región que corresponda
    credentials: fromIni({ profile: "bucket-eugenio-zing" }),
});

async function listarArchivosEnCarpeta(carpeta) {
    try {
      const command = new ListObjectsCommand({
        Bucket: "nombre-del-bucket",
        Prefix: carpeta + "/", // Agrega el "/" al final para listar solo los archivos dentro de la carpeta
      });
      const response = await s3Client.send(command);
      console.log(`Archivos en la carpeta ${carpeta}:`, response.Contents);
    } catch (err) {
      console.error("Error:", err);
    }
}

function getFiles (id) {
    return(
        new Promise (async (res, rej) => {
            const command = new ListObjectsV2Command({
                Bucket: "zingzang-files",
                Prefix: "outputs" + "/" + id + "/"
            })
            s3Client.send(command).then(result => {
                console.log(result);
                res(result)
            }).catch(error => {
                rej(error)
            })
        })
    )
}



module.exports = {
    getFiles,

}