import Day from '../Classe/Day.js';
import EventEmitter from '../Classe/EventEmitter.js';
import { lessonCreated, lessonModified, lessonDeleted } from '../Enumeration/Event.js';
import { attributeHour, attributeDay } from '../Enumeration/Attributes.js';

export default class Calendar {
    constructor(grid) {
        this.grid = grid;
        this.days = Array.from(this.grid.children).map(x => new Day(x));
        this.attachListener();
    }

    attachListener() {
        EventEmitter.on(lessonCreated, (l) => this.addLesson(l));
        EventEmitter.on(lessonModified, (l) => this.updateLesson(l));
        EventEmitter.on(lessonDeleted, (l) => this.removeLesson(l));
    }

    findDay(day) {
        return this.days.find(x => x.date === day);
    }

    addLesson(l) {
        const day = this.findDay(l.date);
        day.findHour(l.hour).addLesson(l);
        day.caclulateDay();
    }

    removeLesson(l) {
        const oldLesson = document.getElementById(l.id);
        const oldDay = this.findDay(oldLesson.attributes.getNamedItem(attributeDay).value);
        oldDay.findHour(oldLesson.attributes.getNamedItem(attributeHour).value).removeLesson(l);
        oldDay.caclulateDay();
    }

    updateLesson(l) {
        //Remove oldLessson
        this.removeLesson(l);

        //Insert the lesson back with the right data
        this.addLesson(l);
    }
}