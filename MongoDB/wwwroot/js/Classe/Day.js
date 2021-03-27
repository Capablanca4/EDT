import Hour from '../Classe/Hour.js';
import { attributeHour } from '../Enumeration/Attributes.js';

export default class Day {
    constructor(column) {
        this.date = column.attributes.day.value;
        this.hours = Array.from(column.children).filter(x => x.attributes.getNamedItem(attributeHour) !== null).map(x => new Hour(x));

        //Calculate Day to correct the lesson drawn by the server
        this.caclulateDay();
    }

    findHour(hour) {
        return this.hours.find(x => x.hour === hour);
    }

    caclulateDay() {
        //Get for each hour the lessons grouped by their duration
        let lessonsGroupedByDuration = this.hours.map(x => {
            let grouped = new Map();
            x.lessons.forEach(y => {
                if (grouped.has(parseInt(y.duration))) grouped.get(parseInt(y.duration)).push(y);
                else grouped.set(parseInt(y.duration), [y]);
            });
            return grouped;
        });

        //Place each lesson inside a grid of 11 by 10 element representing the representation of the grid
        let placementOfEachLessons = this.hours.map(x => new Array(10).fill(null));
        for (let i = 1; i < 5; i++) {
            for (let j = 0; j < lessonsGroupedByDuration.length; j++) {
                if (lessonsGroupedByDuration[j].has(i)) {
                    for (let lesson of lessonsGroupedByDuration[j].get(i)) {
                        let test = false, index = -1;
                        while (!test) {
                            index++;
                            test = true;
                            for (let k = j; k < lessonsGroupedByDuration.length && k < j + i; k++) {
                                test = test && (placementOfEachLessons[k][index] === null);
                            }
                        }
                        placementOfEachLessons[j][index] = lesson;
                        for (let l = 1; l < i && l + j < lessonsGroupedByDuration.length; l++) {
                            placementOfEachLessons[l + j][index] = {};
                        }
                    }
                }
            }
        }

        //Get the duration maximum per hour
        let maxDurationPerHour = placementOfEachLessons.map(x => {
            const definedElement = x.filter(y => y !== null && y.duration !== undefined)
                .map(y => y.duration)
            if (definedElement.length === 0) return 0;
            else return definedElement.reduce((a, b) => a > b ? a : b)}
        );

        //Change the space of each Hour
        for (let i = 0; i < maxDurationPerHour.length; i++) {
            let max = 0;
            for (let j = i; j < maxDurationPerHour.length && j < i + maxDurationPerHour[i]; j++) {
                let len = placementOfEachLessons[j].filter(y => y !== null).length;
                max = len > max ? len : max;
            }
            this.hours[i].changeSpace(placementOfEachLessons[i], max);
        }
    }
}