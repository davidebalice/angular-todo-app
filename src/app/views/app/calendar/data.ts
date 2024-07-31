import { EventInput } from '@fullcalendar/core';

let eventGuid = 0;
export function createEventId() {
    return String(eventGuid++);
}

var date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();
const calendarEvents: EventInput[] = [
    {
        id: createEventId(),
        title: 'Conference',
        start: new Date(y, m, d - 1, 7, 0),
        end: new Date(y, m, d + 1, 16, 0),
        allDay: true,
        className: 'primary-bg text-white p-2 border-0 rounded-4 px-3',
    },
    {
        id: createEventId(),
        title: 'All Day Event',
        date: "2024-06-01",
        className: 'primary-bg text-white p-2 border-0 rounded-4 px-3',
    },
    {
        id: createEventId(),
        title: 'Birthday Party',
        start: new Date(y, m, d + 1, 7, 0),
        end: new Date(y, m, d + 1, 16, 0),
        allDay: true,
        className: 'primary-bg text-white p-2 border-0 rounded-4 px-3',
    },
    {
        id: createEventId(),
        title: 'Long Event',
        start: new Date(y, m, d + 5, 7, 0),
        end: new Date(y, m, d + 8, 16, 0),
        allDay: true,
        className: 'primary-bg text-white p-2 border-0 rounded-4 px-3',
    },
    {
        id: createEventId(),
        title: 'Repeating Event',
        start: new Date(y, m, d + 7, 4, 0),
        end: new Date(y, m, d ),
        className: 'primary-bg text-white p-2 border-0 rounded-4 px-3',
    },
    {
        id: createEventId(),
        title: 'Click for Google',
        start: new Date(y, m, d + 26, 4, 0),
        allday:true,
        className: 'primary-bg text-white p-2 border-0 rounded-4 px-3',
    },
];

export { calendarEvents };
