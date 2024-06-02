
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


