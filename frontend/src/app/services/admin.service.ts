import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }

  async getDashboardData(): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/admin/dashboard`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response;
  }
}
