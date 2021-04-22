interface ISpace {
  name: string
  domain: string
}

/**
 * 用户空间信息
 */
export class Space {
  public name?: string; // 空间名称
  public domain?: string; // 空间域名

  constructor() {
  }
}
