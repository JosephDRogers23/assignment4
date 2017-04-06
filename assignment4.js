// The anonymous function below will fire on page load

// Some things to consider
// $.ajax(); to make your requests a little easier. Or the vanilla js way, it's up to you.
// $.on(); for event handling
// Remember, selecting elements in jQuery is like selecting them in CSS
// You'll probably have to manipulate some strings
// some jQuery functions to help display results
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types

(function() {
  // Magic!
  console.log('Keepin\'n it clean with an external script!');
})();




/* Sources:
https://stackoverflow.com/questions/4727854/javascript-html-constructing-a-quoted-google-search-string
https://stackoverflow.com/questions/8951810/how-to-parse-json-data-with-jquery-javascript
*/
$(document).ready(function() {
  console.log("Hereee");
  $(".flexsearch-wrapper").on("input", function() {
    var search = $(".flexsearch-input").val();
    $("#flexsearch-display").empty();
    if(search.length!==0)
    {
      find(search);
    }
  });


function find(text){
  $.ajax({
    type: 'GET',
    dataType: 'JSON',
    url: 'http://www.mattbowytz.com/simple_api.json?data=all',
    success: function(data) {
        var search_term = text.toLowerCase();
        $.each(data.data, function(index, value) {
          $.each(value, function(i, info){
          //  console.log(info);
            if(info.length >= search_term.length)
            {
              var found_term = info.substring(0, search_term.length).toLowerCase();
              //console.log("Found term" + found_term);
              if(found_term.indexOf(search_term)!==(-1))
              {
                console.log("MADE IT");
                var url = "\'http://google.com/search?btnI=1&q=\\\'" + info + "\'";
                url = url.replace(" ", "%20")
                console.log(url);
                var term = "<li><a href=" + url + " target='_blank'>" + info + "</a></li";
                console.log(term);
                $("#flexsearch-display").append(term);
              }
            }
            })

        });
    }
  });
}

});
