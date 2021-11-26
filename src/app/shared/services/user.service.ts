import { Injectable } from '@angular/core';
import { Role, UserRoles } from '../models/UserRoles';
import { LocalStorageService } from './../../services/local-storage.service';

type Roles = keyof typeof Role;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private localstorage: LocalStorageService) {}

  getUserRole(): UserRoles[] {
    // TODO: get user role from CORRECT place
    try {
      return this.localstorage.getItem('user').roles;
    } catch (error) {
      return [];
    }
  }
  checkRole(role: Roles): boolean {
    const roles = this.getUserRole()[0].roles;
    return roles.includes(role);
  }

  checkRoleInProject(projectId: string, role: Roles): boolean {
    const projectRoles = this.getProjectRoles(projectId);
    return projectRoles?.roles.includes(role) ? true : false;
  }

  getProjectRoles(projectId: string): UserRoles | undefined {
    const roles = this.getUserRole();
    return roles.find((r) => r.projectId === projectId);
  }
}
