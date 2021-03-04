
$(document).ready( function() {

    let endpoint = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    let apikey = "kgVkz0gLH6GcyjANjfm0dnH2cB8Tmd42";
    let query = "?q=";

    

    $("#search-btn").on("click", function() {
      $("#articles-container").empty();

        let keyword = $("#search-term").val().trim();
        let startYear = $("#start-year").val().trim();
        let endYear = $("#end-year").val().trim();
        let numRecords = $("#num-records").val().trim();

        if (!numRecords) {
            numRecords = 10;
        }

        let url = `${endpoint}${query}${keyword}`;
        
        if (startYear) {
            url += "&begin_date=" + startYear + "0101";
        }
        
        if (endYear) {
            url += "&end_date=" + endYear + "0101";
        }

        url += "&api-key=" + apikey;

        $.ajax( {
            method : "GET",
            url : url,
        }).then( function(response) {
            console.log(response);

            for (let i = 0; i < numRecords; i++) {
                let headline = response.response.docs[i].headline.main;
                let snippet = response.response.docs[i].snippet;
                let byline = response.response.docs[i].byline.original;
                let link = response.response.docs[i].web_url;
                let pubdate = response.response.docs[i].pub_date;

                pubdate = pubdate.slice(0, 10);

                let newArticle = $("<article>");
                headline = $("<h2>").html("<a href='" + link + "' target='_blank'>" + headline + "</a>");
                date = $("<h5>").text(pubdate);
                snippet = $("<p>").text(snippet);
                byline = $("<cite>").text(byline);

                newArticle.append(headline, date, snippet, byline);

                $("#articles-container").append(newArticle);
            }
        })

        

    });

    $("#clear-btn").on("click", function() {
      $("#articles-container").empty();
    })




})