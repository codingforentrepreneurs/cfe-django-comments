$(document).ready(function(){
    var endpoint = 'http://127.0.0.1:8000/api/comments/'
    var dataUrl = $(".load-comments").attr("data-url")
    $(".load-comments").after("<div class='form-container'></div>")

    getComments(dataUrl)

    function renderCommentLine(object){
      var author = "";
      if (object.user) {
        author = "<small>" + object.user + "</small>"
      }
      var timestamp = new Date(object.timestamp).toLocaleString()
      var html_ = "<div class='media cfe-media'><div class='media-body'>" + 
                  object.content + "<br/>" + author + 
                  "<small> on " +  timestamp + "</small>"
                  "</div></div>"
      return html_
    }
    
    function getComments(requestUrl){
        $.ajax({
          method: "GET",
          url: endpoint,
          data: {
            url: requestUrl,
          },
          success: function(data){
            if (data.length > 0){
              $(".load-comments").html('')
                $.each(data, function(index, object){
                  $(".load-comments").append(renderCommentLine(object))
              })
            }
            var formHtml = generateForm()
            $(".form-container").html(formHtml)
          },
          error: function(data){
            console.log('error')
            console.log(data)
          }
        })
    }

    function generateForm(){
      var html_ = "<form method='POST' class='comment-form'>" +
        "<textarea class='form-control' placeholder='Your comment...' name='content'></textarea><br/>" + 
        "<input class='btn btn-default' type='submit' value='Comment'></form>"
      return html_
    }

    function handleForm(formData){
      $.ajax({
        url: endpoint + "create/",
        method: "POST",
        data: formData + "&url=" + dataUrl,
        success: function(data){
          console.log(data)
          getComments(dataUrl)
        },
        error: function(data){
          console.log('error')
          console.log(data)
        }
      })
    }

    $(document).on('submit', '.comment-form', function(e){
      e.preventDefault()
      var formData = $(this).serialize()
      handleForm(formData)
    })







})