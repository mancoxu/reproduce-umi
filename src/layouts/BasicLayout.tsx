import React from 'react';
import { connect, Dispatch } from 'dva';
import { Link, useModel } from 'umi';
import { Icon } from 'antd';

import ProLayout, { MenuDataItem, BasicLayoutProps as ProLayoutProps, Settings } from '@ant-design/pro-layout';

import { ConnectState } from '@/models/connect';

import HeaderRightContent from './components/HeaderRightContent';
import Footer from './components/Footer';

import './index.less';

const menuData = [
    {
        id: '379771723731435520',
        name: '菜单一', // 必须
        parent_id: '379771723731435520',
        level: '1',
        icon_type: 'read',
        sort: 1,
        path: '/app/portal/a', // 叶子节点必须
        output_type: 'bi', // 'bi' || 'preset'
        output_view: 'http:...', // 随便
    },
    {
        id: '379771723731435521',
        name: '菜单二',
        level: '1',
        icon_type: 'read',
        parent_id: '379771723731435520',
        path: '/app/portal/b', // 叶子节点必须
        sort: 2,
        routes: [
            {
                id: '379771723731435522',
                name: '子一', // 必须
                level: '2',
                parent_id: '379771723731435521',
                sort: 1,
                path: '/app/portal/b/aa', // 叶子节点必须
                output_type: 'bi', // 'bi' || 'preset'
                output_view: 'http:...', // 随便
            },
            {
                id: '379771723731435523',
                name: '子二', // 必须
                level: '2',
                parent_id: '379771723731435521',
                sort: 2,
                path: '/app/portal/b/bb', // 叶子节点必须
                output_type: 'bi', // 'bi' || 'preset'
                output_view: 'http:...', // 随便
            },
        ],
    },
    {
        id: '3797717237314355221',
        name: '菜单三', // 必须
        level: '1',
        parent_id: '3797717237314355251',
        sort: 3,
        path: '/app/portal/d', // 叶子节点必须
        output_type: 'preset', // 'bi' || 'preset'
        output_view: 'view1', // 随便
    },
];

export interface BasicLayoutProps extends ProLayoutProps {
    sideHeaderVisible: boolean;
    breadcrumbNameMap: {
        [path: string]: MenuDataItem;
    };
    route: ProLayoutProps['route'] & {
        authority: string[];
    };
    settings: Settings;
    dispatch: Dispatch;
}

// 第一级菜单增加 Icon(不根据非叶子节点判断)
export const setMenuIcon = (itemProps: MenuDataItem, dom: React.ReactNode) => {
    if (itemProps.level === '1') {
        const menuIcon = itemProps.icon_type || 'menu';
        dom = (
            <>
                <Icon type={menuIcon} />
                <span>{dom}</span>
            </>
        );
    }
    return dom;
};

const BasicLayout: React.FC<BasicLayoutProps> = props => {
    // const { initialState, loading, error, refresh, setInitialState } = useModel('@@initialState');
    const { initialState } = useModel('@@initialState');
    const { dispatch, children, sideHeaderVisible, collapsed } = props;
    console.log('@BasicLayout', props, initialState);

    const handleMenuCollapse = () => {
        dispatch({
            type: 'global/changeLayoutCollapsed',
            payload: !collapsed,
        });
    };

    return (
        <div className="yzh-basic-layout-wrap">
            {/* header */}
            <ProLayout
                navTheme="light"
                disableContentMargin
                layout="topmenu"
                headerRender={(props, dom) => {
                    return (
                        <div
                            className="yzh-header-wrap yzh-transition-side-header"
                            style={{
                                height: !sideHeaderVisible ? 0 : 64,
                            }}
                        >
                            {dom}
                        </div>
                    );
                }}
                rightContentRender={() => <HeaderRightContent />}
            >
                {/* sideMenu */}
                <ProLayout
                    disableContentMargin={!sideHeaderVisible}
                    collapsed={collapsed}
                    onCollapse={handleMenuCollapse}
                    menuHeaderRender={false}
                    headerRender={false}
                    menuDataRender={() => menuData}
                    menuRender={(props, dom) => {
                        return (
                            <div
                                className="yzh-menu-side-wrap yzh-transition-side-header"
                                style={{
                                    width: !sideHeaderVisible ? 0 : collapsed ? 80 : 256,
                                }}
                            >
                                {dom}
                                <div className="yzh-global-header-trigger trigger" onClick={handleMenuCollapse}>
                                    <Icon type={props.collapsed ? 'menu-unfold' : 'menu-fold'} />
                                </div>
                            </div>
                        );
                    }}
                    subMenuItemRender={(menuItemProps, defaultDom) => setMenuIcon(menuItemProps, defaultDom)}
                    menuItemRender={(menuItemProps, defaultDom) => {
                        const _defaultDom = setMenuIcon(menuItemProps, defaultDom);
                        if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
                            return _defaultDom;
                        }
                        return <Link to={menuItemProps.path}>{_defaultDom}</Link>;
                    }}
                    footerRender={() => sideHeaderVisible && <Footer />}
                >
                    <div style={{ minHeight: (sideHeaderVisible && 'calc(100vh - 133px)') || '100vh' }}>{children}</div>
                    {/* <PageHeaderWrapper>{children}</PageHeaderWrapper> */}
                </ProLayout>
            </ProLayout>
        </div>
    );
};

export default connect(({ global }: ConnectState) => ({
    sideHeaderVisible: global.sideHeaderVisible,
    collapsed: global.collapsed,
}))(BasicLayout);
