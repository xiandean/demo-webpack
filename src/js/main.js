if (process.env.NODE_ENV === 'development') {
 	require('../index.html');
}

import {weixin} from './module/api.js';
import preload from './module/preload.js';
import events from './module/events.js';
import music from './module/music.js';

import '../css/index.scss';

const app = {
    preload,
    music,
    events,
    share () {
        weixin.getConfig().then(() => {
            if (this.music.bg) {
                document.getElementById((this.music.bg)).play();
            }

            weixin.setShare({
              title: '分享标题', // 分享标题
              desc: '分享描述', // 分享描述
              imgUrl: 'http://n.sinaimg.cn/gd/xiaopiqi/answer/weixin_share.jpg' // 分享图标
              // callback: '', // 分享成功回调
            });
        });

        // weixin.getOpenid().then(weixin.getUserInfo).then((user) => {
        //     console.log(user);
        // }).catch((err) => {
        //     console.log(err);
        // });
    },
    // app主入口
    main () {
        // 微信分享
        this.share();

        // 图片预加载入口
        this.preload.main();

        // 音乐处理入口
        this.music.main();

        // 用户交互事件入口
        this.events.main();
    }
};

app.main();

// function timeout (ms) {
//     return new Promise((resolve) => {
//         setTimeout(resolve, ms);
//     });
// }

async function timeout (ms) {
    await new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function test () {
    await timeout(3000);
    console.log('3000');
    await timeout(2000);
    console.log('2000');
    await timeout(1000);
    console.log('1000');
    return 'ok';
}
test().then((res) => {
    console.log(res);
});
