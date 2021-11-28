import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { FeedbackSelectRole } from 'src/app/shared/models/AddFeedbackSelectRoles';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-add-feedback-modal',
  templateUrl: './add-feedback-modal.component.html',
  styleUrls: ['./add-feedback-modal.component.scss'],
})
export class AddFeedbackModalComponent implements OnInit, OnDestroy {
  @Input() visible: boolean = false;
  @Output() toggleModal = new EventEmitter<boolean>();
  @Input() editing: boolean = false;

  form: FormGroup;
  roles: FeedbackSelectRole[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    // private candidatesFacade: CandidatesPageFacade,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private message: NzMessageService
  ) {
    this.form = new FormGroup({
      rating: new FormControl(null, Validators.required),
      textFeedback: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500),
      ]),
      feedbackType: new FormControl('', Validators.required),
    });
  }

  onClose() {
    this.toggleModal.emit(false);
  }
  onSubmit() {
    for (const i in this.form.controls) {
      if (this.form.controls.hasOwnProperty(i)) {
        this.form.controls[i].markAsDirty();
        this.form.controls[i].updateValueAndValidity();
      }
    }

    // this.onClose()
  }
  ngOnInit(): void {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        const currentProjectRoles = this.userService.getProjectRoles(
          params.projectId
        );
        /// TODO : THIS IS A TEMPORARY SOLUTION
        if (currentProjectRoles) {
          this.roles = currentProjectRoles.map((role, index) => ({
            feedbackType: index,
            roleName: role,
          }));
        }
        // TODO: add this when we have the feedback types
        //  else {
        //   this.router.navigate([paths.projects]);
        //   this.message.error('You do not hava a permission to this page');
        // }
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
