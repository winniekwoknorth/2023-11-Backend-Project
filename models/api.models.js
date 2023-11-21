const db = require('../db/connection.js')
const fs = require('fs/promises')


exports.selectApi = () => {
    return fs.readFile(`${__dirname}/../endpoints.json`)
        .then((fileContent) => {
            const api = JSON.parse(fileContent)
            return api
        })
}