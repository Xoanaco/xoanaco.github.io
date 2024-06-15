let map = L.map('map', {
    maxBounds: [
        [45.0, -12.0],  // Coordenadas noroeste (aumentado un poco)
        [26.0, 5.0]     // Coordenadas sureste (bajado para incluir las Islas Canarias)
    ],
    maxBoundsViscosity: 1.0
}).setView([40.416775, -3.703790], 6); // Coordenadas de España

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    minZoom: 5,
    maxZoom: 16
}).addTo(map);

let municipios = {
  "Madrid": [40.416389, -3.702500],
    "Barcelona": [41.388611, 2.159167],
    "Málaga": [36.720000, -4.420278],
    "Sevilla": [37.382778, -5.973056],
    "Zaragoza": [41.655833, -0.877778],
    "Las Palmas de Gran Canaria": [28.099722, -15.413333],
    "Palma": [39.569167, 2.650000],
    "Murcia": [37.986944, -1.130000],
    "Santa Cruz de Tenerife": [28.468056, -16.254167],
    "Valencia": [39.466667, -0.375000],
    "Santiago de Compostela": [42.880519, -8.545630],
    "Santander": [43.464722, -3.804444],
    "Valladolid": [41.652222, -4.723611],
    "Pamplona": [42.812526, -1.645774],
    "Oviedo": [43.362343, -5.849389],
    "Bilbao": [43.263000, -2.934600],
    "Logroño": [42.466667, -2.450000],
    "Melilla": [35.292778, -2.938611],
    "Marbella": [36.515419, -4.885833],
    "Jerez de la Frontera": [36.685556, -6.126667],
    "Jaén": [37.773972, -3.790203],
    "Huelva": [37.261421, -6.944722],
    "Granada": [37.177336, -3.598557],
    "Elche": [38.269933, -0.712560],
    "Córdoba": [37.888175, -4.779383],
    "Cartagena": [37.605276, -0.986234],
    "Torrevieja": [37.978143, -0.686108],
    "Toledo": [39.862831, -4.027323],
    "San Cristóbal de La Laguna": [28.487400, -16.320940],
    "Cádiz": [36.527061, -6.288596],
    "Badajoz": [38.878337, -6.970517],
    "Almería": [36.838140, -2.459740],
    "Alicante": [38.345170, -0.481490],
    "Algeciras": [36.140800, -5.456100],
    "Albacete": [38.994349, -1.858542],
    "San Sebastián": [43.322322, -1.983888],
    "Salamanca": [40.970104, -5.663540],
    "A Coruña": [43.362343, -8.411540],
    "Gijón": [43.535729, -5.661523],
    "Getafe": [40.308250, -3.732640],
    "Terrassa": [41.563211, 2.010535],
    "Tarragona": [41.118881, 1.245460],
    "Ourense": [42.340872, -7.864736],
    "Burgos": [42.340872, -3.699731],
    "Badalona": [41.446993, 2.245032],
    "Avilés": [43.556259, -5.924730],
    "Mataró": [41.539400, 2.444450],
    "Lleida": [41.617600, 0.623610],
    "León": [42.598700, -5.567080],
    "Vitoria": [42.846718, -2.671635]
    // Puedes añadir más municipios y sus coordenadas aquí
};

let municipiosEncontrados = 0;
let listaEncontrados = [];

function adivinarMunicipio() {
    let input = document.getElementById("municipioInput").value;
    let normalizedInput = normalizeString(input);
    let matchedMunicipio = Object.keys(municipios).find(municipio => normalizeString(municipio) === normalizedInput);

    if (matchedMunicipio && !listaEncontrados.includes(matchedMunicipio)) {
        let coords = municipios[matchedMunicipio];
        L.circleMarker(coords, {
            radius: 8,
            color: 'green',
            fillColor: '#32CD32',
            fillOpacity: 0.5
        }).addTo(map);
        map.setView(coords, 10); // Ajusta el nivel de zoom si es necesario

        // Actualiza el contador y la lista
        municipiosEncontrados++;
        listaEncontrados.push(matchedMunicipio);
        document.getElementById("contadorMunicipios").textContent = municipiosEncontrados;

        let listaMunicipios = document.getElementById("listaMunicipios");
        let nuevoItem = document.createElement("li");
        nuevoItem.textContent = matchedMunicipio;
        listaMunicipios.appendChild(nuevoItem);
    } else if (listaEncontrados.includes(matchedMunicipio)) {
        alert("Ya has encontrado este municipio. Intenta otro.");
    } else {
        alert("Municipio no encontrado. Intenta de nuevo.");
    }
    document.getElementById("municipioInput").value = ""; // Limpiar el campo de entrada
}

function normalizeString(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function checkEnter(event) {
    if (event.key === 'Enter') {
        adivinarMunicipio();
    }
}

// Deshabilitar el scroll del mapa inicialmente
map.scrollWheelZoom.disable();

// Habilitar el scroll del mapa cuando el mouse está sobre el mapa
map.on('focus', function() {
    map.scrollWheelZoom.enable();
});

// Deshabilitar el scroll del mapa cuando el mouse no está sobre el mapa
map.on('blur', function() {
    map.scrollWheelZoom.disable();
});
