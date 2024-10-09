<template>
	<div class="main-content" :style='{"padding":"30px"}'>
		<!-- 列表页 -->
		<template v-if="showFlag">
			<el-form class="center-form-pv" :style='{"padding":"0","margin":"0 0 20px","borderRadius":"8px","flexWrap":"wrap","background":"none","display":"flex","width":"100%"}' :inline="true" :model="searchForm">
				<el-row :style='{"width":"auto","margin":"20px 20px 20px 0","display":"inline-block"}' >
					<div :style='{"margin":"0 5px 0 0","display":"inline-block"}'>
						<label :style='{"margin":"0 5px 0 0","color":"#000","display":"inline-block","lineHeight":"40px","fontSize":"14px","fontWeight":"500","height":"40px"}' class="item-label">活动名称</label>
						<el-input v-model="searchForm.huodongmingcheng" placeholder="活动名称" @keydown.enter.native="search()" clearable></el-input>
					</div>
					<div :style='{"margin":"0 5px 0 0","display":"inline-block"}' class="select" label="活动分类" prop="huodongfenlei">
						<label :style='{"margin":"0 5px 0 0","color":"#000","display":"inline-block","lineHeight":"40px","fontSize":"14px","fontWeight":"500","height":"40px"}' class="item-label">活动分类</label>
						<el-select clearable v-model="searchForm.huodongfenlei" placeholder="请选择活动分类" >
							<el-option v-for="(item,index) in huodongfenleiOptions" v-bind:key="index" :label="item" :value="item"></el-option>
						</el-select>
					</div>
					<div :style='{"margin":"0 5px 0 0","display":"inline-block"}'>
						<label :style='{"margin":"0 5px 0 0","color":"#000","display":"inline-block","lineHeight":"40px","fontSize":"14px","fontWeight":"500","height":"40px"}' class="item-label">活动地点</label>
						<el-input v-model="searchForm.huodongdidian" placeholder="活动地点" @keydown.enter.native="search()" clearable></el-input>
					</div>
					<el-button class="search" type="success" @click="search()">
						<span class="icon iconfont " :style='{"margin":"0 2px","fontSize":"14px","color":"#fff","height":"40px"}'></span>
						查询
					</el-button>
				</el-row>

				<el-row class="actions" :style='{"width":"auto","margin":"20px 0","flexWrap":"wrap","display":"flex"}'>
					<el-button class="add" v-if="isAuth('shicihuodong','新增')" type="success" @click="addOrUpdateHandler()">
						<span class="icon iconfont " :style='{"margin":"0 2px","fontSize":"14px","color":"#fff","height":"40px"}'></span>
						添加
					</el-button>
					<el-button class="del" v-if="isAuth('shicihuodong','删除')" :disabled="dataListSelections.length?false:true" type="danger" @click="deleteHandler()">
						<span class="icon iconfont " :style='{"margin":"0 2px","fontSize":"14px","color":"#fff","height":"40px"}'></span>
						删除
					</el-button>



					<el-button class="btn18" v-if="isAuth('shicihuodong','活动分类统计')" type="success" @click="chartDialog1()">
						<span class="icon iconfont icon-xihuan" :style='{"margin":"0 2px","fontSize":"14px","color":"#fff","display":"none","height":"40px"}'></span>
						活动分类统计
					</el-button>
				</el-row>
			</el-form>
			<div :style='{"width":"100%","padding":"0","overflow":"hidden","borderRadius":"8px"}'>
				<el-table class="tables"
					:stripe='false'
					:style='{"width":"100%","padding":"0","borderColor":"#eee","borderStyle":"solid","borderWidth":"1px 0 0 1px","background":"#fff"}' 
					:border='true'
					v-if="isAuth('shicihuodong','查看')"
					:data="dataList"
					v-loading="dataListLoading"
				@selection-change="selectionChangeHandler">
					<el-table-column :resizable='true' type="selection" align="center" width="50"></el-table-column>
					<el-table-column :resizable='true' :sortable='true' label="序号" type="index" width="50" />
					<el-table-column :resizable='true' :sortable='true'  
						prop="huodongmingcheng"
						label="活动名称">
						<template slot-scope="scope">
							{{scope.row.huodongmingcheng}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="huodongfenlei"
						label="活动分类">
						<template slot-scope="scope">
							{{scope.row.huodongfenlei}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true' prop="huodongtupian" width="200" label="活动图片">
						<template slot-scope="scope">
							<div v-if="scope.row.huodongtupian">
								<img v-if="scope.row.huodongtupian.substring(0,4)=='http'" :src="scope.row.huodongtupian.split(',')[0]" width="100" height="100" style="object-fit: cover" @click="imgPreView(scope.row.huodongtupian.split(',')[0])">
								<img v-else :src="$base.url+scope.row.huodongtupian.split(',')[0]" width="100" height="100" style="object-fit: cover" @click="imgPreView($base.url+scope.row.huodongtupian.split(',')[0])">
							</div>
							<div v-else>无图片</div>
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="huodongdidian"
						label="活动地点">
						<template slot-scope="scope">
							{{scope.row.huodongdidian}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="huodongshijian"
						label="活动时间">
						<template slot-scope="scope">
							{{scope.row.huodongshijian}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="clicknum"
						label="点击次数">
						<template slot-scope="scope">
							{{scope.row.clicknum}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="discussnum"
						label="评论数">
						<template slot-scope="scope">
							{{scope.row.discussnum}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="storeupnum"
						label="收藏数">
						<template slot-scope="scope">
							{{scope.row.storeupnum}}
						</template>
					</el-table-column>
					<el-table-column width="300" label="操作">
						<template slot-scope="scope">
							<el-button class="view" v-if=" isAuth('shicihuodong','查看')" type="success" @click="addOrUpdateHandler(scope.row.id,'info')">
								<span class="icon iconfont icon-chakan2" :style='{"margin":"0 2px","fontSize":"14px","color":"#fff","height":"40px"}'></span>
								查看
							</el-button>
							<el-button class="btn8" v-if="isAuth('shicihuodong','活动报名')" @click="huodongbaomingCrossAddOrUpdateHandler(scope.row,'cross','','','[1]','已报名操作！')" type="success">
								<span class="icon iconfont icon-xihuan" :style='{"margin":"0 2px","fontSize":"14px","color":"#fff","height":"40px"}'></span>
								活动报名
							</el-button>
							<el-button class="edit" v-if=" isAuth('shicihuodong','修改') " type="success" @click="addOrUpdateHandler(scope.row.id)">
								<span class="icon iconfont icon-xiugai13" :style='{"margin":"0 2px","fontSize":"14px","color":"#fff","height":"40px"}'></span>
								修改
							</el-button>

							<el-button class="view" v-if="isAuth('shicihuodong','查看评论')" type="success" @click="disscussListHandler(scope.row.id)">
								<span class="icon iconfont icon-chakan2" :style='{"margin":"0 2px","fontSize":"14px","color":"#fff","height":"40px"}'></span>
								查看评论
							</el-button>



							<el-button class="del" v-if="isAuth('shicihuodong','删除') " type="primary" @click="deleteHandler(scope.row.id )">
								<span class="icon iconfont icon-shanchu8" :style='{"margin":"0 2px","fontSize":"14px","color":"#fff","height":"40px"}'></span>
								删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<el-pagination
				@size-change="sizeChangeHandle"
				@current-change="currentChangeHandle"
				:current-page="pageIndex"
				background
				:page-sizes="[10, 50, 100, 200]"
				:page-size="pageSize"
				:layout="layouts.join()"
				:total="totalPage"
				prev-text="< "
				next-text="> "
				:hide-on-single-page="true"
				:style='{"padding":"0","margin":"20px 0 0","whiteSpace":"nowrap","color":"#333","textAlign":"center","width":"100%","fontWeight":"500"}'
			></el-pagination>
		</template>
		
		<!-- 添加/修改页面  将父组件的search方法传递给子组件-->
		<add-or-update v-if="addOrUpdateFlag" :parent="this" ref="addOrUpdate"></add-or-update>

		<huodongbaoming-cross-add-or-update v-if="huodongbaomingCrossAddOrUpdateFlag" :parent="this" ref="huodongbaomingCrossaddOrUpdate"></huodongbaoming-cross-add-or-update>



		<el-dialog
		  :visible.sync="chartVisiable1"
		  width="800">
			<div id="huodongfenleiChart1" style="width:100%;height:600px;"></div>
		  <span slot="footer" class="dialog-footer">
			<el-button @click="chartDialog1">返回</el-button>
		  </span>
		</el-dialog>

		<el-dialog title="预览图" :visible.sync="previewVisible" width="50%">
			<img :src="previewImg" alt="" style="width: 100%;">
		</el-dialog>
	</div>
</template>

<script>
import * as echarts from 'echarts'
import chinaJson from "@/components/echarts/china.json";
import axios from 'axios'
import AddOrUpdate from "./add-or-update";
import huodongbaomingCrossAddOrUpdate from "../huodongbaoming/add-or-update";
	export default {
		data() {
			return {
				huodongfenleiOptions: [],
				searchForm: {
					key: ""
				},
				form:{},
				dataList: [],
				pageIndex: 1,
				pageSize: 10,
				totalPage: 0,
				dataListLoading: false,
				dataListSelections: [],
				showFlag: true,
				chartVisiable1: false,
				addOrUpdateFlag:false,
				huodongbaomingCrossAddOrUpdateFlag: false,
				layouts: ["total","prev","pager","next","sizes","jumper"],
				previewImg: '',
				previewVisible: false,
			};
		},
		created() {
			this.init();
			this.getDataList();
			this.contentStyleChange()
		},
		mounted() {
		},
		filters: {
			htmlfilter: function (val) {
				return val.replace(/<[^>]*>/g).replace(/undefined/g,'');
			}
		},
		computed: {
			tablename(){
				return this.$storage.get('sessionTable')
			},
		},
		components: {
			AddOrUpdate,
			huodongbaomingCrossAddOrUpdate,
		},
		methods: {
			imgPreView(url){
				this.previewImg = url
				this.previewVisible = true
			},
			contentStyleChange() {
				this.contentPageStyleChange()
			},
			// 分页
			contentPageStyleChange(){
				let arr = []

				// if(this.contents.pageTotal) arr.push('total')
				// if(this.contents.pageSizes) arr.push('sizes')
				// if(this.contents.pagePrevNext){
				//   arr.push('prev')
				//   if(this.contents.pagePager) arr.push('pager')
				//   arr.push('next')
				// }
				// if(this.contents.pageJumper) arr.push('jumper')
				// this.layouts = arr.join()
				// this.contents.pageEachNum = 10
			},
			huodongbaomingCrossAddOrUpdateHandler(row,type,crossOptAudit,crossOptPay,statusColumnName,tips,statusColumnValue){
				this.showFlag = false;
				this.addOrUpdateFlag = false;
				this.huodongbaomingCrossAddOrUpdateFlag = true;
				this.$storage.set('crossObj',row);
				this.$storage.set('crossTable','shicihuodong');
				this.$storage.set('statusColumnName',statusColumnName);
				this.$storage.set('statusColumnValue',statusColumnValue);
				this.$storage.set('tips',tips);
				if(statusColumnName!=''&&!statusColumnName.startsWith("[")) {
					var obj = this.$storage.getObj('crossObj');
					for (var o in obj){
						if(o==statusColumnName && obj[o]==statusColumnValue){
							this.$message({
								message: tips,
								type: "success",
								duration: 1500,
								onClose: () => {
									this.getDataList();
								}
							});
							this.showFlag = true;
							this.huodongbaomingCrossAddOrUpdateFlag = false;
							return;
						}
					}
				}
				this.$nextTick(() => {
					this.$refs.huodongbaomingCrossaddOrUpdate.init(row.id,type);
				});
			},


//统计接口
    chartDialog1() {
      this.chartVisiable1 = !this.chartVisiable1;
      this.$nextTick(()=>{
        var huodongfenleiChart1 = echarts.init(document.getElementById("huodongfenleiChart1"),'macarons');
        this.$http({
            url: "shicihuodong/group/huodongfenlei",
            method: "get",
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].huodongfenlei);
                    yAxis.push(parseFloat((res[i].total)));
                    pArray.push({
                        value: parseFloat((res[i].total)),
                        name: res[i].huodongfenlei
                    })
                }
                var option = {};
				let prrLength = pArray.length>8 ? 8 : pArray.length
				for (let x = 0; x < prrLength; x++) {
					pArray[x] = Object.assign(pArray[x], {
						title: {
							offsetCenter: [String((-140 + (x) * 40) + '%'), '80%']
						},
						detail: {
							offsetCenter: [String((-140 + (x) * 40) + '%'), '95%']
						}
					})
				}
				option = {
					title: {
					    text: '活动分类统计',
					    left: 'center',
					    top: 'top'
					},
					series: [{
						type: 'gauge',
						anchor: {
							show: true,
							showAbove: true,
							size: 18,
							itemStyle: {
								color: 'inherit'
							}
						},
						pointer: {
							icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
							width: 8,
							length: '80%',
							offsetCenter: [0, '10%']
						},
						progress: {
							show: true,
							overlap: true,
							roundCap: true
						},
						axisLine: {
							roundCap: true
						},
						data: pArray,
						title: {
							fontSize: 14
						},
						splitNumber: 25,
						animation: true,
						emphasis: {
							disabled: false
						},
						axisLine: {
							roundCap: true,
							lineStyle:{
								shadowColor: '#000',
								shadowBlur: 1,
								shadowOffsetX: 0,
								shadowOffsetY: 0,
								opacity: 0.5
							}
						},
						detail: {
							width: 40,
							height: 14,
							fontSize: 14,
							color: '#fff',
							backgroundColor: 'inherit',
							borderRadius: 3,
							formatter: '{value}'
						}
					}]
				}
                // 使用刚指定的配置项和数据显示图表。
                huodongfenleiChart1.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    huodongfenleiChart1.resize();
                };
            }
        });
      })
    },




    init () {
          this.$http({
            url: `option/huodongfenlei/huodongfenlei`,
            method: "get"
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.huodongfenleiOptions = data.data;
            } else {
              this.$message.error(data.msg);
            }
          });
    },
    search() {
      this.pageIndex = 1;
      this.getDataList();
    },

    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      let params = {
        page: this.pageIndex,
        limit: this.pageSize,
        sort: 'id',
        order: 'desc',
      }
           if(this.searchForm.huodongmingcheng!='' && this.searchForm.huodongmingcheng!=undefined){
            params['huodongmingcheng'] = '%' + this.searchForm.huodongmingcheng + '%'
          }
          if(this.searchForm.huodongfenlei!='' && this.searchForm.huodongfenlei!=undefined){
            params['huodongfenlei'] = this.searchForm.huodongfenlei
          }
           if(this.searchForm.huodongdidian!='' && this.searchForm.huodongdidian!=undefined){
            params['huodongdidian'] = '%' + this.searchForm.huodongdidian + '%'
          }
			let user = JSON.parse(this.$storage.getObj('userForm'))
			console.log(user)
			this.$http({
				url: "shicihuodong/page",
				method: "get",
				params: params
			}).then(({ data }) => {
				if (data && data.code === 0) {
					this.dataList = data.data.list;
					this.totalPage = data.data.total;
				} else {
					this.dataList = [];
					this.totalPage = 0;
				}
				this.dataListLoading = false;
			});
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandler(val) {
      this.dataListSelections = val;
    },
    // 添加/修改
    addOrUpdateHandler(id,type) {
      this.showFlag = false;
      this.addOrUpdateFlag = true;
      this.crossAddOrUpdateFlag = false;
      if(type!='info'){
        type = 'else';
      }
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id,type);
      });
    },
    // 查看评论
    disscussListHandler(id,type) {
	this.$router.push({path:'/discussshicihuodong',query:{refid:id}});
    },
	shicihuodongstatusChange(e,row){
		if(row.status==0){
			row.passwordwrongnum = 0
		}
		this.$http({
			url:'shicihuodong/update',
			method:'post',
			data:row
		}).then(res=>{
			if(row.status==1){
				this.$message.error('该用户已锁定')
			}else{
				this.$message.success('该用户已解除锁定')
			}
		})
	},
    // 删除
    async deleteHandler(id ) {
		var ids = id? [Number(id)]: this.dataListSelections.map(item => {
			return Number(item.id);
		});
		await this.$confirm(`确定进行[${id ? "删除" : "批量删除"}]操作?`, "提示", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning"
		}).then(async () => {
			await this.$http({
				url: "shicihuodong/delete",
				method: "post",
				data: ids
			}).then(async ({ data }) => {
				if (data && data.code === 0) {
					for(let x in ids){
						await this.$http.get('storeup/list',{params: {
							page: 1,
							limit: 100,
							refid: ids[x],
							tablename: 'shicihuodong'
						}}).then(async obj=>{
							if(obj.data&&obj.data.code==0){
								if(obj.data.data.list.length){
									let arr = []
									for(let i in obj.data.data.list){
										arr.push(obj.data.data.list[i].id)
									}
									await this.$http.post('storeup/delete',arr).then(()=>{})
								}
							}
						})
					}
					this.$message({
						message: "操作成功",
						type: "success",
						duration: 1500,
						onClose: () => {
							this.search();
						}
					});
            
				} else {
					this.$message.error(data.msg);
				}
			});
		});
    },


  }

};
</script>
<style lang="scss" scoped>
	
	.center-form-pv {
	  .el-date-editor.el-input {
	    width: auto;
	  }
	}
	
	.el-input {
	  width: auto;
	}
	
	// form
	.center-form-pv .el-input /deep/ .el-input__inner {
				border: 1px solid #000;
				border-radius: 4px;
				padding: 0 12px;
				color: #000;
				width: 150px;
				font-size: 14px;
				height: 40px;
			}
	
	.center-form-pv .el-select /deep/ .el-input__inner {
				border: 1px solid #000;
				border-radius: 4px;
				padding: 0 10px;
				color: #000;
				width: 150px;
				font-size: 14px;
				height: 40px;
			}
	
	.center-form-pv .el-date-editor /deep/ .el-input__inner {
				border: 1px solid #000;
				border-radius: 4px;
				padding: 0 10px 0 30px;
				color: #000;
				width: 150px;
				font-size: 14px;
				height: 40px;
			}
	
	.center-form-pv .search {
				border: 0;
				cursor: pointer;
				border-radius: 4px;
				padding: 0 24px;
				margin: 0 0 0 5px;
				color: #fff;
				background: #5CE5FB;
				width: auto;
				font-size: 14px;
				height: 40px;
			}
	
	.center-form-pv .search:hover {
				opacity: 0.8;
			}
	
	.center-form-pv .actions .add {
				border: 0;
				cursor: pointer;
				border-radius: 4px;
				padding: 0 24px;
				margin: 0 10px 10px 0;
				outline: none;
				color: #fff;
				background: #5CE5FB;
				width: auto;
				font-size: 14px;
				height: 40px;
			}
	
	.center-form-pv .actions .add:hover {
				opacity: 0.8;
			}
	
	.center-form-pv .actions .del {
				border: 0;
				cursor: pointer;
				border-radius: 4px;
				padding: 0 24px;
				margin: 0 10px 10px 0;
				outline: none;
				color: #fff;
				background: #D32F2F;
				width: auto;
				font-size: 14px;
				height: 40px;
			}
	
	.center-form-pv .actions .del:hover {
				opacity: 0.8;
			}
	
	.center-form-pv .actions .statis {
				border: 0;
				cursor: pointer;
				border-radius: 4px;
				padding: 0 24px;
				margin: 0 10px 10px 0;
				outline: none;
				color: #fff;
				background: #008CBA;
				width: auto;
				font-size: 14px;
				height: 40px;
			}
	
	.center-form-pv .actions .statis:hover {
				opacity: 0.8;
			}
	
	.center-form-pv .actions .btn18 {
				border: 0;
				cursor: pointer;
				border-radius: 4px;
				padding: 0 24px;
				margin: 0 10px 10px 0;
				outline: none;
				color: #fff;
				background: #008CBA;
				width: auto;
				font-size: 14px;
				height: 40px;
			}
	
	.center-form-pv .actions .btn18:hover {
				opacity: 0.8;
			}
	
	// table
	.el-table /deep/ .el-table__header-wrapper thead {
				color: #333;
				font-weight: 500;
				width: 100%;
			}
	
	.el-table /deep/ .el-table__header-wrapper thead tr {
				background: #fff;
			}
	
	.el-table /deep/ .el-table__header-wrapper thead tr th {
				padding: 12px 0;
				border-color: #eee;
				border-width: 0 1px 1px 0;
				border-style: solid;
				text-align: left;
			}

	.el-table /deep/ .el-table__header-wrapper thead tr th .cell {
				padding: 0 10px;
				word-wrap: normal;
				word-break: break-all;
				white-space: normal;
				font-weight: bold;
				display: inline-block;
				vertical-align: middle;
				width: 100%;
				line-height: 24px;
				position: relative;
				text-overflow: ellipsis;
			}

	
	.el-table /deep/ .el-table__body-wrapper tbody {
				width: 100%;
			}

	.el-table /deep/ .el-table__body-wrapper tbody tr {
				background: #fff;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td {
				padding: 12px 0;
				color: #333;
				background: #fff;
				border-color: #eee;
				border-width: 0 1px 1px 0;
				border-style: solid;
				text-align: left;
			}
	
		
	.el-table /deep/ .el-table__body-wrapper tbody tr:hover td {
				padding: 12px 0;
				color: #fff;
				background: rgba(64, 158, 255, .5);
				border-color: #eee;
				border-width: 0 1px 1px 0;
				border-style: solid;
				text-align: left;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td {
				padding: 12px 0;
				color: #333;
				background: #fff;
				border-color: #eee;
				border-width: 0 1px 1px 0;
				border-style: solid;
				text-align: left;
			}

	.el-table /deep/ .el-table__body-wrapper tbody tr td .cell {
				padding: 0 10px;
				overflow: hidden;
				word-break: break-all;
				white-space: normal;
				line-height: 24px;
				text-overflow: ellipsis;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .view {
				border: 0;
				cursor: pointer;
				border-radius: 4px;
				padding: 0 6px 0 4px;
				margin: 0 4px 4px 0;
				outline: none;
				color: #fff;
				background: rgb(92, 229, 251);
				width: auto;
				font-size: 14px;
				height: 32px;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .view:hover {
				opacity: 0.8;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .add {
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .add:hover {
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .edit {
				border: 0;
				cursor: pointer;
				border-radius: 4px;
				padding: 0 6px 0 4px;
				margin: 0 4px 4px 0;
				outline: none;
				color: #fff;
				background: #008CBA;
				width: auto;
				font-size: 14px;
				height: 32px;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .edit:hover {
				opacity: 0.8;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .del {
				border: 0;
				cursor: pointer;
				border-radius: 4px;
				padding: 0 6px 0 4px;
				margin: 0 4px 4px 0;
				outline: none;
				color: #fff;
				background: #D32F2F;
				width: auto;
				font-size: 14px;
				height: 32px;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .del:hover {
				opacity: 0.8;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .btn8 {
				border: 0;
				cursor: pointer;
				border-radius: 4px;
				padding: 0 6px 0 4px;
				margin: 0 4px 4px 0;
				outline: none;
				color: #fff;
				background: #008CBA;
				width: auto;
				font-size: 14px;
				height: 32px;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .btn8:hover {
				opacity: 0.8;
			}
	
	// pagination
	.main-content .el-pagination /deep/ .el-pagination__total {
				margin: 0 10px 0 0;
				color: #fff;
				font-weight: 400;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-prev {
				border: none;
				border-radius: 2px;
				padding: 0;
				margin: 0 5px;
				color: #666;
				background: #f4f4f5;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				min-width: 35px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-next {
				border: none;
				border-radius: 2px;
				padding: 0;
				margin: 0 5px;
				color: #666;
				background: #f4f4f5;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				min-width: 35px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-prev:disabled {
				border: none;
				cursor: not-allowed;
				border-radius: 2px;
				padding: 0;
				margin: 0 5px;
				color: #C0C4CC;
				background: #f4f4f5;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-next:disabled {
				border: none;
				cursor: not-allowed;
				border-radius: 2px;
				padding: 0;
				margin: 0 5px;
				color: #C0C4CC;
				background: #f4f4f5;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}

	.main-content .el-pagination /deep/ .el-pager {
				padding: 0;
				margin: 0;
				display: inline-block;
				vertical-align: top;
			}

	.main-content .el-pagination /deep/ .el-pager .number {
				cursor: pointer;
				padding: 0 4px;
				margin: 0 5px;
				color: #666;
				font-weight: 400;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				border-radius: 2px;
				background: #f4f4f5;
				text-align: center;
				min-width: 30px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pager .number:hover {
				cursor: pointer;
				padding: 0 4px;
				margin: 0 5px;
				color: #000;
				font-weight: 700;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				border-radius: 2px;
				background: #f4f4f5;
				text-align: center;
				min-width: 30px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pager .number.active {
				cursor: default;
				padding: 0 4px;
				margin: 0 5px;
				color: #FFF;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				border-radius: 2px;
				background: #000;
				text-align: center;
				min-width: 30px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes {
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input {
				margin: 0 5px;
				width: 100px;
				position: relative;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input .el-input__inner {
				border: 1px solid #DCDFE6;
				cursor: pointer;
				padding: 0 25px 0 8px;
				color: #606266;
				display: inline-block;
				font-size: 13px;
				line-height: 28px;
				border-radius: 3px;
				outline: 0;
				background: #FFF;
				width: 100%;
				text-align: center;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input span.el-input__suffix {
				top: 0;
				position: absolute;
				right: 0;
				height: 100%;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input .el-input__suffix .el-select__caret {
				cursor: pointer;
				color: #C0C4CC;
				width: 25px;
				font-size: 14px;
				line-height: 28px;
				text-align: center;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__jump {
				margin: 0 0 0 24px;
				color: #fff;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__jump .el-input {
				border-radius: 3px;
				padding: 0 2px;
				margin: 0 2px;
				display: inline-block;
				width: 50px;
				font-size: 14px;
				line-height: 18px;
				position: relative;
				text-align: center;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__jump .el-input .el-input__inner {
				border: 1px solid #DCDFE6;
				cursor: pointer;
				padding: 0 3px;
				color: #606266;
				display: inline-block;
				font-size: 14px;
				line-height: 28px;
				border-radius: 3px;
				outline: 0;
				background: #FFF;
				width: 100%;
				text-align: center;
				height: 28px;
			}
	
	// list one
	.one .list1-view {
				border: 1px solid #828282;
				cursor: pointer;
				border-radius: 4px;
				padding: 0 15px;
				margin: 0;
				outline: none;
				color: #828282;
				width: auto;
				font-size: 14px;
				height: 40px;
			}
	
	.one .list1-view:hover {
				opacity: 0.8;
			}
	
	.one .list1-edit {
				border: 1px solid #828282;
				cursor: pointer;
				border-radius: 4px;
				padding: 0 15px;
				margin: 0;
				outline: none;
				color: #828282;
				width: auto;
				font-size: 14px;
				height: 40px;
			}
	
	.one .list1-edit:hover {
				opacity: 0.8;
			}
	
	.one .list1-del {
				border: 1px solid #828282;
				cursor: pointer;
				border-radius: 4px;
				padding: 0 15px;
				margin: 0;
				outline: none;
				color: #828282;
				width: auto;
				font-size: 14px;
				height: 40px;
			}
	
	.one .list1-del:hover {
				opacity: 0.8;
			}
	
	.one .list1-btn8 {
				border: 1px solid #828282;
				cursor: pointer;
				border-radius: 4px;
				padding: 0 24px;
				margin: 0;
				outline: none;
				color: #828282;
				background: none;
				width: auto;
				font-size: 14px;
				height: 40px;
			}
	
	.one .list1-btn8:hover {
				opacity: 0.8;
			}
	
	.main-content .el-table .el-switch {
				display: inline-flex;
				vertical-align: middle;
				line-height: 30px;
				position: relative;
				align-items: center;
				height: 30px;
			}
	.main-content .el-table .el-switch /deep/ .el-switch__label--left {
				cursor: pointer;
				margin: 0 10px 0 0;
				color: #333;
				font-weight: 500;
				display: inline-block;
				vertical-align: middle;
				font-size: 16px;
				transition: .2s;
				height: 30px;
			}
	.main-content .el-table .el-switch /deep/ .el-switch__label--right {
				cursor: pointer;
				margin: 0 0 0 10px;
				color: #333;
				font-weight: 500;
				display: inline-block;
				vertical-align: middle;
				font-size: 16px;
				transition: .2s;
				height: 30px;
			}
	.main-content .el-table .el-switch /deep/ .el-switch__core {
				border: 1px solid #0000ff;
				cursor: pointer;
				border-radius: 15px;
				margin: 0;
				outline: 0;
				background: #0000ff;
				display: inline-block;
				width: 60px;
				box-sizing: border-box;
				transition: border-color .3s,background-color .3s;
				height: 30px;
			}
	.main-content .el-table .el-switch /deep/ .el-switch__core::after {
				border-radius: 100%;
				top: 1px;
				left: 1px;
				background: #FFF;
				width: 26px;
				position: absolute;
				transition: all .3s;
				height: 26px;
			}
	.main-content .el-table .el-switch.is-checked /deep/ .el-switch__core::after {
				margin: 0 0 0 -27px;
				left: 100%;
			}
	
	.main-content .el-table .el-rate /deep/ .el-rate__item {
				cursor: pointer;
				display: inline-block;
				vertical-align: middle;
				font-size: 0;
				position: relative;
			}
	.main-content .el-table .el-rate /deep/ .el-rate__item .el-rate__icon {
				margin: 0 3px;
				display: inline-block;
				font-size: 18px;
				position: relative;
				transition: .3s;
			}

</style>
