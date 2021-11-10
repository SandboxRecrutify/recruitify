import { UserRole } from '../models/UserRole';
import { LocalStorageService } from './../../services/local-storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private localstorage: LocalStorageService) {}

  getUserRole(): string {
    const userRole = this.localstorage.getItem('user').role;
    return userRole;
  }

  isManager(): boolean {
    return this.getUserRole() === UserRole.manager;
  }

  isMentor(): boolean {
    return this.getUserRole() === UserRole.mentor;
  }

  isInterviewer(): boolean {
    return this.getUserRole() === UserRole.interviewer;
  }

  isRecruiter(): boolean {
    return this.getUserRole() === UserRole.recruiter;
  }

  isAdmin(): boolean {
    return this.getUserRole() === UserRole.admin;
  }
}
