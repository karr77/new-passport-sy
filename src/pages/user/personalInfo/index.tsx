import { FC, useEffect, useRef, useState } from "react";
import styles from "./index.less";
import { ProForm, ProFormText } from "@ant-design/pro-components";
import { Form, Upload, message } from "antd";
import type { ProFormInstance } from "@ant-design/pro-components";
import type { UploadProps } from "antd";
import { getUserInfo, updateProfile, getAvatarList } from "@/services/home";
import { useModel, useSearchParams, history } from "@umijs/max";
import { EditOutlined } from '@ant-design/icons';
// import {RoleType} from '@/enum'

interface UserProps {
  nickname?: string;
  mobile?: string;
  company_name?: string;
  role?: string;
}

enum RoleType {
  ADMIN = "管理员",
  MEMBER = "普通成员",
}
const PersonalContent: FC = () => {
  const formRef = useRef<ProFormInstance<UserProps>>();
  const { setInitialState } = useModel("@@initialState");
  const [searchParams] = useSearchParams();

  //监听从另一个页面跳转过来所带的参数参数保存到localStorage中并清掉参数
  useEffect(() => {
    const token = searchParams.get("token");
    const tenantId = searchParams.get("tenant_id");
    if (token && tenantId) {
      localStorage.setItem("token", token);
      localStorage.setItem("tenantId", tenantId);
      setInitialState({
        currentUser: {
          tenant_id: Number(tenantId),
        },
      });

      // 清除当前地址栏中的参数
      history.replace({
        pathname: location.pathname,
        search: "",
      });
    }
  }, []);

  const [isEdit, setIsEdit] = useState(true);
  const [isLook, setIsLook] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [currentImg, setCurrentImg] = useState<any>("");

  const [avatarList, setAvatarList] = useState([]);
  const getAvatar = () => {
    getAvatarList({}).then((res: any) => {
      if (res.code === 0) {
        setAvatarList(res.data);
      } else {
        message.error(res.message);
      }
    });
  };
  useEffect(() => {
    getAvatar();
  }, []);

  const props: UploadProps = {
    beforeUpload: (file) => {
      const isPNG = file.type === "image/png";
      if (!isPNG) {
        message.error(`${file.name} is not a png file`);
      }
      return isPNG || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      console.log(info.fileList);
    },
  };

  //   上传头像
  const onUpload = () => { };

  const getUserContent = async () => {
    const { data } = await getUserInfo();
    setCurrentImg(data.avatar_address);
    setInitialState({
      currentUser: data,
    });
    return {
      nickname: data.nickname,
      mobile: data.mobile,
      role: RoleType[data?.role as keyof typeof RoleType],
      company_name: data.company_name,
    };
  };

  return (
    <div className={styles.personal}>
      <div className={styles.header}>
        <div className={styles.title}>基本信息</div>
        <EditOutlined
          className="iconfont icon-bianji"
          onClick={() => setIsEdit(!isEdit)}
        />
      </div>
      <div className={styles.body}>
        <ProForm<UserProps>
          onFinish={async (values) => {
            console.log(values);
            const params = {
              ...values,
              avatar_address: currentImg,
              role: values.role === "管理员" ? "ADMIN" : "MEMBER",
            };
            const res: any = await updateProfile(params);
            if (res.code === 0) {
              message.success("编辑成功");
              getUserContent();
              setIsEdit(true);
            } else {
              message.error(res.message);
            }
          }}
          submitter={{
            onReset: () => {
              setIsEdit(true);
            },
            submitButtonProps: {
              type: "primary",
              htmlType: "submit",
              className: styles.bottomBtn,
              style: { display: isEdit ? "none" : "block" },
            },
            resetButtonProps: {
              htmlType: "reset",
              className: styles.bottomResetBtn,
              style: { display: isEdit ? "none" : "block" },
            },
            searchConfig: {
              submitText: "确定",
              resetText: "取消",
            },
          }}
          className={styles.infoForm}
          formRef={formRef}
          readonly={isEdit}
          request={getUserContent}
          layout="horizontal"
          autoFocusFirstInput
        >
          <ProForm.Group>
            <Form.Item
              name="avatar_address"
              label="头像"
              className={`${isEdit ? styles.editAvatarItem : ""} ${styles.avatarItem
                }`}
            >
              {/* {!isEdit && (
                <span className={styles.extraTitle}>
                  仅支持JPG、PNG、JPEG格式，文件小于1M(方形图)
                </span>
              )} */}

              <div className={styles.avatarContent}>
                <div
                  className={`${isEdit ? styles.avatarSmallBox : ""} ${styles.avatarBox
                    }`}
                  onMouseEnter={() => setIsLook(true)}
                  onMouseLeave={() => setIsLook(false)}
                >
                  <img className={styles.avatar} src={currentImg} alt="" />
                  {/* {isLook && !isEdit && (
                    <div className={styles.lookBox}>
                      <Upload {...props}>
                        <i
                          className={`iconfont icon-zhaoxiangji ${styles.look}`}
                          onClick={onUpload}
                        ></i>
                      </Upload>
                    </div>
                  )} */}
                </div>
                {!isEdit && (
                  <div className={styles.imgBox}>
                    {avatarList.map((item, index) => {
                      return (
                        <div
                          onClick={() => {
                            setActiveImg(index);
                            setCurrentImg(item);
                          }}
                          className={`${styles.imgItem} ${activeImg === index ? styles.activeImgItem : ""
                            }`}
                          key={index}
                        >
                          <img src={item} alt="" />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </Form.Item>
          </ProForm.Group>
          <ProFormText
            name="nickname"
            label="昵称"
            fieldProps={{
              size: "large",
            }}
            width={548}
            placeholder="请输入昵称"
          />
          <ProFormText
            name="mobile"
            label="手机号"
            fieldProps={{
              size: "large",
            }}
            readonly
            width={548}
            placeholder="请输入手机号"
          />
          {/* <ProFormText
            name="we_chat"
            label="微信号"
            fieldProps={{
              size: "large",
              allowClear: false,
              readOnly: true,
              value: formRef.current?.getFieldValue("we_chat")
                ? "已绑定"
                : "未绑定",
              suffix: (
                <span className={styles.bindWeXin}>
                  {!isEdit && (
                    <span>
                      {formRef.current?.getFieldValue("we_chat")
                        ? "解除绑定"
                        : "绑定微信号"}
                    </span>
                  )}
                </span>
              ),
            }}
            formItemProps={{
              className: styles.wexinItem,
            }}
            width={548}
            placeholder="请输入微信号"
          /> */}
          <ProFormText
            name="role"
            label="角色"
            readonly
            fieldProps={{
              size: "large",
            }}
            width={548}
            placeholder="请输入角色"
          />
          <ProFormText
            name="company_name"
            label="所在团队"
            readonly
            fieldProps={{
              size: "large",
            }}
            width={548}
            placeholder="请输入团队名称"
          />
        </ProForm>
      </div>
    </div>
  );
};

export default PersonalContent;
