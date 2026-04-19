// 轻记单词 Surge 解锁会员脚本
// 适配接口：POST /lw/seed/user/info
let body = $response.body;

if (body) {
    try {
        let obj = JSON.parse(body);

        // 核心VIP字段修改
        if (obj.data) {
            obj.data.isVip = true;          // 标记为VIP用户
            obj.data.vipLevel = 99;        // 最高VIP等级
            obj.data.vipExpireTime = 4102329600000; // 2099-12-31 永久有效
            obj.data.isVipForever = true;  // 永久会员标识

            // 可选：解锁金币/功能（按需保留）
            obj.data.coin = 999999;        // 无限金币
            obj.data.dailySignInDays = 999;// 满签天数
        }

        $done({
            body: JSON.stringify(obj)
        });
    } catch (e) {
        // 解析失败时返回原数据，不影响APP正常使用
        $done({});
    }
} else {
    $done({});
}
