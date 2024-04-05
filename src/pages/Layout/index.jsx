import React from 'react';
import { Outlet } from 'react-router-dom';
import { Button } from 'antd-mobile';

const Layout = () => {
  return (
    <div>
      <Outlet />
      Layout
      <Button color='primary'>nihao</Button>
    </div>
  );
};

export default Layout;
