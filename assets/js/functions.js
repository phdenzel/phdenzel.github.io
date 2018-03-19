$( document ).ready(function() {

  smoothScroll(500);

  myMobileNav();

  myWorkBelt();
  myWorkLoad();

  setInterval(function(){articleTada()}, 4000);

});


// Variables
var W = $(window);
var B = $('body');
if ( $('.header-wrapper') ) {
  var hOffset = $('.header-wrapper').offset().top;
} else {
  var hOffset = 0;
}


// Auxiliary function
function binarySearch(array, el) {
  var m = 0;
  var n = n = array.length - 1;
  while (m <= n) {
    var k = (n+m) >> 1;
    var cmp = el - array[k];
    if (cmp > 0) {
      m = k + 1;
    } else if (cmp < 0) {
      n = k - 1;
    } else {
      return [k, k+1];
    }
  }
  return [n, n+1];
}


// Sticky header
W.scroll(function(){

  var wScroll = W.scrollTop();

  if(wScroll > hOffset){
    $('#header').addClass('header-scrolled');
    $('#mobile-nav').addClass('nav-scrolled');
  } else {
    $('#header').removeClass('header-scrolled');
    $('#mobile-nav').removeClass('nav-scrolled');
  }

});


// Mobile Nav switch
// W.scroll(function(){
//
//   var wScroll = W.scrollTop(),
//       mobileNavTop = $('#mobile-nav').offset().top
//       headerHeight = $('#header').height();
//
//   console.log("navTop: ", mobileNavTop);
//   console.log("sclTop: ", wScroll);
//   console.log("hdrHgt: ", headerHeight);
//
//
//   if(wScroll > mobileNavTop) {
//     $('#mobile-nav.is-open').css({
//       'transform' : 'translateY(0)'
//     });
//   }
//
// });


// Moving shadow-nav
W.scroll( function() {

  var anchors = $('section').find('a:first');
  var anchor_offsets = [];
  // omit one anchor since jQuery also detects the anchor of the header
  for (i=1; i<anchors.length; ++i) {
    anchor_offsets.push(anchors[i].offsetTop);
  }

  var wScroll = W.scrollTop(),            // current scroll position
      wHeight = W.height(),               // height of current window
      wWidth = W.width(),                 // width of current window
      bHeight = B.height(),               // height of entire website
      scrollIndex = binarySearch(         // indices of interval in anchor offsets
              anchor_offsets, wScroll),
      left = anchor_offsets[scrollIndex[0]];
      right = anchor_offsets[scrollIndex[1]];
      noli = anchor_offsets.length,       // number of list elements in header
      shanavW = $('#shadow-nav').width(); // width of a nav segment

  // limits for the bottom
  if (right === undefined) {
    right = bHeight;
  };

  // map section intervals (from scrolling) to nav segments (in header)

  var translaX = (wScroll - left)/(right - left) * shanavW + scrollIndex[0]*shanavW
  // no need to go further than to the edge
  translaX = Math.min(translaX, wWidth-shanavW+1)

  // translate shadow nav
  $('#shadow-nav').css({
    'transform' : 'translateX('+translaX+'px)'
  });

  $('#shadow-nav').css({
    '-webkit-transform' : 'translateX('+translaX+'px)'
  });

  $('#shadow-nav>ul').css({
    'transform' : 'translateX('+-translaX+'px)'
  });

  $('#shadow-nav>ul').css({
    '-webkit-transform' : 'translateX('+-translaX+'px)'
  });

});


// Parallaxing
W.scroll( function(){

  var wScroll = W.scrollTop();

  var anchors = $('section').find('a:first');
  var anchor_offsets = [];
  // omit one anchor since jQuery also detects the anchor of the header
  for (i=1; i<anchors.length; ++i) {
    anchor_offsets.push(anchors[i].offsetTop);
  }

  if (wScroll < anchor_offsets[1]) {
    $('.logo').css({
      'transform' : 'translate(0px, '+ wScroll / 5 +'%)'
    });

    $('.mountains').css({
      'transform' : 'translate(0px, '+ wScroll / 20 +'%)'
    });
  };

})


// Smooth scroll to anchors (section tops)
function smoothScroll (duration) {
  $('a[href^="#"]').on('click', function(event) {

    var target = $( $(this).attr('href') );

    if( target.length ) {

      event.preventDefault();

      $('html, body').animate({
        scrollTop: target.offset().top
      }, duration);

    };

    // Mobile nav addition
    if( $('#mobile-nav.is-open') ) {
      $('#mobile-nav, .mobile-nav-toggle').removeClass('is-open');
    };

  });
}


// Mobile nav
function myMobileNav() {

  $('.mobile-nav-toggle').on('click', function(){
    var status = $(this).hasClass('is-open');
    if(status){ $('.mobile-nav-toggle, #mobile-nav').removeClass('is-open'); }
    else { $('.mobile-nav-toggle, #mobile-nav').addClass('is-open'); }
  });

}


// My work belt
function myWorkBelt() {

  $(".trigger").remove();
  $(".return").remove();

  $('.thumb-container label').click(function() {
    $('.projects-belt').addClass("slided");
    $('.project-container').show();
  });

  $('.project-return').click(function() {
    $('.projects-belt').removeClass("slided");
    $('.project-container').hide(400);
  });

}

function myWorkLoad() {

  $.ajaxSetup({ cache: true });

  $('.thumb-container label').click(function() {
    var $this = $(this),
        newTitle = $this.find('strong').text(),
        spinner = '<div class="loader">Loading...</div>',
        url = $this.find('.thumb-unit').data('url');

    $('.project-load').html(spinner).load(url);
    $('.project-title').text(newTitle);

  });

}


W.scroll(function articleStart(){
  var wScroll = $(window).scrollTop();

  if($('.lab-wrapper').offset().top - $(window).height()/1.2 < wScroll) {
    $('.article-thumb').each(function(i){
      setTimeout(function(){
        $('.article-thumb').eq(i).addClass('is-visible');
      }, 100 * i);
    });
  }
})

function articleTada(){
  var randNum = Math.floor(Math.random() * $('.article-thumb').length) + 1
  $('.article-thumb').eq(randNum).addClass('is-emph')
    .siblings().removeClass('is-emph');
}
