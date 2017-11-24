var express=require('express');
var router=express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'upload/' });
var fs=require('fs');
var db=require("../db/Sql");

//引入发送邮件的模块
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'qq',
  auth: {
    user: '1403293285@qq.com',
    pass: 'glkxuoyjicqsifbj' //授权码,通过QQ获取

  }
  });

/*
 *查询列表页
 */

 router.get("/",function(req,res,next){
   res.render("login");
 });

/**
*删除用户
**/

router.get("/del/:id",function(req,res){
  var id=req.params.id;
  db.query("delete from email where id="+id,function(err,rows){
    if(err){
      res.send("删除失败"+err);
    }else{

      db.query("select * from email",function(err,rows){
        if(err){
          res.render("users",{title:"用户列表",datas:[]});

        }else{
          var name='删除成功';
          res.render("users",{title:"用户列表",datas:rows,msg:name})
        }
      })
    }
  });
});

/*
 *  修改
 */

router.get("/toUpdate/:id",function(req,res,next){
  var id=req.params.id;
  var sql="select * from email where id="+id;

  db.query(sql,function(err,rows){
    if(err){
      res.send("修改页面跳转失败");
    }else{
      var name='修改邮件!';
      res.render("update",{datas:rows,msg:name});
    }
  });
});


router.post("/update",function(req,res,next){
  var id=req.body.id;
  var name=req.body.name;
  var email_user=req.body.email_user;
  var email_touser=req.body.email_touser;
  var content=req.body.content;
  var title=req.body.title;
  var to_date=req.body.to_date;

  var sql="update email set name= '"+name+"',email_user= '"+email_user+"',email_touser= '"+email_touser+
  "',content= '"+content+"',title='"+title+"',to_date='"+to_date+"' where id="+id;
  db.query(sql,function(err,rows){
    if(err){
      res.send("修改失败"+err);
    }else{
      db.query("select * from email",function(err,rows){
        if(err){
          res.render("users",{title:"用户列表",datas:[]});

        }else{
          var name='修改成功！';
          res.render("users",{title:"用户列表",datas:rows,msg:name})
        }
      })
    }
  });
});


/**
**  查询
**/


router.post("/search",upload.single('other'),function(req,res,next){
  var id= req.body.s_id;
  var other=req.body.other;
  console.log(other);
  fs.renameSync('F:/ssa/'+other,'F:/GitHub/Atom/test/ejs/upload/'+other);

  var sql="select * from email where id='"+id +"'";

  db.query(sql,function(err,rows){
    if(rows==0){
      var name='没有这个用户的信息';
      db.query("select * from email",function(err,rows){
          res.render("users",{title:"用户列表",datas:rows,msg:name})
        })
    }else{
      res.render("users",{ title:"用户列表",datas:rows,s_id:id,msg:id})
    }
  });
});

/**
**登录
**/
router.post("/login",function(req,res,next){

  var id=req.body.account;
  var name=req.body.name;

  var sql="select * from email where id='"+id +"'and name='"+name+"'";

  db.query(sql,function(err,rows){
    if(rows==0){
      res.send("没有您的信息！");
    }else{
      db.query("select * from email",function(err,rows){
        if(err){
          res.render("users",{title:"用户列表",datas:[]});
        }else{
          res.render("users",{title:"用户列表",datas:rows,msg:name})
        }
      })
    }
  });
});

// 发送邮件
router.get("/addEmail",function(req,res,next){
  res.render("add");
});

router.post("/addEmail",function(req,res,next){
  var id=req.body.id;
  var name=req.body.name;
  var email_user=req.body.email_user;
  var email_touser=req.body.email_touser;
  var content=req.body.content;
  var title=req.body.title;
  var to_date=req.body.to_date;

  if(id==""){
    res.send("新增失败");
  }else{
    db.query("insert into email(id,name,email_user,email_touser,content,title,to_date) values('"+id+
    "','"+name+"','"+email_user+"','"+email_touser+"','"+content+"','"+title+"','"+to_date+
    "')",function(err,rows){
        if(err){
            db.query("select * from email",function(err,rows){
              var name='发送成功';
              res.render("users",{title:"用户列表",datas:rows,msg:name});
            })
          }else{
              db.query("select * from email",function(err,rows){
                  if(err){
                    res.render("users",{title:"用户列表",datas:[]});
                  }else{
                    var mailOptions = {
                      from: '1403293285@qq.com', // 发送者
                      to: email_touser, // 接受者,可以同时发送多个,以逗号隔开
                      subject: title, // 标题
                      text: 'Hello world', // 文本
                      html: content
                    };
                    transporter.sendMail(mailOptions, function (err, info) {
                      if (err) {
                        console.log(err);
                        return;
                      }
                    });
                      var name='发送成功';
                      res.render("users",{title:"用户列表",datas:rows,msg:name});
                    }
                  })
                }
              });
            }
          });

module.exports = router;
