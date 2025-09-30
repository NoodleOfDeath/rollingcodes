export interface WrappedJwt {
  signed: string;
  /** @format double */
  expiresAt: number;
  /** @format double */
  createdAt: number;
  /** @format double */
  priority: number;
  /** @format double */
  userId: number;
}

export interface JwtResponse {
  token?: WrappedJwt;
  /** @format double */
  userId: number;
}

export type LoginResponse = JwtResponse & {
  unlinked?: boolean;
};

export type UserDataProps = LoginResponse & {
  tokens?: WrappedJwt | WrappedJwt[];
};

export class UserData implements UserDataProps {

  userId: number;
  tokens: WrappedJwt[] = [];

  get token() {
    if (this.tokens.length === 0) {
      return undefined;
    }
    return this.tokens[0];
  }

  get tokenString() {
    return this.token?.signed;
  }

  get expired() {
    return this.tokens.length === 0 || (this.tokens.length > 0 && this.tokens.every((t) => UserData.tokenHasExpired(t)));
  }

  get valid() {
    return !this.expired;
  }

  get unlinked() {
    return false;
  }
  
  static tokenHasExpired(token: WrappedJwt) {
    return token.expiresAt < Date.now();
  }

  constructor({
    userId = -1, 
    token, 
    tokens = token ? [token] : [],
  }: Partial<UserDataProps> = {}) {
    this.userId = userId;
    this.tokens = (Array.isArray(tokens) ? tokens : [tokens]).filter((t) => !UserData.tokenHasExpired(t)).sort((a, b) => b.priority - a.priority);
  }
  
  addToken(token: WrappedJwt) {
    this.tokens = [...this.tokens, token].filter((t) => !UserData.tokenHasExpired(t)).sort((a, b) => b.priority - a.priority);
    return this;
  }

}