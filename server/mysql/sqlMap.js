// sql语句
var sqlMap = {
    // 用户
    user: {
        add: 'insert into userinfo set name=? , age=?, address=?',
        select: 'select * from userinfo  where name= ?' ,
        selectAll: 'select * from userinfo',
        delete:'delete from userinfo  where id=?',
        update: 'update userinfo set  name=? , age=? , address=? where id=?'
    }
}
module.exports = sqlMap;