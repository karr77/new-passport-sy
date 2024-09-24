import { request } from "@umijs/max";

const passport = `/passport/v1`;

/** 个人、所属团队信息*/
export async function getUserInfo(options?: { [key: string]: any }) {
  return request<{
    data: API.UserInfoProps;
  }>(`${passport}/user/profile/info`, {
    method: "GET",
    ...(options || {}),
  });
}

/** 个人信息修改*/
export async function updateProfile(
  body: API.UserInfoProps,
  options?: { [key: string]: any }
) {
  return request<API.LoginResult>(`${passport}/user/profile/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 团队-信息修改*/
export async function updateTenant(
  body: API.UserInfoProps,
  options?: { [key: string]: any }
) {
  return request<API.LoginResult>(`${passport}/tenant/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 团队-账号列表*/
export async function getUserList(options?: { [key: string]: any }) {
  return request<{
    data: any;
  }>(`${passport}/tenant/user/list`, {
    method: "GET",
    ...(options || {}),
  });
}

/** 团队-子账号添加*/
export async function addMember(
  body: API.UserInfoProps,
  options?: { [key: string]: any }
) {
  return request<API.LoginResult>(`${passport}/tenant/add/member`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 头像地址*/
export async function getAvatarList(
  body: API.UserInfoProps,
  options?: { [key: string]: any }
) {
  return request<API.LoginResult>(`${passport}/system/public/header/list`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 团队-子账号删除*/
export async function deleteMember(
  body: { user_ids: string[] },
  options?: { [key: string]: any }
) {
  return request<API.LoginResult>(`${passport}/tenant/del/member`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}


