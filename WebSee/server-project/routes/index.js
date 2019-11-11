var express = require('express');
var router = express.Router();
const {
  find
} = require('../db/db');
/* GET home page. */
router.get('/books', async function (req, res, next) {
  res.append('Access-Control-Allow-Origin', '*');
  let data = await find('readbook');
  res.json(data)
});

router.get('/detail', async function (req, res, next) {
  res.append('Access-Control-Allow-Origin', '*');
  let uid = Number(req.params.id);
  // let data = await find(`select * from readbook where id=5dc02a705a3bc62de89c4247`)
  let data = await find('readbook', {uid:uid})

  // let data = await find('readbook');
  res.json(data)
});

router.get('/frees', async function (req, res, next) {
  res.append('Access-Control-Allow-Origin', '*');
  let data = await find('freebook');
  res.json(data)
});
router.get('/publish', async function (req, res, next) {
  res.append('Access-Control-Allow-Origin', '*');
  let data = await find('publish');
  res.json(data)
});
router.get('/login', async function (req, res, next) {
  res.append('Access-Control-Allow-Origin', '*');
  let username = req.params.username;
  let password = req.params.password;
  let data = await find('user',{username:username,password:password});
  res.json(data)
});
router.post('/reg', async function (req, res, next) {
  res.append('Access-Control-Allow-Origin', '*');
  let username = req.params.username;
  let password = req.params.password;
  let data = await insert('user',{username:username,password:password});
  res.json(data)
});

router.get('/check', async function (req, res, next) {
  res.append('Access-Control-Allow-Origin', '*');
  let username=req.params.username
  let data = await find('user', {username:username });
  res.json(data);
  // 







  // let result = await mongo.find(colName, { username });
  // if (result.length) {
  //   res.send(formatData({ code: 0 }))// {code:1,msg:'success',data}
  // } else {
  //   res.send(formatData());
  // }
});


// /user/reg
// router.post('/reg', async (req, res) => {
//   res.append('Access-Control-Allow-Origin', '*');

//   let { username, password } = req.body;
//   let result
//   try {
//     await mongo.insert(colName, [{ username, password, regtime: new Date() }]);
//     result = formatData()
//   } catch (err) {
//     result = formatData({ code: 0 })
//   }

//   res.send(result);
// });
// router.get('/check', async (req, res) => {
//   res.append('Access-Control-Allow-Origin', '*');
//   let data = await find('user');
//   res.json(data)
//   window.console,log(data)

//   let { username } = req.query;

//   let result = await mongo.find(colName, { username });
//   if (result.length) {
//     res.send(formatData({ code: 0 }))// {code:1,msg:'success',data}
//   } else {
//     res.send(formatData());
//   }
// });


module.exports = router;

