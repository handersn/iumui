/**
 * 게시판 JS 소스입니다.
 */


var category_number;
var currPageNo;
var maxPageNo;

$(function(){
	$('.header').load('/iumui/common/header.html');
	$('.footer').load('/iumui/common/footer.html');
	$('.search_bar').load('/iumui/common/search_bar.html');
	
	$(document).on('click', '.table-hover a', function(){
		category_number = $(this).attr('cat-no');
		loadBoardList(1);
  });
	/*
	$(document).on('click', '.data-row a', function(){
    loadBoard($(this).attr('data-no'));
  });
	*/
	var address = unescape(location.href);
	var param = "";
	if(address.indexOf("no", 0) != -1) {
	        param = address.substring(address.indexOf("no", 0) + 3);
	} else {
	        param = "1";
	}
	console.log("no = " + param);
	category_number = param;

	loadBoardList(1);
	
});

$('#prevBtn').click(function(event){
	if (currPageNo > 1) {
	  loadBoardList(currPageNo - 1);
	}
});

$('#nextBtn').click(function(event){
	if (currPageNo < maxPageNo) {
	  loadBoardList(currPageNo + 1);
	}
});

function setPageNo(currPageNo, maxPageNo) {
  window.currPageNo = currPageNo;
  window.maxPageNo = maxPageNo;
  
  $('#pageNo').html(currPageNo);
  
  if (currPageNo <= 1) $('#prevBtn').css('display', 'none');
  else $('#prevBtn').css('display', '');
  
  if (currPageNo >= maxPageNo) $('#nextBtn').css('display', 'none');
  else $('#nextBtn').css('display', '');
}

function loadBoardList(pageNo) {
	if (pageNo <= 0) pageNo = currPageNo;
	
	$.getJSON('../json/board/list.do?no=' + category_number + '&pageNo=' + pageNo, 
    function(data){
			setPageNo(data.currPageNo, data.maxPageNo);
      
			for (var i in data.board) {
      	data.board[i].startDate = yyyyMMdd(data.board[i].startDate);
      	data.board[i].endDate = yyyyMMdd(data.board[i].endDate);
      }
      
     
      require(['text!templates/category-button.html'], function(html){
        var template = Handlebars.compile(html);
        $('#category_tab').html( template(data) );
        $('#catNo'+ category_number).addClass("selected");
      });
      
      require(['text!templates/board-table.html'], function(html){
        var template = Handlebars.compile(html);
        $('#board_list').html( template(data) );
      });
      
    });
}
/*
function loadProduct(productNo) {
  $.getJSON('../json/product/view.do?no=' + productNo, 
    function(data){
      $('#btnCancel').click();
      
      $('#no').val(data.product.no);
      $('#name').val(data.product.name);
      $('#quantity').val(data.product.quantity);
      $('#makerNo').val(data.product.makerNo);
      
      if (data.product.madeDate) {
        $('#madeDate').val(yyyyMMdd(data.product.madeDate));
      }
      
      product = data.product;
      
      $('.my-update-form').css('display', '');
      $('.my-new-form').css('display', 'none');
    });
}
*/
function yyyyMMdd(date) {
  if (date) {
    var date = new Date(date);
    var str = date.getFullYear() + '-';
    
    if (date.getMonth() < 9) str += '0';
    str += (date.getMonth() + 1) + '-';
    
    if (date.getDate() < 10) str += '0';
    str += date.getDate();
    
    return str;
    
  } else {
    return '';
  }
}

$('#button_create').click(function(){
	
	location.href = "invitations_create_group.html?no=" + category_number;
});