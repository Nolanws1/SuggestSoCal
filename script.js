$(document).ready(function() {


    var wellness = "category_slugs=beauty_health, chiropractic, dental, dermatology, eye-vision, facial, fitness, fitness_classes, gym, hair-removal, hair-salon, health-beauty, manicure-pedicure, massage, personal-training, pilates, spa, tanning, teeth-whitening, yoga";
    var queryShopping = "https://api.discountapi.com/v2/deals?&api_key=" + apiKey; 
    var queryWellness = "https://api.discountapi.com/v2/deals?" + wellness + "&api_key=" + apiKey; 
    var queryDining = "https://developers.zomato.com/api/v2.1/location_details?entity_id=281&entity_type=city&apikey=278895572b867605262933245620ff46";
    var apiKey = "uFVXWRdL";
    var i = -1;

    // This is the function to call dining and restaurant recommendations
      function getDinner(i) {
        $.ajax({
          url: queryDining,
          method: "GET",
        }).then(function (response) {
          var resName = response.best_rated_restaurant[i].restaurant.name;
          var imgUrl = response.best_rated_restaurant[i].restaurant.featured_image;
          var menuUrl = response.best_rated_restaurant[i].restaurant.menu_url;
          var resRating = response.best_rated_restaurant[i].restaurant.user_rating.aggregate_rating;

          // This callback sets the page content
          function displayNewDinner() {
            $(".dining #text").text(resName);
            $(".dining #rating").text("Rating: " + resRating + "/5");
            $("#dining_card").attr({src: imgUrl, alt: "restaurant image"});
            $(".dining #link").attr("href", menuUrl);
          };
          displayNewDinner();
        });
      };
    
      // This click handler allows the user to generate a new deal, up to 10 max.
      $(".dining #next").on("click", function (event) {
        event.preventDefault();
        i++;
        if (i > 9) {
          i = 0;
          getDinner(i);
        } else {
          getDinner(i);
        }
      });
    
    // This is the function to get event suggestions
    function getEntertainment(i){
    $.ajax({
        url: "https://app.ticketmaster.com/discovery/v2/events.json?&city=Riverside&size=20&apikey=TLhN2TG989Us31qJyUNOxHMCWjq9wCYp",
        method: "GET"
    }).then(function(response){
        var eventId = response._embedded.events[i].id;
        console.log(response)
        $.ajax({
            url: "https://app.ticketmaster.com/discovery/v2/events/" + eventId + "/images.json?&size=10&apikey=TLhN2TG989Us31qJyUNOxHMCWjq9wCYp",
            method: "GET",
        }).then(function(responseImg){
            var eventName = response._embedded.events[i].name;
            var eventSales = response._embedded.events[i].url;
            var eventPicture = responseImg.images[i].url;
            // This callback sets the page content
            function displayNewDeal(){
                $(".entertainment #text").text(eventName);
                $("#entertainment_card").attr({src: eventPicture, alt: "event image"});
                $(".entertainment #link").attr("href", eventSales);
            };
            displayNewDeal();
        });
      });
    };
    
    // This click handler allows the user to get a new event. 
    $(".entertainment #next").on("click", function(event){
        event.preventDefault();
        i++;
        if (i > 9){
            i = 0;
            getEntertainment(i);
        } else {
            getEntertainment(i);
        };
    });
    
    // This is the function to get wellness deals
    function getWell(i){
        $.ajax({
            url: queryWellness,
            method: "GET"
        }).then(function(response){
            var description = response.deals[i].deal.short_title;
            var imgUrl = response.deals[i].deal.image_url;
            var dealUrl = response.deals[i].deal.url;
            // This callback sets the page content
            function displayNewDeal(){
                $(".wellness #text").text(description);
                $("#wellness_card").attr({src: imgUrl, alt: "deal image"});
                $(".wellness #link").attr("href", dealUrl);
            };
            displayNewDeal();
        });
    };
    
    // This click handler allows the user to get a new wellness deal. 
    $(".wellness #next").on("click", function(event){
        event.preventDefault();
        i++;
        if (i > 19){
            i = 0;
            getWell(i);
        } else {
        getWell(i);
        };
    });
    
     
});