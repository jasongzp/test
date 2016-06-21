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
				    data:{"id":(lm.getPathName()).id},
				    url: lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.qrcode ,
			}).done(function(data){
				if(data.code==0){
					self.qrcode=data.data;
				    var pername=null;
				    if(data.data.name_cn&&data.data.name_en){
				    	pername=data.data.name_cn+"/"+data.data.name_en;
				    }else if(data.data.name_cn){
				    	pername=data.data.name_cn;
				    }else{
				    	pername=data.data.name_en;
				    }
				    self.qrcode["pername"]=pername;
				}else if(data.code!=107){
				    alert(data.code+":"+data.msg)
				}

			});
			self.perHref=function(){
				window.location="perMsg.html?id="+self.qrcode.buid;
			}
		});	
	});
});



