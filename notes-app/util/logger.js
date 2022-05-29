const chalk = require('chalk')

const success = message => console.log(chalk.green(message))

const error = message => console.log(chalk.red(message))

module.exports = { success, error, }