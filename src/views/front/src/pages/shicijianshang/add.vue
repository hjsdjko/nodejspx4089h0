<template>
<div :style='{"width":"100%","padding":"80px 10%","margin":"10px auto","position":"relative","background":"#F6F6F6"}'>
    <el-form
	  :style='{"width":"100%","padding":"40px 20%","position":"relative","background":"#fff"}'
      class="add-update-preview"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="180px"
    >
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="诗词主题" prop="shicizhuti">
            <el-input v-model="ruleForm.shicizhuti" 
                placeholder="诗词主题" clearable :disabled=" false  ||ro.shicizhuti"></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="诗词名称" prop="shicimingcheng">
            <el-input v-model="ruleForm.shicimingcheng" 
                placeholder="诗词名称" clearable :disabled=" false  ||ro.shicimingcheng"></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}'  label="诗词朝代" prop="shicichaodai">
            <el-select v-model="ruleForm.shicichaodai" placeholder="请选择诗词朝代" :disabled=" false  ||ro.shicichaodai" >
              <el-option
                  v-for="(item,index) in shicichaodaiOptions"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}'  label="诗词分类" prop="shicifenlei">
            <el-select v-model="ruleForm.shicifenlei" placeholder="请选择诗词分类" :disabled=" false  ||ro.shicifenlei" >
              <el-option
                  v-for="(item,index) in shicifenleiOptions"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="诗词图片" v-if="type!='cross' || (type=='cross' && !ro.shicitupian)" prop="shicitupian">
            <file-upload
            tip="点击上传诗词图片"
            action="file/upload"
            :limit="3"
            :multiple="true"
            :fileUrls="ruleForm.shicitupian?ruleForm.shicitupian:''"
            @change="shicitupianUploadChange"
            ></file-upload>
          </el-form-item>
            <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' class="upload" v-else label="诗词图片" prop="shicitupian">
                <img v-if="ruleForm.shicitupian.substring(0,4)=='http'" class="upload-img" style="margin-right:20px;" v-bind:key="index" :src="ruleForm.shicitupian.split(',')[0]" width="100" height="100">
                <img v-else class="upload-img" style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm.shicitupian.split(',')" :src="baseUrl+item" width="100" height="100">
            </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="诗词作者" prop="shicizuozhe">
            <el-input v-model="ruleForm.shicizuozhe" 
                placeholder="诗词作者" clearable :disabled=" false  ||ro.shicizuozhe"></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="朗读音频" prop="langduyinpin">
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
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="朗读视频" v-if="type!='cross' || (type=='cross' && !ro.langdushipin)" prop="langdushipin">
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
		  <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' class="upload" v-else label="朗读视频" prop="langdushipin">
			<el-button v-if="ruleForm.langdushipin" @click="download(baseUrl + ruleForm.langdushipin)" type="success">预览</el-button>
			<el-button v-else disabled>暂无</el-button>
		  </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="历史背景" prop="lishibeijing">
            <el-input v-model="ruleForm.lishibeijing" 
                placeholder="历史背景" clearable :disabled=" false  ||ro.lishibeijing"></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="文化信息" prop="wenhuaxinxi">
            <el-input v-model="ruleForm.wenhuaxinxi" 
                placeholder="文化信息" clearable :disabled=" false  ||ro.wenhuaxinxi"></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="诗词解读" prop="shicijiedu">
            <el-input
              type="textarea"
              :rows="8"
              placeholder="诗词解读"
              v-model="ruleForm.shicijiedu">
            </el-input>
          </el-form-item>

      <el-form-item :style='{"padding":"0","margin":"0"}'>
        <el-button :style='{"border":"0","cursor":"pointer","padding":"0 40px","margin":"0 20px 0 0","outline":"none","color":"#000","borderRadius":"5px","background":"#5FE3EB","width":"auto","lineHeight":"40px","fontSize":"14px","height":"40px"}'  type="primary" @click="onSubmit">提交</el-button>
        <el-button :style='{"border":"0","cursor":"pointer","padding":"0 40px","margin":"0","outline":"none","color":"#fff","borderRadius":"5px","background":"#9E9E9E","width":"auto","lineHeight":"40px","fontSize":"14px","height":"40px"}' @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
</div>
</template>

