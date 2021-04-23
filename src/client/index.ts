import { HttpClient } from './http';

export interface IWolaiClientConfigure {
  spaceId: string // 空间ID
  spaceSecret: string // 空间秘钥
}

export interface IWolaiOauthAccessToken {
  accessToken: string
  refreshToken: string
  expireSecond: number
}

export class Wolai {
  public readonly spaceId: string;
  public readonly spaceSecret: string;

  private accessToken?: IWolaiOauthAccessToken;

  private readonly client: HttpClient;

  constructor(config: IWolaiClientConfigure) {
    this.spaceId = config.spaceId;
    this.spaceSecret = config.spaceSecret;

    this.client = new HttpClient({
      protocol: 'https',
      hostname: 'api-test.wolai.com',
      timeout: 20000,
    });
  }

  public async getAccessToken(): Promise<IWolaiOauthAccessToken> {
    if (this.accessToken) {
      return this.accessToken;
    }
    this.accessToken = await this.client.get<IWolaiOauthAccessToken>('/v1/oauthAccessToken', {
      spaceId: this.spaceId,
      spaceSecret: this.spaceSecret,
    });
    return this.accessToken;
  }

  public async refreshAccessToken(): Promise<IWolaiOauthAccessToken> {
    if (!this.accessToken) {
      throw new Error('refreshToken is null')
    }

    this.accessToken = await this.client.post<IWolaiOauthAccessToken>('/v1/oauthAccessToken', {
      spaceId: this.spaceId,
      spaceSecret: this.spaceSecret,
      refreshToken: this.accessToken.refreshToken,
    });

    return this.accessToken;
  }

  public async get<T>(path: string, query?: any): Promise<T> {
    const accessToken = await this.getAccessToken();
    return this.client.get<T>(path, query, {
      Authorization: accessToken.accessToken,
    });
  }

  public async del<T>(path: string, query?: any): Promise<T> {
    const accessToken = await this.getAccessToken();
    return this.client.del<T>(path, query, {
      Authorization: accessToken.accessToken,
    });
  }

  public async put<T>(path: string, body?: any, query?: any): Promise<T> {
    const accessToken = await this.getAccessToken();
    return this.client.put<T>(path, body, query, {
      Authorization: accessToken.accessToken,
    });
  }

  public async post<T>(path: string, body?: any, query?: any): Promise<T> {
    const accessToken = await this.getAccessToken();
    return this.client.post<T>(path, body, query, {
      Authorization: accessToken.accessToken,
    });
  }
}




