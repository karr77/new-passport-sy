import { ProForm, ProFormText } from "@ant-design/pro-components";
import { FC, useEffect, useRef, useState } from "react";
import type { ProFormInstance } from "@ant-design/pro-components";
import { validatePhoneNumber, loginSuccessRedirect } from "@/utils";
import { Checkbox, message } from "antd";
import { Link, useNavigate } from "@umijs/max";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import "../register/index.less";
import { pwdlogin } from "@/services/login";


const PwdForm: FC = () => {
  const formRef = useRef<ProFormInstance>();
  const [activeLogin, setActiveLogin] = useState(false);
  const [agree, setAgree] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const phone = formRef.current?.getFieldValue("phone");
    const pwd = formRef.current?.getFieldValue("password");
    if (!agree) {
      setActiveLogin(false);
    } else {
      if (phone && pwd) {
        setActiveLogin(true);
      } else {
        setActiveLogin(false);
      }
    }
  }, [agree]);

  const onChange = (e: CheckboxChangeEvent) => {
    setAgree(e.target.checked);
  };
  return (
    <div className="register">
      <ProForm
        submitter={{
          searchConfig: { submitText: "登录" },
          resetButtonProps: { style: { display: "none" } },
          submitButtonProps: {
            style: { width: "100%" },
            className: `${activeLogin ? "active-btn" : "btn-login"}`,
            disabled: !activeLogin,
          },
        }}
        onFinish={async (values) => {
          const params = {
            email: values.email,
            mobile: values.phone,
            password: values.password,
            type: 1,
          };
          pwdlogin(params).then((res: any) => {
            if (res.code === 0) {
              message.success(`登录成功`);
              let str = JSON.stringify(res.data.user_info);
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("tenant_id", res.data.tenant_id);
              localStorage.setItem("user", str);
              loginSuccessRedirect(res.data.token, res.data.user_info.tenant_id)
              // navigate("/personal");
            } else {
              message.error(res.message)
            }
          });
          return true;
        }}
        formRef={formRef}
        onValuesChange={() => {
          const phone = formRef.current?.getFieldValue("phone");
          const pwd = formRef.current?.getFieldValue("password");
          if (phone && pwd) {
            setActiveLogin(true);
          } else {
            setActiveLogin(false);
          }
        }}
      >
        <ProForm.Group>
          <ProFormText
            rules={[
              {
                required: true,
                message: "",
              },
              () => ({
                validator: (rule, value) => {
                  if (value) {
                    if (validatePhoneNumber(value)) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject("请输入正确的手机号");
                    }
                  } else {
                    return Promise.reject("请输入邮箱/手机号");
                  }
                },
              }),
            ]}
            width="lg"
            name="phone"
            placeholder="请输入邮箱/手机号"
          />
          <ProFormText.Password
            name="password"
            placeholder="请输入密码"
            width="lg"
            rules={[
              {
                required: true,
                message: "请输入密码！",
              },
            ]}
          />
          <div className="forget-item">
            <Link to="/user/forget-pwd">忘记密码</Link>
          </div>
        </ProForm.Group>
      </ProForm>
      <div className="footer">
        <Checkbox checked={agree} onChange={onChange}>
          <p className="agree-text">
            我已阅读并同意 <a href="">服务协议</a> 和 <a href="">隐私政策</a>
          </p>
        </Checkbox>
      </div>
      <div className="left-btn">
        <div className="desc">
          还没有账号？
          <Link to="/user/register" className="pointer">
            注册
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PwdForm;
