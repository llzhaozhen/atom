var express = require('express');
var router = express.Router();

var db = require("../config/db");

/**
 * 查询列表页
 */
router.get("/",function(req,res,next){
    db.query("select * from email",function(err,rows){
        if(err){
            res.render("users",{title:"用户列表",datas:[]});
        }else {
            res.render("users",{title:"用户列表",datas:rows});
        }
    });
});

/**
 * 添加用户
 */
router.get("/add",function(req,res,next){
    res.render("add");
});
router.post("/add",function(req,res,next){
    var id = req.body.id;
    var name = req.body.name;
    var email_user = req.body.email_user;
    var email_touser = req.body.email_touser;
    var content = req.body.content;
    var title = req.body.title;
    var to_date = req.body.to_date;
    db.query("insert into email(id,name,email_user,email_touser,content,title,to_date) values('"+id+"','"+ name +"','"+ email_user +"','"+ email_touser +"','"+ content +"','"+ title +"','"+ to_date +"')",function(err,rows){
        if(err){
            res.send("新增失败"+err);
        }else {
            res.redirect("/users");
        }
    });
});

/**
 * 删除用户
 */
router.get("/del/:id",function(req,res){
    var id = req.params.id;
    db.query("delete from email where id = " + id,function(err,rows){
        if(err){
            res.send("删除失败"+err);
        }else {
            res.redirect("/users");
        }
    });
});

/**
 * 修改
 */
router.get("/toUpdate/:id",function(req,res,next){
    var id = req.params.id;
    var sql = "select * from email where id = " + id;
    console.log(sql);
    db.query(sql,function(err,rows){
        if(err){
            res.send("修改页面跳转失败");
        }else {
            res.render("update",{datas:rows});
        }
    });
});

router.post("/update",function(req,res,next){
    var id = req.body.id;
    var name = req.body.name;
    var email_user = req.body.email_user;
    var email_touser = req.body.email_touser;
    var content = req.body.content;
    var title = req.body.title;
    var to_date = req.body.to_date;

    var sql = "update email set name = '"+ name +"',email_user = '"+ email_user +
    "',email_touser = '"+ email_touser +"',content = '"+ content +
    "',title = '"+ title +"',to_date = '"+ to_date +"' where id = " + id;
    console.log(sql);
    db.query(sql,function(err,rows){
        if(err){
            res.send("修改失败 " + err);
        }else {
            res.redirect("/users");
        }
    });
});


/**
 * 查询
 */
router.post("/search",function(req,res,next){
    var name = req.body.s_name;
    var sql = "select * from email";
    if(name){
        sql += " where name = '"+ name +"'";
    }


    sql.replace("and","where");
    db.query(sql,function(err,rows){
        if(err){
            res.send("查询失败: "+err);
        }else{
            res.render("users",{title:"用户列表",datas:rows,s_name:name});
        }
    });
})

module.exports = router;
