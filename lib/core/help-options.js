const { program } = require('commander')
const { createProjectAction, gitAddAction, gitCommitAction, gitPushAction } = require('./actions')

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
        .option('-m <info>')
        .option('-am <info>')
        .description('zhao commit -m 完善 ==> git commit -m 完善')
        .action(gitCommitAction)
}

function gitPushOption() {
    program
        .command('push')
        .argument('[...others]')
        .option('-u [...others]')
        .option('-f [...others]')
        .description('zhao push  ==> git push ')
        .action(gitPushAction)
}

module.exports = helpOptions