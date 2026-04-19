// 轻记单词 终极VIP解锁脚本（多接口通用·全字段兜底）
let body = $response.body;

if (body) {
    try {
        let obj = JSON.parse(body);

        // 处理不同接口的响应结构
        if (obj.data) {
            // 1. 用户信息接口：强制所有VIP字段为true
            obj.data.isVip = true;
            obj.data.is_vip = true;
            obj.data.vip = true;
            obj.data.vipStatus = 1;
            obj.data.vip_status = 1;
            obj.data.member = true;
            obj.data.memberStatus = 1;

            // 2. 时间字段全部拉到2099年
            const forever = 4102329600000;
            obj.data.vipExpireTime = forever;
            obj.data.vip_expire_time = forever;
            obj.data.vipEndTime = forever;
            obj.data.vip_end_time = forever;
            obj.data.memberExpire = forever;

            // 3. 等级/权益字段拉满
            obj.data.vipLevel = 99;
            obj.data.vip_level = 99;
            obj.data.memberLevel = 99;
        }

        // 处理商品接口：强制所有商品为已购买
        if (obj.data && obj.data.list) {
            obj.data.list.forEach(item => {
                item.isBuy = true;
                item.is_buy = true;
                item.bought = true;
                item.expireTime = forever;
            });
        }

        // 处理卡包接口：强制所有权益为有效
        if (obj.data && obj.data.hasNew) {
            obj.data.hasNew = false;
            obj.data.valid = true;
            obj.data.expired = false;
        }

        // 处理课程接口：强制所有课程为已解锁
        if (obj.data && obj.data.list) {
            obj.data.list.forEach(item => {
                item.isLock = false;
                item.is_lock = false;
                item.unlocked = true;
            });
        }

        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        // 解析失败直接返回原数据，不影响APP使用
        console.log("脚本处理异常：" + e);
        $done({});
    }
} else {
    $done({});
}
