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
			/*
				根据状态添加class news
			*/
			$.ajax({
			    type: 'GET',
			    date:{"type":1},
			    url: lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.msg,
			    success: function(data){
			    	if(data.code==0){
				    	var arr=data.data;
				    	var tx=[];
				    	var wl=[];
				    	for(var i=0;i<arr.length;i++){
				    		if(arr[i]["type"]==1){
				    			tx.push(arr[i]);
				    		}else{
				    			wl.push(arr[i]);
				    		}

				    	}
				    	if(wl.length==0){
				    		$(".header_con .tag").eq(1).find("a").removeClass("_border");
				    		$(".header_con .tag").eq(0).find("a").addClass("_border");
				    		$(".tag_con").eq(0).addClass("_active");
				    		$(".tag_con").eq(1).removeClass("_active");
				    		$(".header_con .tag").eq(1).find("a").removeClass("news");
				    	}else{
				    		if(tx.length!=0){
				    			$(".header_con .tag").eq(1).find("a").removeClass("_border");
					    		$(".header_con .tag").eq(0).find("a").addClass("_border");
					    		$(".tag_con").eq(0).addClass("_active");
					    		$(".tag_con").eq(1).removeClass("_active");
					    		$(".header_con .tag").eq(1).find("a").addClass("news");
				    		}else{
				    			$(".header_con .tag").eq(0).find("a").removeClass("_border");
					    		$(".header_con .tag").eq(1).find("a").addClass("_border");
					    		$(".tag_con").eq(1).addClass("_active");
					    		$(".tag_con").eq(0).removeClass("_active");
				    		}
				    	}
			    	}else if(data.code!=107){
			    		alert(data.code+":"+data.msg)
			    	}
			    }
			});

			/*
				获取提现星系
			*/
			lm.ajax({
			    type: 'GET',
			    url: lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.withdrawalslist,
			}).done(function(data){
				if(data.code==0){
					self.txList = data.data;
				}else if(data.code!=107){
			    		alert(data.code+":"+data.msg)
			    }
			});

			/*
				获取物料星系
			*/
			lm.ajax({
			    type: 'GET',
			    url: lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.materiellist,
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
			self.jumpTx=function(e,id){
				window.location='txmsg.html?id='+id;
			}
			   
			$(".header_con .tag").bind("click",function(){
				if(!$(this).find("a").hasClass("_border")){
					var index=$(this).index();
					$(".header_con .tag a").removeClass("news");
					$(".header_con .tag a").removeClass("_border");
					$(this).find("a").addClass("_border");
					$(".list_con .tag_con").removeClass("_active");
					$(".list_con .tag_con").eq(index).addClass("_active");
				}
			})
		});	
	});
});
