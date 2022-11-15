const fs = require("fs");
const merge = require("webpack-merge");

function configMerge(Pconf, config) {
  const {
    dev = Object.create(null),
    pro = Object.create(null),
    base = Object.create(null),
  } = Pconf;
  if (this.type === "start") {
    return merge(config, base, dev);
  } else {
    return merge(config, base, pro);
  }
}

function mergeConfig(config) {
  const targertPath = this.path + "/ldf.config.js";
  const isExi = fs.existsSync(targertPath);
  if (isExi) {
    const perconfig = require(targertPath);
    const mergeCOnfigResult = configMerge.call(this, perconfig, config);
    return mergeCOnfigResult;
  }
}

module.exports = mergeConfig;
