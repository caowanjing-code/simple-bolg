// 发表文章
const Router=require('koa-router');
const postServices=require('../services/post');
const router=new Router();

router.get('/publish',async(ctx)=>{
    ctx.render('publish');//渲染页面
})

// 文章提交页面
router.post('/publish',(ctx)=>{

    const data=ctx.request.body;

    if(!data.title||!data.content){
        ctx.throw('500','重新写');
    }
    const item=postServices.publish(data.title,data.content);
    // console.log(item);
    ctx.redirect(`/post/${item.id}`);

})
module.exports=router;

// 路由
router.get('/post/:postId',async(ctx)=>{
    const post=postServices.show(ctx.params.postId);
    if(!post){
        ctx.throw('404','找不到');
    }
    // ctx.render('post',{
    //     post:post
    // });
    ctx.redirect('/');
})
router.get('/update/:postId',async(ctx)=>{
    const post=postServices.show(ctx.params.postId);
    if(!post){
        ctx.throw('数据不存在');
    }
    ctx.render('update',{
        post
    });
})

router.post('/update/:postId',(ctx)=>{
    const data=ctx.request.body;
    postServices.update(ctx.params.postId,data.title,data.content);
    ctx.redirect('/');
})
router.get('/delete/:postId',async(ctx)=>{
    postServices.delete(ctx.params.postId);
    ctx.redirect('/');
})
module.exports=router;