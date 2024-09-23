const { frameworkPrompt, isTsPrompt, initPrompt, isInstallPrompt, packagePrompt } = require("./prompts");
const { resolve } = require('path')
const fs = require('fs-extra');
const execCommand = require("../utils/exec-command");
const simpleGit = require('simple-git');

async function runPrompt() {
    initPrompt()
    const framework = await frameworkPrompt()
    const isTs = await isTsPrompt()
    global.prompt.set('framework', framework)
    global.prompt.set('isTs', isTs)
    await runPackagePrompt()
    downloadTemplate()
}

async function copyTemplate() {
    initPrompt()
    await runPackagePrompt()
    downloadTemplate()
}

async function runPackagePrompt() {
    let package = ''
    const isInstall = await isInstallPrompt()
    if (isInstall) package = await packagePrompt()
    global.prompt.set('isInstall', isInstall)
    global.prompt.set('package', package)
}

function downloadTemplate() {
    const name = global.opts.template ?? `${(global.prompt.get('framework')).toLocaleLowerCase()}${global.prompt.get('isTs') === 'Typescript' ? '-ts' : ''}`
    const filePath = resolve(__dirname, `../template/template-${name}`)
    const exis = fs.pathExistsSync(filePath)
    if (exis) localDownload(filePath)
    else networkDownload()
    isInstallDevDependencies()
}

function localDownload(filePath) {
    const copyPath = resolve(process.cwd(), `./${global.project}`)
    fs.copySync(filePath, copyPath)
}

async function networkDownload() {
    initPrompt()
    await runPackagePrompt()
    const git = simpleGit();
    await git.clone(global.opts.template, `${process.cwd()}/${global.project}`)
    if (global.prompt.get('isInstall')) await isInstallDevDependencies()
}

async function isInstallDevDependencies() {
    if (!global.prompt.get('isInstall')) {
        console.log(`cd ${global.project}`)
        console.log(`npm install`)
        console.log(`npm run dev`)
        return
    }

    const commandName = process.platform === 'win32' ? `${global.prompt.get('package')}.cmd` : 'npm'
    await execCommand(commandName, ["install"], { cwd: `./${global.project}`, shell: true })
    await execCommand(commandName, ['run', 'dev'], { cwd: `./${global.project}`, shell: true })
}

module.exports = {
    runPrompt,
    downloadTemplate,
    copyTemplate,
    networkDownload
}