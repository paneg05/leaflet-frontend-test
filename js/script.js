
    var map = L.map('map');
    var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19}).addTo(map);

//recupera dados de inicialização do mapa
$.getJSON("https://terraq.com.br/api/teste-leaflet/visao-inicial", function(data){}).done(
    function(data){
        
        map.setView([data.initial_view.center.lat,
                     data.initial_view.center.lng],
                     data.initial_view.zoom
                     )
       console.log(data)
    }
)

$.getJSON('https://terraq.com.br/api/teste-leaflet/pontos',(data)=>{}).done(
    (data)=>{
        console.log(data)
    }
)


    function onEachFeature(feature, layer) {
        var popupContent = '<p>' + feature.geometry.type + '</p>';
        if (feature.properties && feature.properties.popupContent) {

            popupContent += "<br>"+feature.properties.popupContent;

        }
        
        layer.bindPopup(popupContent);
    }
    
    $.getJSON("https://terraq.com.br/api/teste-leaflet/pontos", function(data) {}).done(
        function(data) {
            var featureCollection = L.geoJSON(data, {
                pointToLayer: function (feature, latlng) {
                    var iconUrl = feature.properties.icon;
                    var featureIcon = L.icon({
                        iconUrl:iconUrl,
                        iconSize: [32, 37],
                        iconAnchor: [16, 37],
                        popupAnchor: [0, -28]
                    });
                    return L.marker(latlng, {icon: featureIcon});
                },
                onEachFeature: onEachFeature
            }).addTo(map);
        }		
    );
    




   







