# 学习GraphQL 和 mongodb 小项目
## 1、关于 mongodb 云存储
在 https://cloud.mongodb.com/ 注册后有 500M 免费空间，创建 db 之后修改 server/app.js 里的 mongoose.connect 地址，在根目录下使用以下命令启动 node 服务

```js
nodemon app.js
```

打开 http://localhost:4000/graphql 可以看到 graphiql 界面，愉快的使用 graphql 命令进行增删改查了


