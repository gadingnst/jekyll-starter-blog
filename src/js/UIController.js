(function( $, window, undefined ) {
  // Menu
  $("a#slide").click(function(){
    $("#sidebar,a#slide,#fade").addClass("slide")
    $("#open").hide()
    $("#search").hide()
    $("#close").show()
  })

  $("#fade").click(function(){
    $("#sidebar,a#slide,#fade").removeClass("slide")
    $("#open").show()
    $("#search").show()
    $("#close").hide()
  })

  // Search
  let bs = {
    close: $(".icon-remove-sign"),
    searchform: $(".search-form"),
    canvas: $("#search-container"),
    dothis: $('.dosearch')
  }

  bs.dothis.on('click', function() {
    $('.search-wrapper').toggleClass('active')
    bs.searchform.toggleClass('active')
    bs.searchform.find('input').focus()
    bs.canvas.toggleClass('search-overlay')
    $('.search-field').searchPosts()
  })

  bs.close.on('click', function() {
    $('.search-wrapper').toggleClass('active')
    bs.searchform.toggleClass('active')
    bs.canvas.removeClass('search-overlay')
  })

  // Scroll
  new SmoothScroll('a[href*="#"]')

  // skill bar init
  $('.my-skill-bar').simpleSkillbar()

  $(window).scroll(function(event) {
    if ($(window).scrollTop() > 85) $('#navbar').addClass('nav-color')
    else $('#navbar').removeClass('nav-color')
  })

  // $(".document-load").on("click", documentLoad)

  $(window).on('load', function() {
    setTimeout(function() {
      $('.preloader-container').fadeOut('slow')
      $('body').removeClass('in-loading')
      AOS.init({
        easing: 'ease-out-back',
        duration: 1000
      })
    }, 250)
  })

})( $, window )
