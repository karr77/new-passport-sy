// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };
  type RegisterParams = {
    email?: string;
    mobile?: string;
    password?: string;
    type?: number;
    verify_code?: string;
    verify_id?: string;
  };
  type UserInfoProps = {
    nickname?: string;
    mobile?: string;
    company_name?: string;
    role?: string;
    logo_address?: string;
    company_address?: string;
    create_tenant_account_name?: string;
    tenant_id?: number
    avatar_address?: string
    avatar?: string
    name?: string
  };
  type RuleListItem = {
    key?: number;
    account_name?: string;
    company_name?: string;
    active_status?: number;
    address: string;
    avatar_address?: string;
    company_address?: string;
    company_name?: string;
    create_tenant_account_name?: string;
    create_time?: string;
    email?: string;
    id: number;
    logo_address?: string;
    mobile?: string;
    nickname?: string;
    role?: string;
    tenant_create_time?: string;
    tenant_id?: number;
    update_time?: string;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = "notification" | "message" | "event";

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
