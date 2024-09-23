const { spawn } = require('child_process')

function execCommand(...args) {
  return new Promise((resolve) => {
    // npm install/npm run dev
    // 1.开启子进程执行命令
    const childProcess = spawn(...args)

    // 2.获取子进程的输出和错误信息
    childProcess.stdout.pipe(process.stdout)
    childProcess.stderr.pipe(process.stderr)

    // 3.监听子进程执行结束, 关闭掉
    childProcess.on('close', () => {
      childProcess.kill()
      resolve()
    })
  })
}

module.exports = execCommand
