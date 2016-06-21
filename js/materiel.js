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
			/*
				获取提现记录
			*/

			lm.ajax({
				url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.materiellist,
				type : 'GET',
				datatype : 'json',
			}).done(function(data){
				console.log(data);

				if (data.code === 0) {
					
					self.materiellist = data.data;

					console.log(self.materiellist);

				}else{
					alert('错误代码：' + data.code + '错误信息：' + data.msg);
				}
			});

			self.setCity = function(id){
				/*
					获取城市列表
				*/

				lm.ajax({
					url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.citylist,
					type : 'GET',
					datatype : 'json',
					data : {
						city_id : id
					}
				}).done(function(data){

					if (data.code === 0) {
						
						window.location.href = 'shop.html';

					}else{
						alert('错误代码：' + data.code + '错误信息：' + data.msg);
					}
				});
			};

		});
		
	});
});



