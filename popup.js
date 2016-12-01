$(document).ready(function(){
        
    //check previous status select field
    if (localStorage["holdSelect"] !== undefined) {
        $("#searchEng").val(localStorage["holdSelect"]);
        $(".hImage").attr("src","images/"+$("#searchEng").val()+".png");
    }
    
    //remember state of the select field
    $("#searchEng").change(function() {
        localStorage["holdSelect"]=$("#searchEng").val();
        $(".hImage").attr("src","images/"+$("#searchEng").val()+".png");
    });
    
    //read input characters for autocomplete
    $("#inputField").keyup(function(e){
        //if enter pressed do search()
        if(e.keyCode === 13){
            search($(this).val());
        }
        
        var search_query = $(this).val();
        search_result = [];
        //request data for autocomplete
        $.getJSON('http://suggestqueries.google.com/complete/search?client=chrome&q='+search_query, function(data) {
            var count = data[1].length > 12 ? 12 : data[1].length;
            for(var i = 0; i < count; i++) {
                search_result.push(data[1][i]);
            }
            $("#inputField").autocomplete({
                source: search_result,
                select: function(event, ui){
                    //uncomment to perform a search immediately after selecting an item
                    //search($(this).val());
                }
            });
        });
    });
});

//open selected search engine with our query in new tab
function search(query) {
    var gUrl="https://www.google.ru/#newwindow=1&q=";
    var yUrl="https://yandex.ru/search/?text=";
    var temp = query.split(" ");
    var searchUrl = $("#searchEng").val().toString() === "Google" ? gUrl : yUrl;
    searchUrl += temp.join("+");
    chrome.tabs.create({ url: searchUrl });
};