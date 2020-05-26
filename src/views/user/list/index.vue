<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input class="filter-item" v-model="listQuery.academyName_like" placeholder="请输入企业名称"
                style="width: 200px;"></el-input>
      <el-input class="filter-item" v-model="listQuery.majorName_like" placeholder="请输入招聘岗位"
                style="width: 200px;"></el-input>
      <el-input class="filter-item" v-model="listQuery.clazzName_like" placeholder="请输入薪资待遇"
                style="width: 200px;"></el-input>
      <el-input class="filter-item" v-model="listQuery.name_like" placeholder="请输入招聘截止时间"
                style="width: 200px;"></el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查找
      </el-button> -->
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="企业名称">
        <template slot-scope="scope">
          {{scope.row.companyName}}
        </template>
      </el-table-column>
      <el-table-column label="招聘岗位">
        <template slot-scope="scope">
          {{scope.row.industryName}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="工作地址">
        <template slot-scope="scope">
          {{scope.row.provinceName}}/{{scope.row.cityName}}/{{scope.row.areaName}}
        </template>
      </el-table-column>
      <el-table-column label="薪资待遇">
        <template slot-scope="scope">
          {{scope.row.salaryMin}}-{{scope.row.salaryMax}}
        </template>
      </el-table-column>
      <el-table-column label="招聘截止时间">
        <template slot-scope="scope">
          {{scope.row.deadline}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="mini"  @click="preAddBtn(scope.row)">查看</el-button>
          <el-button type="primary" size="mini"  @click="submitForm(scope.row.id, 1)">通过</el-button>
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
      title="企业招聘信息详情"
      :visible.sync="drawerVisible"
      direction="rtl">
       <p>企业名称：{{company.name}}</p>
       <p>招聘岗位：{{josInfo.industryPname}}{{josInfo.industryName}}</p>
       <p>薪资待遇：{{josInfo.salaryMin}}-{{josInfo.salaryMax}}</p>
       <p>工作地址：{{josInfo.provinceName}}/{{josInfo.cityName}}/{{josInfo.areaName}}/{{josInfo.address}}</p>
       <p>联系方式:{{josInfo.tel}}</p>
       <p>截止时间:{{josInfo.deadline}}</p>
       <div>
         <el-button @click="innerDrawer = true">岗位详情</el-button>
         <el-drawer
           title="岗位详情"
           :append-to-body="true"
           :visible.sync="innerDrawer">
           <div  v-html="josInfo.detail"></div>
         </el-drawer>
       </div>
       <p>企业名称：{{company.name}}</p>
       <p>注册资本：{{company.registeredCapital}}</p>
       <p>法人代表：{{company.owner}}</p>
       <p>公司官网：{{company.website}}</p>
       <p>所属行业：{{company.tradeName}}</p>
       <p>成立时间：{{company.createTime}}</p>
       <p>公司规模：{{company.scale}}</p>
       <p>公司地址：{{company.provinceName}}/{{company.cityName}}/{{company.areaName}}</p>
       <el-button type="primary" @click="submitForm(josInfo.id, 1)">通过</el-button>
    </el-drawer>
  </div>
</template>

<script>
  import {page, delObj, updObj,checkDetail,checkCompany} from '@/api/user/index'

  export default {
    name: 'UserList',
    data() {
      return {
        list: [],
        listLoading: false,
        drawerVisible:false,
        innerDrawer:false,
        pageForm: {
          schoolId: undefined,
          academyId: undefined,
          name: undefined,
          majorTeacher: undefined,
        },
        total: undefined,
        listQuery: {
          // name_like: '',
          // schoolName_like: '',
          // academyName_like: '',
          // majorName_like: '',
          // clazzName_like: '',
          pageSize: 10,
          pageNum: 1,
          examine:0

        },
        company: {},
        josInfo: {}
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      handleFilter() {
        this.page = 1
        this.getList()
      },
      getList() {
        this.listLoading = true
        // 请求
        page(this.listQuery).then(res => {
          const {data, total} = res
          this.list = data
          this.total = total
          this.listLoading = false
           console.log(res.data)
          
        })
      },
      // delById(id) {
      //   this.$confirm('确认删除?', '提示', {}).then(() => {
      //     delObj(id).then(res => {
      //       this.$message.success('删除成功')
      //       this.getList()
      //     })
      //   }).catch(error => {
      //     console.error(error)
      //   })
      // },
      update() {

      },
      afterGetSchool() {
        
      },
       preAddBtn(row) {
        this.drawerVisible = true;
        checkDetail(row.id).then(res=>{
          this.josInfo=res.data;       
        })
        checkCompany(row.companyId).then(res=>{
          this.company=res.data;      
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
      submitForm(id,examine){
        updObj(id,examine).then(res=>{
          this.getList()
          this.drawerVisible=false

        })
        
      }
     
    }
  }
</script>

<style scoped>

</style>
