//This function shall take in a list of json data (specified range for locations) 
//and return a list of events happened in the area (also in json format)
function searchEventsByLocation(callback) {
        
    var token = '4D7C5LFTZTL4ZV4BKBJ2'; //this is the token for using Eventbrite API
    var $events = $(document.getElementById("events"));

    //Here we use a json file as the data input, for testing
     $.getJSON("test_jsonData.json",function(data){ 
        //console.log(data);

        //Data is a json-type input data (form: [{latitude0, longitude0},{latitude1, longitude1}])
        //In default, data[0] contains the latitude and longitude of the NORTH-EAST specified location
        //data[1] contains the latitude and longitude of the SOUTH-WEST specified location
        //Together, they generate a range to find events inside the specified area

        //The event list found is now sorted by date
        $.get('https://www.eventbriteapi.com/v3/events/search/?token='+token, {
                'location.viewport.northeast.latitude':data[0].Latitude,
                'location.viewport.northeast.longitude':data[0].Longitude,
                'location.viewport.southwest.latitude':data[1].Latitude,
                'location.viewport.southwest.longitude':data[1].Longitude,
                'sort_by':'date', //change your sorting method here - options: 'date', 'distance', 'best'
                'expand':'venue,category' //add additional data requests here
            }, 
            function(list) {
                var result = null;
                var s = []; //for generating a event list
                if(list.events.length) {
                    for(var i=0;i<list.events.length;i++) {
                        var event = list.events[i];
                        var detail = new Object();
                        //Title
                        detail.title = event.name.text;
                        //Events in Eventbrite do not have authors
                        //Description
                        detail.description = event.description.text;
                        //Create time   
                        detail.created = event.created;
                        //Picture(optional)
                        if(event.logo!=null){
                            detail.picture=event.logo.url;
                        }
                        else{
                            detail.picture=null;
                        }
                        //Category(Hashtags)
                        //This is a list of hashtags/keywords
                        if(event.category!=null){
                            var hashtags = event.category.name.split('&');
                            detail.hashtag=hashtags;
                        }
                        else{
                            detail.hashtag=null;
                        }
                        //Location
                        //Latitude and Longitude are separately recorded
                        detail.latitude = event.venue.latitude;
                        detail.longitude = event.venue.longitude;

                        s.push(detail);
                    }

                }
               //result contains all the searching events in json format
                var res = JSON.stringify(s);
                // console.log(res);
                result = res;
                callback(result);
            }
        );
     });
}
    
