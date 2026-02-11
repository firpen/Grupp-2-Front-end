const carId = new URLSearchParams(location.search).get("id");
const apiKey = "9340c3cf-7a20-48a1-8bc2-f5e7ee6de981";

document.getElementById("updateCarForm").addEventListener("submit", (event) => {
    event.preventDefault();  
    let value = document.getElementById("value").value;

    const carDTO = {
        newValue: parseFloat(value),
        newTrivia: document.getElementById("trivia").value
    };
    
    updateCar(carId, carDTO);  
});

function updateCar(carId, carDTO) {
    fetch(`http://localhost:8080/api/cars/${carId}`, {
        method: "PATCH",
        headers: {
            "X-API-KEY": apiKey,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(carDTO)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to update car');
        }
        return res.json(); 
    })
    .then(updatedCar => {
        console.log('Car updated:', updatedCar);
        alert("Bilen uppdaterad!");
        window.location.href = "/pages/index.html";
    })
    .catch(error => {
        console.error('Error updating car:', error);
        alert("Kunde inte uppdatera bilen");
    });
}