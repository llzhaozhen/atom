var express=require('express');
var router=express.Router();

var db=require("../db/Sql");
/*
 *查询列表页
 */


 router.get("/",function(req,res,next){
   res.render("login");
 });


/**
  *添加用户
  */
router.get("/add",function(req,res,next){
  res.render("add");
});


router.post("/add",function(req,res,next){
  var id=req.body.id;
  var name=req.body.name;
  var email_user=req.body.email_user;
  var email_touser=req.body.email_touser;
  var content=req.body.content;
  var title=req.body.title;
  var to_date=req.body.to_date;

  if(id==null){
    res.send("新增失败"+err);
  }

  db.query("insert into email(id,name,email_user,email_touser,content,title,to_date) values('"+id+
  "','"+name+"','"+email_user+"','"+email_touser+"','"+content+"','"+title+"','"+to_date+
  "')",function(err,rows){
    if(err){
      res.send("新增失败"+err);
    }else{

      db.query("select * from email",function(err,rows){
        if(err){
          res.render("users",{title:"用户列表",datas:[]});

        }else{
          res.render("users",{title:"用户列表",datas:rows})
        }
      })
    }
  });
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
          res.render("users",{title:"用户列表",datas:rows})
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
      res.render("update",{datas:rows});
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
          res.render("users",{title:"用户列表",datas:rows})
        }
      })
    }
  });
});


/**
**  查询
**/


router.post("/search",function(req,res,next){
  var id= req.body.s_id;
  var sql="select * from email where id='"+id +"'";
  // var sql="select * from email";
  //
  // if(id){
  //   sql += " where id='"+id+"'";
  // }
  //
  // sql.replace("and","where");

  db.query(sql,function(err,rows){
    if(err){
      res.send("查询失败"+err);
    }else{
      res.render("users",{ title:"用户列表",datas:rows,s_id:id })
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

  // if(id){
  //   sql += " where id='"+id+"'";
  // }

  // sql.replace("and","where");
  db.query(sql,function(err,rows){
    if(rows==0){
      res.send("没有您的信息！");
    }else(
      db.query("select * from email",function(err,rows){
        if(err){
          res.render("users",{title:"用户列表",datas:[]});
        }else{
          res.render("users",{title:"用户列表",datas:rows,msg:name})
        }
      })
    )
  });
});
module.exports = router;
