import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  },
  // {
  //   path: '/cms',
  //   component: Layout,
  //   name: 'Cms',
  //   redirect: '/cms/list',
  //   meta: {title: '内容管理', icon: 'example'},
  //   children: [
  //     {
  //       path: 'list',
  //       component: () => import('@/views/cms/list'),
  //       name: 'Cms-list',
  //       meta: { title: '页面列表', icon: 'example' }
  //     },
  //     {
  //       path: 'add',
  //       component: () => import('@/views/cms/add'),
  //       name: 'Cms-list',
  //       meta: { title: '添加页面', icon: 'example' }
  //     }
  //   ]
  // },
  // {
  //   path: '/example',
  //   component: Layout,
  //   name: 'Example',
  //   redirect: '/example/upload',
  //   meta: {title: '上传下载', icon: 'example'},
  //   children: [
  //     {
  //       path: '/upload',
  //       component: () => import('@/views/example/upload'),
  //       name: 'Upload',
  //       meta: { title: '上传', icon: 'example' }
  //     },
  //     {
  //       path: '/download',
  //       component: () => import('@/views/example/download'),
  //       name: 'Download',
  //       meta: { title: '下载', icon: 'example' }
  //     }
  //   ]
  // },
  {
    path: '/artical',
    component: Layout,
    name: 'artical',
    redirect: '/artical/list',
    meta: {title: '就业指导文章管理', icon: 'article'},
    children: [
      {
        path: '/artical/list',
        component: () => import('@/views/artical/list'),
        name: 'ArticalList',
        meta: { title: '全部文章', icon: 'table' }
      },
      {
        path: '/artical/add',
        component: () => import('@/views/artical/add'),
        name: 'addArticle',
        meta: { title: '添加文章', icon: 'add' }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    name: 'User',
    redirect: '/user/list',
    meta: {title: '企业招聘管理', icon: 'user'},
    children: [
      {
        path: '/user/list',
        component: () => import('@/views/user/list'),
        name: 'Upload',
        meta: { title: '未审核招聘信息', icon: 'table' }
      },
      {
        path: '/user/import',
        component: () => import('@/views/user/import'),
        name: 'Import',
        meta: { title: '已审核招聘信息', icon: 'table' }
      },
    ]
  },
  {
    path: '/school',
    component: Layout,
    name: 'School',
    redirect: '/school/list',
    meta: {title: '学校管理', icon: 'school'},
    children: [
      {
        path: '/school/academy',
        component: () => import('@/views/school/academy'),
        name: 'Academy',
        meta: { title: '学院管理', icon: 'academy' }
      },
      {
        path: '/school/major',
        component: () => import('@/views/school/major'),
        name: 'Major',
        meta: { title: '专业管理', icon: 'major' }
      },
      {
        path: '/school/student',
        component: () => import('@/views/school/student'),
        name: 'Student',
        meta: { title: '学生管理', icon: 'user' }
      },
    ]
  },
  

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
