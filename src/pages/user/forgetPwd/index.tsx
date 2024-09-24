import { Tabs } from 'antd';
import { FC } from 'react';
import ForgetForm from './form';
import './index.less';
import { RedoOutlined } from "@ant-design/icons";
import { useNavigate } from '@umijs/max';

const ForgetPwd: FC = () => {
  const navigate = useNavigate();
  const items = [
    {
      label: `重置密码`,
      key: '1',
      children: <ForgetForm />,
    },
  ];
  return (
    <div className="login-frame-contain">
      <div className="camp-btn">
        <Tabs defaultActiveKey="1" items={items} />
      </div>
      <div
        className="btn-we password-login-btn"
        onClick={() => {
          navigate(-1);
        }}
      >
        <div className="icon">
          <RedoOutlined className="iconfont icon-shangyibu" />
        </div>
        上一步
      </div>
    </div>
  );
};

export default ForgetPwd;
