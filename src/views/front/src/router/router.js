import VueRouter from 'vue-router'

//引入组件
import Index from '../pages'
import Home from '../pages/home/home'
import Login from '../pages/login/login'
import Register from '../pages/register/register'
import Center from '../pages/center/center'
import Forum from '../pages/forum/list'
import ForumAdd from '../pages/forum/add'
import ForumDetail from '../pages/forum/detail'
import MyForumList from '../pages/forum/myForumList'
import Storeup from '../pages/storeup/list'
import News from '../pages/news/news-list'
import NewsDetail from '../pages/news/news-detail'
import payList from '../pages/pay'

import yonghuList from '../pages/yonghu/list'
import yonghuDetail from '../pages/yonghu/detail'
import yonghuAdd from '../pages/yonghu/add'
import shicichaodaiList from '../pages/shicichaodai/list'
import shicichaodaiDetail from '../pages/shicichaodai/detail'
import shicichaodaiAdd from '../pages/shicichaodai/add'
import shicifenleiList from '../pages/shicifenlei/list'
import shicifenleiDetail from '../pages/shicifenlei/detail'
import shicifenleiAdd from '../pages/shicifenlei/add'
import huodongfenleiList from '../pages/huodongfenlei/list'
import huodongfenleiDetail from '../pages/huodongfenlei/detail'
import huodongfenleiAdd from '../pages/huodongfenlei/add'
import shicijianshangList from '../pages/shicijianshang/list'
import shicijianshangDetail from '../pages/shicijianshang/detail'
import shicijianshangAdd from '../pages/shicijianshang/add'
import shicihuodongList from '../pages/shicihuodong/list'
import shicihuodongDetail from '../pages/shicihuodong/detail'
import shicihuodongAdd from '../pages/shicihuodong/add'
import huodongbaomingList from '../pages/huodongbaoming/list'
import huodongbaomingDetail from '../pages/huodongbaoming/detail'
import huodongbaomingAdd from '../pages/huodongbaoming/add'
import syslogList from '../pages/syslog/list'
import syslogDetail from '../pages/syslog/detail'
import syslogAdd from '../pages/syslog/add'
import newstypeList from '../pages/newstype/list'
import newstypeDetail from '../pages/newstype/detail'
import newstypeAdd from '../pages/newstype/add'
import aboutusList from '../pages/aboutus/list'
import aboutusDetail from '../pages/aboutus/detail'
import aboutusAdd from '../pages/aboutus/add'
import systemintroList from '../pages/systemintro/list'
import systemintroDetail from '../pages/systemintro/detail'
import systemintroAdd from '../pages/systemintro/add'
import discussshicijianshangList from '../pages/discussshicijianshang/list'
import discussshicijianshangDetail from '../pages/discussshicijianshang/detail'
import discussshicijianshangAdd from '../pages/discussshicijianshang/add'
import discussshicihuodongList from '../pages/discussshicihuodong/list'
import discussshicihuodongDetail from '../pages/discussshicihuodong/detail'
import discussshicihuodongAdd from '../pages/discussshicihuodong/add'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

//配置路由
export default new VueRouter({
	routes:[
		{
      path: '/',
      redirect: '/index/home'
    },
		{
			path: '/index',
			component: Index,
			children:[
				{
					path: 'home',
					component: Home
				},
				{
					path: 'center',
					component: Center,
				},
				{
					path: 'pay',
					component: payList,
				},
				{
					path: 'forum',
					component: Forum
				},
				{
					path: 'forumAdd',
					component: ForumAdd
				},
				{
					path: 'forumDetail',
					component: ForumDetail
				},
				{
					path: 'myForumList',
					component: MyForumList
				},
				{
					path: 'storeup',
					component: Storeup
				},
				{
					path: 'news',
					component: News
				},
				{
					path: 'newsDetail',
					component: NewsDetail
				},
				{
					path: 'yonghu',
					component: yonghuList
				},
				{
					path: 'yonghuDetail',
					component: yonghuDetail
				},
				{
					path: 'yonghuAdd',
					component: yonghuAdd
				},
				{
					path: 'shicichaodai',
					component: shicichaodaiList
				},
				{
					path: 'shicichaodaiDetail',
					component: shicichaodaiDetail
				},
				{
					path: 'shicichaodaiAdd',
					component: shicichaodaiAdd
				},
				{
					path: 'shicifenlei',
					component: shicifenleiList
				},
				{
					path: 'shicifenleiDetail',
					component: shicifenleiDetail
				},
				{
					path: 'shicifenleiAdd',
					component: shicifenleiAdd
				},
				{
					path: 'huodongfenlei',
					component: huodongfenleiList
				},
				{
					path: 'huodongfenleiDetail',
					component: huodongfenleiDetail
				},
				{
					path: 'huodongfenleiAdd',
					component: huodongfenleiAdd
				},
				{
					path: 'shicijianshang',
					component: shicijianshangList
				},
				{
					path: 'shicijianshangDetail',
					component: shicijianshangDetail
				},
				{
					path: 'shicijianshangAdd',
					component: shicijianshangAdd
				},
				{
					path: 'shicihuodong',
					component: shicihuodongList
				},
				{
					path: 'shicihuodongDetail',
					component: shicihuodongDetail
				},
				{
					path: 'shicihuodongAdd',
					component: shicihuodongAdd
				},
				{
					path: 'huodongbaoming',
					component: huodongbaomingList
				},
				{
					path: 'huodongbaomingDetail',
					component: huodongbaomingDetail
				},
				{
					path: 'huodongbaomingAdd',
					component: huodongbaomingAdd
				},
				{
					path: 'syslog',
					component: syslogList
				},
				{
					path: 'syslogDetail',
					component: syslogDetail
				},
				{
					path: 'syslogAdd',
					component: syslogAdd
				},
				{
					path: 'newstype',
					component: newstypeList
				},
				{
					path: 'newstypeDetail',
					component: newstypeDetail
				},
				{
					path: 'newstypeAdd',
					component: newstypeAdd
				},
				{
					path: 'aboutus',
					component: aboutusList
				},
				{
					path: 'aboutusDetail',
					component: aboutusDetail
				},
				{
					path: 'aboutusAdd',
					component: aboutusAdd
				},
				{
					path: 'systemintro',
					component: systemintroList
				},
				{
					path: 'systemintroDetail',
					component: systemintroDetail
				},
				{
					path: 'systemintroAdd',
					component: systemintroAdd
				},
				{
					path: 'discussshicijianshang',
					component: discussshicijianshangList
				},
				{
					path: 'discussshicijianshangDetail',
					component: discussshicijianshangDetail
				},
				{
					path: 'discussshicijianshangAdd',
					component: discussshicijianshangAdd
				},
				{
					path: 'discussshicihuodong',
					component: discussshicihuodongList
				},
				{
					path: 'discussshicihuodongDetail',
					component: discussshicihuodongDetail
				},
				{
					path: 'discussshicihuodongAdd',
					component: discussshicihuodongAdd
				},
			]
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/register',
			component: Register
		},
	]
})
