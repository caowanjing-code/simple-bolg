const koa=require('koa')
const render=require('koa-ejs');

// 请求中间件
const bodyParser = require('koa-bodyparser')

const authenticate=require('./middlewares/authenticate');
const app = new koa()

// 挂载中间件
app.use(bodyParser());
app.use(authenticate);


// 设置cookie加密
app.keys=['ehfcherywur'];
// 路由引入
const postRouter=require('./routes/post');
const siteRouter=require('./routes/site');
const userRouter=require('./routes/user');


// 挂载路由
app.use(postRouter.routes()).use(postRouter.allowedMethods());
app.use(siteRouter.routes()).use(siteRouter.allowedMethods());
app.use(userRouter.routes()).use(userRouter.allowedMethods());


// 模板配置
render(app,{
    root: './templates',
    layout: 'main',
    viewExt:'ejs'
});

// 监听端口
app.listen(9000,()=>{
    console.log('is listening  9000');
})




