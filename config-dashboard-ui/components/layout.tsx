import React, {useState, createElement} from "react";
import { Layout as AntdLayout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import styles from './Layout.module.css'

React.useLayoutEffect = React.useEffect

const { Header, Sider, Content } = AntdLayout;

type LayoutProps = {
    children: JSX.Element
}

const Layout = ({children}: LayoutProps) => {
    const [collapsed, setCollapsed] = useState<boolean>(false)

    return (
        <AntdLayout id="#components-layout" className={styles.layout}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className={styles.logo} />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        nav 1
                    </Menu.Item>
                    <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                        nav 2
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UploadOutlined />}>
                        nav 3
                    </Menu.Item>
                </Menu>
            </Sider>
            <AntdLayout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {children}
                </Content>
            </AntdLayout>
        </AntdLayout>
    )

}

export default Layout;
