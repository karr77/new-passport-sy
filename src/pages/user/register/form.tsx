import {
  ProForm,
  ProFormCaptcha,
  ProFormText,
} from "@ant-design/pro-components";
import { message } from "antd";
import { FC, useRef, useState } from "react";
import { validateEmail, validatePhoneNumber } from "@/utils";
import type { ProFormInstance } from "@ant-design/pro-components";
import { Link,useNavigate } from "@umijs/max";
import { register, getVerifyCode } from "@/services/login";

interface FormProps {
  tab: string;
}
const EmailForm: FC<FormProps> = (props) => {
  const { tab } = props;
  const formRef = useRef<ProFormInstance>();
  const [activeLogin, setActiveLogin] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [verifyCode, setVerifyCode]= useState('');
  const [codeFalse, setCodeFalse] = useState(true);
  const navigate = useNavigate();
  return (
    <div>
      <ProForm
        submitter={{
          searchConfig: { submitText: "注册" },
          resetButtonProps: { style: { display: "none" } },
          submitButtonProps: {
            style: { width: "100%" },
            className: `${activeLogin ? "active-btn" : "btn-login"}`,
            disabled: !activeLogin,
          },
        }}
        onFinish={async (values) => {
          console.log("成功输入", values);
          const code = formRef.current?.getFieldValue('code') || ''
          const params = {
            email: values.email,
            mobile: values.phone,
            password: values.password,
            type: 1,
            verify_code: code,
            verify_id: verifyCode,
          };
          register(params).then((res: any)=>{
            if(res.code === 0){
              message.success('注册成功')
              navigate('/user/login')
            }
          })
          return true;
        }}
        formRef={formRef}
        onValuesChange={() => {
          const email = formRef.current?.getFieldValue("email");
          const code = formRef.current?.getFieldValue("code");
          const phone = formRef.current?.getFieldValue("phone");
          if (tab === "1") {
            if (phone && code) {
              setActiveLogin(true);
            } else {
              setActiveLogin(false);
            }
          } else {
            if (email && code) {
              setActiveLogin(true);
            } else {
              setActiveLogin(false);
            }
          }
        }}
      >
        <ProForm.Group>
          {tab === "2" && (
            <ProFormText
              rules={[
                {
                  required: true,
                  message: "",
                },
                () => ({
                  validator: (rule, value) => {
                    if (value) {
                      if (validateEmail(value)) {
                        setDisabled(false);
                        return Promise.resolve();
                      } else {
                        setDisabled(true);
                        return Promise.reject("邮箱格式错误");
                      }
                    } else {
                      setDisabled(true);
                      setActiveLogin(false);
                      return Promise.reject("请输入邮箱");
                    }
                  },
                }),
              ]}
              width="lg"
              name="email"
              placeholder="请输入邮箱"
            />
          )}
          {tab === "1" && (
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
                        setDisabled(false);
                        return Promise.resolve();
                      } else {
                        setDisabled(true);
                        return Promise.reject("请输入正确的手机号");
                      }
                    } else {
                      setDisabled(true);
                      setActiveLogin(false);
                      return Promise.reject("请输入手机号");
                    }
                  },
                }),
              ]}
              width="lg"
              name="phone"
              placeholder="请输入手机号"
            />
          )}

          <ProFormCaptcha
            fieldProps={{
              size: "large",
              style: { height: "56px" },
            }}
            captchaProps={{
              size: "large",
              disabled: disabled,
              className: !disabled ? "active captch" : "captch disabled",
            }}
            placeholder={"请输入验证码"}
            captchaTextRender={(timing, count) => {
              if (timing && codeFalse) {
                setDisabled(true);
                setTimeout(() => {
                  if (count === 1) {
                    setDisabled(false);
                  }
                }, 1000);
                return `${count} ${"获取验证码"}`;
              }

              return "获取验证码";
            }}
            name="code"
            rules={[
              {
                required: true,
                message: "请输入验证码！",
              },
            ]}
            onGetCaptcha={async () => {
              const phone = formRef.current?.getFieldValue("phone") || ''
              const email = formRef.current?.getFieldValue("email") || ''
              const params = {
                email: email,
                mobile: phone,
                scene: 1,
                type: Number(tab),
              };
              getVerifyCode(params).then((res: any)=>{
                console.log(res)
                if(res.code === 0){
                  setVerifyCode(res.data.verify_code)
                }else{
                  setCodeFalse(false)
                  message.error(res.message)
                }
              })
            }}
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
        </ProForm.Group>
      </ProForm>
      <div className="footer">
        <p className="agree-text">
          注册即同意 <a href="">《用户协议》</a> 和 <a href="">《隐私政策》</a>
        </p>
      </div>
      <div className="left-btn">
        <div className="desc">
          已经有账号？
          <Link to="/user/login" className="pointer">
            登录
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailForm;
