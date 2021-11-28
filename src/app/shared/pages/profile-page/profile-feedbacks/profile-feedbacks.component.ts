import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as dayjs from 'dayjs';
import { Feedback, FeedbackTab } from 'src/app/shared/models/Feedback';
import { CandidatesPageFacade } from '../../candidates-page/candidates-page.facade';

@Component({
  selector: 'app-profile-feedbacks',
  templateUrl: './profile-feedbacks.component.html',
  styleUrls: ['./profile-feedbacks.component.scss'],
})
export class ProfileFeedbacksComponent implements OnInit, OnChanges {
  @Input() feedbacks!: Feedback[];

  feedbackTypes: string[] = [];
  isModalVisible = false;
  tabs: FeedbackTab[] = [
    { label: 'Recruiter', value: 'Interview' },
    { label: 'Tech. interview one', value: 'TechInterviewOneStep' },
    { label: 'Tech. interview two', value: 'TechInterviewSecondStep' },
    { label: 'Mentor', value: 'Mentor' },
  ];

  constructor(private candidatesFacade: CandidatesPageFacade) {
    this.feedbackTypes = this.candidatesFacade.feedbackTypes;
  }

  toggleModal(visible: boolean) {
    this.isModalVisible = visible;
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.feedbacks.length > 0) {
      this.feedbacks.forEach((feedback) => {
        this.tabs.forEach((tab, index) => {
          if (this.feedbackTypes[feedback.rating!] === tab.value) {
            Object.assign(this.tabs[index], {
              ...feedback,
              createdOn: dayjs(feedback.createdOn).format('DD.MM.YYYY'),
              createdTime: dayjs(feedback.createdOn).format('HH:mm'),
            });
          }
        });
      });
      console.log(this.tabs);
    }
  }
}
