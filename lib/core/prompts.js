const { select, confirm } = require('@inquirer/prompts')


function initPrompt() {
    const prompt = new Map()
    global.prompt = prompt
}

async function frameworkPrompt() {
    return await select({
        name: 'framework',
        message: 'Please select framework',
        choices: ['Vue', 'React', 'Preact', 'Solid', 'Svelte', 'Vanilla', 'Lit', 'Qwik']
    })
}

async function isTsPrompt() {
    return await select({
        name: 'isTs',
        message: 'What Typescript do you need',
        choices: ['Javascript', 'Typescript']
    })
}

async function isInstallPrompt() {
    return await confirm({
        name: 'isInstall',
        message: 'Do you need to install dependencies? ',
    })
}

async function packagePrompt() {
    return await select({
        name: 'package',
        message: 'Select package',
        choices: ['npm', 'pnpm', 'yarn', 'cnpm']
    })
}

module.exports = {
    frameworkPrompt,
    isTsPrompt,
    initPrompt,
    isInstallPrompt,
    packagePrompt
}