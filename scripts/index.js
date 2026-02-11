var apiKey = "9340c3cf-7a20-48a1-8bc2-f5e7ee6de981";

var carsContainer = document.getElementById("carsContainer");
var sortContainer = document.getElementById("sortContainer");

// Rendera bilar
function renderCars(data) {
    carsContainer.innerHTML = ""; // rensa listan

    data.forEach(car => {
        let div = document.createElement("div");

        div.innerHTML = `
            <h2>${car.carBrand} ${car.carModel}</h2>
            <img src="${car.img}" width="200"/>
            <p><strong>Year:</strong> ${car.year}</p>
            <p><strong>Value:</strong> ${car.value}</p>
            <p><strong>Brand:</strong> ${car.carBrand}</p>
            <p><strong>Model:</strong> ${car.carModel}</p>
        `;

        div.appendChild(deleteButton(car.id));
        carsContainer.appendChild(div);
    });
}

function getCars() {
    fetch("http://localhost:8080/api/cars", {
        headers: {
            "X-API-KEY": apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log("Alla bilar:", data);
        renderCars(data);
    })
    .catch(error => console.error("Error fetching cars:", error));
}

function deleteCar(carId) {
    fetch(`http://localhost:8080/api/cars/${carId}`, {
        method: "DELETE",
        headers: {
            "X-API-KEY": apiKey
        }
    })
    .then(response => {
        getCars(); // uppdatera listan efter delete
    })
    .catch(err => console.error("Error deleting car:", err));
}

function deleteButton(carId) {
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Radera bil";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
        deleteCar(carId);
    });

    return deleteBtn;
}

function sortButton() {
    let sortBtn = document.createElement("button");
    sortBtn.innerText = "Sortera bilar på värde";

    sortBtn.addEventListener("click", () => {
        sortCars();
    });

    return sortBtn;
}

function sortCars() {
    fetch("http://localhost:8080/api/cars/sort", {
        headers: {
            "X-API-KEY": apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log("Sorterade bilar:", data);
        renderCars(data);
    })
    .catch(err => console.error("Error sorting cars:", err));
}

// Lägg sortknapp i sortContainer
sortContainer.appendChild(sortButton());

// Hämta alla bilar vid sidladdning
getCars();
