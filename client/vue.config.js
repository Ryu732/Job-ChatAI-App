const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
	outputDir: '../client/public',
	devServer: {
	  proxy: 'http://localhost:3000'
	}
};