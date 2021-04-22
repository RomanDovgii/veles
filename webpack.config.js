const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const SplitByPathPlugin = require(`split-by-path-webpack-plugin`);
const CopyPlugin = require(`copy-webpack-plugin`);
const fs = require(`fs`);
const path = require(`path`);

function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));

    return templateFiles.map((item) => {
        const parts = item.split(`.`);
        const name = parts[0];
        const extension = parts[1];

        return new HtmlWebpackPlugin({
            filename: `${name}.html`,
            template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
            inject: true,
        })
    })
}

const htmlPlugins = generateHtmlPlugins(`./src/html`);

module.exports = {
    mode: `development`,
    entry: [
        `./src/js/index.js`,
        `./src/scss/style.scss`
    ],
    output: {
        filename: `./js/bundle.js`,
        path: path.resolve(__dirname, `public`)
    },
    devServer: {
        contentBase: path.resolve(__dirname, `public`),
        open: false,
        port: 8089,
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, `/public`),
        watchContentBase: true,
    },
    devtool: `source-map`,
    module: {
        rules:
        [
            {
                test: /\.(js)$/,
                include: path.resolve(__dirname, `src/js`),
                exclude: /node_modules/,
                use: {
                    loader: `babel-loader`,
                }
            },
            {
                test: /\.(sass|scss)$/,
                include: path.resolve(__dirname, `src/scss`),
                use: [
                    {
                        loader: `file-loader`,
                        options: {outputPath: `css/`, name: `style.min.css`}
                    },
                    `sass-sourcemap-loader`,
                    {
                      loader: `sass-loader`,
                      options: {
                        sourceMap: true,
                      },
                    },
                ]
            },
            {
                test: /\.html$/,
                include: path.resolve(__dirname, `src/html/includes`),
                use: [`raw-loader`]
            },
        ]
    },
    resolve: {
        extensions: [`.js`, `.jsx`]
    },
    plugins: [

        new CopyPlugin({
          patterns: [
            //remove this part if you don`t need to copy fonts
            {
              from: path.resolve(__dirname, `src/fonts`),
              to: path.resolve(__dirname, `public/fonts/`),
            },
            // remove this part if you don`t need to copy images
            {
              from: path.resolve(__dirname, `src/img`),
              to: path.resolve(__dirname, `public/img/`),
            }
          ],
        }),
    ].concat(htmlPlugins)
};
