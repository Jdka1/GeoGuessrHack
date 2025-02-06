javascript: (
    function() {
        let performanceEntries = performance.getEntriesByType('resource');
        const targetUrlPattern = /https:\/\/maps\.googleapis\.com\/maps\/api\/js\/GeoPhotoService\.GetMetadata/;
        
        let networkRequests = performanceEntries.filter(function(entry) {
            return targetUrlPattern.test(entry.name);
        });

        if (networkRequests.length > 0) {
            networkRequests.forEach(function(request) {
                let script = document.createElement('script');
                let request_name = request.name.replace(/(callback=)[^&]+/, "$1handleResponse");

                console.log(request_name);
                script.src = request_name;
                document.body.appendChild(script);
                
                window.handleResponse = function(data) {
                    console.log("Received data:", data);

                    try {
                        let lat = data[1][0][5][0][1][0][2];
                        let lng = data[1][0][5][0][1][0][3];

                        console.log(lat, lng);
                        window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');

                    } catch (error) {
                        console.error("Error extracting location data:", error);
                        alert("Could not extract location data.");
                    }
                };
            });
        } else {
            console.log("No matching requests found.");
        }
    }
)();
