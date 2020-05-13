import React from 'react';
import { ConfigProvider, Empty } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

export function rootContainer(container: React.Component) {
    console.log('看看', container);
    return (
        <ConfigProvider
            locale={zh_CN}
            renderEmpty={() => {
                return <Empty description={<span className="gray">暂无数据</span>} />;
            }}
        >
            {container}
        </ConfigProvider>
    );
}

function fetchXXX() {
    return Promise.resolve('😄');
}

export async function getInitialState() {
    const data = await fetchXXX();
    console.log('111', data);
    return data;
}

export const dva = {
    config: {
        onError(err: ErrorEvent) {
            err.preventDefault();
            console.error(err.message);
        },
    },
};
