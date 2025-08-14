import { HttpClient } from '@angular/common/http';
import { UserModel } from '../domain/user.model';
import { UserService } from '../domain/user.service';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, first, lastValueFrom, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserApiService extends UserService {
  readonly http = inject(HttpClient);
  readonly baseUrl = `${environment.apiUrl}/users-service`;
  override searchByEmail(
    email: string
  ): Promise<{ token: string; user: UserModel } | null> {
    return lastValueFrom(
      this.http
        .get<{ token: string; user: UserModel }>(`${this.baseUrl}/v1/${email}`)
        .pipe(
          map((res) => ({ token: res.token, user: res.user })),
          tap((data) => {
            localStorage.setItem('token', data.token);
          }),
          catchError(() => of(null)),
          first()
        )
    );
  }
  override create(
    user: Pick<UserModel, 'email'>
  ): Promise<{ token: string; user: UserModel } | null> {
    return lastValueFrom(
      this.http
        .post<{ token: string; user: UserModel }>(`${this.baseUrl}/v1`, {
          email: user.email,
        })
        .pipe(
          map((res) => ({ token: res.token, user: res.user })),
          tap((data) => {
            localStorage.setItem('token', data.token);
          }),
          catchError(() => of(null)),
          first()
        )
    );
  }
  override async logout(): Promise<void> {
    localStorage.clear();
  }
  override async renew(): Promise<{ token: string; user: UserModel } | null> {
    return lastValueFrom(
      this.http
        .get<{ token: string; user: UserModel }>(`${this.baseUrl}/v1/renew`, {})
        .pipe(
          map((res) => ({ token: res.token, user: res.user })),
          tap((data) => {
            localStorage.setItem('token', data.token);
          }),
          catchError(() => of(null)),
          first()
        )
    );
  }
}
