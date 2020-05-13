import React from 'react';
// import { Dispatch } from 'dva';
import { useDispatch, useSelector } from 'umi';
import { Menu, Dropdown, Divider, Icon } from 'antd';
import { ClickParam } from 'antd/es/menu';

import { HeaderProps } from '@ant-design/pro-layout';

import { ConnectState } from '@/models/connect.d';

import './index.less';

// export interface HeaderRightContentProps extends HeaderProps {
//     // dispatch: Dispatch;
// }

const HeaderRightContent: React.FC<HeaderProps> = props => {
    const dispatch = useDispatch();
    const sideHeaderVisible: boolean = useSelector(
        ({ global: { sideHeaderVisible } }: ConnectState) => sideHeaderVisible
    );
    console.log('@HeaderRightContent', props, sideHeaderVisible);

    const handleLayoutSideHeader = () => {
        dispatch({
            type: 'global/changeLayoutSideHeader',
            payload: !sideHeaderVisible,
        });
    };

    const onMenuClick = (event: ClickParam) => {
        const { key } = event;

        switch (key) {
            case 'switch':
                break;
            case 'center':
                // setVisible(true);
                break;
            case 'logout':
                dispatch({ type: 'user/logout' });
                break;
            default:
        }
    };

    const menuHeaderDropdown = (
        <Menu className="menu" selectedKeys={[]} onClick={onMenuClick} style={{ width: 140, marginLeft: 200 }}>
            <Menu.Item key="switch">切换门户</Menu.Item>
            <Menu.Item key="logout">退出登录</Menu.Item>
        </Menu>
    );

    return (
        <div className="yzh-header-right" onClick={handleLayoutSideHeader}>
            <span className="pl10 account">
                <Dropdown overlay={menuHeaderDropdown} placement="bottomLeft" overlayClassName="yzh-header-dropdown">
                    <div>
                        <span className="ml10 fz-16 gray9">欢迎您管理员，鲁先生</span>
                        <Divider type="vertical" />
                        <span className="nameBox">
                            <span className="name"> 端数据门户</span>
                            <Icon type="icon-down" className="arrow" />
                        </span>
                    </div>
                </Dropdown>
            </span>
        </div>
    );
};

export default HeaderRightContent;
