
const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    watchOptions: {
      ignored: [
        '/node_modules/',      
      ]
    }
  }

});
