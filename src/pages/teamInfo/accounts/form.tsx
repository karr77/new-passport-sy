import { FC } from "react";
import {
    ModalForm,
    ProForm,
    ProFormSelect,
    ProFormText,
} from "@ant-design/pro-components";
import { Form, message } from "antd";
import styles from "./index.less";
import { addMember } from "@/services/home";
import { validatePhoneNumber } from "@/utils";

interface UserProps {
    nickname?: string;
    mobile?: string;
    password?: string;
}
interface FormProps {
    open: boolean;
    onCancel: (value: boolean) => void;
}
const CreateForm: FC<FormProps> = (props) => {
    const { open, onCancel } = props;
    const [form] = Form.useForm<UserProps>();
    return (
        <ModalForm<UserProps>
            title="新增帐号"
            open={open}
            form={form}
            width={420}
            autoFocusFirstInput
            modalProps={{
                destroyOnClose: true,
                onCancel: () => onCancel?.(false),
                centered: true,
                wrapClassName: styles.addName,
            }}
            onFinish={async (values) => {
                console.log(values);
                const params = {
                    ...values,
                    type: 1,
                };
                addMember(params).then((res: any) => {
                    console.log("success", res);
                    if (res.code === 0) {
                        message.success("新增成功");
                        onCancel?.(false)
                    } else {
                        message.error(res.message);
                    }
                });
                return true;
            }}
            layout="horizontal"
        >
            <ProForm.Group>
                <ProFormText
                    width="md"
                    name="nickname"
                    label="账号名称"
                    placeholder="请输入名称"
                />

                <ProFormText
                    width="md"
                    name="mobile"
                    label="手机号"
                    placeholder="请输入手机号"
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
                                    return Promise.reject("请输入手机号");
                                }
                            },
                        }),
                    ]}
                />
                <ProFormText.Password
                    name="password"
                    placeholder="请输入密码"
                    width="md"
                    label="密码"
                    rules={[
                        {
                            required: true,
                            message: "请输入密码！",
                        },
                    ]}
                />
            </ProForm.Group>
        </ModalForm>
    );
};

export default CreateForm;
