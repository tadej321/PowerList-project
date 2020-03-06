import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {AuthDataModel} from './auth-data.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';


const BACKEND_URL = environment.apiUrl + '/user';

interface UserCredentials {
  userId: string;
  name: string;
  surname: string;
}

@Injectable({ providedIn: 'root'})
export class AuthService {
  private authStatusListener = new Subject<boolean>();
  private token: string;
  private tokenTimer: any;
  isAuthenticated = false;
  private userCredentials: UserCredentials;

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userCredentials.userId;
  }

  getUserCredentials() {
    return this.userCredentials;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  async login(email: string, password: string) {
    const authData: AuthDataModel = {email, password};
    await this.http.post<{token: string, expiresIn: number, userCredentials: UserCredentials}>(BACKEND_URL + '/login', authData).toPromise()
      .then(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userCredentials = response.userCredentials;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate, this.userCredentials.userId);
          this.router.navigate(['/']);
        }
      }).catch(error => {
        this.authStatusListener.next(false);
        throw error;
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userCredentials.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userCredentials = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/auth/login']);

  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  async createUser(userCredentials: AuthDataModel) {
    const authData: AuthDataModel = {
      name: userCredentials.name,
      surname: userCredentials.surname,
      email: userCredentials.email,
      password: userCredentials.password,
    };

    await this.http.post(BACKEND_URL + '/signup', authData).toPromise()
      .then(() => {
        this.router.navigate(['/auth/login']);
      }).catch( error => {
        this.authStatusListener.next(false);
        throw error;
      });
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token && !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId
    };
  }
}
