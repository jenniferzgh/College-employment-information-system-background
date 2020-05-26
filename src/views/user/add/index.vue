<template>
  <div class="app-container">
    <el-form :model="pageForm" :rules="rules" ref="pageForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="文件批量导入">
        <el-upload
          action="http://127.0.0.1:9001/user/import"
          :show-file-list="false"
          :on-success="handleImportSuccess">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
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
        <el-select v-model="pageForm.majorId" @change="afterGetMajor"  placeholder="请选择专业">
          <el-option v-for="major in majorList"
                     :label="major.name"
                     :key="major.id"
                     :value="major.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属班级" prop="clazzId">
        <el-select v-model="pageForm.clazzId" placeholder="请选择专业">
          <el-option v-for="clazz in clazzList"
                     :label="clazz.name"
                     :key="clazz.id"
                     :value="clazz.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="id">
        <el-input v-model="pageForm.id"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="name">
      <el-input v-model="pageForm.name"></el-input>
    </el-form-item>
      <el-form-item label="密码" prop="passwd">
        <el-input type="password" v-model="pageForm.passwd"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          list-type="picture-card"
          :limit="1"
          action="http://39.106.124.209:9001/upload/posts"
          :on-success="handleAvatarSuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
        <!--<el-dialog :visible.sync="imgDialogVisible">-->
          <!--<img width="100%" :src="pageForm.photo" alt="">-->
        <!--</el-dialog>-->
        <!--<el-input v-model="pageForm.photo"></el-input>-->
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="pageForm.age"></el-input>
      </el-form-item>
      <el-form-item label="身份" prop="identity">
        <el-radio-group class="filter-item" v-model="pageForm.identity">
          <el-radio label="1">学生</el-radio>
          <el-radio label="2">老师</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('pageForm')">添加</el-button>
        <el-button @click="resetForm('pageForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {addObj} from "@/api/user/index";
  import {getAll as getSchools} from '@/api/school';
  import {getBySchoolId as getAcademies} from '@/api/school/academy'
  import {getBySIdAndAid as getMajors} from '@/api/school/major'
  import {getBySAMId as getClazzs} from '@/api/school/clazz'
  export default {
    name: 'UserAdd',
    data() {
      return {
        imgDialogVisible: false,
        drawerVisible: false,
        clazzList: [],
        schoolList: [],
        academyList: [],
        majorList: [],
        list: [],
        listLoading: false,
        total: undefined,
        pageForm: {
          id: undefined,
          clazzId: undefined,
          schoolId: undefined,
          academyId: undefined,
          majorId: undefined,
          name: undefined,
          passwd: undefined,
          photo: undefined,
          age: undefined,
          identity: "2"
        },
        rules: {
          schoolId: [
            {required: true, message: '请选择学校', trigger: 'change'},
          ],
          academyId: [
            {required: true, message: '请选择学院', trigger: 'change'},
          ],
          majorId: [
            {required: true, message: '请选择专业', trigger: 'change'},
          ],
          clazzId: [
            {required: true, message: '请选择班级', trigger: 'change'},
          ],
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'}
          ],
          passwd: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          id: [
            {required: true, message: '请输入工号', trigger: 'blur'}
          ],
          age: [
            {required: false}
          ]
        }
      }
    },
    mounted() {
      this.getSchools()
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addObj(this.pageForm).then(res => {
              console.log(res)
              if (res.success) {
                this.$message.success(res.message)
                this.resetForm(formName)
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
        getAcademies(this.pageForm.schoolId).then(res => {
          this.academyList = res.data
        })
      },
      afterGetAcademy(){
        getMajors(this.pageForm.schoolId, this.pageForm.academyId).then(res => {
          this.majorList = res.data
        })
      },
      afterGetMajor(){
        getClazzs(this.pageForm.schoolId, this.pageForm.academyId, this.pageForm.majorId).then(res => {
          this.clazzList = res.data
        })
      },
      handleAvatarSuccess(res) {
        this.pageForm.photo = res.data
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
