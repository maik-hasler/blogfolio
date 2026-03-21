import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: import.meta.env.PUBLIC_KEYCLOAK_URL || 'http://localhost:8080',
  realm: 'blogfolio',
  clientId: 'blogfolio-frontend',
});

let initialized = false;

export async function initAuth(): Promise<boolean> {
  if (initialized) return keycloak.authenticated ?? false;
  try {
    const authenticated = await keycloak.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      pkceMethod: 'S256',
    });
    initialized = true;

    if (authenticated) {
      setInterval(() => {
        keycloak.updateToken(30);
      }, 10_000);
    }

    return authenticated;
  } catch {
    return false;
  }
}

export function login(): void {
  keycloak.login();
}

export function logout(): void {
  keycloak.logout();
}

export function getToken(): string | undefined {
  return keycloak.token;
}

export function isAuthenticated(): boolean {
  return keycloak.authenticated ?? false;
}

export function getUsername(): string | undefined {
  return keycloak.tokenParsed?.preferred_username;
}
