import { PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button, Modal, Table, message } from "antd";
import { useRef, FC, useState, useEffect } from "react";
import request from "umi-request";
import styles from "./index.less";
import CreateForm from "./form";
import { getUserList, deleteMember } from "@/services/home";
import { useAccess } from "@umijs/max";

const { confirm } = Modal;
type GithubIssueItem = {
    nickname?: string;
    mobile?: string;
    company_name?: string;
    create_tenant_account_name?: string;
    create_time?: string;
};

const PersonalContent: FC = () => {
    const actionRef = useRef<ActionType>();
    const [open, setOpen] = useState(false);
    const access = useAccess();
    useEffect(() => {
        actionRef?.current?.reload();
    }, [open]);

    console.log("0000000", access);

    // 删除账号
    const onDelete = (record: any) => {
        confirm({
            title: "温馨提示",
            centered: true,
            content: (
                <div>
                    你确定要删除
                    <span style={{ color: "red" }}>【{record.nickname}】</span>
                    这个账号吗？
                </div>
            ),
            onOk() {
                const params = {
                    user_ids: [record.id],
                };
                deleteMember(params).then((res: any) => {
                    if (res.code === 0) {
                        message.success("删除成功");
                        actionRef?.current?.reload();
                    } else {
                        message.error(res.message);
                    }
                });
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    };
    const columns: ProColumns<GithubIssueItem>[] = [
        {
            title: "帐号名称",
            dataIndex: "nickname",
            width: 200,
            fixed: "left",
        },
        {
            title: "手机号码",
            dataIndex: "mobile",
            width: 200,
        },
        {
            title: "角色",
            dataIndex: "role",
            width: 200,
            valueEnum: {
                ADMIN: { text: "管理员" },
                MEMBER: { text: "普通成员" },
            },
        },
        {
            title: "添加人",
            dataIndex: "create_tenant_account_name",
            width: 200,
        },
        {
            title: "添加时间",
            dataIndex: "create_time",
            width: 200,
            hideInSearch: true,
        },
        {
            title: "操作",
            valueType: "option",
            key: "option",
            fixed: "right",
            align: "center",
            width: 100,
            // render: (text, record, _, action) => [
            //     access.canAdmin && record.role !== "ADMIN" && (
            //       <Button type="link" key="view" onClick={() => onDelete(record)}>
            //         删除
            //       </Button>
            //     ),
            // ],
        },
    ];
    return (
        <div>
            <ProTable<GithubIssueItem>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                className={styles.personalTable}
                request={async (params) => {
                    const data = await getUserList({ options: params });
                    console.log("列表数据", data);
                    return {
                        data: data.data,
                        success: true,
                        total: 0,
                    };
                }}
                rowKey="id"
                search={false}
                options={false}
                form={{
                    // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
                    syncToUrl: (values, type) => {
                        if (type === "get") {
                            return {
                                ...values,
                                created_at: [values.startTime, values.endTime],
                            };
                        }
                        return values;
                    },
                }}
                pagination={{
                    pageSize: 20,
                    onChange: (page) => console.log(page),
                }}
                dateFormatter="string"
                toolBarRender={() => [
                    //   access.canAdmin && (
                    //     <Button
                    //       key="button"
                    //       icon={<PlusOutlined />}
                    //       onClick={() => {
                    //         setOpen(true);
                    //         actionRef.current?.reload();
                    //       }}
                    //       className='primary-btn'
                    //       type="primary"
                    //     >
                    //       新增帐号
                    //     </Button>
                    //   ),
                    // <Button key="batch">批量操作</Button>,
                ]}
            />
            <CreateForm open={open} onCancel={(value) => setOpen(value)} />
        </div>
    );
};

export default PersonalContent;
