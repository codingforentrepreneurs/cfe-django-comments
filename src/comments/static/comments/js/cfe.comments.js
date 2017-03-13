$(document).ready(function(){
    var endpoint = 'http://127.0.0.1:8000/api/comments/'
    var dataUrl = $(".load-comments").attr("data-url")
    

    getComments(dataUrl)
    
    function getComments(requestUrl){
        $.ajax({
          method: "GET",
          url: endpoint,
          data: {
            url: requestUrl,
          },
          success: function(data){
            if (data.length > 0){
                $.each(data, function(index, object){
                $(".load-comments").append("<li>" + object.content + "</li>")
              })
            }
            var formHtml = generateForm()
            $(".load-comments").after(formHtml)
          },
          error: function(data){
            console.log('error')
            console.log(data)
          }
        })
    }

    function generateForm(){
      var html_ = "<form method='POST' class='comment-form'><textarea name='content'></textarea><input type='submit' value='Comment'></form>"
      return html_
    }

    function handleForm(formData){
      console.log(formData)
      $.ajax({
        url: endpoint + "create/",
        method: "POST",
        data: formData,
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

    // $(document).on('submit', '.comment-form', function(e){
    //   e.preventDefault()
    //   var formData = $(this).serialize()
    //   handleForm(formData)
    // })







})