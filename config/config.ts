import { defineConfig } from 'umi';
import { IConfig } from '@umijs/types';

import routes from './routes';

const config: IConfig = {
    // title: false,
    hash: true,
    routes,
    nodeModulesTransform: {
        type: 'none',
    },
    dynamicImport: {
        loading: '@/components/PageLoading/index',
    },
    antd: {
        // dark: true,
    },
    dva: {
        hmr: true,
        immer: true,
        skipModelValidate: false,
    },
    targets: {
        ie: 11,
    },
};

export default defineConfig(config);
// export default config;
