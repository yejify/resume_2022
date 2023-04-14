// 메뉴버튼
    $("header nav a").click(function(){
        var n = $("header nav a").index(this);
        $("html").animate({scrollTop:$("main h2").eq(n+1).offset().top-100+"px"},500);
        return false;
    });

    //메뉴 영역값
    var h = $(window).height()/2;
    var about_me = $("h2").eq(2).offset().top;
    var Web = $("h2").eq(3).offset().top;
    var video = $("h2").eq(4).offset().top;
    var graphic = $("h2").eq(5).offset().top;
    var contact = $("h2").eq(6).offset().top;
    //리모컨 기능
    $(window).scroll(function(){
        var t = $(window).scrollTop();
        //스크롤 다운시 메뉴 변경
        if(t> 500) {
            $("header").addClass("menu_on");
        }else{
            $("header").removeClass("menu_on");
        };

        //페이지네이트
        if(t < about_me-h) {// home
            $("header li").removeAttr("style");
            $("header li a").removeAttr("style");
        } else if(t >= about_me-h && t < Web-h) {// 메뉴1
            $(".menu_on li:not(first-child)").css("color", "#02B6C9");//전체 영역
            $(".menu_on li:not(first-child) a").css("color", "#02B6C9");
            $(".menu_on li:first-child").css("color", "#D1ED5D");//현재 영역
            $(".menu_on li:first-child a").css("color", "#D1ED5D");
        } else if(t >= Web-h && t < video-h) {// 메뉴2
            $(".menu_on li:not(:nth-child(2))").css("color", "#fff");//전체 영역
            $(".menu_on li:not(:nth-child(2)) a").css("color", "#fff");
            $(".menu_on li:nth-child(2)").css("color", "#D1ED5D");//현재 영역
            $(".menu_on li:nth-child(2) a").css("color", "#D1ED5D");
        }else if(t >= video-h && t < graphic-h) {// 메뉴3
            $(".menu_on li:not(:nth-child(3))").css("color", "#fff");//전체 영역
            $(".menu_on li:not(:nth-child(3)) a").css("color", "#fff");
            $(".menu_on li:nth-child(3)").css("color", "#D1ED5D");//현재 영역
            $(".menu_on li:nth-child(3) a").css("color", "#D1ED5D");
        }else if(t >= graphic-h && t < contact-h) {// 메뉴4
            $(".menu_on li:not(:nth-child(4))").css("color", "#fff");//전체 영역
            $(".menu_on li:not(:nth-child(4)) a").css("color", "#fff");
            $(".menu_on li:nth-child(4)").css("color", "#D1ED5D");//현재 영역
            $(".menu_on li:nth-child(4) a").css("color", "#D1ED5D");
        }else{//메뉴5
            $(".menu_on li:not(:nth-child(5))").css("color", "#02B6C9");//전체 영역
            $(".menu_on li:not(:nth-child(5)) a").css("color", "#02B6C9");
            $(".menu_on li:nth-child(5)").css("color", "#D1ED5D");//현재 영역
            $(".menu_on li:nth-child(5) a").css("color", "#D1ED5D");
        };
    });

    //로고 홈버튼
    $("h2").click(function(){
        var t = $(window).scrollTop();
        // alert(t);
        $("html").animate({scrollTop: 0 + "px"},500);
        return false;
    });

