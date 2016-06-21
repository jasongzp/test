/**
 * 页面加载入口
 */
 require.config({
 	baseUrl : 'js/',
 	paths : {
 		lm : './vendor/lm',
 		jquery : './jquery-2.1.0',
 		template : './vendor/template',
 		tpl : './vendor/tpl',
 	},
 });

define(['jquery','template','tpl','lm',],function($,template,tpl,lm){

	$(document).ready(function() {


		lm.Lm_init(function(){
			var self = this;
			var urlData = lm.getPathName()||{};
			/*
				获取数据
			*/
			lm.ajax({
					     type: 'GET',
					     url: lm.apiClass.root+lm.apiClass.apiUrl+lm.apiClass.apiInd.userinfo,
			}).done(function(data){
				if(data.code==0){
					self.userinfo=data.data;
				}else if(data.code!=107){
					alert(data.code+":"+data.msg);
				}
			});
			/*
				登出
			*/
			$('.js-data-logout').bind("click",function(){
					$.ajax({
					     type: 'GET',
					     url: lm.apiClass.root+lm.apiClass.apiUrl+lm.apiClass.apiInd.logout,
					    success: function(data){
					    	if(data.code==0){
					    		window.location.href='login.html'
					    	}else if(data.code!=107){
					    		alert(data.code+":"+data.msg);
					    	}
					    }
					});
			})
			
		});
		
	});
});



