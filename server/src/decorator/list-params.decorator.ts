import { createParamDecorator } from '@nestjs/common';
import * as lodash from 'lodash';

/**自定义查询的 where和order条件 */
export interface IParamsConfig {
  whereOptions?: string[];
  orderOptions?: string[];
  defaultOrder?: {
    [key: string]: 'DESC' | 'ASC'
  }
}
/**
 * 返回结构
 * pageParams页码参数；where条件；order条件；
 */
export interface IParamsResult {
  pageParams: {
    everyPage: number;
    currentPage: number
  };
  where: any;
  order: { [key: string]: 'DESC' | 'ASC' };
}
/**
 * 分页列表参数解析装饰器 必须是 get请求
 * 前端传参示例{currentPage:2,everyPage:10,orderBy:'createTime',orderValue:'ASC',...其他where条件}
 */
export const ListParams = createParamDecorator((customConfig: IParamsConfig, req): IParamsResult => {
  const query = req.query
  const pageParams = {
    everyPage: Number(query.everyPage || 10),
    currentPage: Number(query.currentPage || 1)
  }
  let where = {}
  let order = {}
  // customConfig 是自定义的查询配置
  if (lodash.isObject(customConfig)) {
    // 处理where条件
    if (lodash.isArray(customConfig.whereOptions)) {
      customConfig.whereOptions.forEach(item => {
        if (!lodash.isUndefined(query[item]) && query[item] !== '') {
          where[item] = query[item]
        }
      })
    }
    // 处理order默认条件
    if (lodash.isObject(customConfig.defaultOrder)) {
      order = customConfig.defaultOrder
    }
    // 处理前端传来的order条件
    if (lodash.isArray(customConfig.orderOptions)) {
      const verifyOrderBy = customConfig.orderOptions.includes(query.orderBy)
      const verifyOrderValue = ['DESC', 'ASC'].includes(query.orderValue)
      if (verifyOrderBy && verifyOrderValue) {
        order = { [query.orderBy]: query.orderValue }
      }
    }
  }
  return { pageParams, where, order }
});