var express = require('express');
var sqlite = require('sqlite3');
var app = express();

app.set('view engine','ejs');

var db = new sqlite.Database('mydb.sqlite');

app.get('/',function(req,res){
    db.all('select * from mydata',function (error , data) {
        res.render('home',{
            data : data
        });
    });


});

app.post('/new',function (req,res) {
   db.run("insert into mydata ( text , url ) values('"+req.query.text+"' , '"+req.query.url+"')",function () {
       res.send('ok');
   });

});

app.post('/delete',function (req,res) {
    db.run("delete from mydata where id="+req.query.id,function () {
        res.send('ok');
    });
});

app.listen(3000, function () {
    console.log('Listening on port 3000!');
});