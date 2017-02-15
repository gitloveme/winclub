/*轮播图*/
var mySwipe = new Swiper(".swiper-container",{
	autoplay:5000,
	pagination:".swiper-pagination"
});

function getUserInfo(){/*获取用户登录态*/
	
}

$(function (){
    
    function loadExpert(op){/*专家推荐*/
        var defaultOption={role:2,type:1,page_index:1,page_num:10};/*默认北京专场，第一页每页10条*/;
        var option=$.extend(defaultOption,op);
        $.ajax({
            type:"get",
            url:"http://h5.wingoalclub.com/zucai/inf/expertRecommend",
            data:option,
            dataType:"json",
            success:function (data){
                
                console.log(data); 
                if(data && data.status==200){
                    var list=data.data;
                    var experthtml="";
                    for(var i=0;i<list.length;i++){
                        experthtml+='<li class="commen_per jumpexpert" expertid="'+list[i].expertid+'" recommendid="'+list[i].recommendid+'"  expertimg="'+list[i].imageSrc+'" expertname="'+list[i].nickname+'" expertintro="'+list[i].content+'"><div class="js_cell"><img src="'+list[i].imageSrc+'"></div><span class="name_hut">'+list[i].nickname+'</span></li>';
                    }
                    $("#experts").empty().html(experthtml);
                }
            }
        });
    }
    function loadProficient(op){/*高手推荐*/
        var defaultOption={role:3,type:1,page_index:1,page_num:10};/*默认北京专场，第一页每页10条*/;
        var option=$.extend(defaultOption,op);
        $.ajax({
            type:"get",
            url:"http://h5.wingoalclub.com/zucai/inf/expertRecommend",
            data:option,
            dataType:"json",
            success:function (data){
                if(data.status==200){
                    var list=data.data;
                    var recommendhtml='<a href="recommend.html"><dt>高手推荐<span class="more_icon">更多</span></dt></a>';
                    /*
                    data={"status":"200","error":null,"data":[{"imageSrc":"http://www.wingoalclub.com/dist/avatars/20160529063744-35.jpg","nickname":"真正的周神","expertid":"16","recommendid":"10046","title":"美职-芝加哥火焰vs哥伦布机员","begin_match_time":"2016-10-14 08:30:00","home_team":"芝加哥火焰","guest_team":"哥伦布机员","content":"芝加哥火焰击败费城联合之后近5轮联赛1平4负的战绩表现不佳，球队战绩不佳主要是因为防守存在较大问题，5场比赛失球多到12个。\n  相比主队，客队的状态就要好很多了，他们近4场联赛赢了3场，其中包括了上场联赛3:0完胜了今天的对手芝加哥火焰，哥伦布机员无疑是在反弹的路上越走越稳。哥伦布机员近期前场进攻球员的状态确实不错，首席射手奥拉卡马拉，在对阵奥兰多城和新英格兰革命的比赛中攻入4球，帮助球队取得今年联赛的第二次连胜.\n  盘面数据告诉我们，不论初盘和即时盘口，都是相对看好客场作战的哥伦布机员。\n  单场官方不让球，推荐10。","create_time":"2016-10-13 22:11:02","is_hit":"未荐中","price":"50.00"}],"records":"2","objectNode":{},"arrayNode":[]}

                     */
                    var typeName=["北京单场","北京单场","胜负玩法","竞彩玩法"];
                    
                    var weekday=["周日","周一","周二","周三","周四","周五","周六"];
                    for(var i=0;i<list.length;i++){
                        var type=option.type || 1;
                        var beginTime=$.trim(list[i].begin_match_time).substring(0,10);
                        var date=new Date(beginTime);
                        var d=date.getDay();
                        recommendhtml+='<dd expertid="'+list[i].expertid+'" recommendid="'+list[i].recommendid+'" title="'+list[i].title+'"><section class="expert_case"><a class="jumpexpert" expertid="'+list[i].expertid+'" expertimg="'+list[i].imageSrc+'" expertname="'+list[i].nickname+'" expertintro="'+list[i].content+'"><span class="head_cap"><img src="'+list[i].imageSrc+'"></span></a><div class="cap_cont"><em>'+list[i].nickname+'</em><mark>高级专家</mark></div></section><section class="ball_detail"><div class="ball_time"><small>'+weekday[d]+'</small><p>'+list[i].begin_match_time.substring(5,16)+'</p></div><p class="span_contr"><strong>'+list[i].title+'</strong><span class="star_box" style="position: absolute;right:10px">￥<em>'+list[i].price+'</em></span></p><p class="ball_case txt_contr2"><span>类型：<a>'+typeName[type]+'</a></span></p><p class="ball_case txt_contr2">推荐语:<a>'+list[i].content+'</a></p><span class="tag">购买</span></section></dd>';
                    }
                    $("#recommendlist").empty().html(recommendhtml);
                }
            }
        });
    }
    loadExpert();
    loadProficient();
    $(window).on("click",".jumpexpert",function (){
        jumpExpert($(this));
    });
    
});
