import { FC, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { useNavigate, useLocation } from '@umijs/max';
import { TabProps } from '@/types';
import PwdForm from './pwdForm';
import CodeForm from './codeForm';

const LoginContent: FC = () => {
    const [scanLogin, setScanLogin] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/user/login') {
            localStorage.clear()
        }
    }, [])

    const scanContent = (
        <div className="new-wx-login-qr-box">
            <div className="wx-login-qr-box">
                <div className="wx-qr-code">
                    <div className="login-dialog">
                        <img
                            src="https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQHC8DwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyY3pycFFDR0lmRkQxNEI5WU5DY1kAAgSl9zpmAwSAUQEA"
                            alt="二维码"
                        />
                    </div>
                </div>
                <div className="qrcode-title">扫码并关注公众号即可登录</div>
                <div className="wx-login-txt">
                    登录即同意<span>《用户协议》</span>与<span>《隐私政策》</span>
                </div>
                <div className="wx-login-btns" onClick={() => navigate('/user/register')}>
                    <span>免费注册</span>
                </div>
            </div>
        </div>
    );
    const items = [
        {
            label: `密码登录`,
            key: '1',
            children: <PwdForm />,
        },
        {
            label: `验证码登录`,
            key: '2',
            children: <CodeForm />,
        },
        {
            label: `扫码登录`,
            key: '3',
            children: scanContent,
        },
    ];
    const [tabItems, setTabItems] = useState<TabProps[]>([]);

    useEffect(() => {
        const list: TabProps[] = items.slice(0, 2);
        setTabItems(list);
    }, []);

    // 扫码登录
    const handleScanLogin = () => {
        const list: TabProps[] = items.slice(2, 3);
        setTabItems(list);
        setScanLogin(true);
    };

    // 密码登录
    const handlePwdLogin = () => {
        const list: TabProps[] = items.slice(0, 2);
        setTabItems(list);
        setScanLogin(false);
    };
    return (
        <div className="login-frame-contain">
            <div className="camp-btn">
                <Tabs defaultActiveKey="1" items={tabItems} />
            </div>
        </div>
    );
};

export default LoginContent;
