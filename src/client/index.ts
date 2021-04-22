
export interface IWolaiClientConfigure {
  spaceId: string // 空间ID
  spaceSecret: string // 空间秘钥
}

export class WolaiClient {
  public readonly spaceId: string
  public readonly spaceSecret: string

  constructor(config: IWolaiClientConfigure) {
    this.spaceId = config.spaceId
    this.spaceSecret = config.spaceSecret
  }
}
