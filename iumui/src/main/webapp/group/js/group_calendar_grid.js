/**
 *  나의 그룹 달력화면에 들어갈 달력 화면 스크립트 
 */

/** 화면출력 start */
$(function(){
	$('.header').load('/iumui/common/header.html');
	$('.footer').load('/iumui/common/footer.html');
	$('.group_sidebar').load('/iumui/group/group_sidebar.html');
});
/** 화면출력 end */

/** 달력 출력 화면 start */
var monthName = new Array("1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월");

var monthDays = new Array(31,28,31,30,31,30,31,31,30,31,30,31);

var now = new Date;

var nowd = now.getDate();

var nowm = now.getMonth();

var nowy = now.getYear();

function showCalendar (day, month, year) {
	
	if ((year%4==0 || year%100 == 0) && (year % 400 == 0)) monthDays[1]=29;
	
	else monthDays[1] = 28 //leap year test
 
	var firstDay = new Date (year,month,1).getDay()
 
	var calStr="<table border=0 cellpadding=0 cellspacing=0 align=center width=100%>"
		  calStr+="<td><font size='8'><a href='javascript:;' onClick='nowm--; if (nowm<0) { nowy--; nowm=11; } showCalendar(nowd,nowm,nowy)' title='이전 월'> <<</a></font></td>"
		  calStr+="<td align=center><font size='8'>"+monthName[month].toUpperCase()+" &nbsp;&nbsp;"+(year+1900)+"년</font></td>"
		  calStr+="<td align=right><font size='8'><a href='javascript:;'  onClick='nowm++; if (nowm>11) { nowy++; nowm=0; } showCalendar(nowd,nowm,nowy)' title='다음 월'> >></a></font></td>"
		  calStr+="</tr></table>"
		  calStr+="<hr><br>"
			calStr+="<table border=0 cellpadding=5 cellspacing=1 align=center bgcolor=#cccccc>"
			calStr+="<tr bgcolor=white><td colspan=7>"
		  calStr+="</td></tr>" 
		  calStr+="<tr class='day_tag' bgcolor=';'>"
		  calStr+="<th><font color='white' size='5'>월</font></th>"
		  calStr+="<th><font color='white' size='5'>화</font></th>"
		  calStr+="<th><font color='white' size='5'>수</font></th>"
		  calStr+="<th><font color='white' size='5'>목</font></th>"
		  calStr+="<th><font color='white' size='5'>금</font></th>"
		  calStr+="<th><font color='#66CCFF' size='5'>토</font></th>" 
		  calStr+="<th><font color='red' size='5'>일</font></th>"
		  calStr+="</tr>"
		  	
		  	var dayCount=1
		  
		  calStr+="<tr bgcolor=white>"
 
		  	for (var i=0;i<firstDay;i++) calStr+="<td class='empty_day' > "  //첫 날짜 까지의 공백
 
		  	for (var i=0;i<monthDays[month];i++) {

					 if(dayCount==nowd) {
						 calStr+="<td id='day' align=center bgcolor='#DFE7DE'><font size='2'><b>" // 오늘 날짜일때 배경색 지정,글자 진하게
					 	} else {
						 calStr+="<td id='day' align=center><font size='2'>"  // 오늘 날짜가 아닐때 배경색 지정
					 	}
			 
				 	calStr+="<a href='#'>"; // 링크설정
				 	calStr+="&nbsp;" + dayCount++ ;  // 날짜
				 	calStr+="</a>"
			 		
				 	 if(dayCount==nowd) {
						 calStr+="</b>" // 오늘 날짜일때 글자 진하게
				 	 	} else {
						 calStr+=""  // 오늘 날짜가 글자 진하게 안함
				 	 	}

				 		calStr+="</font>"
				 			
				 		if ((i+firstDay+1)%7==0&&(dayCount<monthDays[month]+1)) calStr+="<tr bgcolor=white>" 
				}
	
	var totCells=firstDay+monthDays[month]
	
	for (var i=0;i<(totCells>28?(totCells>35?42:35):28)-totCells;i++) 
		calStr+="<td> "
		calStr+="</table><BR>"
		calendar.innerHTML=calStr
    }
/** 달력 출력 화면 end */