import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor() { }

  async getProducts(): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/products`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response;
  }

  async getProduct(id: number): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/products/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response;
  }

  async getCategories(): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/categories`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response;
  }

  async getCategory(id: number): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/categories/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response;
  }
}
