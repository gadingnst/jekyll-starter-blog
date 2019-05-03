function paginateBlog(that, event) {
  event.preventDefault()
  let pageUrl = $(that).attr('href')
  $.ajax({
    method: 'GET',
    url: pageUrl,
    dataType: 'HTML',
    beforeSend: function() {
      swal({
        icon: BASEURL + '/assets/img/tools/loading.gif',
        text: "Please Wait...",
        buttons: false,
        closeOnEsc: false,
        closeOnClickOutside: false
      })
    }
  })
  .done(response => {
    let
      htmlData = $(response).find('#content').html(),
      title = $(response).filter('title').text()
    swal.close()
    $('#content').html(htmlData)
    document.title = title
    window.history.pushState({html: htmlData, title: title}, title, pageUrl)
    new SmoothScroll().animateScroll(document.querySelector('#content'), {
      speed: 800
    })
    window.onpopstate = event => {
      if(event.state){
        $('#content').html(event.state.html)
        document.title = event.state.title
      }
    }
  })
  .fail((response, stats, xhr) => {
    swal.close()
    swal({
      icon: "error",
      title: "Error",
      text: response.status+" "+xhr
    })
  })
}
