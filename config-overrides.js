

function overWrite(config){
  //实现自定义配置
  return config;
}

const { override, addLessLoader, fixBabelImports} = require('customize-cra');
module.exports = override(
  addLessLoader({
    strictMath: true,
    noIeCompat: true,
    javascriptEnabled: false
  }),
  fixBabelImports("import", {
    libraryName: "antd-mobile",
    style: "css"
  })
);
