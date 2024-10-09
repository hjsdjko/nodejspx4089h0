import { Router } from 'express'
import UsersController from './Users'
import FileController from './File'
import ConfigController from './Config'
import CommonController from './Common'
import YonghuController from './Yonghu'
import ShicichaodaiController from './Shicichaodai'
import ShicifenleiController from './Shicifenlei'
import HuodongfenleiController from './Huodongfenlei'
import ShicijianshangController from './Shicijianshang'
import ShicihuodongController from './Shicihuodong'
import HuodongbaomingController from './Huodongbaoming'
import ForumController from './Forum'
import SyslogController from './Syslog'
import NewstypeController from './Newstype'
import NewsController from './News'
import StoreupController from './Storeup'
import AboutusController from './Aboutus'
import SystemintroController from './Systemintro'
import DiscussshicijianshangController from './Discussshicijianshang'
import DiscussshicihuodongController from './Discussshicihuodong'

export default ({ config, db }) => {
	let api = Router()

	api.use('/users', UsersController({ config, db }))

	api.use('/file', FileController({ config, db }))

	api.use('/config', ConfigController({ config, db }))

	api.use('/', CommonController({ config, db }))

	api.use('/yonghu', YonghuController({ config, db }))

	api.use('/shicichaodai', ShicichaodaiController({ config, db }))

	api.use('/shicifenlei', ShicifenleiController({ config, db }))

	api.use('/huodongfenlei', HuodongfenleiController({ config, db }))

	api.use('/shicijianshang', ShicijianshangController({ config, db }))

	api.use('/shicihuodong', ShicihuodongController({ config, db }))

	api.use('/huodongbaoming', HuodongbaomingController({ config, db }))

	api.use('/forum', ForumController({ config, db }))

	api.use('/syslog', SyslogController({ config, db }))

	api.use('/newstype', NewstypeController({ config, db }))

	api.use('/news', NewsController({ config, db }))

	api.use('/storeup', StoreupController({ config, db }))

	api.use('/aboutus', AboutusController({ config, db }))

	api.use('/systemintro', SystemintroController({ config, db }))

	api.use('/discussshicijianshang', DiscussshicijianshangController({ config, db }))

	api.use('/discussshicihuodong', DiscussshicihuodongController({ config, db }))

	return api
}
