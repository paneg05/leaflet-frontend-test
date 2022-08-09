
    var map = L.map('map');
    var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19}).addTo(map);






//recupera dados de inicialização do mapa
$.getJSON("https://terraq.com.br/api/teste-leaflet/visao-inicial", function(data){}).done(
    function(data){
        //seta as configurções de exibição inicial
        map.setView([data.initial_view.center.lat,
                     data.initial_view.center.lng],
                     data.initial_view.zoom
                     )
        
       //adicionando layers
        let bt= L.tileLayer(data.tile_layers[0].url,{})
        let st = L.tileLayer(data.tile_layers[1].url,{})

        let baselayers = {
            OpenstreetMap:bt,
            Satélite:st
        }
        //adicionando controle de layers
        L.control.layers(baselayers).addTo(map)

    }
)



let bs = L.tileLayer()

//adiciona dados aos popups dos pontos
    function onEachFeature(feature, layer) {
        var popupContent = '<p>' + feature.geometry.type + '</p>';
        if (feature.properties && feature.properties.popupContent) {
            //testa se as propriedades existem dentro do objeto e as adiciona aos popups
            feature.properties.precipitacao ? popupContent += "<p>precipitação: " + feature.properties.precipitacao+"</p>":popupContent
            feature.properties.temperatura ? popupContent += "<p>temperatura: " + feature.properties.temperatura+"</p>":popupContent
            feature.properties.umidade ? popupContent += "<p>umidade:"+ feature.properties.umidade+"</p>":popupContent
            feature.properties.vento ? popupContent += "<p>vento: "+feature.properties.vento+"</p>":popupContent
            feature.properties.visibilidade ? popupContent += "<p>visibilidade: "+feature.properties.visibilidade+"</p>":popupContent
            popupContent += "<br>"+feature.properties.popupContent;

        }
        
        layer.bindPopup(popupContent);
    }
    //recupera dados dos pontos do servidor
    $.getJSON("https://terraq.com.br/api/teste-leaflet/pontos", function(data) {}).done(
        //para cada ponto retornado do servidor monta um ponto recuperando seus devidos valores
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
    


//menu flutuante com os dados do usuário
//recupera os dados do usuário do servidor
$.getJSON('https://terraq.com.br/api/teste-leaflet/user',(data)=>{}).done((data)=>{

        //cria os elementos html com os dados recupeados do servidor
        let img ='<img src="'+data.avatar+'">'
        let nome='<p class="nome"><strong>nome: </strong>'+data.nome+'<p>'
        let email= '<P><strong>Email: </strong>'+data.email+'<p>'
        let nascimento ='<p><strong>Nascimento: </strong>'+data.data_nascimento+'<p>'
        let sexo='<p><strong>Sexo: </strong>'+data.sexo+'<p>'
        let telefone='<p><strong>Telefone: </strong>'+data.telefone+'<p>'

        //insere os elementos html na pagina
        $('.user').append(img,nome,email,nascimento,sexo,telefone)



})

    // adiciona e remove classe close no menu usuário sempre que ele é clicado
    $(document).ready(()=>{
        $('.user').click(()=>{
            $('.user').toggleClass('close')
        })
    })


// botões que alternam entre a visualização dos dados e do mapa
//leva a visualização do mapa
$('.btn-chart').click(()=>{


    window.scrollTo({
        top:$('.leaflet-container').height(),
        left: 0,
        behavior: "smooth"
    })

 
})

//leva a visualização dos dados
$('.btn-map').click(()=>{
    window.scrollTo({
        top:0,
        left:0,
        behavior: 'smooth'
    })
})


// gráficos

const ctx=$('#myChart')

const myChart = new Chart(ctx,{
    type:'bar',
    data:{

    }
})







   






