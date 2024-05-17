import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private httpClient: HttpClient) { }

  public añadirUsuario(user:any){
    return this.httpClient.post(`${baserUrl}/usuarios/`,user);
  }

  login(username: string, password: string): boolean {
    // Simulando la lógica de autenticación, aquí puedes implementar la autenticación con tus credenciales
    if (username === 'usuario' && password === '1234') {
      localStorage.setItem('loggedIn', 'true');
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('loggedIn');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }
}
