import { outLogin } from "@/services/ant-design-pro/api";
import {
  LogoutOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { history, useModel } from "@umijs/max";
import { Avatar, Spin } from "antd";
import { createStyles } from "antd-style";
import { stringify } from "querystring";
import type { MenuInfo } from "rc-menu/lib/interface";
import React, { useCallback, useEffect } from "react";
import { flushSync } from "react-dom";
import HeaderDropdown from "../HeaderDropdown";
import styleAvatar from './index.less'


const data = localStorage.getItem("user") || "";
// 将字符串转换回对象
let user = data && JSON.parse(data);

export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

export const AvatarName = () => {
  const { initialState } = useModel("@@initialState");
  const { currentUser } = initialState || {};
  return <span className="anticon">{currentUser?.name}</span>;
};

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      display: "flex",
      height: "48px",
      marginLeft: "auto",
      overflow: "hidden",
      alignItems: "center",
      padding: "0 8px",
      cursor: "pointer",
      borderRadius: token.borderRadius,
      "&:hover": {
        backgroundColor: token.colorBgTextHover,
      },
    },
  };
});

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({
  menu,
  children,
}) => {
  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    localStorage.clear()
    history.push('/user/login')
  };
  const { styles } = useStyles();

  const { initialState, setInitialState } = useModel("@@initialState");

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === "logout") {
        flushSync(() => {
          setInitialState((s) => ({ ...s, currentUser: undefined }));
        });
        loginOut();
        return;
      }
      if (key === 'center') {
        history.push('/personal')
        return;
      }
      if (key === 'settings') {
        history.push('/team/basic')
        return;
      }
    },
    [setInitialState]
  );

  const menuItems = [
    {
      key: 'center',
      icon: <UserOutlined style={{ color: '#4978f9', marginLeft: '15px', marginTop: '15px' }} />, // 默认图标颜色
      label: <span style={{ color: '#4978f9', marginLeft: '15px', marginTop: '15px', display: 'inline-block' }}>个人中心</span>, // 默认文字颜色
    },
    {
      key: 'settings',
      icon: <SettingOutlined style={{ color: '#4978f9', marginLeft: '15px', marginTop: '5px' }} />,
      label: <span style={{ color: '#4978f9', marginLeft: '15px', marginTop: '5px', display: 'inline-block' }}>团队设置</span>,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined style={{ color: '#4978f9', marginLeft: '15px', marginTop: '5px', marginBottom: '10px', }} />,
      label: <span style={{ color: '#4978f9', marginLeft: '15px', marginTop: '5px', marginBottom: '10px', display: 'inline-block' }}>退出登录</span>,
    },
  ];


  return (
    <HeaderDropdown
      menu={{
        onClick: onMenuClick,
        items: menuItems,
      }}
      overlayClassName={styleAvatar.action}
    >
      <div style={{
        width: '46px',
        height: '46px',
        borderRadius: '50%',
        padding: '1px',
        // background: 'linear-gradient(to right, #DC3E3E, #FF663A, #FDED49, #005A39, #024F5A)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Avatar
          size={40}
          icon="user"
          src={initialState?.currentUser?.avatar_address}
          alt=""
          style={{
            border: '0.5px solid white'
          }}
        />
      </div>
    </HeaderDropdown>
  );
};
