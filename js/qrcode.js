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
				url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.qrcode,
				type : 'GET',
				datatype : 'json',
				data : params,
			}).done(function(data){
				console.log(data);

				if (data.code === 0) {
					
					self.qrcode = data.data;

				}else{
					alert('错误代码：' + data.code + '错误信息：' + data.msg);
				}
			});

			self.jumpDetail = function(e){
				
				window.location.href = 'perMsg.html?id=' + self.qrcode.id;
			};

		});
		
	});
});



