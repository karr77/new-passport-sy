import { app_system } from '@/config'

//校验手机号格式
export const validatePhoneNumber = (phoneNumber: string) => {
  const regex = /^1[3-9]\d{9}$/; // 中国大陆手机号正则表达式
  return regex.test(phoneNumber);
};

// 校验邮箱格式
export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 登录成功默认跳转到sass系统
export const loginSuccessRedirect = (token: string, tenant_id: string) => {
  const newToken = token || localStorage.getItem('token')
  console.log(newToken);
  console.log(`tenant_id:${tenant_id}`);

  window.location.href = `${app_system}?token=${newToken}&tenant_id=${tenant_id}`;
};
