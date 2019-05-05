<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="searchBox">
      <el-input
        class="search"
        type="text"
        name="queryParam"
        v-model="queryParam"
        placeholder="输入关键字搜索"
      ></el-input>
      <el-button type="primary" @click="queryUser">查询</el-button>
    </div>
    <form ref="formbox">
      <el-input type="text" name="username" v-model="userName" placeholder="请输入姓名" ref="input1"></el-input>
      <br>
      <el-input type="text" name="age" v-model="age" placeholder="请输入年龄" class="mt10"></el-input>
      <br>
      <el-input type="text" name="address" v-model="address" placeholder="请输入地址" class="mt10"></el-input>
      <br>
      <el-button type="primary" @click="addUser" class="mt10">添加</el-button>
    </form>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 60%;margin: 0px 180px;"
    >
      <el-table-column label="Id" prop="id"></el-table-column>
      <el-table-column label="Name" prop="name"></el-table-column>
      <el-table-column label="Age" prop="age"></el-table-column>
      <el-table-column label="Address" prop="address"></el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="showDialog(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index+1, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--弹窗数据-->
    <el-dialog title="提交修改信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-input type="text" name="username" v-model="userName2" placeholder="请输入姓名" ref="input1"></el-input>
      <br>
      <el-input type="text" name="age" v-model="age2" placeholder="请输入年龄" class="mt10"></el-input>
      <br>
      <el-input type="text" name="address" v-model="address2" placeholder="请输入地址" class="mt10"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data () {
    return {
      dialogVisible: false,
      dialogFormVisible: false,
      msg: "用户管理表",
      userName: "",
      age: "",
      queryParam: "",
      user: "",
      address: "",
      userName2: "",
      age2: "",
      address2: "",
      objId: "",
      tableData: [
        {
          id: "",
          name: "",
          age: "",
          address: ""
        }
      ],
      search: ""
    };
  },
  methods: {
    handleClose (done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    addUser () {
      var name = this.userName;
      var age = this.age;
      var address = this.address;
      axios
        .post("api/user/addUser", {
          username: name,
          age: age,
          address: address
          // address: address
        })
        .then(response => {
          console.log(response);
          this.open2();
          this.userName = "";
          this.age = "";
          this.address = "";
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    queryUser () {
      var queryParam = this.queryParam;
      axios
        .get("api/user/queryUser", {
          params: {
            queryParam: queryParam
          }
        })
        .then(response => {
          console.log(response);
          // this.user = response.data;
          var resdata = response.data;
          this.tableData = resdata;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    queryallUser () {
      axios
        .get("api/user/allUser")
        .then(response => {
          // console.log(response);
          var resdata = response.data;
          this.tableData = resdata;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleEdit () {
      var id = parseInt(this.objId.id);
      console.log(id)
      var name = this.userName2;
      var age = this.age2;
      var address = this.address2;
      axios
        .patch("api/user/patchUser", {
          username: name,
          age: age,
          address: address,
          id: id
        })
        .then(response => {
          console.log(response);
          this.open2();
          this.dialogVisible = false;
          this.userName2 = "";
          this.age2 = "";
          this.address2 = "";
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleDelete (index, row) {
      console.log(row);
      var id = row.id;
      console.log(id);
      axios
        .delete("api/user/deleteUser", {
          params: {
            id: id
          }
        })
        .then(response => {
          console.log(response);
          this.open3();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    showDialog (index, row) {
      console.log("1");
      // 记录数据
      this.objId = row;
      // 显示弹窗
      this.dialogVisible = true;
    },
    open2 () {
      this.$message({
        message: "添加数据成功",

        type: "success"
      });
      this.queryallUser();
    },
    open3 () {
      this.$message({
        message: "删除数据成功",

        type: "success"
      });
      this.queryallUser();
    }
  },
  mounted () {
    this.queryallUser();
  }
};
</script>
<style>
.search {
  width: 230px;
  height: 60px;
}
form {
  width: 230px;
  margin: 10px auto;
  float:right;
}
.mt10 {
  margin-top: 10px;
}

</style>
