// 数据维护
import request from "@/router/axios";

// 获取某个系列的枚举列表
export const getEnumsByType = (type, pid) => {
    return request({
      url: "/api/pr/company/getEnumsByType",
      method: "post",
      params: { type, pid }
    });
};