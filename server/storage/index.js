//requires
const fs = require('fs'),
    path = require('path');

// Objeto que retorna la data obtenida desde el archivo .json
module.exports = {
    getDataAll: () => {
            var self = this;
            let dataPath = __dirname + path.join('/data/data.json');
            return new Promise((resolve, reject) => {
                fs.readFile(dataPath, 'utf8', (err, readData) => {
                    if (err) reject(err)
                    resolve(JSON.parse(readData));
                });
            }); //fin Promise
        } //fin getDataAll
}; //fin obj
