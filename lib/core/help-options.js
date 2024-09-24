const { program } = require('commander')
const { createProjectAction, gitAddAction } = require('./actions')

function helpOptions() {
    initOptions()
    program.parse(process.argv)
}

function initOptions() {
    versionOption()
    createOption()
    gitAddOption()
    gitCommitOption()
    gitPushOption()
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

function gitAddOption() {
    program
        .command('add')
        .argument('<path> [...others]')
        .description('zhao add ./ ==> git add ./')
        .action(gitAddAction)
}

function gitCommitOption() {
    program
        .command('commit')
        .argument('<path> [...others]')
        .option('-T, --template <name>')
        .description('zhao commit ./ ==> git commit ./')
        .action(gitAddAction)
}

function gitPushOption() {
    program
        .command('push')
        .argument('<path> [...others]')
        .option('-T, --template <name>')
        .description('zhao push ./ ==> git push ./')
        .action(gitAddAction)
}

module.exports = helpOptions