function openLink(href){
	if(localStorage.getItem("userLogin") != "login"){
		alert("请先登录");
		location.href="http://"+location.host+"/login.html";
	}
	location.href=href;
}
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
$(function (){
    var loadDom=document.getElementById("loading");
    loadDom.setAttribute("class","outloading");
    setTimeout(function (){
        document.body.removeChild(loadDom);
    },500);
	//判断用户是否登录
   if(localStorage.getItem("userLogin") != "login"){
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
   }
	
});