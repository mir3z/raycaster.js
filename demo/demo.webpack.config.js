const join = require("path").join;

const joinDirname = (...rest) => join(__dirname, ...rest);
const demoPath = (demo) => joinDirname(demo, "index.js");

module.exports = {
    entry: {
        simple: demoPath("simple"),
        maze: demoPath("maze"),
        solid: demoPath("solid")
    },
    output: {
        path: joinDirname("build"),
        publicPath: "/build/",
        filename: "[name].js"
    },
    resolve: {
        alias: {
            raycaster: joinDirname("../src")
        }
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    }
};