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
  const { accessToken } = await post<{ accessToken: string }>('/api/auth/signin', {
    email,
    password,
  });
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
  }).then((e) => (e.status >= 400 ? null : e.json()));
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

export async function getOrder(id: number): Promise<Order> {
  return get<Order>(`/api/orders/${id}`);
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

async function post<T>(url, body, parseJson = true): Promise<T> {
  console.log(`POST ${url}`);
  const response = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return parseJson ? response.then((e) => (e.status >= 400 ? null : e.json())) : response;
}
