(function($) {
  $.fn.searchPosts = function(options, data) {
    let settings = $.extend({
      jsonFile: BASEURL + '/api/posts.json',
      jsonFormat: 'title,category,desc,url,date,shortdate',
      template: '<li><article><a class="document-load" href="{url}">{title} <span class="entry-date"><time datetime="{date}">{date}</time></span></a></article></li>',
      searchResults: '.search-results',
      searchResultsTitle: '<h4>Search Results:</h4>',
      limit: '5',
      noResults: '<p>Oops!<br/><small>Nothing Found ! 🙁</small></p>'
    }, options)

    let properties = settings.jsonFormat.split(',')
    let jsonData = [], origThis = this, searchResults = $(settings.searchResults)
    if(settings.jsonFile.length && searchResults.length){
      $.ajax({
        type: "GET",
        url: settings.jsonFile,
        dataType: 'JSON',
        beforeSend: function() {
          searchResults.html('<p>🔍 Getting data, please wait..</p>')
        }
      }).done(data => {
        searchResults.html('')
        jsonData = data
        registerEvent()
      }).fail((res, stats, xhr) => {
        searchResults.html('<p>❌ Error in getting data: '+res.status+' '+xhr+'</p>')
        console.error('***Got error in getting data***')
        console.error(res)
        console.error(stats)
        console.error(xhr)
      })
    }

    function registerEvent(){
      origThis.keyup(function(e){
        if($(this).val().length){
          writeMatches(performSearch($(this).val()))
        }else{
          clearSearchResults()
        }
      })
    }

    function performSearch(str){
      let matches = []
      $.each(jsonData,function(i,entry){
        for(let i=0; i<properties.length; i++) {
          if(entry[properties[i]] !== undefined && entry[properties[i]].toLowerCase().indexOf(str.toLowerCase()) !== -1){
            matches.push(entry)
            i=properties.length
          }
        }
      })
      return matches
    }

    function writeMatches(m){
      clearSearchResults()
      searchResults.append( $(settings.searchResultsTitle) )

      if(m.length){
        $.each(m,function(i,entry){
          if(i<settings.limit){
            let output=settings.template
            for(let i=0; i<properties.length; i++){
              let regex = new RegExp("\{" + properties[i] + "\}", 'g')
              output = output.replace(regex, entry[properties[i]])
            }
            searchResults.append($(output))
          }
        })
      }else{
        searchResults.append( settings.noResults )
      }
    }

    function clearSearchResults(){
      searchResults.children().remove()
    }
  }
}($))
