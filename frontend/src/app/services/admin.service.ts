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

  async getAllProducts(): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/admin/products`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response;
  }

  async getCategories(): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/admin/categories`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response;
  }

  async subCategories(): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/admin/sub-categories`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response;
  }


  async addProduct(data: any): Promise<Response> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('stock', data.stock);
    formData.append('category_id', data.category_id);
    formData.append('sub_category_id', data.sub_category_id);
    formData.append('image', data.img);

    const response = await fetch(`${environment.baseUrl}/admin/products`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });

    return response;
  }
}
