import styles from "./index.less";

export const AskTools = () => {

  const list = [
    // {
    //   key: 1,
    //   title: "反馈",
    //   icon: "icon-fankui",
    //   path: "",
    // },
    // {
    //   key: 2,
    //   title: "教程",
    //   icon: "icon-jiaocheng",
    //   path: "",
    // },
    // {
    //   key: 3,
    //   title: "任务",
    //   icon: "icon-renwu",
    //   path: "",
    // },
    {
      key: 4,
      title: "公告",
      icon: "icon-gonggao",
      path: "",
    },
  ];
  return (
    <div className={styles["top-content"]}>
       {/* <div className={styles['top-left']}>
        <ul>
          <li>公域招财系统</li>
          <li>私域进宝系统</li>
          <li>关于我们</li>
        </ul>
      </div> */}
      <ul>
        {list.map((item) => {
          return (
            <li key={item.key}>
              <i className={`iconfont ${item.icon}`}></i>
              <span>{item.title}</span>
            </li>
          );
        })}
      </ul>
      <div className={styles["line"]}></div>
    </div>
  );
};
