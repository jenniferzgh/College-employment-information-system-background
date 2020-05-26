<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        class="filter-item"
        v-model="listQuery.schoolName_like"
        placeholder="请输入学校名称"
        style="width: 200px;">
      </el-input>
      <el-input
        class="filter-item"
        v-model="listQuery.academyName_like"
        placeholder="请输入学院名称"
        style="width: 200px;">
      </el-input>
      <el-input
        class="filter-item"
        v-model="listQuery.name_like"
        placeholder="请输入专业"
        style="width: 200px;">
      </el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查找
      </el-button>
      <el-button @click="preAddBtn" type="primary" class="filter-item">
        添加学生
      </el-button>
        <el-upload
            class="filter-item"
            action="/dev-api/student/excel"
            :show-file-list="false"
            :headers="header"
            :on-success="handleImportSuccess">
            <el-button type="primary">批量导入</el-button>
        </el-upload> 
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
    <el-table-column label="学院">
        <template slot-scope="scope">
          {{scope.row.academyName}}
        </template>
      </el-table-column>
      <el-table-column label="专业">majorName
        <template slot-scope="scope">
          {{scope.row.majorName}}
        </template>
      </el-table-column>
      <el-table-column label="学号">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- <el-button type="primary" size="mini" icon="el-icon-edit" @click="update(scope.row.id)"></el-button> -->
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
      title="添加学生"
      :visible.sync="drawerVisible"
      direction="rtl">
      <el-form :model="pageForm" :rules="rules" ref="pageForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="选择专业" prop="academyAndMajor">
          <!-- <el-select v-model="pageForm.academyId" placeholder="请选择学院">
            <el-option v-for="academy in academyList"
                       :label="academy.name"
                       :key="academy.id"
                       :value="academy.id">
            </el-option>
          </el-select> -->
          
           <el-cascader v-model="pageForm.academyAndMajor" :options="academyList" :props="{ expandTrigger: 'hover' ,value:'id'}">
          </el-cascader>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="pageForm.name"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="id">
          <el-input v-model="pageForm.id"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateForm('pageForm')" v-if="btn1">修改</el-button>
          <el-button type="primary" @click="submitForm('pageForm')" v-if="btn2">添加</el-button>
          <el-button @click="resetForm('pageForm')" v-if="btn3">重置</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
  import {getMajorAndAcademyList,getMajorList,getMajorDetail,getAllAcademyList,delObj,updObj} from '@/api/school/major';
  import {addObj, studentPage} from '@/api/user/import'
  import { getToken } from '@/utils/auth'
  import {delObj as delStudent} from '@/api/user/index'
  export default {
    name: 'Major',
    data() {
      return {
        drawerVisible: false,
        schoolList: [],
        header: {
          "X-Token": getToken()
        },
        academyList: [],
        list: [],
        listLoading: false,
        total: undefined,
        btn1:false,
        btn2:true,
        btn3:true,
        listQuery: {
          pageSize: 10,
          pageNum: 1
        },
        pageForm: {
          Id: undefined,
          academyId: undefined,
          name: undefined,
          majorId: undefined,
          academyAndMajor:[]
        },
        rules: {
          id: [
            {required: true, message: '请选择学校', trigger: 'change'},
          ],

          name: [
            {required: true, message: '请输入专业名称', trigger: 'blur'}
          ],
    
          academyAndMajor:[
            {required: true, message: '请选择专业', trigger: 'change'}
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
        studentPage(this.listQuery).then(res => {
          const {data, total} = res
          this.list = data
          this.total = total
          this.listLoading = false
        })
      },
      preAddBtn() {
        this.drawerVisible = true
        this.btn1=false
        this.btn2=true
        this.btn3=true
        getMajorAndAcademyList().then(res=>{
            
          this.academyList=res
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.pageForm.academyId = this.pageForm.academyAndMajor[0]
              this.pageForm.majorId = this.pageForm.academyAndMajor[1]
            addObj(this.pageForm).then(res => {
              if (res.success) {
                this.$message.success('添加成功')
                this.resetForm(formName)
                this.getList();
              } else {
                this.$message.error(res.message)
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      afterGetSchool() {
        getAcademiesDetail(this.pageForm.schoolId).then(res => {
          this.academyList = res.data
        })
      },
      delById(id) {
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           delStudent(id).then(res=>{
            this.getList()
            })
        }).catch(() => {
                 
        });
      
      },
      update(id){
        this.drawerVisible=true
        this.bun1=true
        this.btn2=false
        this.btn3=false
        getAllAcademyList().then(res=>{
          this.academyList=res.data
        })
        getMajorDetail(id).then(res=>{
          this.pageForm=res.data
        })
      },
      updateForm(formName) {
        this.$refs[formName].validate((valid)=>{
          if(valid){
            updObj(formName).then(res=>{
              this.getList()
            })
          }
        })
      },
      handleSizeChange(size) {
        this.size = size
        this.getList()
      },
      handleCurrentChange(page) {
        this.page = page
        this.getList()
      },
      handleImportSuccess(res) {
        console.log(res)
        if (res.success) {
          this.$message.success(res.message)
          this.getList()
        }
      }
    }
  }
</script>

<style scoped>

</style>
