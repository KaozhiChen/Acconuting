import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Button } from 'antd-mobile';
import { useDispatch } from 'react-redux';
import { getBillList } from '../../store/modules/billStore';

const Layout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBillList());
  }, [dispatch]);
  return (
    <div>
      <Outlet />
      Layout
      <Button color='primary'>nihao</Button>
    </div>
  );
};

export default Layout;
