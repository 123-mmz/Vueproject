const http = require('http')
const {insert}=require('./db')
http.get('http://m.yuedu.163.com/rank/original/list/data.json?gender=male&sortType=day&type=sell', (res) => {
  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
      // console.log(JSON.stringify(rawData));
      let books = JSON.parse(rawData).data.books;
      // console.log(books);
      books.forEach(element => {
          insert('readbook', [{
            author: element.author,
            category: element.category,
            title: element.title,
            description: element.description,
            readCount: element.readCount,
            iconUrl: element.iconUrl,
            showTotalCount: element.showTotalCount 
        }])
          
      });
      
  });
}).on('error', (e) => {
  console.error(`出现错误: ${e.message}`);
});