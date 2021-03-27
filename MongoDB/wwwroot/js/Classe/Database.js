import EventEmitter from '../Classe/EventEmitter.js';
import { lessonCreated, lessonModified, lessonDeleted } from '../Enumeration/Event.js';

export default class Database {
    constructor() {
        this.attachListener();
    }

    attachListener() {
        EventEmitter.on(lessonCreated, (l) => this.addLesson(l));
        EventEmitter.on(lessonModified, (l) => this.updateLesson(l));
        EventEmitter.on(lessonDeleted, (l) => this.removeLesson(l));
    }

    addLesson(l) {
        fetch("/Callendar/CreateLesson", {
            cache: 'no-cache',
            method: 'post',
            body: l.toFormData(),
        }).catch(err => console.log(err));
    }

    updateLesson(l) {
        fetch("/Callendar/UpdateLesson", {
            cache: 'no-cache',
            method: 'patch',
            body: l.toFormData(),
        }).catch(err => console.log(err));
    }

    removeLesson(l) {
        fetch("/Callendar/DeleteLesson", {
            cache: 'no-cache',
            method: 'delete',
            body: new URLSearchParams([["ID",l.id]]),
        }).catch(err => console.log(err));
    }
}