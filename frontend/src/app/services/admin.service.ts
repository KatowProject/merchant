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

  async editCategory(id: number, name: string): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/admin/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    });

    return response;
  }

  async addCategory(name: string): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/admin/categories`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    });

    return response;
  }

  async updateCategory(id: number, name: string): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/admin/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    });

    return response;
  }

  async deleteCategory(id: number): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/admin/categories/${id}`, {
      method: 'DELETE',
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

  async addSubCategory(data: any): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/admin/sub-categories`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return response;
  }

  async updateSubCategory(data: any): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/admin/sub-categories/${data.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return response;
  }

  async deleteSubCategory(id: number): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/admin/sub-categories/${id}`, {
      method: 'DELETE',
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

  async updateProduct(data: any): Promise<Response> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('stock', data.stock);
    formData.append('category_id', data.category_id);
    formData.append('sub_category_id', data.sub_category_id);
    formData.append('_method', 'PUT');

    if (data.img) {
      formData.append('image', data.img);
    }

    const response = await fetch(`${environment.baseUrl}/admin/products/${data.id}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });

    return response;
  }

  async deleteProduct(id: number): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/admin/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response;
  }

  async getUsers(): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/admin/users`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response;
  }

  async addUser(data: any): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/admin/users`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return response;
  }

  async updateUser(data: any): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/admin/users/${data.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return response;
  }

  async deleteUser(id: number): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/admin/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response;
  }

  async getAllOrders(): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/admin/orders`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response;
  }

  async acceptOrder(id: number): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/admin/orders/${id}/approve`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response;
  }

  async declineOrder(id: number): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/admin/orders/${id}/reject`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response;
  }

  async shipOrder(id: number): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/admin/orders/${id}/ship`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response;
  }
}
