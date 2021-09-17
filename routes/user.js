// 登录页面

const Router=require('koa-router');
const userPass=require('../services/user');
const router=new Router();

router.get('/login' ,async (ctx)=>{
    ctx.render('login');

})

router.post('/login',async (ctx)=>{
    const data=ctx.request.body;
    if(!data.username||!data.password){//只要有一个是假的话就是真，全部为真时就为假
        ctx.throw(404,'not found')

    }

    const logged=userPass.login(data.username,data.password);

    if(!logged){
        ctx.throw('505','账号或密码错误');
    }
    ctx.cookies.set('logged',1,{//设置cookie

        signed:true,
        httpOnly:true
    })

    // 重定向
    ctx.redirect('/','登录成功');

})

router.get('/logout',async(ctx)=>{
    ctx.cookies.set('logged',0,{
        signed:true,
    })
    ctx.redirect('/','退出登录');
})

module.exports=router;