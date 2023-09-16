const { fromIni } = require("@aws-sdk/credential-provider-ini");
const { S3Client, ListBucketsCommand, ListObjectsCommand, ListObjectsV2Command, GetObjectCommand } = require("@aws-sdk/client-s3");

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

async function generarEnlaceDeDescarga(link) {
    const params = {
      Bucket: "zing-zang-vc",
      Key: link, // Reemplaza con la ruta correcta en S3
      Expires: 3600, // Duración del enlace en segundos (en este caso, 1 hora)
    };
  
    const command = new GetObjectCommand(params);
    const url = s3Client.getSignedUrl(command);
  
    return url;
}

function actualizarEnlaces(objetos) {
    return Promise.all(
      objetos.map(async (objeto) => {
        const link = objeto.M.link.S;
        const linkDeDescarga = await generarEnlaceDeDescarga(link);
        objeto.M.link.S = linkDeDescarga;
        return objeto;
      })
    );
}





module.exports = {
    getFiles,
    actualizarEnlaces,

}