export default function Footer() {
  return (
    <footer className='border-t-4 border-orange_main bg-neutral-100 py-16'>
      <div className='mx-auto max-w-6xl px-4'>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
          <div className='lg:col-span-1'>
            <div>© 2025 Shopee. Tất cả các quyền được bảo lưu.</div>
          </div>
          <div className='text-sm lg:col-span-2'>
            Quốc gia & Khu vực: Argentina Singapore Indonesia Thái Lan Malaysia Việt Nam Philippines Brazil México
            Colombia Chile
          </div>
        </div>
        <div className='mt-10 text-center text-sm'>
          <div>Công ty TNHH Shopee</div>
          <div className='mt-2'>
            Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Hà, Thành phố Hà Nội, Việt
            Nam
          </div>
          <div className='mt-2'>
            Chăm sóc khách hàng: Gọi tổng đài Shopee (miễn phí) hoặc Trò chuyện với Shopee ngay trên Trung tâm trợ giúp
          </div>
          <div className='mt-2'>Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Bùi Anh Tuấn</div>
          <div className='mt-2'>
            Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch và Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015
          </div>
          <div className='mt-2'>© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</div>
        </div>
      </div>
    </footer>
  )
}
