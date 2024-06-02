# GeoGuessrHack 🔍🌎

Find your location instantly 📍

### Use and Installation

If the bookmarklet does not work clicked, reload the GeoGuessr page and try again.

Follow the tutorial below to install the bookmarklet. Paste the javascript code below into the URL box and name the bookmarklet whatever you want

<br>

[![Video](https://img.youtube.com/vi/qL3AEQHb7yw/0.jpg)](https://www.youtube.com/watch?v=qL3AEQHb7yw)

```
javascript: (
    function() {
        let performanceEntries = performance.getEntriesByType('resource');
        console.log(performanceEntries);
        let networkRequests = performanceEntries.filter(function(entry) {
            return true
        });
        
        let item = networkRequests.find(function(element) {
            return element.name.includes('games');
        });

        if (item) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', item.name, true);
            xhr.responseType = 'json';
            xhr.onload = function() {
                if (xhr.status === 200) {
                    let data = xhr.response;
                    console.log(data);
                    let curRoundData = data['rounds'][data['round'] - 1];
                    let latLng = { 'lat': curRoundData['lat'], 'lng': curRoundData['lng'] };
                    console.log(latLng);
                    let googleMapsUrl = `https://maps.google.com/?q=${latLng['lat']},${latLng['lng']}&ll=${latLng['lat']},${latLng['lng']}&z=3`;
                    console.log(googleMapsUrl);
                    window.open(googleMapsUrl);
                } else {
                    console.error("Error fetching JSON response. Status:", xhr.status);
                }
            };
    
            xhr.onerror = function() {
                console.error("Error fetching JSON response.");
            };
    
            xhr.send();
        } else {
            console.log("No network request found with URL including 'games'.");
        }
       
    }
)();
```

### Disclaimer

Please note that the GeoGuessrHack is intended for use in single-player games only. Any use of this hack in multiplayer or competitive environments may result in penalties or bans from the GeoGuessr platform. By using this hack, you acknowledge that you are solely responsible for any consequences that may arise from its use, including but not limited to account restrictions or bans. The creator of this hack holds no liability for any actions taken against your account due to the use of this software in violation of GeoGuessr's terms of service. Play fair, play responsibly. 🚫👨‍⚖️
