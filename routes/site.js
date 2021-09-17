const Router=require('koa-router');
const post=require('../services/post');
const router=new Router();

// 网站首页
router.get('/',async (ctx)=>{
    const list=post.list();
    ctx.render('index',{
        list:list
    });
})
module.exports=router;