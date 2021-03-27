import { spaces } from '../Constante/LessonSpace.js';
import EventEmitter from '../Classe/EventEmitter.js';
import { lessonModified, openWindowModify } from '../Enumeration/Event.js';
import { attributeHour, attributeDay, attributeDuration } from '../Enumeration/Attributes.js';

function createElement(form) {
    let div = document.createElement("div");
    div.classList.add("lesson");

    div.id = form.get("lesson-id");

    let duration = document.createAttribute(attributeDuration);
    duration.value = parseInt(form.get("lesson-duration"));
    div.attributes.setNamedItem(duration);

    let hour = document.createAttribute(attributeHour);
    hour.value = parseInt(form.get("lesson-start"));
    div.attributes.setNamedItem(hour);

    let date = document.createAttribute(attributeDay);
    date.value = form.get("lesson-date");
    div.attributes.setNamedItem(date);

    let student = document.createElement("span");
    student.classList.add("lesson-student");
    student.textContent = form.get("student-name");
    div.appendChild(student);
    div.appendChild(document.createElement("br"));

    let name = document.createElement("span");
    name.classList.add("lesson-name");
    name.textContent = form.get("lesson-name");
    div.appendChild(name);
    div.appendChild(document.createElement("br"));

    let div2 = document.createElement("div");
    div2.classList.add("flex");
    div2.classList.add("flex-evenly");
    div.appendChild(div2);

    let week = document.createElement("div")
    week.classList.add("lesson-week");
    week.textContent = form.get("lesson-week");
    div2.appendChild(week);

    let room = document.createElement("div");
    room.classList.add("lesson-room");
    room.textContent = form.get("lesson-room");
    div2.appendChild(room);

    return div;
}

export default class Lesson {
    constructor(element) {
        this._element = element;
        this.attachListener();
    }

    static generateLesson(form) {
        return new Lesson(createElement(form));
    }

    attachListener() {
        this._element.addEventListener("dblclick", (event) => {
            EventEmitter.emit(openWindowModify, [(l) => EventEmitter.emit(lessonModified, l), this]);
        });
    }

    get id() {
        return this._element.id;
    }

    set space(number) {
        for (let classe of spaces.values()) {
            this._element.classList.remove(classe);
        }
        this._element.classList.add(spaces.get(number));
    }

    get space() {
        let number = null;
        for (let classe of spaces.keys()) {
            if (this._element.classList.contains(spaces.get(classe))) {
                number = classe;
            }
        }
        return number;
    }

    set duration(number) {
        this._element.attributes.getNamedItem(attributeDuration).value = number;
    }

    get duration() {
        return parseInt(this._element.attributes.getNamedItem(attributeDuration).value);
    }

    get hour() {
        return this._element.attributes.getNamedItem(attributeHour).value;
    }

    set hour(h) {
        this._element.attributes.getNamedItem(attributeHour).value = h;
    }

    get date() {
        return this._element.attributes.getNamedItem(attributeDay).value;
    }

    get room() {
        return this._element.querySelector(".lesson-room").innerText;
    }

    get week() {
        return this._element.querySelector(".lesson-week").innerText;
    }

    get student() {
        return this._element.querySelector(".lesson-student").innerText;
    }

    get name() {
        return this._element.querySelector(".lesson-name").innerText;
    }

    toFormData() {
        const form = new FormData();
        form.append("ID", this.id);
        form.append("Student", this.student);
        form.append("Name", this.name);
        form.append("Day", parseInt(this.date));
        form.append("HourID", parseInt(this.hour));
        form.append("Duration", this.duration);
        form.append("Week", this.week);
        form.append("Room", this.room);
        return form;
    }
}