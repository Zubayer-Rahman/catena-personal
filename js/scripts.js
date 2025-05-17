jQuery(window).on("scroll touchmove", function () {
  $('.header').toggleClass('header-tiny', $(document).scrollTop() > 0);
});
$(document).ready(function (e) {
  $('.navbar-toggler').on('click', function () {
    $('.navbar').toggleClass('in');
    $('html').toggleClass('no-scroll');
    $('.navbar-collapse').toggleClass('show');
    $(this).toggleClass('open');
  });

  $(".navbar-collapse ul li a").click(function () {
    $('.navbar-toggler').toggleClass('open');
  });
  $("ul li:has(ul)").addClass("dropdown");

  $(".navbar-collapse").on("click", ".dropdown a", function () {
    if ($(this).width() < 800) {
      if ($(this).next("ul").is(":visible")) {
        $(this).next("ul").slideUp("fast");
        $(this).removeClass("active");
      } else {
        $(this)
          .closest("ul")
          .children(".dropdown")
          .children(".active")
          .next("ul")
          .slideUp("fast");
        $(this)
          .closest("ul")
          .children(".dropdown")
          .children(".active")
          .removeClass("active");
        $(this).next().slideToggle("fast");
        $(this).addClass("active");
      }
    }
  });

  $(".more-btn").on('click', function (e) {
    $('.common-features ul li:not(:nth-child(-n+9))').slideDown();
    $('.more-features-toggle').fadeOut(200);
    e.preventDefault();
  });

  $(".banner-slider").slick({
    dots: false,
    arrows: false,
    loop: true,
    draggable: true,
    infinite: true,
    pauseOnHover: false,
    autoplay: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [{
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    }],
  });

  $(".best-sale-slider").slick({
    dots: false,
    arrows: true,
    loop: true,
    draggable: true,
    infinite: true,
    pauseOnHover: false,
    autoplay: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  });

  $('.testimonial-slider').slick({
    dots: false,
    arrows: true,
    loop: true,
    draggable: true,
    infinite: true,
    pauseOnHover: false,
    autoplay: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  });

  $('.top-picks-list').slick({
    speed: 500,
    draggable: false,
    centerPadding: '0px',
    arrows: false,
    dots: false,
    asNavFor: '.top-picks-nav',
    cssEase: 'cubic-bezier(.52,.18,.27,.92)',
    autoplay: false,
    autoplaySpeed: 2500,
    slidesToShow: 1,
    responsive: [{
      breakpoint: 767,
      settings: {
        adaptiveHeight: true
      },
    }],
  });

  $('.top-picks-nav').slick({
    slidesToShow: 3,
    asNavFor: '.top-picks-list',
    dots: false,
    arrows: false,
    draggable: false,
    focusOnSelect: true,
  });

  //accordion
  $('.accordion ul li:has(ul)').addClass('dropdown');
  $('.accordion').on('click', '.dropdown h3', function (e) {
    if ($(this).next('ul').is(':visible')) {
      $(this).next('ul').slideUp('fast');
      $(this).removeClass('active');
    } else {
      $(this).closest('ul').children('.dropdown').children('.active').next('ul').slideUp('fast');
      $(this).closest('ul').children('.dropdown').children('.active').removeClass('active');
      $(this).next().slideToggle('fast');
      $(this).addClass('active');
    }
    e.preventDefault();
  });

  //number increment decrement
  $('.minus').click(function () {
    var $input = $(this).parent().find('input');
    var count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();
    return false;
  });
  $('.plus').click(function () {
    var $input = $(this).parent().find('input');
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    return false;
  });

});

function showModal(id) {
  $("#" + id).fadeIn(200);
  $("body").toggleClass("no-scroll");
}

function hideModal(id) {
  $("#" + id).fadeOut(400);
  $("body").toggleClass("no-scroll");
}

//popup video
setVideoEvent();
function setVideoEvent() {
  $('.as-show-video').on('click', function () {
    playVideo(this);
    return false;
  });
  $('.as-close-video').on('click', function () {
    closeVideo();
    return false;
  });
}

