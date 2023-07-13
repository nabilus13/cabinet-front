import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private host = environment.API_BACKEND;

  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.host}/user/findAllUsers`);
  }

  public getUser(username: string): Observable<User> {
    this.http.get;
    return this.http.get<User>(`${this.host}/user/find/${username}`);
  }
  public addUser(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.host}/user/add`, formData);
  }
  public resetPassword(email: string, password: string): Observable<String> {
    let params = new HttpParams().set('email', email);
    params.set('password', password);
    return this.http.post<String>(`${this.host}/user/resetPassword`, params);
  }

  public deleteUser(username: string): Observable<any> {
    return this.http.delete<any>(`${this.host}/user/delete/${username}`);
  }

  public addUsersToLocalCache(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public getUsersFromLocalCache(): User[] {
    const userJson = localStorage.getItem('users');
    let users = userJson !== null ? JSON.parse(userJson) : [new User()];
    return users;
  }

  public createUserFormDate(
    loggedInUsername: string,
    user: User,
    profileImage: File
  ): FormData {
    const formData = new FormData();
    formData.append('currentUsername', loggedInUsername);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('role', user.role);
    formData.append('profileImage', profileImage);
    formData.append('isActive', JSON.stringify(user.active));
    formData.append('isNonLocked', JSON.stringify(user.notLocked));
    return formData;
  }
}
