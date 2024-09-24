import {
  Footer,
  AskTools,
  Question,
  SelectLang,
  AvatarDropdown,
  AvatarName,
} from "@/components";
import {
  DownOutlined, LinkOutlined, UserOutlined,
  SettingOutlined,
  NotificationOutlined
} from "@ant-design/icons";
import type { Settings as LayoutSettings } from "@ant-design/pro-components";
import type { RunTimeLayoutConfig } from "@umijs/max";
import { history, Link, useModel } from "@umijs/max";
import defaultSettings from "../config/defaultSettings";
import { errorConfig } from "./requestErrorConfig";
import { currentUser as queryCurrentUser } from "@/services/ant-design-pro/api";
import React, { useEffect } from "react";
const isDev = process.env.NODE_ENV === "development";
const loginPath = "/user/login";
// import "@/assets/iconfont/iconfont.css";
import "./global.less";
import { Row, Col, Menu, Avatar, Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import { app_system } from "@/config";
import { getUserInfo } from "@/services/home";
import { CDN_BASE_URL } from '../src/config/cdnConfig';
import loginBg from "@/assets/image/logo/ZcjbLogo.png"


/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.UserInfoProps;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.UserInfoProps | undefined>;
}> {
  const token = localStorage.getItem("token") || "";

  const fetchUserInfo = async () => {
    try {
      const msg = await getUserInfo();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  const { location } = history;

  if (location.pathname !== loginPath) {
    let currentUser;
    if (token) {
      currentUser = await fetchUserInfo();
    }
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState,
}) => {
  const token = localStorage.getItem("token") || "";
  const tenantId = initialState?.currentUser?.tenant_id || "";
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          href={`${app_system[0]}?token=${token}&tenant_id=${tenantId}`} rel="noreferrer"
        >
          公域招财系统
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          href={`${app_system[0]}?token=${token}&tenant_id=${tenantId}`} rel="noreferrer"
        >
          私域进宝系统
        </a>
      ),
    },
  ];

  console.log("initialState", initialState);
  return {
    actionsRender: () => [
      <AskTools key="tools" />,
      // <Question key="doc" />,
      // <SelectLang key="SelectLang" />,
    ],
    headerContentRender: (logo, title) => {
      return (
        <div style={{ width: '100%' }}>
          <Row justify="space-between" align="middle">
            <Col>
              <div className="header-left-content" style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                  <div
                    style={{
                      width: '180px',
                      height: '60px', // Adjust this value based on your logo's aspect ratio
                      marginRight: '60px',
                      backgroundImage: `url(${loginBg})`,
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center'
                    }}
                  />
                </div>
                <Menu mode="horizontal" style={{ marginLeft: '60px', color: '#878787' }}>
                  <Menu.Item key="tasks" icon={<NotificationOutlined style={{ color: '#878787', fontSize: '10px' }} />}>
                    <span style={{ color: '#878787' }}>新手任务</span>
                  </Menu.Item>
                  <Menu.Item key="list" icon={<UserOutlined style={{ color: '#878787', fontSize: '10px' }} />}>
                    <span style={{ color: '#878787' }}>任务列表</span>
                  </Menu.Item>
                  <Menu.Item key="help" icon={<SettingOutlined style={{ color: '#878787', fontSize: '10px' }} />}>
                    <span style={{ color: '#878787' }}>帮助中心</span>
                  </Menu.Item>
                </Menu>
              </div>
            </Col>
          </Row>
        </div>
      );
    },
    headerTitleRender: false,
    avatarProps: {
      src: initialState?.currentUser?.avatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    // footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      const token = localStorage.getItem("token");
      console.log('pathname', location.pathname)
      console.log('token', token)

      if (!token && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    // links: isDev
    //   ? [
    //     <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
    //       <LinkOutlined />
    //       <span>OpenAPI 文档</span>
    //     </Link>,
    //   ]
    //   : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      return <>{children}</>;
    },

    // ...initialState?.settings,
    ...(defaultSettings as Partial<LayoutSettings>),
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};
