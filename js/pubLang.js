

$(function(){

	// alert(1);
	console.log("pmove")
	if (localStorage.getItem("lang")) {
		var langCnArray =localStorage.getItem("lang").split(",");
		console.log(langCnArray.length+"\narrlenth")
		for(var i=0;i<langCnArray.length;i++){
			$("[lm-lang-id='"+(i+1)+"']").text(langCnArray[i])
		}

	}else{

		// 暂不处理
	}



})