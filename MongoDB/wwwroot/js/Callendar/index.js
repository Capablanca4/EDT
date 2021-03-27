import Calendar from '../Classe/Calendar.js';
import Window from '../Classe/Window.js';
import { openWindowAdd, openWindowModify, openWindowDelete } from '../Enumeration/Event.js';
import Database from '../Classe/Database.js';

(() => {
    window.addEventListener("load", () => {
        const addLesson = new Window(document.getElementById("addLesson"), openWindowAdd);
        const modifyLesson = new Window(document.getElementById("modifyLesson"), openWindowModify);
        const deleteLesson = new Window(document.getElementById("deleteLesson"), openWindowDelete);
        const grid = new Calendar(document.getElementById("calendar-days"));
        const database = new Database();
    });
})();