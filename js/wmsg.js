/**
 * 页面加载入口
 */
 require.config({
 	baseUrl : 'js/',
 	paths : {
 		lm : './vendor/lm',
 		jquery : './jquery-2.1.0',
 		template : './vendor/template',
 		tpl : './vendor/tpl'
 	},
 }); 

define(['jquery','template','tpl','lm'],function($,template,tpl,lm){

	$(document).ready(function() {
		lm.Lm_init(function(){
			var self = this;			
			/*
				获取URL中的GET数据
			*/
			var params = lm.getPathName()||null;
			lm.ajax({
				    type: 'GET',
				    data:{type:1},
				    url:lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.materiellist,
			}).done(function(data){
				if(data.code==0){
					self.wlList = data.data;
				}else if(data.code!=107){
			    		alert(data.code+":"+data.msg)
			    }
			});
			self.jumpWl=function(e,id){
				window.location='wlmsg.html?id='+id;
			}  
		});	
	});
});



