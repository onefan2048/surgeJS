// 轻记单词 永久VIP解锁脚本
// 适配：Gzip压缩加密响应体 | 全字段兼容兜底 | Surge官方运行环境
let body = $response.body;

if (body) {
    try {
        let obj = JSON.parse(body);

        if (obj.data) {
            // 覆盖APP所有可能的VIP状态字段（大小写、下划线驼峰全覆盖）
            obj.data.isVip = true;
            obj.data.is_vip = true;
            obj.data.vip = true;
            obj.data.vipStatus = 1;
            obj.data.vip_status = 1;
            obj.data.member = true;
            obj.data.memberStatus = 1;

            // 过期时间全部拉到2099年永久（所有时间字段兼容）
            const foreverTime = 4102329600000;
            obj.data.vipExpireTime = foreverTime;
            obj.data.vip_expire_time = foreverTime;
            obj.data.vipEndTime = foreverTime;
            obj.data.vip_end_time = foreverTime;
            obj.data.memberExpire = foreverTime;

            // 会员等级拉满
            obj.data.vipLevel = 99;
            obj.data.vip_level = 99;
            obj.data.memberLevel = 99;
        }

        // 返回修改后的完整响应体
        $done({ body: JSON.stringify(obj) });
    } catch (error) {
        // 加密/解析异常时原路返回，绝不导致APP闪退、报错
        console.log("脚本异常：" + error);
        $done({});
    }
} else {
    $done({});
}
