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
				url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.withdrawalslist,
				data:{type:1},
				type : 'GET',
				datatype : 'json',
			}).done(function(data){
				console.log(data);

				if (data.code === 0) {
					self.withdrawals = data;
					var len = self.withdrawals.data.result.length;
					for (var i = 0; i < len; i++) {
						self.withdrawals.data.result[i].currency_flag = data.data.currency_flag;
					}
				}else if(data.code!=107){
					alert('错误代码：' + data.code + '错误信息：' + data.msg);
				}
			});
			self.tx_href=function(e,id){
				window.location.href="txmsg.html?id="+id;
			}
		});
		
	});
});



