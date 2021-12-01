import { Injectable } from '@angular/core';
import { Role, UserRoles } from '../models/UserRoles';
import { LocalStorageService } from './../../services/local-storage.service';

type Roles = keyof typeof Role;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly globalRoleId = 'a6cc25ba-3e12-11ec-9bbc-0242ac130002';
  constructor(private localstorage: LocalStorageService) {}

  getUserRoles(): UserRoles[] {
    try {
      return this.localstorage.getItem('user').roles;
    } catch (error) {
      return [];
    }
  }
  getGlobalRoles(): Roles[] | undefined {
    const roles = this.getUserRoles();
    return roles.find((r) => r.projectId === this.globalRoleId)?.roles;
  }

  checkGlobalRole(role: Roles): boolean {
    const globalRoles = this.getGlobalRoles();
    if (globalRoles) {
      return globalRoles.includes(role);
    }
    return false;
  }

  checkRoleInProject(projectId: string, role: Roles): boolean {
    const projectRoles = this.getProjectRoles(projectId);
    return projectRoles?.includes(role) ? true : false;
  }

  getProjectRoles(projectId: string): Roles[] | undefined {
    const roles = this.getUserRoles();
    return roles.find((r) => r.projectId === projectId)?.roles;
  }
}
