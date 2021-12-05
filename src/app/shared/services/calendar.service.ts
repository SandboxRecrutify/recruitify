import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor(private http: HttpClient) {}

  getInterviewersTimeTable() {
    return this.http.get('assets/interviewer-calendar.json');
  }

  getCandidatesTimeTable() {
    return this.http.get('assets/candidates-contact-time.json');
  }

  getCandidatesForRecruiter$(projectId: string) {
    return this.http
      .get(
        `https://testrecruitifytest.herokuapp.com/odata/Schedules/GetCandidatesPassedTest?projectId=${projectId}`
      )
      .pipe(map((d: any) => d.value));
  }

  getInterviewersSchedule(startDate: Date, daysNum: number) {
    return this.http.get(
      `https://testrecruitifytest.herokuapp.com/api/schedules/current_user?date=2021-12-05T00%3A00%3A00Z&daysNum=1`
    );
    // return this.http.get(`https://testrecruitifytest.herokuapp.com/api/schedules/current_user?date=2021-12-05T00%3A00%3A00Z&daysNum=1`)
  }
}
