var express = require('express');
const { mongo } = require('./db')
const findUser = (username) => {
    return new Promise((resolve, reject) => {
        User.findOne({ username }, (err, doc) => {
            if(err){
                reject(err);
            }
            resolve(doc);
        });
    });
};
//找到所有用户
const findAllUsers = () => {
    return new Promise((resolve, reject) => {
        User.find({}, (err, doc) => {
            if(err){
                reject(err);
            }
            resolve(doc);
        });
    });
};
const Login = async ( ctx ) => {
    //拿到账号和密码
    let username = ctx.request.body.name;
    let password = sha1(ctx.request.body.pass);//解密
    let doc = await findUser(username);    
    if(!doc){
        console.log('检查到用户名不存在');
        ctx.status = 200;
        ctx.body = {
            info: false
        }
    }else if(doc.password === password){
        console.log('密码一致!');

         //生成一个新的token,并存到数据库
        let token = createToken(username);
        console.log(token);
        doc.token = token;
        await new Promise((resolve, reject) => {
            doc.save((err) => {
                if(err){
                    reject(err);
                }
                resolve();
            });
        });
        ctx.status = 200;
        ctx.body = { 
            success: true,
            username,
            token, //登录成功要创建一个新的token,应该存入数据库
            create_time: doc.create_time
        };
    }else{
        console.log('密码错误!');
        ctx.status = 200;
        ctx.body = {
            success: false
        };
    }
};
//注册
const Reg = async ( ctx ) => {
    let user = new User({
        username: ctx.request.body.name,
        password: sha1(ctx.request.body.pass), //加密
        token: createToken(this.username), //创建token并存入数据库
        create_time: moment(objectIdToTimestamp(user._id)).format('YYYY-MM-DD HH:mm:ss'),//将objectid转换为用户创建时间
    });
    //将objectid转换为用户创建时间(可以不用)
    user.create_time = moment(objectIdToTimestamp(user._id)).format('YYYY-MM-DD HH:mm:ss');

    let doc = await findUser(user.username);
    if(doc){ 
        console.log('用户名已经存在');
        ctx.status = 200;
        ctx.body = {
            success: false
        };
    }else{
        await new Promise((resolve, reject) => {
            user.save((err) => {
                if(err){
                    reject(err);
                }   
                resolve();
            });
        });
        console.log('注册成功');
        ctx.status = 200;
        ctx.body = {
            success: true
        }
    }
};
//获得所有用户信息
const GetAllUsers = async( ctx ) => {
    //查询所有用户信息
    let doc = await findAllUsers();
    ctx.status = 200;
    ctx.body = {
        succsess: '成功',
        result: doc
    };
};
module.exports = {
    Login,
    Reg,
    GetAllUsers,
};