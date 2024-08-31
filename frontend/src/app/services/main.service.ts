import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor() { }

  async getDiscovery(): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/discovery`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response;
  }

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

  async getProductByCategory(id: number): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/categories/${id}/products`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response;
  }

  async addToCart(productId: number): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/products/${productId}/add-to-cart`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response;
  }

  /**
   * Profile
   */
  async me(): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response;
  }

  async updateProfile(profile: any): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/me`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profile)
    });

    return response;
  }

  /**
   * Transaction
   */
  async getCart(): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/cart`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response;
  }

  async updateCart(productId: number, quantity: number): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/cart/${productId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity })
    });

    return response;
  }

  async removeCart(productId: number): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/cart/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response;
  }

  async placeOrder(data: any): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return response;
  }

  async getOrders(): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/orders`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response;
  }
}
