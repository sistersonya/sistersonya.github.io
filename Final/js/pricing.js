
const requestURL = './data/rentals.json';

fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        console.table(jsonObject); 
        const rentals = jsonObject['rentals'];

        for (let i = 0; i < rentals.length; i++){
             let card = document.createElement('section');
             let h4 = document.createElement('h4');
             let maxPersons = document.createElement('p');
             let reservation = document.createElement('p');
             let reservationWalkIn = document.createElement('p');
             let photo = document.createElement('img');

             h4.textContent = 'Rental Type #' + rentals[i].typenumber + ' ' + rentals[i].rentalType;
             maxPersons.textContent = 'Max. Persons: ' + rentals[i].maxPersons;
             reservation.textContent = 'Reservation Price : 3 Hours ' + rentals[i].reservation[0].threeHours + '/ Full Day ' + rentals[i].reservation[0].fullDay;
             reservationWalkIn.textContent = 'Walk-In Price : 3 Hours ' + rentals[i].walkIn[0].threeHours + '/ Full Day ' + rentals[i].walkIn[0].fullDay;
             photo.setAttribute('src', rentals[i].photo);
             photo.setAttribute('alt', rentals[i].rentalType);

                 card.appendChild(h4);
                 card.appendChild(maxPersons);
                 card.appendChild(reservation);
                 card.appendChild(reservationWalkIn);
                 card.appendChild(photo);

                     document.querySelector('div.cards').appendChild(card);
        }
    });

    