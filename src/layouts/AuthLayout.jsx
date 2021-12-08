import React from 'react';
import { Outlet } from 'react-router';
import "../styles/login.page.css";

const AuthLayout = () => {
  return (
      <div className="outer">
        <div className="inner">
            <Outlet />
        </div>
      </div>
  );
};

export default AuthLayout;
