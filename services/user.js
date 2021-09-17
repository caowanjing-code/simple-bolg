const user = {
    zhangsan:'lisi',
    cao:'1999'
}
// 登录
exports.login = function(username,password){
    if(user[username] == undefined){
        return false
    }else{
        return user[username] === password;
    }
}