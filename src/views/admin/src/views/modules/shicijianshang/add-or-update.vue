<template>
	<div class="addEdit-block" :style='{"padding":"30px"}'>
		<el-form
			:style='{"padding":"40px 30px","boxShadow":"0 1px 6px rgba(64, 158, 255, .3)","borderRadius":"6px","flexWrap":"wrap","background":"#fff","display":"flex"}'
			class="add-update-preview"
			ref="ruleForm"
			:model="ruleForm"
			:rules="rules"
			label-width="180px"
		>
			<template >
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="诗词主题" prop="shicizhuti">
					<el-input v-model="ruleForm.shicizhuti" placeholder="诗词主题" clearable  :readonly="ro.shicizhuti"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' v-else class="input" label="诗词主题" prop="shicizhuti">
					<el-input v-model="ruleForm.shicizhuti" placeholder="诗词主题" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="诗词名称" prop="shicimingcheng">
					<el-input v-model="ruleForm.shicimingcheng" placeholder="诗词名称" clearable  :readonly="ro.shicimingcheng"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' v-else class="input" label="诗词名称" prop="shicimingcheng">
					<el-input v-model="ruleForm.shicimingcheng" placeholder="诗词名称" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' class="select" v-if="type!='info'"  label="诗词朝代" prop="shicichaodai">
					<el-select :disabled="ro.shicichaodai" v-model="ruleForm.shicichaodai" placeholder="请选择诗词朝代" >
						<el-option
							v-for="(item,index) in shicichaodaiOptions"
							v-bind:key="index"
							:label="item"
							:value="item">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' v-else class="input" label="诗词朝代" prop="shicichaodai">
					<el-input v-model="ruleForm.shicichaodai"
						placeholder="诗词朝代" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' class="select" v-if="type!='info'"  label="诗词分类" prop="shicifenlei">
					<el-select :disabled="ro.shicifenlei" v-model="ruleForm.shicifenlei" placeholder="请选择诗词分类" >
						<el-option
							v-for="(item,index) in shicifenleiOptions"
							v-bind:key="index"
							:label="item"
							:value="item">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' v-else class="input" label="诗词分类" prop="shicifenlei">
					<el-input v-model="ruleForm.shicifenlei"
						placeholder="诗词分类" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' class="upload" v-if="type!='info' && !ro.shicitupian" label="诗词图片" prop="shicitupian">
					<file-upload
						tip="点击上传诗词图片"
						action="file/upload"
						:limit="3"
						:multiple="true"
						:fileUrls="ruleForm.shicitupian?ruleForm.shicitupian:''"
						@change="shicitupianUploadChange"
					></file-upload>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' class="upload" v-else-if="ruleForm.shicitupian" label="诗词图片" prop="shicitupian">
					<img v-if="ruleForm.shicitupian.substring(0,4)=='http'" class="upload-img" style="margin-right:20px;" v-bind:key="index" :src="ruleForm.shicitupian.split(',')[0]" width="100" height="100">
					<img v-else class="upload-img" style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm.shicitupian.split(',')" :src="$base.url+item" width="100" height="100">
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="诗词作者" prop="shicizuozhe">
					<el-input v-model="ruleForm.shicizuozhe" placeholder="诗词作者" clearable  :readonly="ro.shicizuozhe"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' v-else class="input" label="诗词作者" prop="shicizuozhe">
					<el-input v-model="ruleForm.shicizuozhe" placeholder="诗词作者" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' class="upload" v-if="type!='info'&& !ro.langduyinpin" label="朗读音频" prop="langduyinpin">
					<file-upload
						tip="点击上传朗读音频"
						action="file/upload"
						:limit="1"
						:type="3"
						:multiple="true"
						:fileUrls="ruleForm.langduyinpin?ruleForm.langduyinpin:''"
						@change="langduyinpinUploadChange"
					></file-upload>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' v-else-if="ruleForm.langduyinpin" label="朗读音频" prop="langduyinpin">
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0 15px","margin":"0 20px 0 0","outline":"none","color":"rgba(255, 255, 255, 1)","borderRadius":"4px","background":"#000","width":"auto","lineHeight":"40px","fontSize":"14px","height":"40px"}' type="text" size="small" @click="download($base.url+ruleForm.langduyinpin)">预览</el-button>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' v-else-if="!ruleForm.langduyinpin" label="朗读音频" prop="langduyinpin">
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0 15px","margin":"0 20px 0 0","outline":"none","color":"rgba(255, 255, 255, 1)","borderRadius":"4px","background":"#000","width":"auto","lineHeight":"40px","fontSize":"14px","height":"40px"}' type="text" size="small">无</el-button>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' class="upload" v-if="type!='info'&& !ro.langdushipin" label="朗读视频" prop="langdushipin">
					<file-upload
						tip="点击上传朗读视频"
						action="file/upload"
						:limit="1"
						:type="2"
						:multiple="true"
						:fileUrls="ruleForm.langdushipin?ruleForm.langdushipin:''"
						@change="langdushipinUploadChange"
					></file-upload>
				</el-form-item> 
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' v-else-if="ruleForm.langdushipin" label="朗读视频" prop="langdushipin">
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0 15px","margin":"0 20px 0 0","outline":"none","color":"rgba(255, 255, 255, 1)","borderRadius":"4px","background":"#000","width":"auto","lineHeight":"40px","fontSize":"14px","height":"40px"}' type="text" size="small" @click="download($base.url+ruleForm.langdushipin)">预览</el-button>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' v-else-if="!ruleForm.langdushipin" label="朗读视频" prop="langdushipin">
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0 15px","margin":"0 20px 0 0","outline":"none","color":"rgba(255, 255, 255, 1)","borderRadius":"4px","background":"#000","width":"auto","lineHeight":"40px","fontSize":"14px","height":"40px"}' type="text" size="small">无</el-button>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="历史背景" prop="lishibeijing">
					<el-input v-model="ruleForm.lishibeijing" placeholder="历史背景" clearable  :readonly="ro.lishibeijing"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' v-else class="input" label="历史背景" prop="lishibeijing">
					<el-input v-model="ruleForm.lishibeijing" placeholder="历史背景" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="文化信息" prop="wenhuaxinxi">
					<el-input v-model="ruleForm.wenhuaxinxi" placeholder="文化信息" clearable  :readonly="ro.wenhuaxinxi"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' v-else class="input" label="文化信息" prop="wenhuaxinxi">
					<el-input v-model="ruleForm.wenhuaxinxi" placeholder="文化信息" readonly></el-input>
				</el-form-item>
			</template>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' class="textarea" v-if="type!='info'" label="诗词解读" prop="shicijiedu">
					<el-input
					  style="min-width: 200px; max-width: 600px;"
					  type="textarea"
					  :rows="8"
					  placeholder="诗词解读"
					  v-model="ruleForm.shicijiedu" >
					</el-input>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' v-else-if="ruleForm.shicijiedu" label="诗词解读" prop="shicijiedu">
					<span :style='{"fontSize":"14px","lineHeight":"40px","color":"#333","fontWeight":"500","display":"inline-block"}'>{{ruleForm.shicijiedu}}</span>
				</el-form-item>
			<el-form-item :style='{"width":"100%","padding":"0","margin":"20px 0 0"}' class="btn">
				<el-button class="btn3"  v-if="type!='info'" type="success" @click="onSubmit">
					<span class="icon iconfont " :style='{"margin":"0 2px","fontSize":"14px","color":"#fff","height":"40px"}'></span>
					提交
				</el-button>
				<el-button class="btn4" v-if="type!='info'" type="success" @click="back()">
					<span class="icon iconfont " :style='{"margin":"0 2px","fontSize":"14px","color":"#fff","height":"40px"}'></span>
					取消
				</el-button>
				<el-button class="btn5" v-if="type=='info'" type="success" @click="back()">
					<span class="icon iconfont " :style='{"margin":"0 2px","fontSize":"14px","color":"#fff","height":"40px"}'></span>
					返回
				</el-button>
			</el-form-item>
		</el-form>
    

  </div>
