<template>
  <div class="app-container">
    <el-form :model="pageForm" :rules="rules" ref="pageForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="pageForm.title"></el-input>
      </el-form-item>
      <el-form-item label="指导老师" prop="author">
        <el-input v-model="pageForm.author"></el-input>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <quill-editor v-model="pageForm.content" ref="myQuillEditor" style="height: 500px;margin-bottom:10px;" :options="editorOption">
        </quill-editor>
      </el-form-item>
      <el-form-item label="出处" prop="source">
       <el-input v-model="pageForm.source"></el-input>
      </el-form-item>
      <el-form-item label="文章背景图" prop="background">
        <!-- <el-upload
          list-type="picture-card"
          :limit="1"
          action="http://39.106.124.209:9001/upload/posts"
          :on-success="handleAvatarSuccess">
          <i class="el-icon-plus"></i>
        </el-upload> -->
        <el-upload class="avatar-uploader" action="http://127.0.0.1:9004/file/upload/posts" :show-file-list="false"  list-type="picture-card"
          :limit="1" :on-success="getAvatar" :before-upload="beforeA" :headers="xtoken">
        <img v-if="pageForm.background" :src="pageForm.background" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('pageForm')">添加</el-button>
        <el-button @click="resetForm('pageForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-drawer
      title="企业招聘信息详情"
      :visible.sync="drawerVisible"
      direction="rtl">
       
       <el-button type="primary" @click="submitForm('pageForm')">通过</el-button>
    </el-drawer>
  </div>
</template>

<script>
  import {addArticle} from "@/api/user/index";
  import {getToken} from "@/utils/auth"
  import { quillEditor } from 'vue-quill-editor' // 调用富文本编辑器
import 'quill/dist/quill.snow.css' // 富文本编辑器外部引用样式  三种样式三选一引入即可
//import 'quill/dist/quill.core.css'
//import 'quill/dist/quill.bubble.css'
import * as Quill from 'quill'; // 富文本基于quill
  export default {
    name: 'addArticle',
    components: {
    quillEditor
  },
    data() {
      return {
        imgDialogVisible: false,
        drawerVisible: false,
        clazzList: [],
        schoolList: [],
        academyList: [],
        majorList: [],
        list: [],
        editorOption:{},
        listLoading: false,
        total: undefined,
        pageForm: {
          source:undefined,
          title: undefined,
          author:undefined,
          content:undefined,
          background:undefined
        },
        xtoken: { "X-token": getToken() },
        rules: {
          source: [
            {required: false, message: '请输入文章出处', trigger: 'blur'}
          ],
          title: [
            {required: true, message: '请输入文章标题', trigger: 'blur'}
          ],
          author:[
            {required: true, message: '请输入指导老师名称', trigger: 'blur'}
          ],
          content:[
            {required: true, message: '请输入文章内容', trigger: 'blur'}
          ],
          background:[
            {required: false, message: '', trigger: 'blur'}
          ]
        }
      }
    },
    mounted() {
      
    },
    methods: {
      getAvatar(res, file) {
      // this.comment.handleAvatarSuccess(res, file)
      this.pageForm.background = res.data
    },
    beforeA(file) {
      // this.comment.beforeAvatarUpload(file)
    },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addArticle(this.pageForm).then(res => {
              console.log(res)
              if (res.success) {
                this.$message.success("添加成功")
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
.avatar {
  width: 148px;
  height: 148px;
  display: block;
}
.avatar>img{
  width: 148px;
  height: 148px;
}
</style>
