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
					    data:{id:params.id},
					    url: lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.materiel ,
					}).done(function(data){
						if(data.code==0){
							self.materiel=data.data;
							var str=null;
							if(self.materiel.name_cn&&self.materiel.name_en){
								str=self.materiel.name_cn+"/"+self.materiel.name_en;
							}else if(self.materiel.name_cn){
								str=self.materiel.name_cn;
							}else{
								str=self.materiel.name_en;
							}
							self.materiel["pername"]=str;
							$("._tel").attr("href","tel:"+self.materiel.mobile);
							$(".apply_con").val(self.materiel.remark);
							if(self.materiel.status_code==1){
								$(".js-group-toggle").hide();
								$("._state").addClass("_state2");
							}
						}else if(data.code!=107){
							alert(data.code+":"+data.msg);
						}

					});
					$("[data-send]").click(function(){
						$.ajax({
						    type: 'POST',
						    data:{id:Number(window.location.href.replace(/([\d\D]*){1,}?id=/,"")),remark:$(".apply_con").val(),status:1},
						    url: "http://piao.pandauu.com/bapi/update-materiel" ,
						    success: function(data){
						    	if(data.code==0){
				    				window.location.href="index.html"; 
						    	}else{
						    		alert("错误代码："+data.code+"\n错误信息："+data.msg);
						    	}
						    }
						});
					})
					$("[data-file-num]").click(function(){
						$("#load").removeClass("none");
						$.ajax({
						    type: 'POST',
						    data:{id:Number(window.location.href.replace(/([\d\D]*){1,}?id=/,""))},
						    url: "http://piao.pandauu.com/bapi/send-materiel" ,
						    success: function(data){
						    	if(data.code==0){
				    				window.location='wlSendSucc.html#'+$(".mer_contacts ._num").text();
						    	}else{
						    		alert("错误代码："+data.code+"\n错误信息："+data.msg);
						    	}
						    }
						});
					})

					$(".remark_sbumit").click(function(){

						var remarkVal= $(this).text();
						if (remarkVal=="修改") {
							$(".apply_con").removeAttr('disabled');
							$(this).text('确定');
						}else{

							$.ajax({
							    type: 'POST',
							    data:{id:Number(window.location.href.replace(/([\d\D]*){1,}?id=/,"")),remark:$(".apply_con").val()},
							    url: "http://piao.pandauu.com/bapi/update-materiel" ,
							    success: function(data){
							    	console.log(data)
							    	if(data.code==0){

					    				$(".apply_con").attr('disabled','disabled');
					    				$(".remark_sbumit").text('修改');

							    	}else{
							    		alert("错误代码："+data.code+"\n错误信息："+data.msg);
							    	}
							    }
							});
						}



					})
		});	
	});
});
