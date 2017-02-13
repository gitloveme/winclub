function openLink(href){
	if(localStorage.getItem("userLogin") != "login"){
		alert("请先登录");
		location.href="http://"+location.host+"/login.html";
	}
	location.href=href;
}
$(function (){
	//判断用户是否登录
	$.ajax({
        type:"get",
        url:"http://h5.wingoalclub.com/zucai/inf/isUserLogin",
        data:{},
        dataType:"json",
        success:function (data){
        	if(data && data.status ==200){
        		console.log("用户登录");
        		localStorage.setItem("userLogin","login");
        	}
        }
    });
});