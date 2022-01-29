type TokenObj = {
  accessToken: string;
  refreshToken: string;
};
export class LocalStorageService {
  public static setToken(tokenObj: TokenObj): void {
    localStorage.setItem("accessToken", tokenObj.accessToken);
    localStorage.setItem("refreshToken", tokenObj.refreshToken);
  }
  public static getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
  }
  public static getRefreshToken(): string | null {
    return localStorage.getItem("refreshToken");
  }
  public static clearToken(): void {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
  public static setUser(user: Record<string, any>): void {
    localStorage.setItem("user", JSON.stringify(user));
  }
  public static getUser(): string | null {
    return localStorage.getItem("user");
  }
  public static setFrequencies(frequencies: Record<string, any>): void {
    localStorage.setItem("frequencies", JSON.stringify(frequencies));
  }
  public static getFrequencies(): string | null {
    return localStorage.getItem("frequencies");
  }
  public static clearUser(): void{
    return localStorage.removeItem("user");
  }
}
