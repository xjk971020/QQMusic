const prodPlugins = [];
if (process.env.NODE_ENV === "production") {
  prodPlugins.push("transform-remove-console");
}
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    //打包时需将以下代码注释
    // [
    //   "component",
    //   {
    //     libraryName: "element-ui",
    //     styleLibraryName: "theme-chalk"
    //   }
    // ],
    ...prodPlugins
  ]
};
