const http = require('http')
const {insert}=require('./db')
http.get('http://m.yuedu.163.com/search/book/data.json?key=%E4%BB%99%E4%BA%BA&page=2&nextPageLink=%2Fsearchbook2.atom%3Fpage%3D2%26free%3D0%26official%3D0%26num%3D20%26query%3D%25E4%25BB%2599%25E4%25BA%25BA', (res) => {
  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
      // console.log(JSON.stringify(rawData));
      let frees = JSON.parse(rawData).data.books;
      // console.log(books);
      frees.forEach(element => {
          insert('freebook', [{
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