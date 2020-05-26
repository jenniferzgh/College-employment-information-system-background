<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input class="filter-item" v-model="listQuery.uname_like" placeholder="请输入学校名称" style="width: 200px;"></el-input>
      <el-radio-group class="filter-item" v-model="listQuery.sort">
        <el-radio-button label="crtTime">时间</el-radio-button>
      </el-radio-group>
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
      <el-table-column width="100" label="文章id">
        <template slot-scope="scope">
          {{scope.row.id}} 
        </template>
      </el-table-column>
      <el-table-column label="封面图片">
        <template slot-scope="scope">
          <el-image
            style="width: 60px; height: 60px"
            :src="scope.row.background"
            fit="fill"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="指导老师">
        <template slot-scope="scope">
          {{scope.row.author}}
        </template>
      </el-table-column>
      <el-table-column label="发表时间">
        <template slot-scope="scope">
          {{scope.row.updateTime}}
        </template>
      </el-table-column>
      <!--<el-table-column label="分类">-->
        <!--<template slot-scope="scope">-->
          <!--{{scope.row.categoryName}}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column label="操作" width="250" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="medium" @click="preAddBtn(scope.row.id)">查看</el-button>
          <el-button type="danger" size="medium"  @click="delById(scope.row.id)">删除</el-button>
          <!-- <el-button type="text" size="medium" icon="el-icon-link"></el-button> -->
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
      title="文章详情"
      size="50%"
      :visible.sync="drawerVisible"
      direction="rtl">
       <h2>{{articleDetail.title}}</h2>
       <span>{{articleDetail.author}}</span>
       <span>{{articleDetail.source}}</span>
       <div v-html="articleDetail.content" style="height:500px;overflow:hidden"></div>
    </el-drawer>
  </div>
</template>

<script>
  import { page,delObj,getObj} from '@/api/artical/index'

  export default {
    name: 'SchoolList',
    data() {
      return {
        list: [],
        listLoading: false,
        total: undefined,
        drawerVisible:false,
        articleDetail:'',
        listQuery: {
          pageSize: 10,
          pageNum: 1
        }
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
        page(this.listQuery).then(res => {
          const {data, total} = res
          this.list = data
          console.log(this.list)
          this.total = total
          this.listLoading = false
        })
      },
      delById(id) {
        this.$confirm('确认删除?', '提示', {}).then(() => {
          delObj(id).then(res => {
            this.getList()
          })
        }).catch(error => {
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
      preAddBtn(data){
        this.drawerVisible=true;
        getObj(data).then(res=>{
          this.articleDetail=res.data
          console.log(res.data)
        }).catch(err=>{
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>

</style>
