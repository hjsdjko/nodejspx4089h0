import { version } from '../../package.json'
import { Router } from 'express'
import { Sequelize, Op,literal, QueryTypes } from 'sequelize'
import sequelize from '../models/sequelize'
import toRes from '../lib/toRes'
import ShicihuodongModel from '../models/ShicihuodongModel'
import util from '../lib/util'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import ConfigModel from '../models/ConfigModel'
import https from 'https'
import request from 'request'
import qs from 'querystring'
import path from 'path'
import fs from 'fs'
import config from '../config.json'
const redis = require('redis')




export default ({ config, db }) => {
	let api = Router()


	// 分页接口（后端）
	api.get('/page', async (req, res) => {

		try {

			let page = parseInt(req.query.page) || 1
			let limit = parseInt(req.query.limit) || 10
			let sort = req.query.sort || 'id'
			let order = req.query.order || 'asc'

			let where = {}
			let huodongmingcheng = req.query.huodongmingcheng
			if (huodongmingcheng) {

				if (huodongmingcheng.indexOf('%') != -1) {
					where.huodongmingcheng = {
						[Op.like]: huodongmingcheng
					}
				} else {
					where.huodongmingcheng = {
						[Op.eq]: huodongmingcheng
					}
				}
			}
			let huodongfenlei = req.query.huodongfenlei
			if (huodongfenlei) {

				if (huodongfenlei.indexOf('%') != -1) {
					where.huodongfenlei = {
						[Op.like]: huodongfenlei
					}
				} else {
					where.huodongfenlei = {
						[Op.eq]: huodongfenlei
					}
				}
			}
			let huodongtupian = req.query.huodongtupian
			if (huodongtupian) {

				if (huodongtupian.indexOf('%') != -1) {
					where.huodongtupian = {
						[Op.like]: huodongtupian
					}
				} else {
					where.huodongtupian = {
						[Op.eq]: huodongtupian
					}
				}
			}
			let huodongdidian = req.query.huodongdidian
			if (huodongdidian) {

				if (huodongdidian.indexOf('%') != -1) {
					where.huodongdidian = {
						[Op.like]: huodongdidian
					}
				} else {
					where.huodongdidian = {
						[Op.eq]: huodongdidian
					}
				}
			}
			let huodongshijian = req.query.huodongshijian
			if (huodongshijian) {

				if (huodongshijian.indexOf('%') != -1) {
					where.huodongshijian = {
						[Op.like]: huodongshijian
					}
				} else {
					where.huodongshijian = {
						[Op.eq]: huodongshijian
					}
				}
			}
			let huodongneirong = req.query.huodongneirong
			if (huodongneirong) {

				if (huodongneirong.indexOf('%') != -1) {
					where.huodongneirong = {
						[Op.like]: huodongneirong
					}
				} else {
					where.huodongneirong = {
						[Op.eq]: huodongneirong
					}
				}
			}
			let thumbsupnum = req.query.thumbsupnum
			if (thumbsupnum) {

				if (thumbsupnum.indexOf('%') != -1) {
					where.thumbsupnum = {
						[Op.like]: thumbsupnum
					}
				} else {
					where.thumbsupnum = {
						[Op.eq]: thumbsupnum
					}
				}
			}
			let crazilynum = req.query.crazilynum
			if (crazilynum) {

				if (crazilynum.indexOf('%') != -1) {
					where.crazilynum = {
						[Op.like]: crazilynum
					}
				} else {
					where.crazilynum = {
						[Op.eq]: crazilynum
					}
				}
			}
			let clicknum = req.query.clicknum
			if (clicknum) {

				if (clicknum.indexOf('%') != -1) {
					where.clicknum = {
						[Op.like]: clicknum
					}
				} else {
					where.clicknum = {
						[Op.eq]: clicknum
					}
				}
			}
			let discussnum = req.query.discussnum
			if (discussnum) {

				if (discussnum.indexOf('%') != -1) {
					where.discussnum = {
						[Op.like]: discussnum
					}
				} else {
					where.discussnum = {
						[Op.eq]: discussnum
					}
				}
			}
			let storeupnum = req.query.storeupnum
			if (storeupnum) {

				if (storeupnum.indexOf('%') != -1) {
					where.storeupnum = {
						[Op.like]: storeupnum
					}
				} else {
					where.storeupnum = {
						[Op.eq]: storeupnum
					}
				}
			}

			let orders =[]
			const sortList = sort.split(",")
			const orderList = order.split(",")
			sortList.forEach((item, index) => {
				orders.push([item,orderList[index]])
			  });
			let result = await ShicihuodongModel.findAndCountAll({
				order: [orders],
				where,
				offset: (page - 1) * limit,
				limit
			})
			
			result.currPage = page
			result.pageSize = limit

			toRes.page(res, 0, result)
		} catch(err) {
			res.status(500).render(err)
			//toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	  // 分页接口（前端）
	api.get('/lists', async (req, res) => {

		try {
			let result = await ShicihuodongModel.findAll()
			toRes.record(res, 0, result)
		} catch(err) {
			
			toRes.session(res, 401, '您的权限不够！', '', 200)
		}
	})

	// 查询单条记录（前端）
	api.get('/query', async (req, res) => {

		try {
			const dictionary = {};
			for (let key in req.query) {
				dictionary[key] = req.query[key];
			}
			let result = await ShicihuodongModel.findOne({where:dictionary})
			
			toRes.record(res, 0, result)
		} catch(err) {
			res.status(500).render(err)
		}
	})

    // 分页接口（前端）
	api.get('/list', async (req, res) => {

		try {

			let page = parseInt(req.query.page) || 1
			let limit = parseInt(req.query.limit) || 10
			let sort = req.query.sort || 'id'
			let order = req.query.order || 'asc'

			let where = {}
			let huodongmingcheng = req.query.huodongmingcheng
			if (huodongmingcheng) {

				if (huodongmingcheng.indexOf('%') != -1) {
					where.huodongmingcheng = {
						[Op.like]: huodongmingcheng
					}
				} else {
					where.huodongmingcheng = {
						[Op.eq]: huodongmingcheng
					}
				}
			}
			let huodongfenlei = req.query.huodongfenlei
			if (huodongfenlei) {

				if (huodongfenlei.indexOf('%') != -1) {
					where.huodongfenlei = {
						[Op.like]: huodongfenlei
					}
				} else {
					where.huodongfenlei = {
						[Op.eq]: huodongfenlei
					}
				}
			}
			let huodongdidian = req.query.huodongdidian
			if (huodongdidian) {

				if (huodongdidian.indexOf('%') != -1) {
					where.huodongdidian = {
						[Op.like]: huodongdidian
					}
				} else {
					where.huodongdidian = {
						[Op.eq]: huodongdidian
					}
				}
			}


			let orders =[]
			const sortList = sort.split(",")
			const orderList = order.split(",")
			sortList.forEach((item, index) => {
				orders.push([item,orderList[index]])
			  });
			let result = await ShicihuodongModel.findAndCountAll({
				order: [orders],
				where,
				offset: (page - 1) * limit,
				limit
			})
			
			result.currPage = page
			result.pageSize = limit

			toRes.page(res, 0, result)
		} catch(err) {
			
			toRes.session(res, 401, '您的权限不够！', '', 200)
		}
	})


	// 保存接口（后端）
	api.post('/save',(req,res,next)=>{
		try{
			req.method1 = path.join(__filename.split('nodejspx4089h0').pop(),'save');
			req.operation = '保存诗词活动';
			next();
		}catch(err){}
	}, async (req, res) => {

		try {

			Object.keys(req.body).forEach(item=>{
				if(req.body[item] == '')  delete req.body[item]
				if(req.body[item] == '' && item == 'sfsh')  req.body[item] = '待审核'
			})



			const userinfo = await ShicihuodongModel.create(req.body)

			if (userinfo === null) {

				toRes.session(res, -1, '添加失败！')
			} else {

				toRes.session(res, 0, '添加成功！')
			}
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

    // 保存接口（前端）
	api.post('/add',(req,res,next)=>{
		try{
			req.method1 = path.join(__filename.split('nodejspx4089h0').pop(),'add');
			req.operation = '新增诗词活动';
			next();
		}catch(err){}
	}, async (req, res) => {

		try {

			Object.keys(req.body).forEach(item=>{
				if(req.body[item] == '')  delete req.body[item]
				if(req.body[item] == '' && item == 'sfsh')  req.body[item] = '待审核'
			})

			if (jwt.decode(req.headers.token) == null) {
				toRes.session(res, 401, '请登录后再操作', '', 401)
			}





			const userinfo = await ShicihuodongModel.create(req.body)

			if (userinfo === null) {

				toRes.session(res, -1, '添加失败！')
			} else {

				toRes.session(res, 0, '添加成功！')
			}
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 更新接口
	api.post('/update',(req,res,next)=>{
		try{
			req.method1 = path.join(__filename.split('nodejspx4089h0').pop(),'update');
			req.operation = '更新诗词活动';
			next();
		}catch(err){}
	}, async (req, res) => {

		try {


			await ShicihuodongModel.update(req.body, {
				where: {
				  id: req.body.id || 0
				}
			})


			toRes.session(res, 0, '编辑成功！')
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 删除接口
	api.post('/delete',(req,res,next)=>{
		try{
			req.method1 = path.join(__filename.split('nodejspx4089h0').pop(),'delete');
			req.operation = '删除诗词活动';
			next();
		}catch(err){}
	}, async (req, res) => {

		try {

			await ShicihuodongModel.destroy({
				where: {
				  id: {
					[Op.in]: req.body
				  }
				}
			})

			toRes.session(res, 0, '删除成功！')
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 详情接口（后端）
	api.all('/info/:id', async (req, res) => {

		try {

			const recordInfo = await ShicihuodongModel.findOne({ where: { id: req.params.id } })
            await recordInfo.increment('clicknum')

			toRes.record(res, 0, await ShicihuodongModel.findOne({ where: { id: req.params.id } }))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})


    // 详情接口（前端）
	api.all('/detail/:id', async (req, res) => {

		try {

			const recordInfo = await ShicihuodongModel.findOne({ where: { id: req.params.id } })
            await recordInfo.increment('clicknum')

			toRes.record(res, 0, await ShicihuodongModel.findOne({ where: { id: req.params.id } }))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 获取需要提醒的记录数接口
	api.get('/remind/:columnName/:type', async (req, res) => {

        let where = ' 1=1 '

		try {

			let sql = 'SELECT 0 AS count'
			
			if (req.params.type == 1) {
				if (req.query.remindstart) sql = "SELECT COUNT(*) AS count FROM shicihuodong WHERE " + where + " AND " + req.params.columnName + " >= '" + req.query.remindstart + "'"
				if (req.query.remindend) sql = "SELECT COUNT(*) AS count FROM shicihuodong WHERE " + where + " AND " + req.params.columnName + " <= '" + req.query.remindend + "'"

				if (req.query.remindstart && req.query.remindend) {
					sql = "SELECT COUNT(*) AS count FROM shicihuodong WHERE " + where + " AND " + req.params.columnName + " >= '" + req.query.remindstart + "' AND " + req.params.columnName + " <= '" + req.query.remindend + "'"
				}
			}

			if (req.params.type == 2) {
				if (req.query.remindstart) {
					let remindStart = util.getDateTimeFormat(0 + Number(req.query.remindstart), "yyyy-MM-dd")
					sql = "SELECT COUNT(*) AS count FROM shicihuodong WHERE " + where + " AND " + req.params.columnName + " >= '" + remindStart + "'"
				}
				if (req.query.remindend) {
					let remindEnd = util.getDateTimeFormat(req.query.remindend, "yyyy-MM-dd")
					sql = "SELECT COUNT(*) AS count FROM shicihuodong WHERE " + where + " AND " + req.params.columnName + " <= '" + remindEnd + "'"
				}

				if (req.query.remindstart && req.query.remindend) {
					let remindStart = util.getDateTimeFormat(0 + Number(req.query.remindstart), "yyyy-MM-dd")
					let remindEnd = util.getDateTimeFormat(req.query.remindend, "yyyy-MM-dd")
					sql = "SELECT COUNT(*) AS count FROM shicihuodong WHERE " + where + " AND " + req.params.columnName + " >= '" + remindStart + "' AND " + req.params.columnName + " <= '" + remindEnd + "'"
				}
			}

			const results = await sequelize.query(sql, {
				plain: true,
				raw: true,
				type: QueryTypes.SELECT
			})

			toRes.count(res, 0, results.count)
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 赞、踩接口
	api.get('/thumbsup/:id', async (req, res) => {

		try {

			let type = req.query.type

			const recordInfo = await ShicihuodongModel.findOne({ where: { id: req.params.id } })
			if (type == 1) {
				await recordInfo.increment('thumbsupnum')
			}
			if (type == 2) {
				await recordInfo.increment('crazilynum')
			}

			toRes.session(res, 0, '操作成功！')
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})









	// 分组统计接口
	api.get('/group/:columnName', async (req, res) => {

		try {

			let sql = ""
			let columnName = req.params.columnName
			// let tableName = "shicihuodong"
			let where = " WHERE 1 = 1 "
			sql = "SELECT COUNT(*) AS total, " + columnName + " FROM shicihuodong " + where + " GROUP BY " + columnName 
			toRes.record(res, 0, await sequelize.query(sql, {
				plain: false,
				raw: true,
				type: QueryTypes.SELECT
			}))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 统计指定字段
	api.get('/value/:xColumnName/:yColumnName', async (req, res) => {

		try {

			let sql = ""
			let xColumnName = req.params.xColumnName
			let yColumnName = req.params.yColumnName
			let where = " WHERE 1 = 1 "
			if ("shicihuodong" == "orders") {
				where += " AND status IN ('已支付', '已发货', '已完成') ";
			}

			sql = "SELECT " + xColumnName + ", SUM(" + yColumnName + ") AS total FROM shicihuodong " + where + " GROUP BY " + xColumnName + " DESC"
			
			toRes.record(res, 0, await sequelize.query(sql, {
				plain: false,
				raw: true,
				type: QueryTypes.SELECT
			}))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// (按值统计）时间统计类型(多)
	api.get('/valueMul/:xColumnName', async (req, res) => {

		try {	
			let sql = ""
			let xColumnName = req.params.xColumnName
			let yColumnName = req.query.yColumnNameMul
			let tableName = "shicihuodong"
			let where = " WHERE 1 = 1 "
			const promises = yColumnName.split(',').map(async(item)=>{
				sql = "SELECT " + xColumnName + ", sum(" + item + ") total FROM " + tableName + where + " GROUP BY " + xColumnName;
				const results = await sequelize.query(sql, {
					plain: false,
					raw: true,
					type: QueryTypes.SELECT
				});
				return results;
			})
            	
			toRes.record(res, 0, await Promise.all(promises))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// (按值统计）时间统计类型(多)
	api.get('/valueMul/:xColumnName/:timeStatType', async (req, res) => {

		try {	
			let sql = ""
			let xColumnName = req.params.xColumnName
			let yColumnName = req.query.yColumnNameMul
			let timeStatType = req.params.timeStatType
			let tableName = "shicihuodong"
			let where = " WHERE 1 = 1 "

			const promises = yColumnName.split(',').map(async(item)=>{
				sql = "SELECT " + xColumnName + ", sum(" + item + ") total FROM " + tableName + where + " GROUP BY " + xColumnName;
				if (config.dbConnection.dbtype.toLowerCase() == "mysql") {
            	    if (timeStatType == "日")
            	        sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y-%m-%d') " + xColumnName + ", sum(" + item + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y-%m-%d')";
            	    if (timeStatType == "月")
            	        sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y-%m') " + xColumnName + ", sum(" + item + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y-%m')";
            	    if (timeStatType == "年")
            	        sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y') " + xColumnName + ", sum(" + item + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y')";
            	} else {
            	    if (timeStatType == "日")
            	        sql = "SELECT DATE_FORMAT(VARCHAR(10)," + xColumnName + ", 120) " + xColumnName + ", sum(" + item + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(10)," + xColumnName + ", 120)";
            	    if (timeStatType == "月")
            	        sql = "SELECT DATE_FORMAT(VARCHAR(7)," + xColumnName + ", 120) " + xColumnName + ", sum(" + item + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(7)," + xColumnName + ", 120)";
            	    if (timeStatType == "年")
            	        sql = "SELECT DATE_FORMAT(VARCHAR(4)," + xColumnName + ", 120) " + xColumnName + ", sum(" + item + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(4)," + xColumnName + ", 120)";
            	}
				const results = await sequelize.query(sql, {
					plain: false,
					raw: true,
					type: QueryTypes.SELECT
				});
				return results;
			})
            	
			toRes.record(res, 0, await Promise.all(promises))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 按日期统计
	api.get('/value/:xColumnName/:yColumnName/:timeStatType', async (req, res) => {

		try {
			
			let sql = ""
			let xColumnName = req.params.xColumnName
			let yColumnName = req.params.yColumnName
			let timeStatType = req.params.timeStatType
			let tableName = "shicihuodong"
			let where = " WHERE 1 = 1 "
			if ("shicihuodong" == "orders") {
				where += " AND status IN ('已支付', '已发货', '已完成') ";
			}

            if (config.dbConnection.dbtype.toLowerCase() == "mysql") {
                if (timeStatType == "日")
                    sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y-%m-%d') " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y-%m-%d')";
                if (timeStatType == "月")
                    sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y-%m') " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y-%m')";
                if (timeStatType == "年")
                    sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y') " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y')";
            } else {
                if (timeStatType == "日")
                    sql = "SELECT DATE_FORMAT(VARCHAR(10)," + xColumnName + ", 120) " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(10)," + xColumnName + ", 120)";
                if (timeStatType == "月")
                    sql = "SELECT DATE_FORMAT(VARCHAR(7)," + xColumnName + ", 120) " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(7)," + xColumnName + ", 120)";
                if (timeStatType == "年")
                    sql = "SELECT DATE_FORMAT(VARCHAR(4)," + xColumnName + ", 120) " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(4)," + xColumnName + ", 120)";
            }
			toRes.record(res, 0, await sequelize.query(sql, {
				plain: false,
				raw: true,
				type: QueryTypes.SELECT
			}))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})


	// 总数接口
	api.get('/count', async (req, res) => {

		try {
			let where = {}
			var huodongmingcheng = req.query.huodongmingcheng
			if (huodongmingcheng) {

				if (huodongmingcheng.indexOf('%') != -1) {
					where.huodongmingcheng = {
						[Op.like]: huodongmingcheng
					}
				} else {
					where.huodongmingcheng = {
						[Op.eq]: huodongmingcheng
					}
				}
			}
			var huodongfenlei = req.query.huodongfenlei
			if (huodongfenlei) {

				if (huodongfenlei.indexOf('%') != -1) {
					where.huodongfenlei = {
						[Op.like]: huodongfenlei
					}
				} else {
					where.huodongfenlei = {
						[Op.eq]: huodongfenlei
					}
				}
			}
			var huodongdidian = req.query.huodongdidian
			if (huodongdidian) {

				if (huodongdidian.indexOf('%') != -1) {
					where.huodongdidian = {
						[Op.like]: huodongdidian
					}
				} else {
					where.huodongdidian = {
						[Op.eq]: huodongdidian
					}
				}
			}

			const count = await ShicihuodongModel.count({where});

			toRes.record(res, 0, count)
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})













	return api
}
