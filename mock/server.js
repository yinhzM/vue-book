let http = require('http');
let path = require('path');
let url = require('url');
let fs = require('fs');

function read (cb) {
  fs.readFile('./book.json','utf-8',function (err,data) {
    if(err || data.length == 0) {
      cb([]);
    } else {
      cb(JSON.parse(data));
    }
  });
}

function write (data, cb) {
  fs.writeFile('./book.json',JSON.stringify(data),cb);
}

let silder = require('./silders.js');
http.createServer((req,res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');        // * 这个表示任意域名都可以访问，这样写不能携带cookie了。 || 'http://localhost:5080'

  res.setHeader('Access-Control-Allow-Credentials', true);  // 允许服务器端发送Cookie数据,
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');//它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');  //设置方法

  if (req.method == 'OPTIONS') {
    return res.end();   //在正常的请求之前，会发送一个验证，是否可以请求。
  }
  res.setHeader('Content-Type',"application/json");
  var {pathname, query} = url.parse(req.url, true); //true把query转成对象
  if(pathname === '/getSilders'){
    res.end(JSON.stringify(silder));
  }

  if(pathname === '/hot') {
    read(function (books) {
      let hot = books.reverse().slice(0,6);
      res.end(JSON.stringify(hot));
    });
    return;
  }

  if(pathname === '/book'){

    let id = parseInt(query.id);
    switch (req.method) {
      case 'GET':
        if(id || id == 0){
          read(function (books) {
            let book = books.find(item => item.bookId === id) || {};
            res.setHeader('Content-Type',"application/json;charset=utf8");
            res.end(JSON.stringify(book));
          });
        } else {
          read(function (books) {
            res.setHeader('Content-Type',"application/json;charset=utf8");
            res.end(JSON.stringify(books.reverse()));
          });
          return;
        }
        break;
      case 'POST':
        let str = "";
        req.on('data',chunk=>{
          str += chunk;
        });
        req.on('end',() => {
          let book = JSON.parse(str);
          read(function (books) {
            book.bookId = books.length ? books[books.length -1].bookId+1 : 1;
            books.push(book);
            write(books, function () {
              res.end(JSON.stringify(book));
            });
          });
        });
        return;
        break;
      case 'PUT':
        if(id){
          let str = "";
          req.on('data',chunk=>{
            str += chunk;
          });
          req.on('end',() => {
            let book = JSON.parse(str);
            read(function (books) {
              books = books.map(item => {
                if(item.bookId === id){
                  return book;
                } else {
                  return item;
                }
              });
              write(books, function () {
                res.end(JSON.stringify(book));
              });
            })
          })
        }
        return;
        break;
      case 'DELETE':
        read(function (books) {
          books = books.filter(item => item.bookId!==id);
          write(books, function () {
            res.end(JSON.stringify({}))
          });
        });
        return;
        break;
    }
  }
}).listen(3000);
console.log('Server runing at port: 3000')
