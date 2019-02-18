const { override, addLessLoader,fixBabelImports } = require('customize-cra');
module.exports = override(
 addLessLoader({
   strictMath: true,
   noIeCompat: true
 }),
 fixBabelImports("import",{
    libraryName:"antd-mobile",
    libraryDirectory: 'es',
    style:"css"
 })
);
