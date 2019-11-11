
var express = require('express');
const { mongo } = require('./db')
var router = express.Router();// 注册
const colName = 'user'
// /user/reg
Router.post('/reg', async (req, res) => {
    let { username, password } = req.body;
    let result
    try {
        await mongo.insert(colName, [{ username, password, regtime: new Date() }]);
        result = formatData()
    } catch (err) {
        result = formatData({ code: 0 })
    }

    res.send(result);
})

Router.get('/check', async (req, res) => {
    let { username } = req.query;

    let result = await mongo.find(colName, { username });
    if (result.length) {
        res.send(formatData({ code: 0 }))// {code:1,msg:'success',data}
    } else {
        res.send(formatData());
    }
});
module.exports = router;
