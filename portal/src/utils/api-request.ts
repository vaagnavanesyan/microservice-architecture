export interface Profile {
  login: string;
  firstName: string;
  lastName: string;
}

export async function signIn(login: string, password: string): Promise<string> {
  const { accessToken } = await post<{ accessToken: string }>(
    '/api/auth/signin',
    {
      login,
      password,
    },
  );
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
  }
  return accessToken;
}

export async function getProfile(): Promise<Profile> {
  return fetch('/api/users/me', {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  }).then(e => e.json());
}

export async function updateProfile(
  firstName: string,
  lastName: string,
): Promise<void> {
  const { accessToken } = await fetch('/api/users/me', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ firstName, lastName }),
  }).then(e => e.json());
  if (accessToken) {
    console.log('Token was updated');
    localStorage.setItem('accessToken', accessToken);
  }
}

export function isAuthorized(): boolean {
  return getToken() !== '';
}

function getToken(): string {
  return localStorage.getItem('accessToken') || '';
}

async function post<T>(url, body): Promise<T> {
  console.log(`POST ${url}`);
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(e => e.json());
}
