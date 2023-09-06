const dotenv = require('dotenv');
const { default: fetch } = require('node-fetch');


dotenv.config();



function getRot (email) {
    return (
        new Promise (async (res, rej) => {
            fetch('https://api-b2b.mubert.com/v2/GetServiceAccess', {
                method: 'POST', // Cambiar a 'GET' si es necesario
                headers: {
                    'Content-Type': 'application/json',
                },
                body: await JSON.stringify({
                    method: 'GetServiceAccess',
                        params: {
                        email: email, // Reemplaza con tu correo electrónico
                        phone: '+11234567890',   // Reemplaza con tu número de teléfono
                        license: process.env.license_spo,
                        token: process.env.token_spo,
                    },
                }),
            }).then(async (data) => {
                const x = await data.json()
                console.log(x.data.pat);
                res(x.data.pat)
            }).catch(error => {
                console.log(error);
                rej(error)
            })
        })
    )
}

function createSong (pat, mode, duration, bitrate, text) {
    return(
        new Promise (async (res, rej) => {
            fetch("https://api-b2b.mubert.com/v2/TTMRecordTrack", {
                method: 'POST', // Cambiar a 'POST' si es necesario
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: await JSON.stringify({
                    method:"TTMRecordTrack",
                    params: {
                        pat: pat,
                        mode: mode,
                        duration: duration,
                        bitrate: bitrate,
                        text: text
                    }
                })
            }).then(async (data) => {
                const x = await data.json()
                console.log(x.data.tasks);
                res(x.data.tasks)
            }).catch(error => {
                console.log(error);
                rej(error)
            })
        })
    )
}





module.exports = {
    getRot,
    createSong,

}