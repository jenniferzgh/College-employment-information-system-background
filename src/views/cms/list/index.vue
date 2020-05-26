<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select class="filter-item" v-model="listQuery.siteId" clearable placeholder="请选择站点" style="width: 200px;">
        <el-option
          v-for="cmsSite in cmsSites"
          :key="cmsSite.siteId"
          :label="cmsSite.siteName"
          :value="cmsSite.siteId">
        </el-option>
      </el-select>
      <el-input class="filter-item" v-model="listQuery.pageAliase" placeholder="请输入页面别名" style="width: 200px;"></el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查找
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
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="pageName" label="页面名称" width="120">
        <template slot-scope="scope">
          {{scope.row.pageName}}
        </template>
      </el-table-column>
      <el-table-column label="别名">
        <template slot-scope="scope">
          {{scope.row.pageAliase}}
        </template>
      </el-table-column>
      <el-table-column label="页面类型">
        <template slot-scope="scope">
          {{scope.row.pageType}}
        </template>
      </el-table-column>
      <el-table-column label="访问路径">
        <template slot-scope="scope">
          {{scope.row.pageWebPath}}
        </template>
      </el-table-column>
      <el-table-column label="物理路径">
        <template slot-scope="scope">
          {{scope.row.pagePhysicalPath}}
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{scope.row.pageCreateTime}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="delById(scope.row.pageId)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import { page, delById, updPage } from '@/api/cms/page'
  import { getAll as getAllCmsSite } from '@/api/cms/site'

  export default {
    name: 'index',
    data() {
      return {
        cmsSites: [],
        list: [],
        listLoading: false,
        size: 10,
        page: 1,
        total: undefined,
        listQuery: {
          siteId: null,
          pageAliase: null,
        }
      }
    },
    mounted() {
      this.getList()
      this.getCmsSites()
    },
    methods: {
      handleFilter() {
        this.page = 1
        this.getList()
      },
      getList() {
        this.listLoading = true
        page(this.listQuery, this.page, this.size).then(res => {
          let {queryResult, success} = res
          if (success) {
            this.list = queryResult.list
            this.total = queryResult.total
            this.listLoading = false
          }
        })
      },
      delById(pageId) {
        this.$confirm('确认删除此页面吗?', '提示', {}).then(() => {
          delById(pageId).then(res => {
            this.$message.success(res.message)
            if (this.list.length === 1 && this.page !== 1) {
              this.page = this.page - 1
            }
            this.getList()
          })
        }).catch(error => {

        })
      },
      updPage(cmsPage) {
        updPage(cmsPage).then(res => {

        })
      },
      getCmsSites(){
        getAllCmsSite().then(res => {
          this.cmsSites = res.queryResult.list
        })
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
