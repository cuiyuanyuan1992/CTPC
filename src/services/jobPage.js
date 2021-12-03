// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export async function queryPageJobs(options) {
  return request('/api/tpJob/page',{
    method:'POST',
    data: options,
   })
}

export async function saveJob(options) {
  return request('/api/tpJob/save',{
    method:'POST',
    data: options,
  })
}

export async function updateJob(options) {
  return request('/api/tpJob/update',{
    method:'PUT',
    data: options,
  })
}

export async function deleteJob(options) {
  return request('/api/tpJob/remove',{
    method:'DELETE',
    params: options,
  })
}

export async function disableJob(options) {
  return request('/api/tpJob/disable',{
    method:'GET',
    params:options
  })
}

export async function enableJob(options) {
  return request('/api/tpJob/enable',{
    method:'GET',
    params:options
  })
}

export async function buildJob(options) {
  return request('/api/tpJob/build',{
    method:'GET',
    params:options
  })
}
