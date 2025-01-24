const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

MediaSourceHandle.exports = merge(common, {
    mode: "production",
})