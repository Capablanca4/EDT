import EventEmitter from '../Classe/EventEmitter.js';
import Lesson from '../Classe/Lesson.js';
import { openWindowDelete, lessonDeleted } from '../Enumeration/Event.js';
import { generateUuid } from '../Utils/FunctionsUtils.js';

export default class Window {
    constructor(wdw, event) {
        this.wind = wdw;
        this.form = this.wind.querySelector("form");
        this.callback = null;

        //Put handler to open the window when womeone request it
        EventEmitter.on(event, (args) => {
            let [callback, lesson] = args;
            this.openWindow(callback, lesson);
        });

        //Put handler on submit and cancel
        this.wind.querySelector(".cancel-button").addEventListener("click", () => this.closeWindow());
        this.wind.querySelector(".submit-button").addEventListener("click", (e) => this.submitWindow(e));
        let deleteButton = this.wind.querySelector(".delete-button");
        if (deleteButton) deleteButton.addEventListener("click",
            () => EventEmitter.emit(openWindowDelete, [() => { this.closeWindow(); EventEmitter.emit(lessonDeleted, { id: this.wind.querySelector("#lesson-id").value }); }, null]));

        //Make the window draggable
        dragElement(this.wind.querySelector(".card-header"));
    }

    openWindow(callback, lesson) {
        if (this.form) this.form.reset();
        if (lesson) {
            //Set the id of the element to the current id of the lesson to find it later
            this.wind.querySelector("#lesson-id").value = lesson.id;

            //Set the name of the student
            this.wind.querySelector("#student-name").value = lesson.student;

            //Set the name of the lesson
            this.wind.querySelector("#lesson-name").value = lesson.name;

            //Change the date
            this.wind.querySelector("#lesson-date").value = lesson.date;

            //Change the hour
            this.wind.querySelector('#lesson-start').querySelector('option[selected]').selected = false;
            Array.from(this.wind.querySelectorAll("#lesson-start>option")).find(x => x.value === lesson.hour).selected = true;

            //Change the duration
            this.wind.querySelector('#lesson-duration').querySelector('option[selected]').selected = false;
            Array.from(this.wind.querySelectorAll("#lesson-duration>option")).find(x => parseInt(x.value) === lesson.duration).selected = true;

            //Change the week
            this.wind.querySelector('#lesson-week').querySelector('option[selected]').selected = false;
            Array.from(this.wind.querySelectorAll("#lesson-week>option")).find(x => x.value === lesson.week).selected = true;

            //Change the room if there is one
            if (lesson.room) this.wind.querySelector("#lesson-room").value = lesson.room;
        }
        else {
            if(this.form) this.wind.querySelector("#lesson-id").value = generateUuid();
        }

        //Set callback
        this.callback = callback;

        //Make the window appear
        this.wind.classList.remove("hidden");
    }

    closeWindow() {
        //reset card position
        this.wind.querySelector(".card").style.top = "50%";
        this.wind.querySelector(".card").style.left = "50%";

        //Make the window dissapear
        this.wind.classList.add("hidden");
    }

    submitWindow(e) {
        if (this.form) {
            if (this.form.checkValidity()) {
                //Prevent the form to be submited
                e.preventDefault();

                //Create a FormData containing the data of the form
                let form = new FormData();
                Array.from(this.wind.querySelector("form")).filter(x => x.id).forEach(x => form.set(x.id, x.value));

                //Call the callback function and send the form data
                this.callback(Lesson.generateLesson(form));
                this.callback = null;
                this.closeWindow();
            }
        }
        else {
            //Call the callback function and send the form data
            this.callback();
            this.callback = null;
            this.closeWindow();
        }
    }
}

function dragElement(elm) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    let card = elm.parentNode.parentNode;
    elm.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        card.style.top = (card.offsetTop - pos2) + "px";
        card.style.left = (card.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}