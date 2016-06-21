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
			sessionStorage.removeItem("permsg");
			var url=window.location.href;
			$("[data-qrcode]").text(params.qcode);
			$("[data-back]").click(function(){
				window.history.back(-1)
			})
			$("[data-link]").click(function(){
				window.location.href="persearch.html";
			});
		});	
	});
});



