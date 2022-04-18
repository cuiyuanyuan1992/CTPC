/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * 拦截所配置前缀的请求（如/api/）转发到服务端（target配置），如下服务端接口无api路径所以去除（跟自己项目一致即可）
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/api/': {
      target: 'http://127.0.0.1:8899',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  test: {
    '/api/': {
      target: 'http://127.0.0.1:8899',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'http://127.0.0.1:8899',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
};
