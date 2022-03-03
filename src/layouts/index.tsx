import React, { useState } from 'react';
import { Avatar, Dropdown, Menu, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-layout';
import ProLayout, { SettingDrawer } from '@ant-design/pro-layout';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import AboutPage from '../pages/About';
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import NotFond from '../pages/ErrorPage/404';
import DashboardPage from '../pages/Dashboard';
import './index.less';

const ProLayouts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({});

  const handleLogout = () => {
    console.log('退出登录');
  };

  const handleClickMenuItem = (pathname: any) => {
    navigate(pathname);
  };
  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh'
      }}
    >
      <ProLayout
        title="博客管理系统"
        location={location.pathname}
        route={{
          routes: [
            {
              name: '仪表盘',
              path: '/dashboard'
            },
            {
              name: '关于我',
              path: '/about'
            }
          ]
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || menuItemProps.children) {
            return defaultDom;
          }
          if (menuItemProps.path && location.pathname !== menuItemProps.path) {
            return (
              <div
                onClick={() => {
                  handleClickMenuItem(menuItemProps.path);
                }}
              >
                {defaultDom}
              </div>
            );
          }
          return defaultDom;
        }}
        rightContentRender={() => (
          <Space>
            <div className="header-tools-item">
              <Dropdown
                overlay={
                  <Menu selectedKeys={[]}>
                    <Menu.Item key="center">
                      <UserOutlined />
                      <span style={{ paddingLeft: 8 }}>个人中心</span>
                    </Menu.Item>
                    <Menu.Item key="settings">
                      <SettingOutlined />
                      <span style={{ paddingLeft: 8 }}>个人设置</span>
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item key="logout" onClick={handleLogout}>
                      <LogoutOutlined />
                      <span style={{ paddingLeft: 8 }}>退出登录</span>
                    </Menu.Item>
                  </Menu>
                }
              >
                <div
                  className="header-tools-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Avatar shape="square" size="small" icon={<UserOutlined />} />
                  <span style={{ marginLeft: 8 }}>Admin</span>
                </div>
              </Dropdown>
            </div>
          </Space>
        )}
        {...settings}
      >
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<NotFond />} />
        </Routes>
      </ProLayout>
      <SettingDrawer
        pathname={location.pathname}
        enableDarkTheme
        getContainer={() => document.getElementById('test-pro-layout')}
        settings={settings}
        onSettingChange={(changeSetting) => {
          setSetting(changeSetting);
        }}
        disableUrlParams={true}
      />
    </div>
  );
};

export default ProLayouts;
