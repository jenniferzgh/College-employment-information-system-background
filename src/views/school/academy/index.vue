<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input class="filter-item" v-model="listQuery.name_like" placeholder="请输入学院名称" style="width: 200px;"></el-input>
      <el-input class="filter-item" v-model="listQuery.schoolName_like" placeholder="请输入学校名称"
                style="width: 200px;"></el-input>
      <el-input class="filter-item" v-model="listQuery.owner_like" placeholder="请输入院长" style="width: 200px;"></el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查找
      </el-button>
      <el-button @click="drawerVisible = true,btn1=false,btn2=true,btn3=true" type="primary" class="filter-item">
        添加学院
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column width="100" label="代号">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="学院名称">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="院长">
        <template slot-scope="scope">
          {{scope.row.owner}}
        </template>
      </el-table-column>
      <el-table-column label="联系电话">
        <template slot-scope="scope">
          {{scope.row.tel}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="editorList(scope.row.id)"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="delById(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="!listLoading"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery.pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="listQuery.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <el-drawer
      title="添加学院"
      :visible.sync="drawerVisible"
      direction="rtl">
      <el-form :model="pageForm" :rules="rules" ref="pageForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名称" prop="name">
          <el-input v-model="pageForm.name"></el-input>
        </el-form-item>
        <el-form-item label="院长" prop="owner">
          <el-input v-model="pageForm.owner"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="tel">
          <el-input v-model="pageForm.tel"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateFprm('pageForm')" v-if='btn1'>修改</el-button>
          <el-button type="primary" @click="submitForm('pageForm')" v-if='btn2'>添加</el-button>
          <el-button @click="resetForm('pageForm')" v-if='btn3'>重置</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
  import {page, addObj, delObj, updObj,getAcademyDetail} from '@/api/school/academy';
  export default {
    name: 'Academy',
    data() {
      return {
        drawerVisible: false,
        schoolList: [],
        list: [],
        listLoading: false,
        total: undefined,
        listQuery: {
          pageSize: 10,
          pageNum: 1,
          pageForm: {}
        },
        btn1:false,
        btn2:true,
        btn3:true,
        pageForm: {
          tel: undefined,
          name: undefined,
          owner: undefined,
        },
        rules: {
          tel: [
            {required: true, message: '请输入联系电话', trigger: 'change'},
          ],
          name: [
            {required: true, message: '请输入学院名称', trigger: 'blur'}
          ],
          owner: [
            {required: true, message: '请输入院长', trigger: 'blur'}
          ]
        }
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      handleFilter() {
        this.getList()
      },
      getList() {
        this.listLoading = true
        page(this.listQuery, this.page, this.size).then(res => {
          const {data, total} = res
          this.list = data
          console.log(this.list)
          this.total = total
          this.listLoading = false
        })
      },
      updateFprm(formName){
      this.$refs[formName].validate((valid) =>{
        if(valid){
        updObj(this.pageForm).then(res=>{
           this.$message.success("修改成功")
           this.getList()
        })   
        }
      })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addObj(this.pageForm).then(res => {
              if(res.success) {
                this.$message.success("添加成功")
                this.resetForm(formName)
                this.getList();
              }else {
                this.$message.error(res.message)
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      
      delById(id) {
      delObj(id).then(res=>{
        this.getList()
      })
      },
      update() {

      },
      handleSizeChange(size) {
        this.size = size
        this.getList()
      },
      handleCurrentChange(page) {
        this.page = page
        this.getList()
      },
      editorList(data){
        this.drawerVisible=true;
        this.btn1=true;
        this.btn2=false;
        this.btn3=false;
        getAcademyDetail(data).then(res=>{
          this.pageForm=res.data
        })
        
      }
    }
  }
</script>

<style scoped>

</style>
