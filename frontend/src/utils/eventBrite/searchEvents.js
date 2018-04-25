var token = '4D7C5LFTZTL4ZV4BKBJ2'; //this is the token for using Eventbrite API

//This function shall take in a list of json data (specified range for locations) 
//and return a list of events happened in the area (also in json format)

/** NOTICE
 * 
 *  The function uses a callback to return the result to the calling function
 * 
 * */


function searchEventsByLocation(callback, data) {

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
            /**
             * The json structure of one event in the list
             * {
             *  Title: xxx,                                         - string
             *  Description: xxx,                                   - string
             *  Picture: xxx ,                                      - string: url of the picture or null if picture does not exist
             *  Created: xxx ,                                      - string
             *  Tags: [xxx, xxx, ...],                              - a list of strings (multiple tags possible)
             *  Position: {latitude:xxx, longitude:xxx}             - an object with 2 members (latitude and longitude)
             * }
             * 
             * */

            var s = []; //for generating an event list
            if(list.events.length) {
                for(var i=0;i<list.events.length;i++) {
                    var event = list.events[i];
                    var detail = new Object();
                    //Title
                    detail.Title = event.name.text;
                    //Events in Eventbrite do not have authors
                    //Description
                    detail.Description = event.description.text;
                    //Create time   
                    detail.Created = event.created;
                    //Picture(optional)
                    if(event.logo!=null){
                        detail.Picture=event.logo.url;
                    }
                    else{
                        detail.Picture=null;
                    }
                    //Category(Hashtags)
                    //This is a list of hashtags/keywords
                    if(event.category!=null){
                        var hashtags = event.category.name.split('&');
                        detail.Tags=hashtags;
                    }
                    else{
                        detail.Tags=null;
                    }
                    //Location
                    //Latitude and Longitude are separately recorded
                    var position = {latitude: event.venue.latitude, longitude: event.venue.longitude};
                    detail.Position = position;

                    s.push(detail);
                }

            }
            //result contains all the searching events in json format
            var res = JSON.stringify(s);
            // console.log(res);
            result = res;

            //use callback to return json-format result
            callback(result);
        }
    );
}
    
