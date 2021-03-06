'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global  $ */
var app = {};
app.partial = {};

// var dayOfMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// 網址為 gulp 或者 github 時 設定成debug 模式
var debug = /localhost[:]9000|nelson119.github.io/.test(location.href);



$(function(){
    app.getParam = getParam;
    
    // 定義每個section
	$.each(app.partial, function(name, init){
		init();
    });
    app.imageReload.init();

    app.imageReload.callback = function(){
			// console.log('preload callback');
    	$('html').addClass('loading-done');
    };
    app.imageReload.init();

    $('.thumb').on('click', function(){
    	var src = 'img/' + $(this).attr('data-detail');
    	console.log(src);
    	$('.lightbox .photo-content img').attr('src', src);
    	$('.lightbox, .close-button').removeClass('hide').fadeIn();
});

    $('.close-button').on('click', function(){
    	$('.lightbox, .close-button').fadeOut();
    });
});




//判斷是否具有屬性
$.fn.hasAttr = function(attributeName){
	var attr = $(this).attr(attributeName);
	if (typeof attr !== typeof undefined && attr !== false) {
		return true;
	}else{
		return false;
	}
};



var share = {
	facebook: function(href, title){
		href = encodeURIComponent(href || location.href + '?utm_source=facebook&utm_medium=fbshare_m&utm_campaign=camp');
		title = encodeURIComponent(title || document.title);
		window.open('https://www.facebook.com/sharer.php?u='+href+'&amp;t='+title);
	},
	googleplus: function(href){
		href = encodeURIComponent(href || location.href + '?utm_source=g+&utm_medium=googleplus_m&utm_campaign=camp');
		window.open('https://plus.google.com/share?url=' + href,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
	},
	email: function(href, title){
		href = encodeURIComponent(href || location.href + '?utm_source=email&utm_medium=email_m&utm_campaign=camp');
		title = encodeURIComponent(title || document.title);
		var body = encodeURIComponent(''+href+' #' +title+'');
		window.open('https://mail.google.com/mail/?view=cm&fs=1&to=&su=與你分享:'+title+'&body='+body+'&bcc=');
	}
};


function getParam(name){
	var r = new RegExp('^.*[?&]'+name+'[=]([^&]+).*$', 'i');
	if(!r.test(location.search)){
		return null;
	}
	var value = location.search.replace(r,'$1');
	return decodeURIComponent(value);
}

