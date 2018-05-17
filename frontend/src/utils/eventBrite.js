const token = '4D7C5LFTZTL4ZV4BKBJ2'; //this is the token for using Eventbrite API
// const fetch = require('node-fetch');

const eventBrite = {
    searchEventsByLocation(data) {
        const url = `https://www.eventbriteapi.com/v3/events/search/?token=${token}&expand=venue,category`;
        const params = `&sort_by=best&location.viewport.northeast.latitude=${data[0].Latitude}&location.viewport.northeast.longitude=${data[0].Longitude}&location.viewport.southwest.latitude=${data[1].Latitude}&location.viewport.southwest.longitude=${data[1].Longitude}`
        
        return fetch(url + params).then(response => {
            if (response.ok) {
                return response.json();
            }
            // throw new Error('Request failed!');
        }, networkError => console.log(networkError.message)).then(jsonResponse => {
            if (jsonResponse == null) return {};
            return jsonResponse.events.map(event => {
                const tags = event.category != null ? event.category.name.split(/[ ,&]+/) : [];
                const pictures = event.logo != null ? [event.logo.url] : [];
                // console.log(event);
                return {
                    id: event.id,
                    position: {
                        lat: parseFloat(event.venue.latitude),
                        lng: parseFloat(event.venue.longitude)
                    },
                    name: event.name.text,
                    description: event.description.text,
                    description_html: event.description.html,
                    tags: tags,
                    pictures: pictures,
                }
            })
        })
    }
}

export default eventBrite;

// const testData =[
//                     {
//                         "Latitude": "-33.910388",
//                         "Longitude": "151.241950"
//                     },
//                     {
//                         "Latitude": "-33.920822",
//                         "Longitude": "151.219763"
//                     }
//                 ]

// eventBrite.searchEventsByLocation(testData);
