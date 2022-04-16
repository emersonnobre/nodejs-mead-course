const validator = require('validator')
const chalk = require('chalk')
const getNotes = require('./notes')

console.log(getNotes())
console.log(validator.isEmail('egrnobre@gmail.com'))
console.log(chalk.green.bold.inverse('Success!'))
// fs.writeFileSync('notes.txt', 'Some cool content.')
// fs.appendFileSync('notes.txt', '\nSome new dummy content.')
