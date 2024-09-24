import {
  ProForm,
  ProFormCaptcha,
  ProFormText,
} from "@ant-design/pro-components";
import { Radio, message } from "antd";
import { FC, useRef, useState } from "react";
import { validateEmail, validatePhoneNumber } from "@/utils";
import type { ProFormInstance } from "@ant-design/pro-components";
import type { RadioChangeEvent } from "antd";
import { resetPassword, getVerifyCode } from "@/services/login";
import { useNavigate } from '@umijs/max'

const ForgetForm: FC = () => {
  const formRef = useRef<ProFormInstance>();
  const [activeLogin, setActiveLogin] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [codeFalse, setCodeFalse] = useState(true);
  const [verifyCode, setVerifyCode] = useState("");
  const navigate = useNavigate();

  return (
    <div className="forget-content">
      <ProForm
        submitter={{
          searchConfig: { submitText: "确定" },
          resetButtonProps: { style: { display: "none" } },
          submitButtonProps: {
            style: { width: "100%" },
            className: `${activeLogin ? "active-btn" : "btn-login"}`,
            disabled: !activeLogin,
          },
        }}
        onFinish={async (values) => {
          const params = {
            email: "",
            mobile: values.phone,
            password: values.password,
            type: 1,
            verify_code: values.code,
            verify_id: verifyCode,
          };
          resetPassword(params).then((res: any) => {
            if (res.code === 0) {
              message.success("密码重置成功,请重新登录");
            } else {
              message.error(res.message)
            }
          });
          return true;
        }}
        formRef={formRef}
        onValuesChange={() => {
          const pwd = formRef.current?.getFieldValue("password");
          const code = formRef.current?.getFieldValue("code");
          const phone = formRef.current?.getFieldValue("phone");

          if (phone && code && pwd) {
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
            placeholder={"请输入短信验证码"}
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
                scene: 3,
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
          <ProFormText.Password
            name="password"
            placeholder="请输入新的密码"
            width="lg"
            rules={[
              {
                required: true,
                message: "请输入新的密码！",
              },
            ]}
          />
        </ProForm.Group>
      </ProForm>
      <div className="footer">
        <p className="agree-text">短信只能重置个人账号的密码</p>
      </div>
    </div>
  );
};

export default ForgetForm;
