import { Tabs } from 'antd';
import { FC, useState } from 'react';
import './index.less';
import RegisterForm from './form';

const GegisterContent: FC = () => {
  const [activeTab, setActiveTab] = useState('1')
  const items = [
    {
      label: `手机号注册`,
      key: '1',
      children: <RegisterForm tab={activeTab} />,
    },
  ];
  return (
    <div className="login-frame-contain register">
      <div className="camp-btn">
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={(value) => {
            setActiveTab(value);
          }}
        />
      </div>
    </div>
  );
};

export default GegisterContent;
