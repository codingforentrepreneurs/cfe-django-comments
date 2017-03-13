$(document).ready(function(){
    var endpoint = 'http://127.0.0.1:8000/api/comments/'
    var dataUrl = $(".load-comments").attr("data-url")
    $.ajax({
      method: "GET",
      url: endpoint,
      data: {
        url: dataUrl,
      },
      success: function(data){
        $.each(data, function(index, object){
          $(".load-comments").append("<li>" + object.content + "</li>")
        })
      },
      error: function(data){
        console.log('error')
        console.log(data)
      }
    })
  })