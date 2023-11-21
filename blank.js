const db = require('../db/connection.js')
const fs = require('fs/promises')


exports.selectApi = () => {
    return fs.readFile(`${__dirname}/../endpoints.json`)
        .then((fileContent) => {
            const api = JSON.parse(fileContent)
            console.log(api)
            const validPath=[]
            for (const key in api) {
                const value = key.split(" ")
                console.log(value)
                validPath.push(value[1])
            }
            console.log(validPath)
            return api
        })
}