//메인 글씨
//메인 글씨
var txt = $("#txt").html();
    var n=0;
    var tag=false;
    
    setInterval(function(){
        n++;
        //태그인지 체크 
        if(txt[n] == "<") tag=true;
        if(txt[n] == ">") tag=false;
        if(!tag && n >=0) {
            var typing = txt.substring(0,n);
            $("#txt").html(typing);
        }
        // 글이 다 써지고 지연후
        if(n > txt.length+20) {
            n = -5;
        }

    },50);

    //마인드
    var count = $("#mind li").length;
    function mind() {
        for(var i=0; i<count; i++) {
            var txt = $("#mind li:eq("+i+") span:eq(1)").text();
            $("#mind li:eq("+i+") span:eq(1)").width(txt+"%");
        }
    };

    //스킬
    var count = $("#skill>li").length;
	var pie_do, pie_undo, skill=false;
	function skill_pie(on) {
		if(on=="on" && skill==false) { 
			clearInterval(pie_undo);
			clearInterval(pie_do);
			skill == true;
			pie_do = setInterval(function(){
				$("#skill>li").each(function(index,item){
					let p = parseInt($(item).text());
					let now =$(item).css("--p");
					let move = p-now;
					if(move > 0) {
						if(move < 0.4) {
							move = 0;
							$(item).css("--p", p);
						} else {
							$(item).css("--p", "+=" + (move *0.1));
						}
					} else {
						skill = false;
						clearInterval(pie_do);
					}
				})
			},20)
		} else if(on=="off" && skill==false) {
			clearInterval(pie_undo);
			clearInterval(pie_do);
			skill == true;
			pie_undo = setInterval(function(){
				$("#skill>li").each(function(index,item){
					let p = parseInt($(item).text());
					let now = $(item).css("--p");
					if(now > 0) {
						if(now < 0.4) {
							now = 0;
							$(item).css("--p", 0);
						} else {
							$(item).css("--p", "-=" + (now *0.1));
						}
					} else {
						skill = false;
						clearInterval(pie_undo);
					}
				})
			},20); 
		}
	};
    
    //마인드, 스킬 퍼센트 동작
    $(window).scroll(function(){
        var t = $(window).scrollTop();
        if(t >= about_me-h && t < Web-h) {
            mind();
            skill_pie("on");
        }else {
            $("#mind span:nth-child(2)").width(0);
            skill_pie("off");
        }
    });	

    // 작품 리스트 순서
    function paging() {
        // 페이지 표현
        var total = $("#list1>li").length;
        // alert(now_page);
        // $(".current").text(now_page);
        $(".total").text(total);
    };
    paging();
    // 작품리스트 드래그
    var li_width = $("section>ul>li").width(); // 작품 기본 폭값
	var li_height = $("section>ul>li").height(); // 작품 기본 높이값
	var move_x = 0; // 드래그한 이동값용 변수
	var move=false; // 드래그 여부용 변수
	var ul_left = 0;
    var hidden_left = $("#hidden_center").offset().left-50;
	$("section").mousemove(function(e){
		//e.clientX
		if(move) {
			var x = ul_left + (e.clientX - move_x);
			if(move) $("section>ul").css("margin-left",x);
			port_size();
		}
	});
	$("section").mousedown(function(e){
		move = true;
		move_x = e.clientX;
		ul_left = parseInt($("section>ul").css("margin-left"));
	});
    var ul_width = $("section>ul").width()
	var limit_max = (ul_width*-1) + ul_width/2 + $("#hidden_center").width()/4;

	$(document).mouseup(function(e){
		move=false;
		move_x =0;
        var center_li = $("section>ul>li").index($(".on"))+1;
        if(center_li) $(".current").text(center_li);
        center_li = false;
	});
	function port_main() {
		//$("li").eq(0).addClass("on");
		var center_left = $("section").width() /2 - li_width /2 - 50;
		var center_right = $("section").width() /2 + li_width /2 + 50;
		var left = $("li").eq(0).offset().left;
		//center 작품 찾기
		
	};
	function port_size() {
		//var w = li_width + (e.clientX - move_x);
		var center = $("section").width() /2;
    //		var center_right = $("section").width() /2 + li_width /2 + 50;
		$("section>ul>li").each(function(index, item){
			// 폭 = 가운데에서의 거리값
			var w;
			var h;
			var l= $(item).offset().left+ ($(item).width()/2);
			if(l < center) {
				var x = center - l;
				w = 400 - x*0.6;
				h = 500 - x*0.6;
				$(item).width(w);
			} else if(l > center) {
				var x =  l - center;
				w = 400 - x*0.6;
				h = 500 - x*0.6;
			} else {
				w =400;
				h =500;
			}
			if(w < 150) w=150;
			if(h < 200) h=200;
			$(item).width(w);
			$(item).height(h);
		});
        $("section>ul>li").each(function(index, item){
            if($(item).width()> 290) {
			     $(item).addClass("on");
		    } else {
			    $(item).removeClass("on");
		    };
        })
	};

    //리스트 가운데 오
    $("section>ul").css("margin-left",hidden_left + "px");
    port_size();
    
    // 모달팝업 열기
    $(".list>li").click(function(){
        $("#blind").fadeIn(100);
        $(this).addClass("open");
        // return false;   // 링크막기
    });
    // 모달팝업 닫기
    $("#blind").click(function(){
        $("#blind").fadeOut(100);
        $(".list>li.open").removeClass("open");
    });

    //e-mail
    $("#send_bt").click(function(){
        var name = $("#user_name").val();
        var subject = $("#subject").val();
        var msg = $("#msg").val();
        if(name.length < 2) {
            $("#user_name").addClass("alert").focus();
        } else if(subject.length < 2) {
            $("#subject").addClass("alert").focus();
        } else if(msg.length < 5) {
            $("#msg").addClass("alert").focus();
        } else {
            email();
        }
    });
    $("#user_name,#subject").keyup(function(){
        var name = $(this).val().length;
        if(name >= 2) {
            $(this).removeClass("alert");
            $(this).next().fadeIn();
        } else {
            $(this).addClass("alert");
            $(this).next().fadeOut();
        }
    });
    $("#msg").keyup(function(){
        var msg = $(this).val().length;
        if(msg >= 5) {
            $(this).removeClass("alert");
            $(this).next().next().fadeIn();
        } else {
            $(this).addClass("alert");
            $(this).next().next().fadeOut();
        }
    });

    function email() {
        var param = {
            title: $("#subject").val(),
            name : $("#user_name").val(),
            answer: $("input[name=answer]").val(),
            content: $("#msg").val()
        };
        $.ajax({
            url: 'public_html/fmail.php',
            type: "POST",
            async: true,
            dataType: "json",
            data: param,
            success: function (data) {
                if (data.result =="true") {
                    alert("메일전송이 완료 되었습니다.");
                    //$("#email").fadeOut("fast");
                }
            },
            error: function (request, status, error) {
                                    var msg = "ERROR<br>";
                                    msg += request.status + "<br>" + request.responseText + "<br>" + error;
            },
            complete: function () {
                //$("#email").fadeOut("fast"); 
            }
        });
    }
