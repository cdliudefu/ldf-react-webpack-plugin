const EventEmitter = require("events").EventEmitter;
const Server = require("webpack-dev-server/lib/Server");
const processOptions = require("webpack-dev-server/lib/utils/processOptions");
const yargs = require("yargs");

const webpack = require("webpack");
const merge = require("./merge");
const runMergeGetConfig = require("../config/webpack.base");

class RunningWebpack extends EventEmitter {
  constructor(options) {
    super();
    this._options = options;
    this.path = null;
    this.config = null;
    this.on("running", (type, ...arg) => {
      this[type] && this[type](arg);
    });
  }

  listen({ type, cwdPath }) {
    this.path = cwdPath;
    this.type = type;
    this.config = merge.call(this, runMergeGetConfig(cwdPath)(type));
    return new Promise((resolve, reject) => {
      this.emit("running", type);
      this.once("error", reject);
      this.once("end", resolve);
    });
  }

  build() {
    try {
      webpack(this.config, (err) => {
        if (err) {
          this.emit("error");
        } else {
          this.emit("end");
        }
      });
    } catch (error) {
      this.emit("error");
    }
  }

  start() {
    const _this = this;
    processOptions(this.config, yargs.argv, (config, options) => {
      const compiler = webpack(config);
      const server = new Server(compiler, options);
      server.listen(options.port, options.host, (err) => {
        if (err) {
          _this.emit("error");
          throw err;
        }
      });
    });
  }
}

module.exports = RunningWebpack;
