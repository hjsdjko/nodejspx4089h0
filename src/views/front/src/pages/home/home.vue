<template>
<div class="home-preview" :style='{"padding":"0 10%","margin":"64px auto 0","alignItems":"flex-start","flexWrap":"wrap","background":"#F6F6F6","display":"flex","width":"100%"}'>

	<!-- 搜索 -->
	<div id="search" class="search animate__animated" :style='{"padding":"0","margin":"0","alignItems":"center","display":"flex","top":"300px","borderRadius":"10px","flexWrap":"wrap","left":"25%","background":"rgba(255,255,255,.9)","width":"50%","position":"absolute","height":"auto","zIndex":"11"}'>
		<div :style='{"margin":"0"}' class="select">
			<el-select v-model="queryIndex">
				<el-option
				  v-for="(item,index) in queryList"
				  :key="index"
				  :label="item.queryName"
				  :value="index"
				></el-option>
			</el-select>
		</div>
		<div :style='{"margin":"0","flex":"1"}' class="input" v-if="queryIndex==0">
			<el-input v-model="shicijianshangshicizhuti" placeholder="诗词主题"></el-input>
		</div>
		<div :style='{"padding":"0","margin":"0"}' class="btn" v-if="queryIndex==0">
			<el-button :style='{"border":"0","cursor":"pointer","padding":"0 10px","margin":"0","outline":"none","color":"rgba(255, 255, 255, 1)","borderRadius":"10px","background":"linear-gradient(267deg, #5EE4EC 0%, #FFDFA6 100%)","width":"100px","lineHeight":"90px","fontSize":"0","height":"90px"}' type="primary" @click="search('shicijianshang')">
				<span class="icon iconfont icon-fangdajing07" :style='{"color":"#000","margin":"0 4px 0 0","fontSize":"32px"}'></span>
				搜索
			</el-button>
		</div>
	</div>
	<!-- 搜索 -->


		<!-- 关于我们 -->
		<div id="about" class="animate__animated" :style='{"padding":"0 10px","boxShadow":"none","margin":"0 0 0 20px","flexWrap":"wrap","background":"none","display":"flex","width":"30%","position":"relative","height":"auto","order":"2"}'>
		  <div :style='{"margin":"10px 0 0","color":"#000","textAlign":"left","width":"50%","lineHeight":"55px","fontSize":"24px","fontWeight":"bold","order":"1","height":"55px"}'>{{aboutUsDetail.title}}</div>
		  <div :style='{"margin":"10px 0 0","color":"#9E9E9E","textAlign":"right","width":"50%","lineHeight":"55px","fontSize":"24px","order":"2","height":"55px"}'>{{aboutUsDetail.subtitle}}</div>
		  <div :style='{"width":"100%","padding":"0","flexWrap":"wrap","display":"flex","height":"auto","order":"4"}'>
		    <img :style='{"margin":"0","objectFit":"cover","borderRadius":"10px","flex":1,"display":"block","width":"100%","height":"140px"}' :src="baseUrl + aboutUsDetail.picture1">
		    <img :style='{"margin":"0 10px","objectFit":"cover","flex":1,"display":"none","height":"120px"}' :src="baseUrl + aboutUsDetail.picture2">
		    <img :style='{"margin":"0 10px","objectFit":"cover","flex":1,"display":"none","height":"120px"}' :src="baseUrl + aboutUsDetail.picture3">
		  </div>
		  <div :style='{"padding":"0","margin":"0 0 10px","overflow":"hidden","color":"#000","display":"-webkit-box","width":"100%","lineHeight":"1.5","fontSize":"14px","textOverflow":"ellipsis","-webkit-box-orient":"vertical","-webkit-line-clamp":"5","order":"3"}' v-html="aboutUsDetail.content"></div>
		  <div :style='{"width":"calc(100% - 20px)","position":"absolute","top":"60px","background":"linear-gradient(90deg, #5FE3EB 0%, #FFDFA6 100%)","display":"block","height":"5px"}' />
		  <div :style='{"width":"285px","background":"url(http://codegen.caihongy.cn/20201114/7856ba26477849ea828f481fa2773a95.jpg) 0% 0% / cover no-repeat","display":"none","height":"100px"}' />
		  <div :style='{"width":"285px","background":"url(http://codegen.caihongy.cn/20201114/7856ba26477849ea828f481fa2773a95.jpg) 0% 0% / cover no-repeat","display":"none","height":"100px"}' />
		  <div :style='{"width":"285px","background":"url(http://codegen.caihongy.cn/20201114/7856ba26477849ea828f481fa2773a95.jpg) 0% 0% / cover no-repeat","display":"none","height":"100px"}' />
		  <div :style='{"border":"0","margin":"10px auto","textAlign":"center","background":"#409EFF","display":"none","width":"80px","lineHeight":"32px"}' @click="toDetail('aboutusDetail',aboutUsDetail)">
		    <span :style='{"color":"#f5f5f5","fontSize":"12px"}'>更多</span>
		    <span class="icon iconfont icon-gengduo1" :style='{"color":"#f5f5f5","fontSize":"12px"}'></span>
		  </div>
		</div>
		<!-- 关于我们 -->

		<!-- 系统简介 -->
		<div id="system" class="animate__animated" :style='{"padding":"0","boxShadow":"none","margin":"0 0 10px","flexWrap":"wrap","background":"none","display":"flex","width":"30%","position":"relative","height":"auto","order":"3"}'>
		  <div :style='{"margin":"5px","color":"#000","borderRadius":"5px","textAlign":"center","background":"#fff","width":"calc(100% - 10px)","lineHeight":"45px","fontSize":"22px","fontWeight":"bold","zIndex":"1","height":"45px"}'>{{systemIntroductionDetail.title}}</div>
		  <div :style='{"margin":"0 0 10px","color":"#999","textAlign":"center","display":"none","width":"100%","lineHeight":"1.5","fontSize":"20px"}'>{{systemIntroductionDetail.subtitle}}</div>
		  <div :style='{"width":"100%","padding":"0 10px","flexWrap":"wrap","display":"none","height":"auto"}'>
		    <img :style='{"margin":"0 10px","objectFit":"cover","flex":1,"display":"block","height":"120px"}' :src="baseUrl + systemIntroductionDetail.picture1">
		    <img :style='{"margin":"0 10px","objectFit":"cover","flex":1,"display":"block","height":"120px"}' :src="baseUrl + systemIntroductionDetail.picture2">
		    <img :style='{"margin":"0 10px","objectFit":"cover","flex":1,"display":"block","height":"120px"}' :src="baseUrl + systemIntroductionDetail.picture3">
		  </div>
		  <div :style='{"padding":"0","margin":"10px 0","overflow":"hidden","color":"#000","display":"-webkit-box","width":"100%","lineHeight":"2","fontSize":"15px","textOverflow":"ellipsis","-webkit-box-orient":"vertical","-webkit-line-clamp":"7"}' v-html="systemIntroductionDetail.content"></div>
		  <div :style='{"borderRadius":"10px","top":"0","background":"linear-gradient(90deg, #5FE3EB 0%, #FFDFA6 100%)","display":"block","width":"100%","position":"absolute","right":"0","height":"55px"}' />
		  <div :style='{"width":"285px","background":"url(http://codegen.caihongy.cn/20201114/7856ba26477849ea828f481fa2773a95.jpg) 0% 0% / cover no-repeat","display":"none","height":"100px"}' />
		  <div :style='{"width":"285px","background":"url(http://codegen.caihongy.cn/20201114/7856ba26477849ea828f481fa2773a95.jpg) 0% 0% / cover no-repeat","display":"none","height":"100px"}' />
		  <div :style='{"width":"285px","background":"url(http://codegen.caihongy.cn/20201114/7856ba26477849ea828f481fa2773a95.jpg) 0% 0% / cover no-repeat","display":"none","height":"100px"}' />
		  <div :style='{"border":"0","margin":"10px auto","textAlign":"center","background":"#409EFF","display":"none","width":"80px","lineHeight":"32px"}' @click="toDetail('systemintroDetail',systemIntroductionDetail)">
		    <span :style='{"color":"#f5f5f5","fontSize":"12px"}'>更多</span>
		    <span class="icon iconfont icon-gengduo1" :style='{"color":"#f5f5f5","fontSize":"12px"}'></span>
		  </div>
		</div>
		<!-- 系统简介 -->
		
	<!-- 新闻资讯 -->
	<div id="animate_newsnews" class="news animate__animated" :style='{"width":"calc(70% - 20px)","margin":"0 0 10px","position":"relative","background":"none","order":"1"}'>
		<div v-if="false" class="idea newsIdea" :style='{"padding":"20px","flexWrap":"wrap","background":"#efefef","justifyContent":"space-between","display":"flex"}'>
			<div class="box1" :style='{"width":"20%","background":"#fff","height":"80px"}'></div>
			<div class="box2" :style='{"width":"20%","background":"#fff","height":"80px"}'></div>
			<div class="box3" :style='{"width":"20%","background":"#fff","height":"80px"}'></div>
			<div class="box4" :style='{"width":"20%","background":"#fff","height":"80px"}'></div>
			<div class="box5" :style='{"width":"20%","background":"#fff","display":"none","height":"80px"}'></div>
			<div class="box6" :style='{"width":"20%","background":"#fff","display":"none","height":"80px"}'></div>
			<div class="box7" :style='{"width":"20%","background":"#fff","display":"none","height":"80px"}'></div>
			<div class="box8" :style='{"width":"20%","background":"#fff","display":"none","height":"80px"}'></div>
			<div class="box9" :style='{"width":"20%","background":"#fff","display":"none","height":"80px"}'></div>
			<div class="box10" :style='{"width":"20%","background":"#fff","display":"none","height":"80px"}'></div>
		</div>
		
		<div class="title" :style='{"width":"100%","margin":"10px auto","lineHeight":"55px","textAlign":"left","background":"linear-gradient(90deg, #5FE3EB 0%, #FFDFA6 100%)","height":"55px"}'>
			<span :style='{"color":"#000","background":"#F6F6F6","display":"inline-block","width":"100%","fontSize":"24px","fontWeight":"bold","height":"50px"}'>通知公告</span>
		</div>
		
			
			
			
			
			
			
			<!-- 样式六 -->
		<div v-if="newsList.length" class="list list6 index-pv1" :style='{"width":"100%","padding":"10px 0","background":"#f5f5f5","display":"flex","height":"auto"}'>
			<div id="new-list-6news" class="swiper-container swiper-new-list-6" :style='{"width":"65%","padding":"0","margin":"0","background":"none","height":"auto"}'>
				<div class="swiper-wrapper">
					<div :style='{"border":"0","padding":"5px 5px 0","fontSize":"0","position":"relative","borderRadius":"10px","background":"#fff"}' class="swiper-slide animation-box" v-for="(item,index) in newsList" v-if="index<5" :key="index" @click="toDetail('newsDetail', item)">
						<img :style='{"border":"0","width":"100%","objectFit":"cover","borderRadius":"10px","height":"120px"}' :src="baseUrl + item.picture">
						<div :style='{"padding":"0 5px","whiteSpace":"nowrap","overflow":"hidden","color":"#000","background":"none","width":"100%","fontSize":"15px","lineHeight":"32px","textOverflow":"ellipsis","fontWeight":"bold"}'>{{ item.title }}</div>
						<div :style='{"width":"100%","padding":"0 5px","whiteSpace":"nowrap","overflow":"hidden","textOverflow":"ellipsis"}'>
						  <span class="icon iconfont icon-shijian21" :style='{"margin":"0 4px 0 0","lineHeight":"1.5","fontSize":"11px","color":"#000"}'></span>
						  <span class="text" :style='{"color":"#000","lineHeight":"1.5","fontSize":"11px"}'>{{item.addtime}}</span>
						</div>
						<div :style='{"padding":"0 5px"}'>
						  <span class="icon iconfont icon-geren16" :style='{"margin":"0 4px 0 0","lineHeight":"1.5","fontSize":"11px","color":"#000"}'></span>
						  <span class="text" :style='{"color":"#000","lineHeight":"1.5","fontSize":"11px"}'>{{item.name}}</span>
						</div>
						<div :style='{"padding":"0 5px"}'>
						  <span class="icon iconfont icon-zan10" :style='{"margin":"0 4px 0 0","lineHeight":"1.5","fontSize":"11px","color":"#000"}'></span>
						  <span class="text" :style='{"color":"#000","lineHeight":"1.5","fontSize":"11px"}'>{{item.thumbsupnum}}</span>
						</div>
						<div :style='{"padding":"0 5px"}'>
						  <span class="icon iconfont icon-shoucang10" :style='{"margin":"0 2px 0 0","lineHeight":"1.5","fontSize":"11px","color":"#000"}'></span>
						  <span class="text" :style='{"color":"#000","lineHeight":"1.5","fontSize":"11px"}'>{{item.storeupnum}}</span>
						</div>
						<div :style='{"padding":"0 5px"}'>
						  <span class="icon iconfont icon-chakan9" :style='{"margin":"0 2px 0 0","lineHeight":"1.5","fontSize":"11px","color":"#000"}'></span>
						  <span class="text" :style='{"color":"#000","lineHeight":"1.5","fontSize":"11px"}'>{{item.clicknum}}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="new6-list" :style='{"padding":"0","margin":"0 0 0 10px","overflow":"hidden","borderRadius":"10px","background":"#fff","width":"calc(35% - 10px)","height":"auto"}'>
				<div :style='{"padding":"0 8px","color":"#000","borderRadius":"10px","textAlign":"center","background":"linear-gradient(90deg, #5EE4EC 0%, #FFDFA6 100%)","display":"inline-block","width":"100%","lineHeight":"50px","fontSize":"16px","fontWeight":"bold"}'>最新动态</div>
				<div v-for="(item,index) in newsList" v-if="index<5" :key="index" @click="toDetail('newsDetail', item)" class="new6-list-item" :style='{"padding":"0 10px","alignItems":"center","background":"#fff","display":"flex","width":"100%","justifyContent":"space-around","height":"auto"}'>
					<div class="new6-list-item-title line1" :style='{"lineHeight":"38px","fontSize":"14px","overflow":"hidden","whiteSpace":"nowrap","textOverflow":"ellipsis","color":"#333"}'>{{ item.title }}</div>
					<div :style='{"padding":"0 10px","whiteSpace":"nowrap","overflow":"hidden","textOverflow":"ellipsis"}'>
					  <span class="icon iconfont icon-shijian21" :style='{"margin":"0 2px 0 0","lineHeight":"1.5","fontSize":"11px","color":"#000"}'></span>
					  <span class="text" :style='{"color":"#000","lineHeight":"1.5","fontSize":"11px"}'>{{item.addtime}}</span>
					</div>
					<div :style='{"padding":"0 10px","whiteSpace":"nowrap","overflow":"hidden","textOverflow":"ellipsis","display":"none"}'>
					  <span class="icon iconfont icon-geren16" :style='{"margin":"0 2px 0 0","lineHeight":"1.5","fontSize":"11px","color":"#000"}'></span>
					  <span class="text" :style='{"color":"#000","lineHeight":"1.5","fontSize":"11px"}'>{{item.name}}</span>
					</div>
					<div :style='{"padding":"0 10px","whiteSpace":"nowrap","overflow":"hidden","textOverflow":"ellipsis"}'>
					  <span class="icon iconfont icon-zan10" :style='{"margin":"0 2px 0 0","lineHeight":"1.5","fontSize":"11px","color":"#000"}'></span>
					  <span class="text" :style='{"color":"#000","lineHeight":"1.5","fontSize":"11px"}'>{{item.thumbsupnum}}</span>
					</div>
					<div :style='{"padding":"0 10px","whiteSpace":"nowrap","overflow":"hidden","textOverflow":"ellipsis"}'>
					  <span class="icon iconfont icon-shoucang10" :style='{"margin":"0 2px 0 0","lineHeight":"1.5","fontSize":"11px","color":"#000"}'></span>
					  <span class="text" :style='{"color":"#000","lineHeight":"1.5","fontSize":"11px"}'>{{item.storeupnum}}</span>
					</div>
					<div :style='{"padding":"0 10px","whiteSpace":"nowrap","overflow":"hidden","textOverflow":"ellipsis"}'>
					  <span class="icon iconfont icon-chakan9" :style='{"margin":"0 2px 0 0","lineHeight":"1.5","fontSize":"11px","color":"#000"}'></span>
					  <span class="text" :style='{"color":"#000","lineHeight":"1.5","fontSize":"11px"}'>{{item.clicknum}}</span>
					</div>
				</div>
			</div>
		</div>
			
			
			
			
		











		<div @click="moreBtn('news')" :style='{"border":"0","padding":"0 10px","margin":"10px auto","top":"10px","borderRadius":"30px","textAlign":"center","background":"linear-gradient(90deg, #5FE3EB 0%, #FFDFA6 100%)","display":"block","width":"auto","lineHeight":"30px","position":"absolute","right":"0"}'>
			<span :style='{"color":"#000","fontSize":"12px","fontWeight":"bold"}'>查看更多</span>
			<i :style='{"color":"#fff","borderRadius":"50%","background":"#000","display":"inline-block","width":"16px","fontSize":"10px","lineHeight":"16px"}' class="icon iconfont icon-jiantou18"></i>
		</div>
		
		</div>
	<!-- 新闻资讯 -->


