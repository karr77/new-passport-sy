import { request } from "@umijs/max";

const passport = `/passport/v1`;
const service = `/file-service/v1`;

/** 登录接口*/
export async function register(
  body: API.RegisterParams,
  options?: { [key: string]: any }
) {
  return request<API.LoginResult>(`${passport}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 发送验证码 */
export async function getVerifyCode(
  body: API.RegisterParams,
  options?: { [key: string]: any }
) {
  return request<API.LoginResult>(`${passport}/system/send/verify-code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 密码登陆 */
export async function pwdlogin(
  body: API.RegisterParams,
  options?: { [key: string]: any }
) {
  return request<API.LoginResult>(`${passport}/user/login/by/password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 验证码登陆 */
export async function verifylogin(
  body: API.RegisterParams,
  options?: { [key: string]: any }
) {
  return request<API.LoginResult>(`${passport}/user/login/by/verify-code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 重置密码 */
export async function resetPassword(
  body: API.RegisterParams,
  options?: { [key: string]: any }
) {
  return request<API.LoginResult>(`${passport}/user/resetting/password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 文件夹列表（主题分组） */
export async function getFolderList(
  body: any,
  options?: { [key: string]: any }
) {
  return request<API.LoginResult>(`${service}/files/folder/list`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}