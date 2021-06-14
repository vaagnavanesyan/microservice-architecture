import { Order } from '../types/order';
import { OrderStatuses } from '../types/order-statuses';
import { Profile } from '../types/profile';

const tokenStorageKey = 'accessToken';

export interface SignUpPayload extends Profile {
  password: string;
  isAdmin: boolean;
}

export interface GetOrdersParams {
  status?: OrderStatuses;
  sortBy?: 'createdAt' | 'price';
  asc?: boolean;
}

export async function signIn(email: string, password: string): Promise<string> {
  const { accessToken } =
    (await post<{ accessToken: string }>('/api/auth/signin', {
      email,
      password,
    })) || {};

  if (accessToken) {
    localStorage.setItem(tokenStorageKey, accessToken);
  }
  return accessToken;
}

export async function signUp(payload: SignUpPayload) {
  await post('/api/auth/signup', payload, false);
  return signIn(payload.email, payload.password);
}

export async function getProfile(): Promise<Profile> {
  return fetch('/api/users/me', {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  }).then((e) => {
    if (e.status >= 400) {
      signOut();
    }
    return e.status >= 400 ? null : e.json();
  });
}

export async function updateProfile(firstName: string, lastName: string): Promise<void> {
  const { accessToken } = await fetch('/api/users/me', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ firstName, lastName }),
  }).then((e) => e.json());
  if (accessToken) {
    console.log('Token was updated');
    localStorage.setItem(tokenStorageKey, accessToken);
  }
}

type OrderResponse = Omit<Order, 'createdAt'> & { createdAt: string };
export async function getOrders(params?: GetOrdersParams): Promise<Order[]> {
  let url = '/api/orders';
  if (params) {
    url += `?${new URLSearchParams(Object.entries(params))}`;
  }

  return (await get<OrderResponse[]>(url)).map((e) => ({ ...e, createdAt: new Date(e.createdAt) }));
}

export type GetOrderPayload = Omit<Order, 'positions'> & {
  positions: Array<{ id: number; originalImageId: string; processedImageId: string; originalImageName: string }>;
};

export async function getOrder(id: number): Promise<Order> {
  const result = await get<GetOrderPayload>(`/api/orders/${id}`);
  return {
    ...result,
    positions: result.positions.map((position) => ({
      id: position.id,
      originalImageName: position.originalImageName,
      originalImageUrl: `/api/orders/images/${position.originalImageId}`,
      processedImageUrl: `/api/orders/images/${position.processedImageId}`,
    })),
  };
}

export async function createOrder(etag: string): Promise<string | null> {
  const response = await fetch(`/api/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'If-Match': etag,
    },
  });
  if (response.status === 409) {
    return null;
  }
  return response.text();
}

export async function checkoutOrder(orderId: number): Promise<void> {
  await post<void>(`/api/orders/${orderId}/checkout`, undefined, false, false);
}

export async function addImage(orderId: number, image: File): Promise<number> {
  const formdata = new FormData();
  formdata.append('image', image);
  return await post<number>(`/api/orders/${orderId}/addImage`, formdata, false);
}

export async function removeImage(originalImageUrl: string): Promise<void> {
  const id = originalImageUrl.split('/').slice(-1).pop();
  await fetch(`/api/orders/${id}/remove`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export async function downloadImage(url: string, filename: string) {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
}

export function isAuthorized(): boolean {
  return getToken() !== '';
}

export function signOut() {
  localStorage.removeItem(tokenStorageKey);
}

export async function getAmount() {
  const response = await get<any>('/api/billing');
  return response?.amount;
}

export async function addAmount() {
  await post<void>('/api/billing', { amount: 5 }, true, false);
}

export async function getNotifications(): Promise<any> {
  return await get('/api/notifications');
}
export async function markNotificationsAsRead(id) {
  return await post('/api/notifications', { id }, true, false);
}

function getToken(): string {
  return localStorage.getItem('accessToken') || '';
}

async function get<T>(url): Promise<T> {
  console.log(`GET ${url}`);
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  }).then((e) => (e.status >= 400 ? null : e.json()));
}

async function post<T>(url, data, sendJson = true, parseJson = true): Promise<T> {
  console.log(`POST ${url}`);

  let body = data;

  let headers = {
    Authorization: `Bearer ${getToken()}`,
  } as any;

  if (sendJson) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(data);
  }

  const response = fetch(url, {
    method: 'POST',
    headers,
    body,
  });
  return parseJson ? response.then((e) => (e.status >= 400 ? null : e.json())) : response;
}
