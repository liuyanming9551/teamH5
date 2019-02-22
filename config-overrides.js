
const rewirePostcss = require('react-app-rewire-postcss');
const pxtorem = require('postcss-pxtorem');
const autoprefixer = require('autoprefixer');
const theme = require('./package.json').theme;
const fileLoaderMatcher = function (rule) {
  return rule.loader && rule.loader.indexOf(`file-loader`) != -1;
}
function overWrite(config) {
  //实现自定义配置
  console.log(config.module.rules[2].oneOf);

  // sass
  config.module.rules[2].oneOf.unshift(
    {
      test: /\.scss$/,
      use: [
        require.resolve('style-loader'),
        require.resolve('css-loader'),
        require.resolve('sass-loader'),
        {
          loader: require.resolve('postcss-loader'),
          options: {
            // Necessary for external CSS imports to work
            // https://github.com/facebookincubator/create-react-app/issues/2677
            ident: 'postcss',
            plugins: () => [
              require('postcss-flexbugs-fixes'),
              autoprefixer({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9', // React doesn't support IE8 anyway
                ],
                flexbox: 'no-2009',
              })
            ],
          },
        }
      ]
    }
  );
  //less
  config.module.rules[2].oneOf.unshift(
    {
      test: /\.less$/,
      use: [
        require.resolve('style-loader'),
        require.resolve('css-loader'),
        {
          loader: require.resolve('postcss-loader'),
          options: {
            // Necessary for external CSS imports to work
            // https://github.com/facebookincubator/create-react-app/issues/2677
            ident: 'postcss',
            plugins: () => [
              require('postcss-flexbugs-fixes'),
              autoprefixer({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9', // React doesn't support IE8 anyway
                ],
                flexbox: 'no-2009',
              }),
            ],
           
          },
        },
        {
          loader: require.resolve('less-loader'),
          options: {
            // theme vars, also can use theme.js instead of this.
            modifyVars: theme,
            javascriptEnabled: true
          },
        },
      ]
    }
  );

  config = rewirePostcss(config, {
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      require('postcss-preset-env')({
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
      }),
      pxtorem({
        rootValue: 100, //以100px为准，不同方案修改这里
        propWhiteList: [],
      })
    ],
  });
  return config;
}

const { override, addLessLoader, fixBabelImports} = require('customize-cra');
module.exports = override(
  addLessLoader({
    strictMath: true,
    noIeCompat: true,
    javascriptEnabled: true
  }),
  fixBabelImports("import", {
    libraryName: "antd-mobile",
    style: true
  }),
  overWrite
);
