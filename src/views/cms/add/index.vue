<template>
  <div class="app-container">
    <el-form :model="pageForm" :rules="rules" ref="pageForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="所属站点" prop="siteId">
        <el-select v-model="pageForm.siteId" placeholder="请选择站点">
          <el-option v-for="cmsSite in cmsSites"
                     :label="cmsSite.siteName"
                     :key="cmsSite.siteId"
                     :value="cmsSite.siteId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择模板" prop="templateId">
        <el-select v-model="pageForm.templateId" placeholder="请选模板">
          <el-option v-for="cmsTemplate in cmsTemplates"
                     :label="cmsTemplate.templateName"
                     :key="cmsTemplate.templateId"
                     :value="cmsTemplate.templateId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="页面名称" prop="pageName">
        <el-input v-model="pageForm.pageName"></el-input>
      </el-form-item>
      <el-form-item label="页面别名" prop="pageAliase">
        <el-input v-model="pageForm.pageAliase"></el-input>
      </el-form-item>
      <el-form-item label="访问路径" prop="pageWebPath">
        <el-input v-model="pageForm.pageWebPath"></el-input>
      </el-form-item>
      <el-form-item label="物理路径" prop="pagePhysicalPath">
        <el-input v-model="pageForm.pagePhysicalPath" ></el-input>
      </el-form-item>
      <el-form-item label="页面类型" prop="pageType">
        <el-radio-group v-model="pageForm.pageType">
          <el-radio label="0">静态</el-radio>
          <el-radio label="1">动态</el-radio>
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
  import {getAll as getCmsTemplates} from '@/api/cms/template'
  import {getAll as getCmsSites} from '@/api/cms/site'
  import {add as addPage} from '@/api/cms/page'
  export default {
    name: "index",
    data() {
      return {
        cmsSites: [],
        cmsTemplates: [],
        pageForm: {
          siteId: undefined,
          templateId: undefined,
          pageName: undefined,
          pageAliase: undefined,
          pageWebPath: undefined,
          pagePhysicalPath: undefined,
          pageType: undefined
        },
        rules: {
          siteId: [
            {required: true, message: '请选择站点', trigger: 'change'},
          ],
          templateId: [
            {required: true, message: '请选择模板', trigger: 'change'}
          ],
          pageName: [
            {required: true, message: '请输入页面名称', trigger: 'blur'}
          ],
          pageAliase: [
            {required: true, message: '请输入页面别名', trigger: 'blur'}
          ],
          pageWebPath: [
            {required: true, message: '请输入访问路径', trigger: 'blur'}
          ],
          pagePhysicalPath: [
            {required: true, message: '请输入物理路径', trigger: 'blur'}
          ],
          pageType: [
            { required: true, message: '请选择页面类型', trigger: 'change'}
          ]
        }
      };
    },
    mounted() {
      this.getCmsSites()
      this.getCmsTemplates();
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addPage(this.pageForm).then(res => {
              let {cmsPage, success, message} = res
              this.$message.success(message)
              this.resetForm('pageForm')
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
      getCmsSites() {
        getCmsSites().then(res => {
          this.cmsSites = res.queryResult.list
        })
      },
      getCmsTemplates() {
        getCmsTemplates().then(res => {
          this.cmsTemplates = res.queryResult.list
        })
      }
    }
  }
</script>

<style scoped>

</style>
