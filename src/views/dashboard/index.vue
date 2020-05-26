<template>
  <div class="dashboard-container">
    <div class="dashboard-text">管理员: {{ name }}</div>
    <!--<admin-dashboard/>-->

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
export default {
  name: 'Dashboard',
  components: { adminDashboard },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    /*margin: 30px;*/
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
