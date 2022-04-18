# Ant Design Pro

This project is initialized with [Ant Design Pro](https://pro.ant.design). Follow is the quick guide for how to use.

## Environment Prepare

Install `node_modules`:

```bash
npm install
```

or

```bash
yarn
```

## Provided Scripts

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Start project

```bash
npm start
```

### Build project

```bash
npm run build
```

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

### Test code

```bash
npm test
```

## More

You can view full document on our [official website](https://pro.ant.design). And welcome any feedback in our [github](https://github.com/ant-design/ant-design-pro).

## 项目重点文件介绍
* config/proxy.js 进行代理配置
* config/route.js 路由配置
* src/locales/ 进行本地化配置（中文只关注zh-CN/menu.js即可），与route.js配置对应
* src/services 前端接口定义，与服务端接口对应（可加前缀便于代理处理）
* src/models 数据处理层，将服务端请求到的数据进行处理和临时存储
* src/pages 页面定义，使用models层进行请求和渲染

