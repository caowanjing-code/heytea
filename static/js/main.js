$('.nav-list li').removeClass('current');
$('.nav-list ').onePageNav({
	begin: function() {
		//Hack so you can click other menu items after the initial click
		$('body').append('<div id="device-dummy" style="height: 1px;"></div>');
	},
	end: function() {
		$('#device-dummy').remove();
	}
});

$(window).scroll(function() {
	var top = $(document).scrollTop();
	if($(document).scrollTop() <= 0) {
		$('.nav-list  li').removeClass('current');
	}
});

//swiper init 
var mySwiper = new Swiper('.swiper-container', {
	// 如果需要前进后退按钮
	autoHeight: true,
	nextButton: '.swiper-button-next',
	prevButton: '.swiper-button-prev',
	onInit: function(swiper) { //Swiper2.x的初始化是onFirstInit
		swiperAnimateCache(swiper); //隐藏动画元素 
		swiperAnimate(swiper); //初始化完成开始动画
	},
	onSlideChangeEnd: function(swiper) {
		swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
	}
})

//回到顶部
$(window).scroll(function() {
	var scrolltop = $(this).scrollTop();
	if(scrolltop >= 200) {
		$("#elevator_item").show();
	} else {
		$("#elevator_item").hide();
	}
});
$("#elevator").click(function() {
	$("html,body").animate({
		scrollTop: 0
	}, 500);
});
$(".qr").hover(function() {
	$(".qr-popup").show();
}, function() {
	$(".qr-popup").hide();
});
$(".qr").click(function() {
	$(".qr-popup").toggle();
})

//滚动触发动画
var $window = $(window),
	win_height_padded = $window.height() * 1;
$window.on('scroll', revealOnScroll);

function revealOnScroll() {
	var scrolled = $window.scrollTop(),
		win_height_padded = $window.height() * 1;

	// Showed...
	$(".revealOnScroll:not(.animated)").each(function() {
		var $this = $(this),
			offsetTop = $this.offset().top;

		if(scrolled + win_height_padded > offsetTop) {
			if($this.data('timeout')) {
				window.setTimeout(function() {
					$this.addClass('animated ' + $this.data('animation'));
				}, parseInt($this.data('timeout'), 10));
			} else {
				$this.addClass('animated ' + $this.data('animation'));
			}
		}
	});
	// Hidden...
	$(".revealOnScroll.animated").each(function(index) {
		var $this = $(this),
			offsetTop = $this.offset().top;
		if(scrolled + win_height_padded < offsetTop) {
			$(this).removeClass('animated  fadeInLeftBig fadeInRight fadeInLeft ')
		}
	});
}

//地图
var close_map = $('#close_map');
close_map.click(function() {
	$(this).parent().css("display", "none");
})
$('body').on('click','.store_item li',function() {
	var x = $(this).attr("data-x");
	var y = $(this).attr("data-y");
	var content = $(this).attr("data-content");
	if(x != '' && y != '') {
		init(x, y, content);
	} else {
		return false;
	}
})

var init = function(x, y, content) {
	var center = new qq.maps.LatLng(x, y);
	var map = new qq.maps.Map(document.getElementById('con_map'), {
		center: center,
		zoom: 14
	});
	//创建marker
	var marker = new qq.maps.Marker({
		position: center,
		map: map
	});
	var label = new qq.maps.Label({
		position: center,
		map: map,
		content: content,
		id: map
	});
	$('#mapBox').css("display", "block");
}
