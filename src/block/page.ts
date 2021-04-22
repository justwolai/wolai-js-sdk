
import { Block } from 'block/base';

interface IPageBlockData {

}


/**
 * 页面
 */
export class Page extends Block<IPageBlockData> {
  /**
   * 所有块都可以添加到page
   * @param block
   */
  public canAdded(block: Block<IPageBlockData>): boolean {
    return true
  }

  /**
   * 转换成块数据
   */
  public toBlockData(): IPageBlockData {
    return {}
  }
}
