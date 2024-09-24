const { runPrompt, copyTemplate, networkDownload } = require("./help-create-project-actions");
const gitBash = require('../utils/git-action')

function createProjectAction(source, ...args) {
    const opts = this.opts()
    global.opts = opts
    global.project = source || 'test'
    if (opts.template?.startsWith?.('http')) return networkDownload()
    if (opts.template) return copyTemplate()
    runPrompt()
}

function gitAddAction(path, ...args) {
    console.log(`git add ${path}`);
}

function gitCommitAction() {
    console.log(`git commit ${JSON.stringify(this.opts())}`);
}

function gitPushAction() {
    console.log(`git push ${this.args.join(' ')} - ${JSON.stringify(this.opts())} `);
}

module.exports = {
    createProjectAction,
    gitAddAction,
    gitCommitAction,
    gitPushAction
}