<!-- 商品推荐 -->
<div id="animate_recommendshicijianshang" class="recommend animate__animated" :style='{"width":"100%","margin":"0 0 10px","position":"relative","background":"none","order":"5"}'>
	<div v-if="false" class="idea recommendIdea" :style='{"padding":"20px","flexWrap":"wrap","background":"#efefef","justifyContent":"space-between","display":"flex"}'>
		<div class="box1" :style='{"width":"20%","background":"#fff","height":"80px"}'></div>
		<div class="box2" :style='{"width":"20%","background":"#fff","height":"80px"}'></div>
		<div class="box3" :style='{"width":"20%","background":"#fff","height":"80px"}'></div>
		<div class="box4" :style='{"width":"20%","background":"#fff","height":"80px"}'></div>
		<div class="box5" :style='{"width":"20%","background":"#fff","display":"none","height":"80px"}'></div>
		<div class="box6" :style='{"width":"20%","background":"#fff","display":"none","height":"80px"}'></div>
		<div class="box7" :style='{"width":"20%","background":"#fff","display":"none","height":"80px"}'></div>
		<div class="box8" :style='{"width":"20%","background":"#fff","display":"none","height":"80px"}'></div>
		<div class="box9" :style='{"width":"20%","background":"#fff","display":"none","height":"80px"}'></div>
		<div class="box10" :style='{"width":"20%","background":"#fff","display":"none","height":"80px"}'></div>
	</div>
	
    <div class="title" :style='{"margin":"10px auto","borderColor":"#5FE3EB","textAlign":"left","background":"none","borderWidth":"0 0 5px","width":"calc(100% - 20px)","lineHeight":"54px","borderStyle":"solid","height":"54px"}'>
		<span :style='{"padding":"0 20px","margin":"0 0 0 -10px","color":"#fff","borderRadius":"10px 10px 0 10px","background":"#5FE3EB","display":"inline-block","fontSize":"18px"}'>诗词鉴赏推荐</span>
	</div>
	
	
	
	
	
	
	
	
	
	







		<div v-if="shicijianshangRecommend.length" class="list list16 index-pv1" :style='{"padding":"0 0","flexWrap":"wrap","background":"none","display":"flex","width":"100%","justifyContent":"space-between","height":"auto"}'>
		  <div v-for="item,index in shicijianshangRecommend" :key="index"  @click="toDetail('shicijianshangDetail', item)" class="list-item animation-box">
		    <div :style='{"border":"1px solid #5FE3EB","width":"300px","padding":"10px","overflow":"hidden","borderRadius":"10px","height":"220px"}' class="img-box">
				<img class="image" :style='{"width":"100%","objectFit":"cover","borderRadius":"10px","display":"block","height":"100%"}' v-if="preHttp(item.shicitupian)" :src="item.shicitupian.split(',')[0]" alt="" />
				<img class="image" :style='{"width":"100%","objectFit":"cover","borderRadius":"10px","display":"block","height":"100%"}' v-else :src="baseUrl + (item.shicitupian?item.shicitupian.split(',')[0]:'')" alt="" />
			</div>
		    <div :style='{"padding":"0 10px","overflow":"hidden","flex":"1","display":"flex","height":"auto"}' class="item-info">
		      <div :style='{"width":"110px","padding":"0 10px 0 0","flex":"1"}'>
				<div class="title">{{item.shicimingcheng}}</div>
		        <div :style='{"padding":"0 10px","borderColor":"#5FE3EB","borderStyle":"solid","borderWidth":"0 0 1px 0"}' class="time">
		          <span class="icon iconfont icon-shijian21"></span>
		          <span class="text">{{item.addtime}}</span>
		        </div>
		        <div :style='{"padding":"0 10px","borderColor":"#5FE3EB","borderStyle":"solid","borderWidth":"0 0 1px 0"}' class="like">
		          <span class="icon iconfont icon-zan10"></span>
		          <span class="text">{{item.thumbsupnum}}</span>
		        </div>
		        <div :style='{"padding":"0 10px","borderColor":"#5FE3EB","borderStyle":"solid","borderWidth":"0 0 1px 0"}' class="collect">
		          <span class="icon iconfont icon-shoucang10"></span>
		          <span class="text">{{item.storeupnum}}</span>
		        </div>
		        <div :style='{"padding":"0 10px","borderColor":"#5FE3EB","borderStyle":"solid","borderWidth":"0 0 1px"}' class="view">
		          <span class="icon iconfont icon-chakan9"></span>
		          <span class="text">{{item.clicknum}}</span>
		        </div>
		      </div>
		      <div class="desc" v-html="item.shicijiedu"></div>
		    </div>
		  </div>
		</div>
	
	<div @click="moreBtn('shicijianshang')" :style='{"border":"0","padding":"0 15px","margin":"10px auto","alignItems":"center","textAlign":"center","display":"flex","right":"0","top":"10px","borderRadius":"10px","background":"linear-gradient(90deg, #5FE3EB 0%, #FFDFA6 100%)","width":"auto","lineHeight":"32px","position":"absolute","height":"32px"}'>
		<span :style='{"color":"#000","fontSize":"12px"}'>更多</span>
		<i :style='{"margin":"0 0 0 4px","color":"#ffff","borderRadius":"50%","background":"#000","width":"16px","fontSize":"10px","lineHeight":"16px","height":"16px"}' class="icon iconfont icon-gengduo1"></i>
	</div>
	
