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

			var urlData = lm.getPathName();

			/*
				获取提现记录
			*/

			lm.ajax({
				url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.withdrawals,
				type : 'GET',
				datatype : 'json',
				data : urlData,
			}).done(function(data){
				console.log(data);

				if (data.code === 0) {
					
					self.withdrawals = data.data;
					var len = self.withdrawals.length;

					for (var i = 0; i < len; i++) {
						self.withdrawals[i].statusClass = true;
						if (self.withdrawals[i].status === '已取消') {
							self.withdrawals[i].statusClass = false;
						}
					}

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



