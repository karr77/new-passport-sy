import {
  ProForm,
  ProFormCaptcha,
  ProFormText,
} from "@ant-design/pro-components";
import { FC, useEffect, useRef, useState } from "react";
import type { ProFormInstance } from "@ant-design/pro-components";
import { validatePhoneNumber, loginSuccessRedirect } from "@/utils";
import { Checkbox, message } from "antd";
import { Link, useNavigate } from "@umijs/max";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import "../register/index.less";
import { verifylogin, getVerifyCode } from "@/services/login";

const CodeForm: FC = () => {
  const formRef = useRef<ProFormInstance>();
  const [activeLogin, setActiveLogin] = useState(false);
  const [agree, setAgree] = useState(true);
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const [verifyCode, setVerifyCode] = useState("");
  const code = formRef.current?.getFieldValue("code");
  const [codeFalse, setCodeFalse] = useState(true);

  useEffect(() => {
    const phone = formRef.current?.getFieldValue("phone");
    if (agree && code && phone) {
      setActiveLogin(true);
    } else {
      setActiveLogin(false);
    }
  }, [agree, code]);

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
          console.log("成功输入", values);
          const code = formRef.current?.getFieldValue("code");
          const params = {
            email: "",
            mobile: values.phone,
            type: 1,
            verify_code: code,
            verify_id: verifyCode,
          };
          verifylogin(params).then((res: any) => {
            if (res.code === 0) {
              message.success("登录成功");
              let str = JSON.stringify(res.data.user_info);
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("tenantId", res.data.tenant_id);
              localStorage.setItem("user", str);
              loginSuccessRedirect(res.data.token, res.data.user_info.tenant_id);
              // navigate("/personal");
            } else {
              message.error(res.message);
            }
          });
          return true;
        }}
        formRef={formRef}
        onValuesChange={() => {
          console.log("changeValues", formRef.current?.getFieldsValue());
          const phone = formRef.current?.getFieldValue("phone");
          const code = formRef.current?.getFieldValue("code");
          if (phone && code) {
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
                      setDisabled(false);
                      return Promise.resolve();
                    } else {
                      return Promise.reject("请输入正确的手机号");
                    }
                  } else {
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
              const phone = formRef.current?.getFieldValue("phone") || "";
              const email = formRef.current?.getFieldValue("email") || "";
              const params = {
                email: email,
                mobile: phone,
                scene: 2,
                type: 1,
              };
              getVerifyCode(params).then((res: any) => {
                console.log(res);
                if (res.code === 0) {
                  setVerifyCode(res.data.verify_id);
                } else {
                  setCodeFalse(false);
                  setDisabled(false);
                  message.error(res.message);
                }
              });
            }}
          />
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

export default CodeForm;
