<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input class="filter-item" v-model="listQuery.name_like" placeholder="请输入学校名称" style="width: 200px;"></el-input>
      <el-input class="filter-item" v-model="listQuery.owner_like" placeholder="请输入校长" style="width: 200px;"></el-input>
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
      <el-table-column width="100" label="代号">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="学校名称">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="校长">
        <template slot-scope="scope">
          {{scope.row.owner}}
        </template>
      </el-table-column>
      <!--<el-table-column label="创建时间">-->
        <!--<template slot-scope="scope">-->
          <!--{{scope.row.buildTime}}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column label="学校官网">
        <template slot-scope="scope">
          {{scope.row.website}}
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
  </div>
</template>

<script>
  import { page, delObj, updObj } from '@/api/school'

  export default {
    name: 'SchoolList',
    data() {
      return {
        list: [],
        listLoading: false,
        total: undefined,
        listQuery: {
          name_like: '',
          owner_like: '',
          pageSize: 10,
          pageNum: 1,
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
        page(this.listQuery, this.page, this.size).then(res => {
          const {data, total} = res
          this.list = data
          this.total = total
          this.listLoading = false
        })
      },
      delById(id) {
        this.$confirm('确认删除?', '提示', {}).then(() => {
          delObj(id).then(res => {
            this.$message.success('删除成功')
            this.getList()
          })
        }).catch(error => {
          console.error(error)
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
      }
    }
  }
</script>

<style scoped>

</style>
