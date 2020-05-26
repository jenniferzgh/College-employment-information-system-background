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
        v-model="listQuery.majorName_like"
        placeholder="请输入专业"
        style="width: 200px;">
      </el-input>
      <el-input
        class="filter-item"
        v-model="listQuery.clazzTeacher_like"
        placeholder="请输入班主任"
        style="width: 200px;">
      </el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查找
      </el-button>
      <el-button @click="preAddBtn" type="primary" class="filter-item">
        添加班级
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
      <el-table-column width="100" label="序号">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="班级名称">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="班长">
        <template slot-scope="scope">
          {{scope.row.monitor}}
        </template>
      </el-table-column>
      <el-table-column label="班主任">
        <template slot-scope="scope">
          {{scope.row.clazzTeacher}}
        </template>
      </el-table-column>
      <el-table-column label="所属学院">
        <template slot-scope="scope">
          {{scope.row.academyName}}
        </template>
      </el-table-column>
      <el-table-column label="所属学校">
        <template slot-scope="scope">
          {{scope.row.schoolName}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
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
      title="添加班级"
      :visible.sync="drawerVisible"
      direction="rtl">
      <el-form :model="pageForm" :rules="rules" ref="pageForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="所属学校" prop="schoolId">
          <el-select v-model="pageForm.schoolId" @change="afterGetSchool" placeholder="请选择学校">
            <el-option v-for="school in schoolList"
                       :label="school.name"
                       :key="school.id"
                       :value="school.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属学院" prop="academyId">
          <el-select v-model="pageForm.academyId" @change="afterGetAcademy" placeholder="请选择学院">
            <el-option v-for="academy in academyList"
                       :label="academy.name"
                       :key="academy.id"
                       :value="academy.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属专业" prop="majorId">
          <el-select v-model="pageForm.majorId" placeholder="请选择专业">
            <el-option v-for="major in majorList"
                       :label="major.name"
                       :key="major.id"
                       :value="major.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级名称" prop="name">
          <el-input v-model="pageForm.name"></el-input>
        </el-form-item>
        <el-form-item label="班主任" prop="clazzTeacher">
          <el-input v-model="pageForm.clazzTeacher"></el-input>
        </el-form-item>
        <el-form-item label="班长" prop="majorTeacher">
          <el-input v-model="pageForm.monitor"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('pageForm')">添加</el-button>
          <el-button @click="resetForm('pageForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
  import {page, addObj, delObj, updObj} from '@/api/school/clazz';
  import {getAll as getSchools} from '@/api/school';
  import {getBySchoolId as getAcademies} from '@/api/school/academy'
  import {getBySIdAndAid as getMajors} from '@/api/school/major'

  export default {
    name: 'Clazz',
    data() {
      return {
        drawerVisible: false,
        schoolList: [],
        academyList: [],
        majorList: [],
        list: [],
        listLoading: false,
        total: undefined,
        listQuery: {
          academyName_like: '',
          schoolName_like: '',
          majorName_like: '',
          clazzTeacher_like: '',
          pageSize: 10,
          pageNum: 1,
        },
        pageForm: {
          schoolId: undefined,
          academyId: undefined,
          majorId: undefined,
          name: undefined,
          clazzTeacher: undefined,
          monitor: undefined
        },
        rules: {
          schoolId: [
            {required: true, message: '请选择学校', trigger: 'change'},
          ],
          academyId: [
            {required: true, message: '请选择学院', trigger: 'change'},
          ],
          majorId: [
            {required: true, message: '请选择学院', trigger: 'change'},
          ],
          name: [
            {required: true, message: '请输入专业名称', trigger: 'blur'}
          ],
          clazzTeacher: [
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
        page(this.listQuery, this.page, this.size).then(res => {
          const {data, total} = res
          this.list = data
          this.total = total
          this.listLoading = false
        })
      },
      preAddBtn() {
        this.drawerVisible = true
        this.getSchools()
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addObj(this.pageForm).then(res => {
              if (res.success) {
                this.$message.success(res.message)
                this.resetForm(formName)
                this.getList();
              } else {
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
      getSchools() {
        getSchools().then(res => {
          this.schoolList = res.data
        })
      },
      afterGetSchool() {
        console.log('school_id:' +this.pageForm.schoolId)
        getAcademies(this.pageForm.schoolId).then(res => {
          this.academyList = res.data
        })
      },
      afterGetAcademy(){
        console.log('school_id:' +this.pageForm.academyId)
        getMajors(this.pageForm.schoolId, this.pageForm.academyId).then(res => {
          this.majorList = res.data
        })
      },
      delById(id) {

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
      }
    }
  }
</script>

<style scoped>

</style>
