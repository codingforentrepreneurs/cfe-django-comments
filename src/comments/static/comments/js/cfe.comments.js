 function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
          var cookie = jQuery.trim(cookies[i]);
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
  }


$(document).ready(function(){
    var endpoint = 'http://127.0.0.1:8000/api/comments/'
    var dataUrl = $(".load-comments").attr("data-url")
    var isUser = false;
    $(".load-comments").after("<div class='form-container'></div>")

    getComments(dataUrl)
     
    function renderCommentLine(object){
      var authorImage = '<div class="media-left">' +
      '<img class="cfe-user-image media-object" src="' + object.image + '" alt="..."></div>'


      var author = "";
      if (object.user) {
        author = "<small>via " + object.user.username + "</small>"
      }
      var timestamp = new Date(object.timestamp).toLocaleString()
      var html_ = "<div class='media cfe-media'>" + authorImage +
                 "<div class='media-body'>" + 
                  object.content + "<br/>" + author + 
                  "<small> on " +  timestamp + "</small>"
                  "</div></div>"
      return html_
    }
    
    function getComments(requestUrl){
        // console.log(getCookie('isUser'))
        isUser = $.parseJSON(getCookie('isUser'));
        
        
        $(".load-comments").html('<h3>Comments</h3>')
        $.ajax({
          method: "GET",
          url: endpoint,
          data: {
            url: requestUrl,
          },
          success: function(data){
            if (data.length > 0){
              
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
      if (isUser){
          return html_
      } else {
        html_ = '<div class="text-center" style="padding:20px">Login Required to Comment</div>'
        return html_
      }
    }
    function formatErrorMsg(jsonResponse){
      var message = ""
      $.each(jsonResponse, function(key, value){
        if (key == 'detail'){
          message += value + "<br/>"
        } else {
          message += key + ": " + value + "<br/>"
        }
        
      })
      var formattedMsg = '<div class="srvup-alert-error alert alert-danger alert-dismissible">'+
      '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
      message +
      "</div>"
      return formattedMsg
    }
    function handleForm(formData){
      $.ajax({
        url: endpoint + "create/",
        method: "POST",
        data: formData + "&url=" + dataUrl,
        success: function(data){
          console.log(data)
          // getComments(dataUrl)
          $(".load-comments").append(renderCommentLine(data))
          var formHtml = generateForm()
          $(".form-container").html(formHtml)
        },
        error: function(data){
          console.log('error')
          console.log(data.responseJSON)
          var formErrorExists = $('.srvup-alert-error')
          if (formErrorExists.length > 0){
            formErrorExists.remove()
          }
          var msg = formatErrorMsg(data.responseJSON)
          $(".comment-form textarea").before(msg)
        }
      })
    }

    $(document).on('submit', '.comment-form', function(e){
      e.preventDefault()
      var formData = $(this).serialize()
      handleForm(formData)
    })







})