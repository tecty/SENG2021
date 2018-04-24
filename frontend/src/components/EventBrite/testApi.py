import requests
import json

with open('test_jsonData.json', 'r') as f:
    position_dict = json.load(f)

# EventBrite searches a list of events by inputting the northeast and southwest latitude-longitude address

payload = {"location.viewport.northeast.latitude":position_dict[0]['Latitude'],"location.viewport.northeast.longitude":position_dict[0]['Longitude'],"location.viewport.southwest.latitude":position_dict[1]['Latitude'],"location.viewport.southwest.longitude":position_dict[1]['Longitude'], "expand":"venue"}

response = requests.get(
    "https://www.eventbriteapi.com/v3/events/search/",
    headers = {
        "Authorization": "Bearer IB74FVDGRHN7PZCDAZAC"
    },
    params = payload,
    verify = True,  # Verify SSL certificate
)

print(response.json()['events'][0])
# for each in response.json(events):
#     print(each)
# Events in EventBrite do not have authors
# Most of the events contain one picture in description
# Some events do not have pictures in description
# If an event does not have a picture in description, it shall return none
# with open('test_output.json','w') as d:
#     d.write('[')
#     for each in response.json()['events']:
#         newEvent = {'Title':each['name']['text'],'Description':each['description']['text'],'Created':each['created'], 'Image':None, 'HashTags':None, 'Latitude':each['venue']['latitude'],'Longitude':each['venue']['longitude']}
#         if each['logo']:
#             newEvent['Image'] = each['logo']['url']
#         if each['category']:
#             print(each['category'])
#         d.write(json.dumps(newEvent))
#         if each != response.json()['events'][-1]:
#             d.write(',')
#     d.write(']')
