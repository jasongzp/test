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

define(['jquery','template','tpl','lm'],function($,template,tpl,lm){

	$(document).ready(function() {


		lm.Lm_init(function(){
			var self = this;

			var params = lm.getPathName();
			/*
				获取二维码详细信息
			*/
			lm.ajax({
				    type: 'GET',
				    data:{"id":Number(window.location.hash.replace("#",""))},
				    url:lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.qrcode,
			}).done(function(data){
				self.qrcode=data.data;
				$(".js-href").click(function(){
				    sessionStorage.setItem("addqrcode",self.qrcode.qrcode_id);
				    sessionStorage.removeItem("b_id");
				    window.location.href="edper.html";
				})
			});

		});
		
	});
});



