export const purchasesStatus = {
  inCart: -1, //Trong giỏ hàng
  all: 0, //Tất cả
  waitForConfirmation: 1, //Đang chờ xác nhận
  waitForGetting: 2, //Đang chờ lấy hàng
  inProgress: 3, //Đang vận chuyển
  delivered: 4, //Đã được giao
  cancelled: 5 //Đã bị huỷ
} as const
