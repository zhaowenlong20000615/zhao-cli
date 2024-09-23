const { program } = require('commander')
const { createProjectAction } = require('./actions')

function helpOptions() {
    initOptions()
    program.parse(process.argv)
}

function initOptions() {
    versionOption()
    createOption()
}

function versionOption() {
    program.version(require('../../package.json')?.version)
}

function createOption() {
    program
        .command('create')
        .argument('<project> [...others]')
        .option('-T, --template <name>')
        .description('create project')
        .action(createProjectAction)
}

module.exports = helpOptions