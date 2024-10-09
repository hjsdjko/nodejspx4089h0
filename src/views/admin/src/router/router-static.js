import Vue from 'vue';
//配置路由
import VueRouter from 'vue-router'
Vue.use(VueRouter);
//1.创建组件
import Index from '@/views/index'
import Home from '@/views/home'
import Login from '@/views/login'
import NotFound from '@/views/404'
import UpdatePassword from '@/views/update-password'
import pay from '@/views/pay'
import register from '@/views/register'
import center from '@/views/center'
    import news from '@/views/modules/news/list'
    import aboutus from '@/views/modules/aboutus/list'
    import huodongfenlei from '@/views/modules/huodongfenlei/list'
    import syslog from '@/views/modules/syslog/list'
    import shicichaodai from '@/views/modules/shicichaodai/list'
    import shicifenlei from '@/views/modules/shicifenlei/list'
    import shicijianshang from '@/views/modules/shicijianshang/list'
    import discussshicihuodong from '@/views/modules/discussshicihuodong/list'
    import shicihuodong from '@/views/modules/shicihuodong/list'
    import forum from '@/views/modules/forum/list'
    import systemintro from '@/views/modules/systemintro/list'
    import yonghu from '@/views/modules/yonghu/list'
    import huodongbaoming from '@/views/modules/huodongbaoming/list'
    import config from '@/views/modules/config/list'
    import discussshicijianshang from '@/views/modules/discussshicijianshang/list'
    import newstype from '@/views/modules/newstype/list'


//2.配置路由   注意：名字
export const routes = [{
    path: '/',
    name: '系统首页',
    component: Index,
    children: [{
      // 这里不设置值，是把main作为默认页面
      path: '/',
      name: '系统首页',
      component: Home,
      meta: {icon:'', title:'center', affix: true}
    }, {
      path: '/updatePassword',
      name: '修改密码',
      component: UpdatePassword,
      meta: {icon:'', title:'updatePassword'}
    }, {
      path: '/pay',
      name: '支付',
      component: pay,
      meta: {icon:'', title:'pay'}
    }, {
      path: '/center',
      name: '个人信息',
      component: center,
      meta: {icon:'', title:'center'}
    }
      ,{
	path: '/news',
        name: '通知公告',
        component: news
      }
      ,{
	path: '/aboutus',
        name: '关于我们',
        component: aboutus
      }
      ,{
	path: '/huodongfenlei',
        name: '活动分类',
        component: huodongfenlei
      }
      ,{
	path: '/syslog',
        name: '系统日志',
        component: syslog
      }
      ,{
	path: '/shicichaodai',
        name: '诗词朝代',
        component: shicichaodai
      }
      ,{
	path: '/shicifenlei',
        name: '诗词分类',
        component: shicifenlei
      }
      ,{
	path: '/shicijianshang',
        name: '诗词鉴赏',
        component: shicijianshang
      }
      ,{
	path: '/discussshicihuodong',
        name: '诗词活动评论',
        component: discussshicihuodong
      }
      ,{
	path: '/shicihuodong',
        name: '诗词活动',
        component: shicihuodong
      }
      ,{
	path: '/forum',
        name: '诗词交流',
        component: forum
      }
      ,{
	path: '/systemintro',
        name: '系统简介',
        component: systemintro
      }
      ,{
	path: '/yonghu',
        name: '用户',
        component: yonghu
      }
      ,{
	path: '/huodongbaoming',
        name: '活动报名',
        component: huodongbaoming
      }
      ,{
	path: '/config',
        name: '轮播图管理',
        component: config
      }
      ,{
	path: '/discussshicijianshang',
        name: '诗词鉴赏评论',
        component: discussshicijianshang
      }
      ,{
	path: '/newstype',
        name: '通知公告分类',
        component: newstype
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {icon:'', title:'login'}
  },
  {
    path: '/register',
    name: 'register',
    component: register,
    meta: {icon:'', title:'register'}
  },
  {
    path: '*',
    component: NotFound
  }
]
//3.实例化VueRouter  注意：名字
const router = new VueRouter({
  mode: 'hash',
  /*hash模式改为history*/
  routes // （缩写）相当于 routes: routes
})
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
export default router;
