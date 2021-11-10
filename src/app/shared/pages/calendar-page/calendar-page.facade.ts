import { Injectable } from '@angular/core';

@Injectable()
export class CalendarPageFacade {
  itemStatuses = ['free', 'busy', 'assigned'];

  days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  time = [
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
  ];

  candidatesContactTime = [
    { name: 'Vasya', surname: 'Vasiliev', time: ['10', '11', '12', '16'] },
    { name: 'Vasya', surname: 'Vasiliev', time: ['Any time'] },
    { name: 'Vasya', surname: 'Vasiliev', time: ['10', '11', '12', '16'] },
    { name: 'Vasya', surname: 'Vasiliev', time: ['Any time'] },
    { name: 'Vasya', surname: 'Vasiliev', time: ['10', '11', '12', '16'] },
    { name: 'Vasya', surname: 'Vasiliev', time: ['Any time'] },
    { name: 'Vasya', surname: 'Vasiliev', time: ['10', '11', '12', '16'] },
    { name: 'Vasya', surname: 'Vasiliev', time: ['Any time'] },
    { name: 'Vasya', surname: 'Vasiliev', time: ['10', '11', '12', '16'] },
    { name: 'Vasya', surname: 'Vasiliev', time: ['Any time'] },
    { name: 'Vasya', surname: 'Vasiliev', time: ['10', '11', '12', '16'] },
    { name: 'Vasya', surname: 'Vasiliev', time: ['Any time'] },
  ];

  constructor() {}
}