<script>
  export default {
    data() {
	  let self = this
      return {
        id: '',
        baseUrl: '',
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
        type: '',
        userTableName: localStorage.getItem('UserTableName'),
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
          thumbsupnum: '',
          crazilynum: '',
          clicktime: '',
          clicknum: '',
          discussnum: '',
          storeupnum: '',
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
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          crazilynum: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          clicktime: [
          ],
          clicknum: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          discussnum: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          storeupnum: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
        },
		centerType: false,
      };
    },
    computed: {



    },
    components: {
    },
    created() {
		if(this.$route.query.centerType){
			this.centerType = true
		}
	  //this.bg();
      let type = this.$route.query.type ? this.$route.query.type : '';
      this.init(type);
      this.baseUrl = this.$config.baseUrl;
    },
    methods: {
      getMakeZero(s) {
          return s < 10 ? '0' + s : s;
      },
      // 下载
      download(file){
        window.open(`${file}`)
      },
      // 初始化
      init(type) {
        this.type = type;
        if(type=='cross'){
          var obj = JSON.parse(localStorage.getItem('crossObj'));
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
              this.ruleForm.shicitupian = obj[o].split(",")[0];
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
        }else if(type=='edit'){
			this.info()
		}
        // 获取用户信息
        this.$http.get(this.userTableName + '/session', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            var json = res.data.data;
          }
        });
        this.$http.get('option/shicichaodai/shicichaodai', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.shicichaodaiOptions = res.data.data;
          }
        });
        this.$http.get('option/shicifenlei/shicifenlei', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.shicifenleiOptions = res.data.data;
          }
        });

		if (localStorage.getItem('raffleType') && localStorage.getItem('raffleType') != null) {
			localStorage.removeItem('raffleType')
			setTimeout(() => {
				this.onSubmit()
			}, 300)
		}
      },

    // 多级联动参数
      // 多级联动参数
      info() {
        this.$http.get(`shicijianshang/detail/${this.$route.query.id}`, {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.ruleForm = res.data.data;
          }
        });
      },
      // 提交
      onSubmit() {
			//更新跨表属性
			var crossuserid;
			var crossrefid;
			var crossoptnum;
			this.$refs["ruleForm"].validate(valid => {
				if(valid) {
					if(this.type=='cross'){
						var statusColumnName = localStorage.getItem('statusColumnName');
						var statusColumnValue = localStorage.getItem('statusColumnValue');
						if(statusColumnName && statusColumnName!='') {
							var obj = JSON.parse(localStorage.getItem('crossObj'));
							if(!statusColumnName.startsWith("[")) {
								for (var o in obj){
									if(o==statusColumnName){
										obj[o] = statusColumnValue;
									}
								}
								var table = localStorage.getItem('crossTable');
								this.$http.post(table+'/update', obj).then(res => {});
							} else {
								crossuserid=Number(localStorage.getItem('frontUserid'));
								crossrefid=obj['id'];
								crossoptnum=localStorage.getItem('statusColumnName');
								crossoptnum=crossoptnum.replace(/\[/,"").replace(/\]/,"");
							}
						}
					}
					if(crossrefid && crossuserid) {
						this.ruleForm.crossuserid=crossuserid;
						this.ruleForm.crossrefid=crossrefid;
						var params = {
							page: 1,
							limit: 10,
							crossuserid:crossuserid,
							crossrefid:crossrefid,
						}
						this.$http.get('shicijianshang/list', {
							params: params
						}).then(res => {
							if(res.data.data.total>=crossoptnum) {
								this.$message({
									message: localStorage.getItem('tips'),
									type: 'error',
									duration: 1500,
								});
								return false;
							} else {
								// 跨表计算


								this.$http.post(`shicijianshang/${this.ruleForm.id?'update':this.centerType?'save':'add'}`, this.ruleForm).then(res => {
									if (res.data.code == 0) {
										this.$message({
											message: '操作成功',
											type: 'success',
											duration: 1500,
											onClose: () => {
												this.$router.go(-1);
											}
										});
									} else {
										this.$message({
											message: res.data.msg,
											type: 'error',
											duration: 1500
										});
									}
								});
							}
						});
					} else {


						this.$http.post(`shicijianshang/${this.ruleForm.id?'update':this.centerType?'save':'add'}`, this.ruleForm).then(res => {
							if (res.data.code == 0) {
								this.$message({
									message: '操作成功',
									type: 'success',
									duration: 1500,
									onClose: () => {
										this.$router.go(-1);
									}
								});
							} else {
								this.$message({
									message: res.data.msg,
									type: 'error',
									duration: 1500
								});
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
			this.$router.go(-1);
		},
      shicitupianUploadChange(fileUrls) {
          this.ruleForm.shicitupian = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");
      },
      langduyinpinUploadChange(fileUrls) {
          this.ruleForm.langduyinpin = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");
      },
      langdushipinUploadChange(fileUrls) {
          this.ruleForm.langdushipin = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");
      },
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.el-date-editor.el-input {
		width: auto;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__label {
	  padding: 0 10px 0 0;
	  color: #000;
	  white-space: nowrap;
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
	  border: 1px solid #E2E3E5;
	  border-radius: 0;
	  padding: 0 12px;
	  box-shadow: none;
	  outline: none;
	  color: #000;
	  width: 400px;
	  font-size: 14px;
	  height: 40px;
	}
	.add-update-preview .el-input-number /deep/ .el-input__inner {
		text-align: left;
	  border: 1px solid #E2E3E5;
	  border-radius: 0;
	  padding: 0 12px;
	  box-shadow: none;
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
	  border: 1px solid #E2E3E5;
	  border-radius: 0;
	  padding: 0 10px;
	  box-shadow: none;
	  outline: none;
	  color: #000;
	  width: 200px;
	  font-size: 14px;
	  height: 40px;
	}
	
	.add-update-preview .el-date-editor /deep/ .el-input__inner {
	  border: 1px solid #E2E3E5;
	  border-radius: 0;
	  padding: 0 10px 0 30px;
	  box-shadow: none;
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
	  border: 1px solid #E2E3E5;
	  cursor: pointer;
	  border-radius: 6px;
	  color: #000;
	  width: 200px;
	  font-size: 32px;
	  line-height: 60px;
	  text-align: center;
	  height: 60px;
	}
	
	.add-update-preview /deep/ .el-upload-list .el-upload-list__item {
	  border: 1px solid #E2E3E5;
	  cursor: pointer;
	  border-radius: 6px;
	  color: #000;
	  width: 200px;
	  font-size: 32px;
	  line-height: 60px;
	  text-align: center;
	  height: 60px;
	}
	
	.add-update-preview /deep/ .el-upload .el-icon-plus {
	  border: 1px solid #E2E3E5;
	  cursor: pointer;
	  border-radius: 6px;
	  color: #000;
	  width: 200px;
	  font-size: 32px;
	  line-height: 60px;
	  text-align: center;
	  height: 60px;
	}
	
	.add-update-preview .el-textarea /deep/ .el-textarea__inner {
	  border: 1px solidd #E2E3E5;
	  border-radius: 0;
	  padding: 12px;
	  box-shadow: none;
	  outline: none;
	  color: #000;
	  width: 400px;
	  font-size: 14px;
	  height: 120px;
	}
</style>