</template>
<script>
import { 
	isIntNumer,
} from "@/utils/validate";
export default {
	data() {
		var validateIntNumber = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isIntNumer(value)) {
				callback(new Error("请输入整数"));
			} else {
				callback();
			}
		};
		return {
			id: '',
			type: '',
			
			
			ro:{
				shicizhuti : false,
				shicimingcheng : false,
				shicichaodai : false,
				shicifenlei : false,
				shicitupian : false,
				shicizuozhe : false,
				langduyinpin : false,
				langdushipin : false,
				lishibeijing : false,
				wenhuaxinxi : false,
				shicijiedu : false,
				thumbsupnum : false,
				crazilynum : false,
				clicktime : false,
				clicknum : false,
				discussnum : false,
				storeupnum : false,
			},
			
			
			ruleForm: {
				shicizhuti: '',
				shicimingcheng: '',
				shicichaodai: '',
				shicifenlei: '',
				shicitupian: '',
				shicizuozhe: '',
				langduyinpin: '',
				langdushipin: '',
				lishibeijing: '',
				wenhuaxinxi: '',
				shicijiedu: '',
				clicktime: '',
			},
		
			shicichaodaiOptions: [],
			shicifenleiOptions: [],

			
			rules: {
				shicizhuti: [
				],
				shicimingcheng: [
					{ required: true, message: '诗词名称不能为空', trigger: 'blur' },
				],
				shicichaodai: [
					{ required: true, message: '诗词朝代不能为空', trigger: 'blur' },
				],
				shicifenlei: [
				],
				shicitupian: [
				],
				shicizuozhe: [
				],
				langduyinpin: [
				],
				langdushipin: [
				],
				lishibeijing: [
				],
				wenhuaxinxi: [
				],
				shicijiedu: [
				],
				thumbsupnum: [
					{ validator: validateIntNumber, trigger: 'blur' },
				],
				crazilynum: [
					{ validator: validateIntNumber, trigger: 'blur' },
				],
				clicktime: [
				],
				clicknum: [
					{ validator: validateIntNumber, trigger: 'blur' },
				],
				discussnum: [
					{ validator: validateIntNumber, trigger: 'blur' },
				],
				storeupnum: [
					{ validator: validateIntNumber, trigger: 'blur' },
				],
			},
		};
	},
	props: ["parent"],
	computed: {



	},
    components: {
    },
	created() {
	},
	methods: {
		
		// 下载
		download(file){
			window.open(`${file}`)
		},
		// 初始化
		init(id,type) {
			if (id) {
				this.id = id;
				this.type = type;
			}
			if(this.type=='info'||this.type=='else'){
				this.info(id);
			}else if(this.type=='logistics'){
				this.logistics=false;
				this.info(id);
			}else if(this.type=='cross'){
				var obj = this.$storage.getObj('crossObj');
				for (var o in obj){
						if(o=='shicizhuti'){
							this.ruleForm.shicizhuti = obj[o];
							this.ro.shicizhuti = true;
							continue;
						}
						if(o=='shicimingcheng'){
							this.ruleForm.shicimingcheng = obj[o];
							this.ro.shicimingcheng = true;
							continue;
						}
						if(o=='shicichaodai'){
							this.ruleForm.shicichaodai = obj[o];
							this.ro.shicichaodai = true;
							continue;
						}
						if(o=='shicifenlei'){
							this.ruleForm.shicifenlei = obj[o];
							this.ro.shicifenlei = true;
							continue;
						}
						if(o=='shicitupian'){
							this.ruleForm.shicitupian = obj[o];
							this.ro.shicitupian = true;
							continue;
						}
						if(o=='shicizuozhe'){
							this.ruleForm.shicizuozhe = obj[o];
							this.ro.shicizuozhe = true;
							continue;
						}
						if(o=='langduyinpin'){
							this.ruleForm.langduyinpin = obj[o];
							this.ro.langduyinpin = true;
							continue;
						}
						if(o=='langdushipin'){
							this.ruleForm.langdushipin = obj[o];
							this.ro.langdushipin = true;
							continue;
						}
						if(o=='lishibeijing'){
							this.ruleForm.lishibeijing = obj[o];
							this.ro.lishibeijing = true;
							continue;
						}
						if(o=='wenhuaxinxi'){
							this.ruleForm.wenhuaxinxi = obj[o];
							this.ro.wenhuaxinxi = true;
							continue;
						}
						if(o=='shicijiedu'){
							this.ruleForm.shicijiedu = obj[o];
							this.ro.shicijiedu = true;
							continue;
						}
						if(o=='thumbsupnum'){
							this.ruleForm.thumbsupnum = obj[o];
							this.ro.thumbsupnum = true;
							continue;
						}
						if(o=='crazilynum'){
							this.ruleForm.crazilynum = obj[o];
							this.ro.crazilynum = true;
							continue;
						}
						if(o=='clicktime'){
							this.ruleForm.clicktime = obj[o];
							this.ro.clicktime = true;
							continue;
						}
						if(o=='clicknum'){
							this.ruleForm.clicknum = obj[o];
							this.ro.clicknum = true;
							continue;
						}
						if(o=='discussnum'){
							this.ruleForm.discussnum = obj[o];
							this.ro.discussnum = true;
							continue;
						}
						if(o=='storeupnum'){
							this.ruleForm.storeupnum = obj[o];
							this.ro.storeupnum = true;
							continue;
						}
				}
			}
			// 获取用户信息
			this.$http({
				url: `${this.$storage.get('sessionTable')}/session`,
				method: "get"
			}).then(({ data }) => {
				if (data && data.code === 0) {
					var json = data.data;
				} else {
					this.$message.error(data.msg);
				}
			});
            this.$http({
				url: `option/shicichaodai/shicichaodai`,
				method: "get"
            }).then(({ data }) => {
				if (data && data.code === 0) {
					this.shicichaodaiOptions = data.data;
				} else {
					this.$message.error(data.msg);
				}
            });
            this.$http({
				url: `option/shicifenlei/shicifenlei`,
				method: "get"
            }).then(({ data }) => {
				if (data && data.code === 0) {
					this.shicifenleiOptions = data.data;
				} else {
					this.$message.error(data.msg);
				}
            });
			
		},
    // 多级联动参数

    info(id) {
      this.$http({
        url: `shicijianshang/info/${id}`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
        this.ruleForm = data.data;
        //解决前台上传图片后台不显示的问题
        let reg=new RegExp('../../../upload','g')//g代表全部
        } else {
          this.$message.error(data.msg);
        }
      });
    },


    // 提交
    onSubmit() {
	if(this.ruleForm.shicitupian!=null) {
		this.ruleForm.shicitupian = this.ruleForm.shicitupian.replace(new RegExp(this.$base.url,"g"),"");
	}
	if(this.ruleForm.langduyinpin!=null) {
		this.ruleForm.langduyinpin = this.ruleForm.langduyinpin.replace(new RegExp(this.$base.url,"g"),"");
	}
	if(this.ruleForm.langdushipin!=null) {
		this.ruleForm.langdushipin = this.ruleForm.langdushipin.replace(new RegExp(this.$base.url,"g"),"");
	}
var objcross = this.$storage.getObj('crossObj');
      //更新跨表属性
       var crossuserid;
       var crossrefid;
       var crossoptnum;
       if(this.type=='cross'){
                var statusColumnName = this.$storage.get('statusColumnName');
                var statusColumnValue = this.$storage.get('statusColumnValue');
                if(statusColumnName!='') {
                        var obj = this.$storage.getObj('crossObj');
                       if(statusColumnName && !statusColumnName.startsWith("[")) {
                               for (var o in obj){
                                 if(o==statusColumnName){
                                   obj[o] = statusColumnValue;
                                 }
                               }
                               var table = this.$storage.get('crossTable');
                             this.$http({
                                 url: `${table}/update`,
                                 method: "post",
                                 data: obj
                               }).then(({ data }) => {});
                       } else {
                               crossuserid=this.$storage.get('userid');
                               crossrefid=obj['id'];
                               crossoptnum=this.$storage.get('statusColumnName');
                               crossoptnum=crossoptnum.replace(/\[/,"").replace(/\]/,"");
                        }
                }
        }
		this.$refs["ruleForm"].validate(valid => {
			if (valid) {
				if(crossrefid && crossuserid) {
					this.ruleForm.crossuserid = crossuserid;
					this.ruleForm.crossrefid = crossrefid;
					let params = { 
						page: 1, 
						limit: 10, 
						crossuserid:this.ruleForm.crossuserid,
						crossrefid:this.ruleForm.crossrefid,
					} 
				this.$http({ 
					url: "shicijianshang/page", 
					method: "get", 
					params: params 
				}).then(({ 
					data 
				}) => { 
					if (data && data.code === 0) { 
						if(data.data.total>=crossoptnum) {
							this.$message.error(this.$storage.get('tips'));
							return false;
						} else {
							this.$http({
								url: `shicijianshang/${!this.ruleForm.id ? "save" : "update"}`,
								method: "post",
								data: this.ruleForm
							}).then(({ data }) => {
								if (data && data.code === 0) {
									this.$message({
										message: "操作成功",
										type: "success",
										duration: 1500,
										onClose: () => {
											this.parent.showFlag = true;
											this.parent.addOrUpdateFlag = false;
											this.parent.shicijianshangCrossAddOrUpdateFlag = false;
											this.parent.search();
											this.parent.contentStyleChange();
										}
									});
								} else {
									this.$message.error(data.msg);
								}
							});

						}
					} else { 
				} 
			});
		} else {
			this.$http({
				url: `shicijianshang/${!this.ruleForm.id ? "save" : "update"}`,
				method: "post",
			   data: this.ruleForm
			}).then(({ data }) => {
				if (data && data.code === 0) {
					this.$message({
						message: "操作成功",
						type: "success",
						duration: 1500,
						onClose: () => {
							this.parent.showFlag = true;
							this.parent.addOrUpdateFlag = false;
							this.parent.shicijianshangCrossAddOrUpdateFlag = false;
							this.parent.search();
							this.parent.contentStyleChange();
						}
					});
				} else {
					this.$message.error(data.msg);
			   }
			});
		 }
         }
		});
    },
    // 获取uuid
    getUUID () {
      return new Date().getTime();
    },
    // 返回
    back() {
      this.parent.showFlag = true;
      this.parent.addOrUpdateFlag = false;
      this.parent.shicijianshangCrossAddOrUpdateFlag = false;
      this.parent.contentStyleChange();
    },
    shicitupianUploadChange(fileUrls) {
	    this.ruleForm.shicitupian = fileUrls;
    },
    langduyinpinUploadChange(fileUrls) {
	    this.ruleForm.langduyinpin = fileUrls;
    },
    langdushipinUploadChange(fileUrls) {
	    this.ruleForm.langdushipin = fileUrls;
    },
  }
};
</script>
<style lang="scss" scoped>
	.amap-wrapper {
		width: 100%;
		height: 500px;
	}
	
	.search-box {
		position: absolute;
	}
	
	.el-date-editor.el-input {
		width: auto;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__label {
	  	  padding: 0 10px 0 0;
	  	  color: #333;
	  	  font-weight: 500;
	  	  width: 180px;
	  	  font-size: 14px;
	  	  line-height: 40px;
	  	  text-align: right;
	  	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__content {
	  margin-left: 180px;
	}
	
	.add-update-preview .el-input /deep/ .el-input__inner {
	  	  border: 1px solid #000;
	  	  border-radius: 4px;
	  	  padding: 0 12px;
	  	  outline: none;
	  	  color: #000;
	  	  width: 400px;
	  	  font-size: 14px;
	  	  height: 40px;
	  	}
	.add-update-preview .el-input-number /deep/ .el-input__inner {
		text-align: left;
	  	  border: 1px solid #000;
	  	  border-radius: 4px;
	  	  padding: 0 12px;
	  	  outline: none;
	  	  color: #000;
	  	  width: 400px;
	  	  font-size: 14px;
	  	  height: 40px;
	  	}
	.add-update-preview .el-input-number /deep/ .el-input-number__decrease {
		display: none;
	}
	.add-update-preview .el-input-number /deep/ .el-input-number__increase {
		display: none;
	}
	
	.add-update-preview .el-select /deep/ .el-input__inner {
	  	  border: 1px solid #000;
	  	  border-radius: 4px;
	  	  padding: 0 10px;
	  	  outline: none;
	  	  color: #000;
	  	  width: 200px;
	  	  font-size: 14px;
	  	  height: 40px;
	  	}
	
	.add-update-preview .el-date-editor /deep/ .el-input__inner {
	  	  border: 1px solid #000;
	  	  border-radius: 4px;
	  	  padding: 0 10px 0 30px;
	  	  outline: none;
	  	  color: #000;
	  	  width: 200px;
	  	  font-size: 14px;
	  	  height: 40px;
	  	}
	
	.add-update-preview /deep/ .el-upload--picture-card {
		background: transparent;
		border: 0;
		border-radius: 0;
		width: auto;
		height: auto;
		line-height: initial;
		vertical-align: middle;
	}
	
	.add-update-preview /deep/ .upload .upload-img {
	  	  border: 1px solid #000;
	  	  cursor: pointer;
	  	  border-radius: 6px;
	  	  color: #888;
	  	  width: 100px;
	  	  font-size: 32px;
	  	  line-height: 80px;
	  	  text-align: center;
	  	  height: 80px;
	  	}
	
	.add-update-preview /deep/ .el-upload-list .el-upload-list__item {
	  	  border: 1px solid #000;
	  	  cursor: pointer;
	  	  border-radius: 6px;
	  	  color: #888;
	  	  width: 100px;
	  	  font-size: 32px;
	  	  line-height: 80px;
	  	  text-align: center;
	  	  height: 80px;
	  	}
	
	.add-update-preview /deep/ .el-upload .el-icon-plus {
	  	  border: 1px solid #000;
	  	  cursor: pointer;
	  	  border-radius: 6px;
	  	  color: #888;
	  	  width: 100px;
	  	  font-size: 32px;
	  	  line-height: 80px;
	  	  text-align: center;
	  	  height: 80px;
	  	}
	
	.add-update-preview .el-textarea /deep/ .el-textarea__inner {
	  	  border: 1px solid #000;
	  	  border-radius: 4px;
	  	  padding: 12px;
	  	  color: #000;
	  	  width: 400px;
	  	  font-size: 14px;
	  	  height: 120px;
	  	}
	
	.add-update-preview .btn .btn1 {
				border: 0;
				cursor: pointer;
				border-radius: 4px;
				padding: 0 24px;
				margin: 4px;
				outline: none;
				color: #fff;
				background: #1DD9F8;
				width: auto;
				font-size: 14px;
				height: 40px;
			}
	
	.add-update-preview .btn .btn1:hover {
				opacity: 0.8;
			}
	
	.add-update-preview .btn .btn2 {
				border: 0;
				cursor: pointer;
				border-radius: 4px;
				padding: 0 24px;
				margin: 4px;
				outline: none;
				color: #fff;
				background: #1DD9F8;
				width: auto;
				font-size: 14px;
				height: 40px;
			}
	
	.add-update-preview .btn .btn2:hover {
				opacity: 0.8;
			}
	
	.add-update-preview .btn .btn3 {
				border: 0;
				cursor: pointer;
				border-radius: 4px;
				padding: 0 24px;
				margin: 4px;
				outline: none;
				color: #fff;
				background: #1DD9F8;
				width: auto;
				font-size: 14px;
				height: 40px;
			}
	
	.add-update-preview .btn .btn3:hover {
				opacity: 0.8;
			}
	
	.add-update-preview .btn .btn4 {
				border: 0;
				cursor: pointer;
				border-radius: 4px;
				padding: 0 24px;
				margin: 4px;
				outline: none;
				color: #fff;
				background: #1DD9F8;
				width: auto;
				font-size: 14px;
				height: 40px;
			}
	
	.add-update-preview .btn .btn4:hover {
				opacity: 0.8;
			}
	
	.add-update-preview .btn .btn5 {
				border: 0;
				cursor: pointer;
				border-radius: 4px;
				padding: 0 24px;
				margin: 4px;
				outline: none;
				color: #fff;
				background: #1DD9F8;
				width: auto;
				font-size: 14px;
				height: 40px;
			}
	
	.add-update-preview .btn .btn5:hover {
				opacity: 0.8;
			}
</style>
