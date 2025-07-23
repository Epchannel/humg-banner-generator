const BannerGenerator = require('./banner-generator');

// 🎯 TÙNG CHỈNH THÔNG TIN CỦA BẠN TẠI ĐÂY
const USER_CONFIG = {
  userName: 'NGUYỄN VĂN A',                    // ✏️ Thay đổi tên của bạn
  avatarUrl: 'https://s120-ava-talk.zadn.vn/c/9/1/c/14/120/0877abda951212d0c3238b9a0cc0f53a.jpg',                             // 🔗 URL avatar (nếu có)
  avatarFile: null,                            // 📁 File avatar local (nếu có)
  outputPath: 'my-banner.jpg',                 // 💾 Tên file output
  
  // 📅 CẤU HÌNH THỜI GIAN
  datetimeFormat: {
    showDate: true,                            // Hiển thị ngày
    showTime: true,                            // Hiển thị giờ
    dateFormat: 'dd/mm/yyyy',                  // dd/mm/yyyy, yyyy-mm-dd, mm/dd/yyyy
    timeFormat: '24h',                         // 24h hoặc 12h
    separator: ' | '                           // Ký tự ngăn cách giữa ngày và giờ
  }
};

// 🔤 CẤU HÌNH FONTS TÙY CHỈNH (TÙY CHỌN)
const CUSTOM_FONTS = [
  // Bỏ comment để sử dụng font tùy chỉnh
  // {
  //   path: './fonts/YourFont.ttf',        // Đường dẫn tới file font
  //   family: 'YourFont',                  // Tên font family  
  //   weight: 'bold',                      // Weight: normal, bold
  //   style: 'normal'                      // Style: normal, italic
  // }
];

// 🚀 Hàm tạo banner
async function createMyBanner() {
  const generator = new BannerGenerator();
  
  try {
    console.log('🔧 Đang khởi tạo Banner Generator...');
    
    // Khởi tạo với fonts tùy chỉnh (nếu có)
    await generator.initialize(CUSTOM_FONTS);
    
    console.log('🎨 Đang tạo banner cho:', USER_CONFIG.userName);
    await generator.generateBanner(USER_CONFIG);
    
    console.log('✅ Banner đã được tạo thành công!');
    console.log('📁 File đã lưu:', USER_CONFIG.outputPath);
    console.log('🎉 Hoàn thành!');
    
  } catch (error) {
    console.error('❌ Có lỗi xảy ra:', error.message);
    console.log('\n🔍 Kiểm tra:');
    console.log('- File "CHATBOT HUMG.jpg" có tồn tại không?');
    console.log('- URL avatar (nếu có) có hợp lệ không?');
    console.log('- Dependencies đã được cài đặt chưa? (npm install)');
    console.log('- File fonts có tồn tại không? (nếu dùng font tùy chỉnh)');
  }
}

// 📋 Hướng dẫn sử dụng
console.log('🎯 HUMG Banner Generator');
console.log('========================');
console.log('');
console.log('📝 Cách sử dụng:');
console.log('1. Sửa thông tin trong USER_CONFIG ở trên');
console.log('2. Chạy: node create-banner.js');
console.log('3. Kiểm tra file output đã được tạo');
console.log('');
console.log('💡 Mẹo:');
console.log('- Để dùng avatar từ URL: avatarUrl: "https://..."');
console.log('- Để dùng avatar local: avatarFile: "./avatar.jpg"');
console.log('- Để không dùng avatar: để null cho cả hai');
console.log('');
console.log('🔤 Font tùy chỉnh:');
console.log('- Tạo thư mục fonts/ và đặt file .ttf vào đó');
console.log('- Bỏ comment CUSTOM_FONTS và cập nhật đường dẫn');
console.log('- Sửa fontFamily trong position-config.js');
console.log('- Chạy: node custom-font-demo.js để xem hướng dẫn chi tiết');
console.log('');
console.log('📅 Thời gian:');
console.log('- Tự động hiển thị ngày giờ hiện tại');
console.log('- Sửa datetimeFormat để thay đổi định dạng');
console.log('- Sửa vị trí trong position-config.js (text.datetime.x, text.datetime.y)');
console.log('- Sửa style trong position-config.js (style.datetimeText)');
console.log('');

// Chạy nếu được gọi trực tiếp
if (require.main === module) {
  createMyBanner();
} 