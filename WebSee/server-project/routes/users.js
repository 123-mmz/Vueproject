var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

// var express = require('express');
// const { mongo } = require('../db/db')
// var router = express.Router();// 注册
// const colName = 'user'
// // /user/reg
// Router.post('/reg', async (req, res) => {
//   res.append('Access-Control-Allow-Origin', '*');
//     let { username, password } = req.body;
//     let result
//     try {
//         await mongo.insert(colName, [{ username, password, regtime: new Date() }]);
//         result = formatData()
//     } catch (err) {
//         result = formatData({ code: 0 })
//     }

//     res.send(result);
// })

// Router.get('/check', async (req, res) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     let { username } = req.query;

//     let result = await mongo.find(colName, { username });
//     if (result.length) {
//         res.send(formatData({ code: 0 }))// {code:1,msg:'success',data}
//     } else {
//         res.send(formatData());
//     }
// });
// module.exports = router;

