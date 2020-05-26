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
        添加专业
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
      <el-table-column  label="专业id">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="专业名称">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="所属学院">
        <template slot-scope="scope">
          {{scope.row.academyName}}
        </template>
      </el-table-column>
      <el-table-column label="专业负责人">
        <template slot-scope="scope">
          {{scope.row.majorTeacher}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="update(scope.row.id)"></el-button>
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
      title="添加专业"
      :visible.sync="drawerVisible"
      direction="rtl">
      <el-form :model="pageForm" :rules="rules" ref="pageForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="所属学院" prop="academyId">
          <el-select v-model="pageForm.academyId" placeholder="请选择学院">
            <el-option v-for="academy in academyList"
                       :label="academy.name"
                       :key="academy.id"
                       :value="academy.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业名称" prop="name">
          <el-input v-model="pageForm.name"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="majorTeacher">
          <el-input v-model="pageForm.majorTeacher"></el-input>
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
  import {getMajorList,getMajorDetail,getAllAcademyList,delObj,addObj,updObj} from '@/api/school/major';

  export default {
    name: 'Major',
    data() {
      return {
        drawerVisible: false,
        schoolList: [],
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
          schoolId: undefined,
          academyId: undefined,
          name: undefined,
          majorTeacher: undefined,
        },
        rules: {
          schoolId: [
            {required: true, message: '请选择学校', trigger: 'change'},
          ],
          academyId: [
            {required: true, message: '请选择学院', trigger: 'change'},
          ],
          name: [
            {required: true, message: '请输入专业名称', trigger: 'blur'}
          ],
          majorTeacher: [
            {required: true, message: '请输入负责人', trigger: 'blur'}
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
        getMajorList(this.listQuery, this.page, this.size).then(res => {
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
        getAllAcademyList().then(res=>{
          this.academyList=res.data
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
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
       delObj(id).then(res=>{
       this.getList()
      })
      },
      update(id){
        this.drawerVisible=true
        this.btn1=true
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
            updObj(this.pageForm).then(res=>{
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
        if (res.success) {
          this.$message.success(res.message)
        }
      }
    }
  }
</script>

<style scoped>

</style>
