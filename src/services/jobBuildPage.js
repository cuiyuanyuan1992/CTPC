// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export async function queryPageJobBuilds(options) {
  return request('/api/tpBuild/page',{
    method:'POST',
    data: options,
  })
}

export async function stopBuild(options) {
  return request('/api/tpBuild/stop',{
    method:'POST',
    params: options,
  })
}

export async function getBuildLog(options) {
  return request('/api/tpBuild/getlog',{
    method:'POST',
    params: options,
  })
}

