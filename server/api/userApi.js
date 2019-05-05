var models = require('../mysql/db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../mysql/sqlMap');

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};
//根据条件查询用户接口
router.get('/queryUser', (req, res) => {
    var sql = $sql.user.select;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.queryParam], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            res.send(result);
        }
    })
});
//返回全部数据接口
router.get('/allUser', (req, res) => {
    var sql = $sql.user.selectAll;
    conn.query(sql, function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            res.send(result);
        }
    })
});
// 增加用户接口
router.post('/addUser', (req, res) => {
    var sql = $sql.user.add;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.username, params.age,params.address], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            res.send(result);
        }
    })
});
//删除用户接口
router.delete('/deleteUser', (req, res) => {
    var sql = $sql.user.delete;
    console.log(req)
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.id], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            res.send(result);
        }
    })
});

//修改用户数据接口
router.patch('/patchUser', (req, res) => {
    var sql = $sql.user.update;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.username, params.age,params.address,params.id], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            res.send(result);
        }
    })
});

module.exports = router;