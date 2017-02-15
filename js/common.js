function openLink(href){
	if(localStorage.getItem("userLogin") != "login"){
		alert("请先登录");
		location.href="login.html";
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
function jumpExpert(that){
    if(!that) return false;
    localStorage.removeItem("expertId");
    localStorage.removeItem("expertImg");
    localStorage.removeItem("expertName");
    localStorage.removeItem("expertIntro");
    localStorage.setItem("expertId",that.attr("expertid"));
    localStorage.setItem("expertImg",that.attr("expertimg"));
    localStorage.setItem("expertName",that.attr("expertname"));
    localStorage.setItem("expertIntro",that.attr("expertintro"));
    location.href="expert.html?expertid="+that.attr("expertid");
}
function buyLotterys(){
    console.log("购买推荐");
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
            if(data && data.status ==200 && data.error == null){
                console.log("用户登录");
                localStorage.setItem("userLogin","login");
            }
        }
    });
   }
	
});