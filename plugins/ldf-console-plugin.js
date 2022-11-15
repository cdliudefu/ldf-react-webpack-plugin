const chalk = require("chalk");
const slog = require("single-line-log");

// 自定义plugins
class LdfConsolePlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    // 监视文件更改
    compiler.hooks.watchRun.tap("LdfConsolePlugin", (watching) => {
      const changeFiles = watching.watchFileSystem.watcher.mtimes;
      for (let file in changeFiles) {
        console.log(chalk.green("当前改动文件：" + file));
      }
    });

    // 在创建新编译之前。
    compiler.hooks.compile.tap("LdfConsolePlugin", () => {
      this.beginCompile();
    });

    // 编译完成时执行。
    compiler.hooks.done.tap("LdfConsolePlugin", () => {
      this.timer && clearInterval(this.timer);
      console.log(chalk.yellow("编译完成"));
    });
  }
  beginCompile() {
    const lineSlog = slog.stdout;
    let text = "开始编译";
    this.timer = setInterval(() => {
      text += "█";
      lineSlog(chalk.green(text));
    }, 50);
  }
}

module.exports = LdfConsolePlugin;
