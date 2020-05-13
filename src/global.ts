import moment from 'moment';
import { message } from 'antd';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
message.config({ maxCount: 1 });
