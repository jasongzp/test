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
 		fileupload:'./upload/jquery.fileupload',
 		widget:'./upload/vendor/jquery.ui.widget',
 	},
 });

define(['jquery','template','tpl','lm','fileupload','widget'],function($,template,tpl,lm,fileupload,widget){

	$(document).ready(function() {


		lm.Lm_init(function(){
			var self = this;

			var params = lm.getPathName();

			/*
				获取二维码详细信息
			*/

			var urlid=params.id;
					var imgUrl = '';
					$("#_subfile").css({height:$("._submit").outerHeight()})
					$("#_subfile").fileupload({  
		        		url:lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.upload ,  
		        		sequentialUploads: true  
					}).bind('fileuploadsend',function(e, data){
						$('#load').removeClass('none');
					}).bind('fileuploaddone', function (e, data) {
						$("#_subfile").hide();
			        	if (data.result.code === 0) {
			        		$("._submit").text("完成");
			        		$(".compltImg").attr("src",data.result.img);
			        		$(".img_group").show();
			        		imgUrl = data.result.path;
						}else{
							alert('错误代码：'+ data.result.code + '错误信息：' + data.result.msg);
						}
						$('#load').addClass('none');
		    		});
	        		$("._submit").unbind("click").bind("click",function(){
	        			   //window.location.href="msg.html?id="+Number(window.location.href.replace(/([\d\D]*){1,}?id=/,""));
        			   if (!imgUrl) {
        			   		return;
        			   }

						lm.ajax({
							url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.orders,
							type : 'POST',
							datatype : 'json',
						    data:{
						    	id : urlid,
						    	img : imgUrl,
							},
						}).done(function(data){
							console.log(data);
							if (data.code === 0) {
								window.location.href="msg.html?id="+urlid;
								
							}else{
								alert("错误代码："+data.code+"错误信息："+data.msg);
							}
						});
				    });

					$.ajax({
					    type: 'GET',
					    data:{id:params.id},
					    url: lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.withdrawals,
					    success: function(data){
					    	console.log(data.data);
					    	var arr=data.data;
					    	var statusClass=null;
					    	if(data.data.status_code==3){
					    		$("._state").removeClass("_state1");
					    		$('[name="imageFile"]').hide();
					    		$('._submit').hide();
					    		$("body").append("<img style='width:90%;display:block;margin:auto' src="+arr.img+">")
					    	}
					    	$("[data-state]").text(arr.status);
					    	$(".mer_contacts ._type").text(arr.currency_flag);
					    	$(".mer_contacts ._num").text(arr.fee_f);
					    	$(".contact_per .g_right").text(arr.name);
					    	$(".contact_tel .g_right ._text").text(arr.mobile);
					    	$(".contact_email .g_right").text(arr.email);
					    	$(".contact_mer .g_right").text(arr.business_area+"·"+arr.business_name);
					    	$(".contact_addr ._addr").text(arr.address);
					    	$(".apply_time").text("申请时间："+arr.create_at.replace(/-/g,"."));
					    	$(".apply_id").text("提现单号："+arr.serial);
					    	$(".apply_change").text("折合人民币："+"CNY "+arr.fee_l);
					    }
					});

		});
		
	});
});