function playVideo(obj) {
  var videoOptions = {
    width: 640,
    height: 360
  },
    size = getPlaySize(),
    videoKey = $(obj).attr('video-key'),
    source = $(obj).attr('data-source'),
    playerWidth = size.width,
    playerHeight = size.height;
  if (source == 'youku') {
    loadJs('http://player.youku.com/jsapi', function () {
      $('.video-container .video-area').css({
        height: size.height,
        width: size.width
      });
      $('.video-container').addClass('in');
      window.playerObj = new YKU.Player('videoplayer', {
        styleid: '0',
        client_id: 'ebab0e7d5e04b44d',
        vid: videoKey,
        autoplay: true
      });
    });
  } else {
    loadJs('https://www.youtube.com/player_api/', function () {
      if (window.player && window.player.loadVideoById) {
        window.player.loadVideoById(videoKey);
      } else {
        window.loadVideo =
          setInterval(function () {
            window.player && window.player.loadVideoById && window.player.loadVideoById(videoKey) && clearInterval(window.loadVideo);
          }, 300);
      }
      $('.video-container').addClass('in');
      $('.video-container .video-area').css({
        height: size.height,
        width: size.width
      });
      if (window.player && window.player.playVideo) {
        window.player.playVideo();
      } else {
        window.tryPlay =
          setInterval(function () {
            window.player && window.player.playVideo && window.player.playVideo() && clearInterval(window.tryPlay);
          }, 300);
      }
    });
  }

  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
      player && player.playVideo && player.playVideo();
    }
  }

  function getPlaySize() {
    var size = {
      height: 0,
      width: 0
    };
    if (window.innerWidth / (window.innerHeight - 80) > videoOptions.width / videoOptions.height) {
      size.height = window.innerHeight;
      size.width = (window.innerHeight - 80) * videoOptions.width / videoOptions.height;
    } else {
      size.width = window.innerWidth;
      size.height = window.innerWidth * videoOptions.height / videoOptions.width + 80;
    }
    return size;
  }

  function onYouTubePlayerAPIReady() {
    window.player = new YT.Player('videoplayer', {
      width: playerWidth,
      height: playerHeight,
      events: {
        // 'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }

  window.onYouTubePlayerAPIReady = onYouTubePlayerAPIReady;
}

function closeVideo() {
  clearInterval(window.tryPlay);
  clearInterval(window.loadVideo);
  window.player && window.player.pauseVideo && window.player.pauseVideo();
  $('.as-video-container').eq(0).removeClass('in');
}

function loadJs(src, callback) {
  var _doc = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  if (!src) {
    return false;
  }
  if (loadJs.isLoad) {
    if (typeof callback == 'function') {
      callback();
    }
  } else {
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', src);
    _doc.appendChild(script);
  }
  script.onload = function () {
    loadJs.isLoad = true;
    if (typeof callback == 'function') {
      callback();
    }
  }
}

//back to top
var btn = $('.back-top');

$(window).scroll(function () {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});
btn.on('click', function (e) {
  e.preventDefault();
  $('html, body').animate({ scrollTop: 0 }, '300');
});


// number animate
$.fn.animateNumbers = function (stop, commas, duration, ease) {
  return this.each(function () {
    var $this = $(this);
    var start = parseInt($this.text().replace(/,/g, ""));
    commas = (commas === undefined) ? true : commas;
    $({
      value: start
    }).animate({
      value: stop
    }, {
      duration: duration == undefined ? 500 : duration,
      easing: ease == undefined ? "swing" : ease,
      step: function () {
        $this.text(Math.floor(this.value));
        if (commas) {
          $this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
        }
      },
      complete: function () {
        if (parseInt($this.text()) !== stop) {
          $this.text(stop);
          if (commas) {
            $this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
          }
        }
      }
    });
  });
};

/* ------- ADD CLASS -------*/
(function (e) {
  e.fn.visible = function (t, n, r) {
    var i = e(this).eq(0),
      s = i.get(0),
      o = e(window),
      u = o.scrollTop(),
      a = u + o.height(),
      f = o.scrollLeft(),
      l = f + o.width(),
      c = i.offset().top,
      h = c + i.height(),
      p = i.offset().left,
      d = p + i.width(),
      v = t === true ? h : c,
      m = t === true ? c : h,
      g = t === true ? d : p,
      y = t === true ? p : d,
      b = n === true ? s.offsetWidth * s.offsetHeight : true,
      r = r ? r : "both";
    if (r === "both") return !!b && m <= a && v >= u && y <= l && g >= f;
    else if (r === "vertical") return !!b && m <= a && v >= u;
    else if (r === "horizontal") return !!b && y <= l && g >= f
  }
})(jQuery)


// Variables
var wholeWindow = $(window);
var box = $('.be-animated');
// If it is then add a class
wholeWindow.scroll(function () {
  box.each(function (i, obj) {
    if ($(obj).visible(true)) {
      $(obj).addClass('in-view');
      $('.number-animate').each(function () {
        $(this).animateNumbers($(this).attr("data-value"), true, parseInt($(this).attr("data-animation-duration")));
      });

    }
  });
});

//product gallery
$(function () {
  $("#aniimated-thumbnials").lightGallery({
    thumbnail: true,
  });
  $(".gallery-list").slick({
    speed: 1000,
    draggable: true,
    centerPadding: "0px",
    arrows: false,
    dots: false,
    asNavFor: ".gallery-nav",
    autoplay: true,
    pauseOnHover: true,
    autoplaySpeed: 1500,
    slidesToShow: 1,
    autoplay: false
  });
  $(".gallery-nav").slick({
    slidesToShow: 5,
    asNavFor: ".gallery-list",
    dots: false,
    arrows: false,
    draggable: false,
    focusOnSelect: true,
  });
});

// search bar 
const searchPopup = document.querySelector('.search-popup');
const searchBar = document.getElementById('searchBar');
const searchClose = document.getElementById('searchClose');

// Open search popup
searchPopup.addEventListener('click', function(e) {
  e.preventDefault();
  searchBar.classList.add('active');
});

// Close search popup when clicking the close button
searchClose.addEventListener('click', function() {
  searchBar.classList.remove('active');
});

// Close search popup when clicking outside of the search box
document.addEventListener('click', function(e) {
  if (!searchBar.contains(e.target) && !searchPopup.contains(e.target)) {
    searchBar.classList.remove('active');
  }
});
