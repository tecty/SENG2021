function searchEventsByLocation() {
        
    var token = '4D7C5LFTZTL4ZV4BKBJ2';
    var $events = $(document.getElementById("events"));

    // $.getJSON("test_jsonData.json",function(data){ 
        $.get('https://www.eventbriteapi.com/v3/events/search/?token='+token, {'location.viewport.northeast.latitude':'-33.910388','location.viewport.northeast.longitude':'151.241950','location.viewport.southwest.latitude':'-33.920822','location.viewport.southwest.longitude':'151.219763',"expand":"venue,category"}, function(list) {
            if(list.events.length) {
                var s = "<ul class='eventList'>";
                for(var i=0;i<list.events.length;i++) {
                    var event = list.events[i];
                    s += "<li>";
                    //Title
                    s += event.name.text;
                    //Events in Eventbrite do not have authors
                    //Description
                    s += event.description.text;
                    //Create time
                    s += event.created;
                    //Picture(optional)
                    if(event.logo!=null)
                        s+=event.logo.url;
                    //Category(Hashtags)
                    if(event.category!=null)
                        s+=event.category.name;
                    //Location
                    s += event.venue.latitude;
                    s += event.venue.longitude;
                    s += "</li>";
                }
                s += "</ul>";
                $events.html(s);
            } else {
                $events.html("<p>Sorry, there are no upcoming events.</p>");
            }
        });
    // });
}
    
