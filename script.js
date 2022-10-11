// I didn't really get it to work, but I still went through the videos. I plan on comming back to it later
//      but I learned a lot and tried to comment as much as I could. 



'use strict';



// Create a parent object class template for all the sports. Running and Cyclying
class Workout {

    date = new Date(); 
    id = (Date.now() + ``).slice(-10); 

    constructor(coords, distance, duration) {

        this.coords = coords; 
        this.ditance = distance; // want it in km
        this.duration = duration; // want it in min

    }

    _setDescription () {

        // prettier-ignore
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        // this should automatically create this description when an event is creates
        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${this.date.getMonth()}${this.date.getDay()}`


    }



}


// CLASS-WORKOUT CHILD CLASSES 

class Running extends Workout {

    //super makes it inherit the methods/values associated with the paramaters
    //      it shares with it's parent class. 
    //      In this case, coords, distance, duration. Running adds on the additional
    //          arugment: cadence.

    type = `running`; 

    constructor(coords, distance, duration, cadence) {

        super(coords, distance, duration);
        this.cadence = cadence;  
        this.calcPace();  

    }

    calcPace() {

        this.pace = this.duration / this.distance; 

        return this.pace 

    }




}



class cycling extends Workout {

    type = `cycling`;

    constructor(coords, distance, duration, elevationGain) {

        super(coords, distance, duration);
        this.elevationGain = elevationGain; 
        this.calcSpeed();

    }


    calcSpeed() {

        this.speed = this.distance / this.duration ;
        

    }



}


// const run1 =  new Running ([39, -12], 5.2, 24, 178);
// const bike1 =  new cycling ([39, -12], 27, 94, 538);
// console.log(run1, cycling1); 

// let map, mapEvent; 


// All these consts form variables for the inputs in the content form when the user clicks on the screen.
// form const is what comes up when the user clicks to add a maker. 
//      breaks the path from clicking on the map and the marker showing up. 
//          logic: user clicks on page --> form pops up to ask info for marker's content (user could choose to cancel) --> marker shows up on screen.



const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');



class App {

    #map; 
    #mapEvent; 
    #workouts = []; 

    constructor() {
        this._getPosition();
        form.addEventListener(`submit`, this._newWorkout.bind(this));

        //event listner on function on line 51: `map.on(`click`, function(mapEvent)`
form.addEventListener(`submit`, this._newWorkout); ({
    

    

});

inputType.addEventListener(`change`, this._toggleElevationField) ; 

    // these event listeners add a `hidden` class to the classlist of the element's closest
    //      parent. In this case, these are nested in a row in a table. 
    // this makes it so when one chooses either running or cycling one of these will pop up and
    //      guarantees that the other option hides. 
    

}


}


    _getPosition(){

        //If statement basically says that if the page knows the geo location
        //      then it can execute the functios after. 

    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(this._loadMap(), function() {

            alert(`Could not get your position`); 

        }
    );

    }
// }


    _loadMap(position) {

            // console.log(position); 

                const {latitude} = position.coords;
                const {longitude} = position.coords;
                console.log(latitude, longitude); 
                console.log(`https://www.google.com/maps/@${latitude},${longitude}`) ; 

                const coords = [latitude, longitude]

                // console.log(this);


                // calls a html element called `map` to render the map in with .setView() method
                this.#map = L.map('map').setView(coords, 13);
                
                // console.log(map);

                L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
                    attribution: 
                            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(this.#map);


                //special object downloaded from leaflet 
                // this is basically an event listener
                //Handling clicks on map
                //Here we get access to the mapEvent variable
                //mapE is defined to sepearate the datat from the global variable
                this.#map.on(`click`, this._showForm.bind(this)) 

                }

                //map pin.
                // L.marker([lat, lng])
                //     .addTo(map)
                //     .bindPopup('workout')
                //     .openPopup({
                //         //these settings affect how new markers appear on screen and when they close:
                //         //      user can click several times to set a merker but it will not have any content. 
                //         maxWidth: 250, 
                //         minWidth: 100, 
                //         autoClose: false,  
                //         closeOnClick: false, 

                //     });

    }; 

    _showForm(mapE) {

        this.#mapEvent = mapE;
        // console.log(mapEvent)
        form.classList.remove(`hidden`) ; 
        inputDistance.focus();

    }

    _hideForm() {

    inputDistance.value = inputDuration.value  = inputCadence.value  = inputElevation.value =  ``;

    form.style.display = `none`; 
    form.classList.add(`hidden`); 
    setTimeout(() => form.style.displa = `grid`, 1000)

    }

    _toggleElevationField(){

        inputElevation.closest(`.form__row`).classList.toggle(`form__row--hidden`)
        inputCadence.closest(`.form__row`).classList.toggle(`form__row--hidden`)

    }



    //DISPLAY MARKER | DISPLAY MARKER | DISPLAY MARKER

    //thies e.preventDefault() is so that when the user clicks on the map, and the page info 
    //      updates with the marker info, it doesnt automatically refresh the page.
    //      marker should appear on screen.

    _newWorkout(e) {



        // this const takes all the form inputs and puts them in an array with the (...) method. 
        //      then the .every method runs through the new array and returns `true` if all of the 
        //      values satisfy the condition. In this case, they all have to be a numer. (Number.isFinite())
        const validInputs = (...inputs) => 
                inputs.every(inp => Number.isFinite(inp));


        const allPositive = (...inputs) => 
                inputs.every(inp => inp > 0);







        e.preventDefault(); 
        // console.log(mapEvent) ;


        //logic: 
        //  1. get data from the form

        const type = inputType.value; 
        const distance = +inputDistance.value; 
        const duration = +inputDuration.value; 
        const {lat, lng} = this.#mapEvent.latlng; 
        let workout; 


        //  2. check if data is valid (in step 3 if statements)


        //  3. if its Running --> Create a Running obj ; if its Cycling --> Create a Cycling obj

        if(type === `runnin`) {

            const cadence = +inputCadence.value; 

            //this if statement checks whether the inputs entered are numbers. 
            //      if they are not, it returns an alert. 
            //Number.isFinite checks if argument is a number. 
            if(
                // !Number.isFinite(distance) ||
                // !Number.isFinite(duration) ||
                // !Number.isFinite(cadence)
                
                !validInputs(distance, duration, cadence) || 
                !allPositive(distance, duration, cadence)
                
            )  return alert(`input must be numbers`);


            workout = new Running([lat, lng], distance, duration, cadence)


        }


            // allPositive confirms all inputs are positive integers. validInputs just verifies that it is a number. 


        if(type === `cyclying`) {

            const duration = +inputElevation.value;

            if(
                
                !validInputs(distance, duration, elevation) ||
                !allPositive(distance, duration, elevation)
            )
            return alert(`input must be numbers`);

            workout = new cycling([lat, lng], distance, duration, elevation)


        }

        

        //  4. add new obj to workout array

        // this is placed out here due to scope reasons. want it to happen always after both of the previous class
        //      methods are executed. 
        this.workout.push(workout) ;
        // console.log(workout)



        //  5. render workout on map as marker 

            this._renderWorkoutMethodMarker(workout)



        //  6. render workout on list




        
        
    // HIDE FORM + CLEAR INPUT FIELDS 
    // inputDistance.value = inputDuration.value  = inputCadence.value  = inputElevation.value =  ``;

    // }

        this._hideForm(); 


    _renderWorkoutMethodMarker(workout) {

        // const {lat, lng} = this.#mapEvent.latlng; 
        L.marker(workout.coords)
            .addTo(this.#map)
            .bindPopup(
            
                L.popup({
    
                    maxWidth: 250,
                    minWidth: 100, 
                    autoClose: false, 
                    closeOnClick: false,
                    className: `${workout.type}-popup`,
    
                })
    
            )
            .setPopupContent(`${workout.type === `running` ? `🏃‍♂️` : `🚴‍♀️`}` `${workout.description}`)
            .openPopup();

    }

    // this section uses DOM manipulation to put html on the page when certain conditions come through. 
    _render.Workout(workout) {

        //ternary operators***

        let html = `
        
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
        <span class="workout__icon">${workout.type === `running` ? `🏃‍♂️` : `🚴‍♀️`}</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
        </div>
        
        `;

        // .toFixed(x) rounds calculations to x amount of decimal places.
        if(workout.type === `running`)
            html += `
            <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
            </div>
            <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
            </div>
        </li>
            
            `;

        if (workout.type === `cycling`)
            html += `
            
            <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
            </div>
            <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
            </div>
            </li>
            
            `;

        //this will insert the html into the page. 
        form.insertAdjacentHTML(`afterend`, html);

    }
// }




const app = new App();
// app._getPosition();

