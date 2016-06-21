
$(".js_ipt_div_pass_icon").bind("click",function(){

	if($(".js_ipt_loginpassword").hasClass("on")){
		$(".js_ipt_loginpassword").removeClass("on");
		$(".js_ipt_div_pass_icon").removeClass("on");
		$(".js_ipt_loginpassword").attr("type","password");
	}else{
		$(".js_ipt_loginpassword").addClass("on");
		$(".js_ipt_div_pass_icon").addClass("on");
		$(".js_ipt_loginpassword").attr("type","text");
	}
});