</div>
<!-- 商品推荐 -->


<!-- 特价商品 -->
<div id="animate_listshicihuodong" class="lists animate__animated" :style='{"width":"calc(70% - 10px)","margin":"0 0 10px 10px","position":"relative","background":"none","flex":"auto","order":"4"}'>
	<div v-if="false" class="idea" :style='{"padding":"20px","flexWrap":"wrap","background":"#efefef","justifyContent":"space-between","display":"flex"}'>
		<div class="box1" :style='{"width":"20%","background":"#fff","height":"80px"}'></div>
		<div class="box2" :style='{"width":"20%","background":"#fff","height":"80px"}'></div>
		<div class="box3" :style='{"width":"20%","background":"#fff","height":"80px"}'></div>
		<div class="box4" :style='{"width":"20%","background":"#fff","height":"80px"}'></div>
		<div class="box5" :style='{"width":"20%","background":"#fff","display":"none","height":"80px"}'></div>
		<div class="box6" :style='{"width":"20%","background":"#fff","display":"none","height":"80px"}'></div>
		<div class="box7" :style='{"width":"20%","background":"#fff","display":"none","height":"80px"}'></div>
		<div class="box8" :style='{"width":"20%","background":"#fff","display":"none","height":"80px"}'></div>
		<div class="box9" :style='{"width":"20%","background":"#fff","display":"none","height":"80px"}'></div>
		<div class="box10" :style='{"width":"20%","background":"#fff","display":"none","height":"80px"}'></div>
	</div>
	
	<div class="title" :style='{"padding":"5px","margin":"0 auto","borderRadius":"10px","textAlign":"left","background":"linear-gradient(90deg, #5FE3EB 0%, #FFDFA6 100%)","width":"100%","lineHeight":"45px","height":"55px"}'>
	  <span :style='{"padding":"0 0 0 10px","color":"#000","borderRadius":"5px","background":"#fff","display":"inline-block","width":"100%","fontSize":"22px","fontWeight":"bold"}'>诗词活动展示</span>
	</div>
	
	
	
	
	
	
	
	
	
	



	<div v-if="shicihuodongList.length" class="list list12 index-pv1 list12shicihuodong" :style='{"width":"100%","padding":"10px","background":"none","height":"auto"}'>
	  <div class="list" :style='{"padding":"0 0 10px","overflow":"hidden","flexWrap":"wrap","flex":"1","background":"none","display":"flex","justifyContent":"space-between","height":"auto"}'>
	    <div :style='{"width":"15%","padding":"20px 10px","position":"relative","borderRadius":"0 30px 0 30px","background":"#fff","height":"auto"}' class="item list-item animation-box" v-for="item,index in shicihuodongList" :key="index" @click="toDetail('shicihuodongDetail', item)">
			<img :name="item.id" :style='{"width":"100%","objectFit":"cover","borderRadius":"10px","display":"block","height":"100px"}' v-if="preHttp(item.huodongtupian)" :src="item.huodongtupian.split(',')[0]" alt="" />
			<img :name="item.id" :style='{"width":"100%","objectFit":"cover","borderRadius":"10px","display":"block","height":"100px"}' v-else :src="baseUrl + (item.huodongtupian?item.huodongtupian.split(',')[0]:'')" alt="" />
			<div class="line1" :style='{"padding":"0 10px","lineHeight":"32px","fontSize":"16px","color":"#000"}'>{{item.huodongmingcheng}}</div>
	    </div>
	  </div>
	</div>



	
	
	<div @click="moreBtn('shicihuodong')" :style='{"border":"0","padding":"0 15px","margin":"0 auto","alignItems":"center","textAlign":"center","display":"flex","right":"20px","top":"10px","borderRadius":"30px","background":"linear-gradient(90deg, #5FE3EB 0%, #FFDFA6 100%)","width":"auto","lineHeight":"35px","position":"absolute","height":"35px"}'>
		<span :style='{"color":"#000","fontSize":"12px","lineHeight":"1"}'>查看更多</span>
		<i :style='{"margin":"0 0 0 5px","color":"#fff","borderRadius":"50%","background":"#000","display":"inline-block","width":"16px","fontSize":"10px","lineHeight":"16px","height":"16px"}' class="icon iconfont icon-gengduo1"></i>
	</div>
	

