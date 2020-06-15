

document.addEventListener('DOMContentLoaded', () => {
    if(document.querySelector('#ubicacion-meeti')) {
        mostrarMapa();
    }
});


function mostrarMapa() {   
    // Obtener valores
    const lat = document.querySelector('#lat').value,
          lng = document.querySelector('#lng').value,
          direccion = document.querySelector('#direccion').value;

    var map = L.map('ubicacion-meeti').setView([lat, lng], 16);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    let marker = new L.marker([lat, lng], {
        autoPan: true
    })
    .addTo(map)
    .bindPopup(direccion)
    .openPopup();
    
}