
interface IBlockData {
  active: boolean
  version: number
  page_id: string
  parent_id: string
  parent_type: string
  workspace_id: string
}

/**
 * 块基类
 */
export abstract class Block<IBlockData> {
  public parent: Block<any> | undefined
  public children: Block<any>[]

  protected  constructor() {
    this.parent = undefined
    this.children = []
  }

  abstract canAdded(block: Block<any>): boolean // 检查块是否可以被添加

  abstract toBlockData(): IBlockData // 转换成块数据

  public addChild(block: Block<any>): boolean {
    if (this.canAdded(block)) {
      block.parent = this
      this.children.push(block)
      return true
    }
    return false
  }
}
