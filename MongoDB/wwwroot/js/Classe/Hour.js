import Lesson from '../Classe/Lesson.js';
import EventEmitter from '../Classe/EventEmitter.js';
import { spaces } from '../Constante/LessonSpace.js';
import { lessonCreated, lessonModified, openWindowAdd } from '../Enumeration/Event.js';

export default class Hour {
    constructor(row) {
        this.hour = row.attributes.hour.value;
        this.place = row;
        this.lessons = Array.from(row.children).map(x => new Lesson(x));
        this.attachListener();
    }

    attachListener() {
        this.place.addEventListener("dblclick", (event) => {
            if (event.target === this.place) EventEmitter.emit(openWindowAdd, [(l) => EventEmitter.emit(lessonCreated, l), null]);
        });
    }

    get space() {
        if (this.lessons.length > 0)
            return this.lessons[0].space;
        else return 0;
    }

    addLesson(l) {
        //Add element in the DOM
        this.place.appendChild(l._element);

        //Add element in this object
        this.lessons.push(l);
    }

    removeLesson(l) {
        this.lessons = this.lessons.filter(x => x.id !== l.id);
    }

    changeSpace(placementOfEachLessons, number) {
        this.lessons = new Array();

        //Remove every element to replace them after
        while(this.place.hasChildNodes())
            this.place.removeChild(this.place.firstChild);

        //Insert each element to it's index
        for (let i = 0; i < number; i++) {
            let lesson = placementOfEachLessons[i];

            if (lesson && lesson.id) {
                //If a lesson is present insert it inside the hour
                this.place.appendChild(lesson._element);
                lesson.space = number;
                this.lessons.push(lesson);
            }
            else {
                //If not create an invisible blocker
                let div = document.createElement("div");
                div.classList.add("lesson");
                div.classList.add("invisible");
                div.classList.add(spaces.get(number));
                this.place.appendChild(div);
            }
        }
    }
}