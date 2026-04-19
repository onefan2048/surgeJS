// 轻记单词 适配Gzip压缩响应的解锁脚本
let body = $response.body;

if (body) {
    try {
        // 先处理Gzip压缩的响应
        if ($response.headers["Content-Encoding"] === "gzip") {
            // Surge会自动处理解压，这里直接解析即可
            let obj = JSON.parse(body);

            // 核心VIP字段修改（通用模板，覆盖大部分情况）
            if (obj.data) {
                // 通用VIP状态字段
                obj.data.isVip = true;
                obj.data.vip = true;
                obj.data.is_vip = true;
                obj.data.vipStatus = 1;
                obj.data.vip_status = 1;

                // 过期时间字段（设为2099年）
                obj.data.vipExpireTime = 4102329600000;
                obj.data.vip_expire_time = 4102329600000;
                obj.data.vipEndTime = 4102329600000;
                obj.data.vip_end_time = 4102329600000;

                // 会员等级/权益字段
                obj.data.vipLevel = 99;
                obj.data.vip_level = 99;
                obj.data.memberType = "vip";
                obj.data.member_type = "vip";
            }

            $done({
                body: JSON.stringify(obj)
            });
        } else {
            // 非压缩响应直接处理
            let obj = JSON.parse(body);
            if (obj.data) {
                obj.data.isVip = true;
                obj.data.vipExpireTime = 4102329600000;
            }
            $done({
                body: JSON.stringify(obj)
            });
        }
    } catch (e) {
        // 解析失败时返回原数据，不影响APP使用
        console.log("解析错误：" + e);
        $done({});
    }
} else {
    $done({});
}
