const simpleGit = require('simple-git');

// function InitDecorator() {
//     return (target, name, descriptor) => {
//         const method = descriptor.value
//         descriptor.value = () => {
//             GitBash.getInstance().init()
//             method()
//         }
//     }
// }


class GitBash {
    static instance = null

    static getInstance() {
        if (!GitBash.instance) GitBash.instance = simpleGit()
        return GitBash.instance
    }

    init() {

    }

    clone() {

    }

    addRemote() { }

    add(path) {
        console.log(11111, GitBash.instance.add, `${path}*`);
        // await GitBash.instance.add(`${path}/*`)
        console.log();

        // console.log(this.opts());
        console.log();

        // GitBash.instance.add()
    }

    commit() { }

    push() { }
}


module.exports = GitBash.getInstance()