</div>
<!-- 特价商品 -->
	
</div>
</template>

<script>
import 'animate.css'
import Swiper from "swiper";

  export default {
    //数据集合
    data() {
      return {
        baseUrl: '',
        aboutUsDetail: {},
        systemIntroductionDetail: {},
        queryList:[
          {
              queryName:"诗词主题",
          },
        ],
        queryIndex: 0,
        shicijianshangshicizhuti: '',
        newsList: [],
        shicijianshangRecommend: [],

        shicihuodongList: [],




      }
    },
    created() {
		this.baseUrl = this.$config.baseUrl;
		this.getNewsList();
		this.getAboutUs();
		this.getSystemIntroduction();
		this.getList();
    },
	mounted() {
		window.addEventListener('scroll', this.handleScroll)
		setTimeout(()=>{
			this.handleScroll()
		},100)
		
		this.swiperChanges()
	},
	beforeDestroy() {
	  window.removeEventListener('scroll', this.handleScroll)
	},
    //方法集合
    methods: {
		swiperChanges() {
			setTimeout(()=>{
			},750)
		},

		listIndexClick12(index, name) {
			this['listIndex12' + name] = index
			this.getList()
			
			document.querySelectorAll('.lists .list12' + name + ' .list .item').forEach(el => {
			  el.classList.remove("active")
			})
			setTimeout(() => {
			  document.querySelectorAll('.lists .list12' + name + ' .list .item').forEach(el => {
			    el.classList.add("active")
			  })
			}, 1);
		},

		handleScroll() {
			let arr = [
				{id:'search',css:'animate__rubberBand'},
				{id:'about',css:'animate__backInRight'},
				{id:'system',css:'animate__bounceIn'},
				{id:'animate_recommendshicijianshang',css:'animate__flash'},
				{id:'animate_listshicihuodong',css:'animate__bounceInDown'},
				{id:'animate_newsnews',css:'animate__backInLeft'},
				{id:'msgs',css:'animate__rotateIn'},
				{id:'friendly',css:'animate__rotateInDownLeft'}
			]
			
			for (let i in arr) {
				let doc = document.getElementById(arr[i].id)
				if (doc) {
					let top = doc.offsetTop
					let win_top = window.innerHeight + window.pageYOffset
					// console.log(top,win_top)
					if (win_top > top && doc.classList.value.indexOf(arr[i].css) < 0) {
						// console.log(doc)
						doc.classList.add(arr[i].css)
					}
				}
			}
		},
      preHttp(str) {
          return str && str.substr(0,4)=='http';
      },
      getAboutUs() {
          this.$http.get('aboutus/detail/1', {}).then(res => {
            if(res.data.code == 0) {
              this.aboutUsDetail = res.data.data;
            }
          })
      },
      getSystemIntroduction() {
          this.$http.get('systemintro/detail/1', {}).then(res => {
            if(res.data.code == 0) {
              this.systemIntroductionDetail = res.data.data;
            }
          })
      },
      search(tablename) {
        if (this.queryIndex == 0 && this.shicijianshangshicizhuti) {
          this.$router.push({path: '/index/' + tablename, query: {indexQueryCondition: this.shicijianshangshicizhuti}});
        }
      },
		getNewsList() {
			let data = {
				page: 1,
				limit: 6,
                sort: 'addtime',
				order: 'desc'
			}
			this.$http.get('news/list', {params: data}).then(res => {
				if (res.data.code == 0) {
					this.newsList = res.data.data.list;
					
					
					let options = {"observer":true,"navigation":{"nextEl":".swiper-button-next","prevEl":".swiper-button-prev"},"observeParents":true,"loop":true,"slidesPerView":5,"speed":500,"spaceBetween":10,"autoplay":{"delay":3000,"disableOnInteraction":false}}
					options.pagination = {el:'null'}
					if(options.slidesPerView) {
						options.slidesPerView = Number(options.slidesPerView);
					}
					if(options.spaceBetween) {
						options.spaceBetween = Number(options.spaceBetween);
					}
					
					this.$nextTick(() => {
						new Swiper('#new-list-6news', options)
					})
				}
			});
		},
		getList() {
			let autoSortUrl = "";
			let data = {}
          autoSortUrl = "shicijianshang/autoSort";
          if(localStorage.getItem('frontToken')) {
              autoSortUrl = "shicijianshang/autoSort2";
          }
			data = {
				page: 1,
				limit: 6,
			}
			this.$http.get(autoSortUrl, {params: data}).then(res => {
				if (res.data.code == 0) {
					this.shicijianshangRecommend = res.data.data.list;
					
					
					// 商品列表样式五
					
				}
			});
			
			data = {
				page: 1,
				limit: 6,
			}
			this.$http.get('shicihuodong/list', {params: data}).then(res => {
				if (res.data.code == 0) {
					this.shicihuodongList = res.data.data.list;
					
					// 商品列表样式五
					
				}
			});
		},
		toDetail(path, item) {
			this.$router.push({path: '/index/' + path, query: {id: item.id}});
		},
		moreBtn(path) {
			this.$router.push({path: '/index/' + path});
		}
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.home-preview {
		// -------- search --------
		.search .select /deep/ .el-input__inner {
			border: 1px solid #16292E;
			border-radius: 0;
			padding: 0 30px 0 10px;
			box-shadow: none;
			color: #000;
			background: none;
			width: 180px;
			font-size: 16px;
			border-width: 0 1px 0 0;
			height: 50px;
		}
		
		.search .input /deep/ .el-input__inner {
			border: 0;
			border-radius: 4px;
			padding: 0 20px;
			box-shadow: none;
			color: #000;
			background: none;
			width: 100%;
			font-size: 16px;
			height: 50px;
		}
		// -------- search --------
		.recommend {
			.list3 .swiper-button-prev {
				left: 10px;
				right: auto;
			}
			
			.list3 .swiper-button-prev::after {
				color: rgb(64, 158, 255);
			}
			
			.list3 .swiper-button-next {
				left: auto;
				right: 10px;
			}
			
			.list3 .swiper-button-next::after {
				color: rgb(64, 158, 255);
			}
			
			.list5 .swiper-button-prev {
				left: 10px;
				right: auto;
			}
			
			.list5 .swiper-button-prev::after {
				color: rgb(64, 158, 255);
        }
        
        .list5 .swiper-button-next {
				left: auto;
				right: 10px;
			}
			
			.list5 .swiper-button-next::after {
				color: rgb(64, 158, 255);
			}
			
			.list5 {
				.swiper-slide-prev {
					position: relative;
					z-index: 3;
				}
		
				.swiper-slide-next {
					position: relative;
					z-index: 3;
				}
		
				.swiper-slide-active {
					position: relative;
					z-index: 5;
				}
			}
			
			.index-pv1 .animation-box {
				transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
				z-index: initial;
			}
			
			.index-pv1 .animation-box:hover {
				transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
				-webkit-perspective: 1000px;
				perspective: 1000px;
				transition: 0.3s;
				z-index: 1;
			}
			
			.index-pv1 .animation-box img {
				transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
			}
			
			.index-pv1 .animation-box img:hover {
				transform: rotate(0deg) scale(1.1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
				-webkit-perspective: 1000px;
				perspective: 1000px;
				transition: 0.3s;
			}
		}
		
		.news {
			.list3 .swiper-button-prev {
				left: 10px;
				right: auto;
			}
			
			.list3 .swiper-button-prev::after {
				color: rgb(64, 158, 255);
			}
			
			.list3 .swiper-button-next {
				left: auto;
				right: 10px;
			}
			
			.list3 .swiper-button-next::after {
				color: rgb(64, 158, 255);
			}
			
			.list6 .swiper-button-prev {
				left: 10px;
				right: auto;
			}
			
			.list6 .swiper-button-prev::after {
				color: #5EE4EC;
			}
			
			.list6 .swiper-button-next {
				left: auto;
				right: 10px;
			}
			
			.list6 .swiper-button-next::after {
				color: #5EE4EC;
			}
			
			.index-pv1 .animation-box {
				transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
				z-index: initial;
			}
			
			.index-pv1 .animation-box:hover {
				transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 10px, 0px);
				-webkit-perspective: 1000px;
				perspective: 1000px;
				transition: 0.3s;
				z-index: 1;
			}
			
			.index-pv1 .animation-box img {
				transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
			}
			
			.index-pv1 .animation-box img:hover {
				transform: rotate(0deg) scale(1.1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
				-webkit-perspective: 1000px;
				perspective: 1000px;
				transition: 0.3s;
			}
		}
	
		.lists {
			.list3 .swiper-button-prev {
				left: 10px;
				right: auto;
			}
			
			.list3 .swiper-button-prev::after {
				color: rgb(64, 158, 255);
			}
			
			.list3 .swiper-button-next {
				left: auto;
				right: 10px;
        }
        
        .list3 .swiper-button-next::after {
				color: rgb(64, 158, 255);
			}
			
			.list5 .swiper-button-prev {
				left: 10px;
				right: auto;
			}
			
			.list5 .swiper-button-prev::after {
				color: rgb(64, 158, 255);
			}
			
			.list5 .swiper-button-next {
            left: auto;
            right: 10px;
			}
			
			.list5 .swiper-button-next::after {
				color: rgb(64, 158, 255);
			}
			
			.list5 {
				.swiper-slide-prev {
					position: relative;
					z-index: 3;
				}
		
				.swiper-slide-next {
					position: relative;
					z-index: 3;
				}
		
				.swiper-slide-active {
					position: relative;
					z-index: 5;
				}
			}
			
			.index-pv1 .animation-box {
				transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
				z-index: initial;
			}
			
			.index-pv1 .animation-box:hover {
				box-shadow: 0 4px 8px rgba(0,0,0,.3) !important;
				transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
				-webkit-perspective: 1000px;
				background: #EFFEFF !important;
				perspective: 1000px;
				transition: 0.3s;
				z-index: 1;
			}
			
			.index-pv1 .animation-box img {
				transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
			}
			
			.index-pv1 .animation-box img:hover {
				transform: rotate(0deg) scale(1.1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
				-webkit-perspective: 1000px;
				perspective: 1000px;
				transition: 0.3s;
			}
		}
	}
	








	.home-preview .recommend .list16 .list-item {
				border-radius: 10px;
				padding: 10px;
				margin: 0 0 20px;
				background: #fff;
				display: flex;
				width: 49%;
				font-size: 0;
				position: relative;
				height: auto;
			}
	
	.home-preview .recommend .list16 .list-item:hover {
				box-shadow: 0 4px 8px rgba(0,0,0,.3);
				background: #EFFEFF;
			}
	
	.home-preview .recommend .list16 .list-item .title {
				padding: 0 10px;
				color: #000;
				font-size: 14px;
				border-color: #5FE3EB;
				border-width: 0 0 1px 0;
				line-height: 36px;
				border-style: solid;
			}
	
	.home-preview .recommend .list16 .list-item:hover .title {
				color: #000;
			}
	
	.home-preview .recommend .list16 .list-item .time .icon {
				margin: 0 2px 0 0;
				color: #000;
				font-size: 12px;
				line-height: 28px;
			}
	.home-preview .recommend .list16 .list-item:hover .time .icon {
				color: #000;
			}
	.home-preview .recommend .list16 .list-item .time .text {
				color: #000;
				font-size: 12px;
				line-height: 28px;
			}
	.home-preview .recommend .list16 .list-item:hover .time .text {
				color: #000;
			}
	
	.home-preview .recommend .list16 .list-item .publisher .icon {
				margin: 0 2px 0 0;
				color: #000;
				font-size: 12px;
				line-height: 28px;
			}
	.home-preview .recommend .list16 .list-item:hover .publisher .icon {
				color: #000;
			}
	.home-preview .recommend .list16 .list-item .publisher .text {
				color: #000;
				font-size: 12px;
				line-height: 28px;
			}
	.home-preview .recommend .list16 .list-item:hover .publisher .text {
				color: #000;
			}
	
	.home-preview .recommend .list16 .list-item .like .icon {
				margin: 0 2px 0 0;
				color: #000;
				font-size: 12px;
				line-height: 28px;
			}
	.home-preview .recommend .list16 .list-item:hover .like .icon {
				color: #000;
			}
	.home-preview .recommend .list16 .list-item .like .text {
				color: #000;
				font-size: 12px;
				line-height: 28px;
			}
	.home-preview .recommend .list16 .list-item:hover .like .text {
				color: #000;
			}
	
	.home-preview .recommend .list16 .list-item .collect .icon {
				margin: 0 2px 0 0;
				color: #000;
				font-size: 12px;
				line-height: 28px;
			}
	.home-preview .recommend .list16 .list-item:hover .collect .icon {
				color: #000;
			}
	.home-preview .recommend .list16 .list-item .collect .text {
				color: #000;
				font-size: 12px;
				line-height: 28px;
			}
	.home-preview .recommend .list16 .list-item:hover .collect .text {
				color: #000;
			}
	
	.home-preview .recommend .list16 .list-item .view .icon {
				margin: 0 2px 0 0;
				color: #000;
				font-size: 12px;
				line-height: 28px;
			}
	.home-preview .recommend .list16 .list-item:hover .view .icon {
				color: #000;
			}
	.home-preview .recommend .list16 .list-item .view .text {
				color: #000;
				font-size: 12px;
				line-height: 28px;
			}
	.home-preview .recommend .list16 .list-item:hover .view .text {
				color: #000;
			}
	
	.home-preview .recommend .list16 .list-item .desc {
				padding: 0 10px;
				color: #9E9E9E;
				flex: 2;
				display: none;
				font-size: 12px;
				line-height: 1.5;
			}
	.home-preview .recommend .list16 .list-item:hover .desc {
				color: #9E9E9E;
			}


	.home-preview .lists .list12 .tab .item {
				cursor: pointer;
				border: 0;
				padding: 0 20px;
				margin: 0 10px;
				color: #000;
				display: flex;
				font-size: 16px;
				line-height: 44px;
				background: url(http://codegen.caihongy.cn/20240203/5d6df7c836c44555b9ca2c0030463466.png) center center/100% 100% no-repeat;
				width: calc(20% - 20px);
				justify-content: center;
				align-items: center;
				text-align: center;
			}
	
	.home-preview .lists .list12 .tab .item:hover {
				color: #5FE3EB;
			}
	
	.home-preview .lists .list12 .tab .item.active {
				color: #5FE3EB;
				border-color: #999;
				border-width: 0;
				border-style: solid;
			}
	
	.home-preview .lists .list12 .tab .more {
				cursor: pointer;
				padding: 5px 10px;
				margin: 0 10px;
				color: #000;
				background: none;
				display: none;
				line-height: 44px;
				align-items: center;
			}
	
	.home-preview .lists .list12 .tab .more:hover {
				color: red;
			}
	
	.home-preview .lists .list12 .item.active {
	  animation-name: mymove;
	
	  &:nth-of-type(1) {
	    animation-duration: 1s;
	  }
	  &:nth-of-type(2) {
	    animation-duration: 1.2s;
	  }
	  &:nth-of-type(3) {
	    animation-duration: 1.4s;
	  }
	  &:nth-of-type(4) {
	    animation-duration: 1.6s;
	  }
	  &:nth-of-type(5) {
	    animation-duration: 1.8s;
	  }
	  &:nth-of-type(6) {
	    animation-duration: 2s;
	  }
	}
	
	@keyframes mymove
	{
		from {top: 320px;}
		to {top: 0;}
	}
</style>
