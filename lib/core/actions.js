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

async function gitAddAction(path, ...args) {
    await gitBash.add(path)
}

module.exports = {
    createProjectAction,
    gitAddAction
}