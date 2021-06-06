const tokenStorageKey = 'accessToken';
export interface Profile {
  email: string;
  firstName: string;
  lastName: string;
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

async function post<T>(url, body): Promise<T> {
  console.log(`POST ${url}`);
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((e) => (e.status >= 400 ? null : e.json()));
}
