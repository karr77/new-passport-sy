import { FC } from "react";
import styles from "./index.less";
import { Alert } from "antd";
import { CheckOutlined } from "@ant-design/icons";
// import Marquee from "react-fast-marquee";
import { Outlet } from "@umijs/max";
import Cover from "@/assets/image/backgroundimg/login/Cover.png"
import loginBg from "@/assets/image/backgroundimg/login/login-bg.png"
import loginLeft from "@/assets/image/backgroundimg/login/login-left.png"

const Login: FC = () => {
  return (
    <div className={styles["login-page"]} style={{ backgroundImage: `url(${Cover})` }}>
      <div className={styles["login-content"]}>
        <div className={styles["login-box"]}>
          <div className={styles["new-pc-login-l"]} style={{ backgroundImage: `url(${loginBg})` }}>
            <div className={styles["login-left-img"]} style={{ backgroundImage: `url(${loginLeft})` }}></div>
            <div className={styles["login-left-text"]}>
              企业品牌AIGC内容创作与智能营销平台
            </div>
            {/* <div className={styles["title2"]}>聚焦营销新时代</div>
            <div className={styles["subtitle"]}>
              打造企业级全域运营新范式智能生产和流量获取平台
            </div> */}
          </div>
          <div className={styles["login-bg--content"]}>
            <div className="flex login-frame">
              <Outlet></Outlet>
              <div className="form-footer">
                <div className="form-footer-contaier">
                  <span>
                    Copyright © 2023 All Rights Reserved
                    九千仿脑科技（深圳）有限公司
                  </span>
                  <a
                    href="//www.beian.miit.gov.cn/"
                    target="_blank"
                    className="icp"
                    rel="noreferrer"
                  >
                    粤ICP备13018744号-1
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
