//toggle
$('button').click(function() {
  $(this).toggleClass('expanded').siblings('div').slideToggle();
});

// Write any custom javascript functions here
/**$(document).ready(function () {
    $('.crsl').slick({
        centerMode: true,
        centerPadding: '3px',
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true, 
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 6,
        arrows: true
    });
});**/

/* fixed menu */
$(window).scroll(function() {
  if ($(document).scrollTop() > 10) {
    $('#nav').addClass('shrink');
  } else {
    $('#nav').removeClass('shrink');
  }
});

/* smooth scroll */
$(document).ready(function(){
    $('a[href^="#"]').on('click',function (e) {
        e.preventDefault();
        var wdw = this.hash;
        var $wdw = $(wdw);
        $('html, body').stop().animate({
            'scrollTop': $wdw.offset().top
        }, 700, 'swing', function () {
            window.location.hash = wdw;
        });
    });
});