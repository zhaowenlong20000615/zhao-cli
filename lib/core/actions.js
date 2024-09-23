const { runPrompt, copyTemplate, networkDownload } = require("./help-actions");

function createProjectAction(source, ...args) {
    const opts = this.opts()
    global.opts = opts
    global.project = source || 'test'
    if (opts.template?.startsWith?.('http')) return networkDownload()
    if (opts.template) return copyTemplate()
    runPrompt()
}

module.exports = {
    createProjectAction
}