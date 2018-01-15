$(document).ready(function() {
  $('form').on('submit', function(evento) {
    evento.preventDefault()

    //Input del usuario
    var search = $('#search').val()
    $('#search').val('')

    var result = search.split('-')
    var API_URL = `https://api.lyrics.ovh/v1/${result[0]}/${result[1]}`

    $.ajax({
      url: API_URL,
      success: function(data, text) {
        var artist = result[0]
        var title = result[1]

        var lyrics = data.lyrics
        var lyricsArray = lyrics.split('\n')
        var parsedLyrics = ''

        for (var i = 0; i < lyricsArray.length; i++) {
          if (lyricsArray[i] !== '') {
            parsedLyrics += `<p class="card-text text-white">${
              lyricsArray[i]
            }</p>`
          } else {
            parsedLyrics += '<br />'
          }
        }

        var showLyrics = `
            <div class="card-block">
                    <h4 class="text-uppercase text-white">${artist} - ${title}</h4>
                        <div> ${parsedLyrics} 
                        </div>
            </div>`

        $('.card').html(showLyrics)
      },

      error: function(error, request) {
        if (error) $('#lyrics').html('Sorry! No results found - ' + request)
      }
    })
  })
})
