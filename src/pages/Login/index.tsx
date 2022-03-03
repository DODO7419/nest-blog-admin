import React from 'react';
import { LoginForm, ProFormText, ProFormCheckbox } from '@ant-design/pro-form';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { apiUserLogin } from '../../api/user';
import { useNavigate } from 'react-router';
import { IUserFormData } from '../../types/user';
import MD5 from 'crypto-js/md5';
import { message } from 'antd';

const LoginPage = () => {
  const navigate = useNavigate();
  const handleLogin = async (values: IUserFormData) => {
    try {
      values.password = MD5(values.password).toString();
      const loginRes = await apiUserLogin(values);
      const token = loginRes.data.token;
      localStorage.setItem('token', token);
      message.success('登录成功');
      navigate('/admin');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div style={{ backgroundColor: 'white' }}>
      <LoginForm
        onFinish={handleLogin}
        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        title="博客管理后台"
        subTitle="基于React开发"
      >
        <>
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'} />
            }}
            placeholder="请输入用户名或手机号"
            rules={[
              {
                required: true,
                message: '请输入用户名或手机号!'
              }
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />
            }}
            placeholder="请输入密码"
            rules={[
              {
                required: true,
                message: '请输入密码！'
              }
            ]}
          />
        </>

        <div
          style={{
            marginBottom: 24
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <a
            style={{
              float: 'right'
            }}
          >
            忘记密码
          </a>
        </div>
      </LoginForm>
    </div>
  );
};

export default LoginPage;
