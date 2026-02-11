var apiKey = "9340c3cf-7a20-48a1-8bc2-f5e7ee6de981";
var carsContainer = document.getElementById("carsContainer");

function getCars() {
    fetch("http://localhost:8080/api/cars", {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": apiKey
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            carsContainer.innerHTML = ""; // rensa

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

                div.appendChild(deleteButton(car.id)); // lägg deleteknapp på varje car
                carsContainer.appendChild(div);
            });
        })
        .catch(error => console.error("Error fetching:", error));
}


function deleteCar(carId) {
    fetch(`http://localhost:8080/api/cars/${carId}`, {
        method: "DELETE",
        headers: {
            "X-API-KEY": apiKey
        }
    })
        .then(res => {
            getCars(); // uppdatera listan efter delete
        });
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


getCars();
