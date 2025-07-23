#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const BannerGenerator = require('./banner-generator');

// 🎨 Banner CLI Tool
console.log(`
╔═══════════════════════════════════════╗
║        🎓 HUMG Banner Generator        ║
║     Tạo banner chào mừng sinh viên     ║
╚═══════════════════════════════════════╝
`);

// 📋 Hướng dẫn sử dụng
function showHelp() {
  console.log(`
🎯 Cách sử dụng:
  npx humg-banner                     # Chạy interactive mode
  npx humg-banner --help              # Hiện hướng dẫn này
  npx humg-banner --config <file>     # Sử dụng config file

📝 Ví dụ config file (config.json):
{
  "userName": "NGUYỄN VĂN A",
  "status": "ĐÃ THAM GIA",
  "avatarUrl": "https://example.com/avatar.jpg",
  "outputPath": "my-banner.jpg",
  "datetimeFormat": {
    "showDate": true,
    "showTime": true,
    "dateFormat": "dd/mm/yyyy",
    "timeFormat": "24h",
    "separator": " | "
  }
}

🔗 Thêm thông tin: https://github.com/Epchannel/humg-banner-generator
  `);
}

// 📝 Interactive mode - hỏi thông tin từ user
async function interactiveMode() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function question(prompt) {
    return new Promise(resolve => rl.question(prompt, resolve));
  }

  try {
    console.log('📝 Nhập thông tin để tạo banner:\n');
    
    const userName = await question('👤 Tên người dùng: ');
    const status = await question('📋 Trạng thái (1: ĐÃ THAM GIA, 2: ĐÃ RỜI KHỎI, mặc định: 1): ');
    const avatarUrl = await question('🖼️  URL avatar (để trống nếu không có): ');
    const outputPath = await question('💾 Tên file output (mặc định: banner.jpg): ') || 'banner.jpg';
    
    console.log('\n🎨 Đang tạo banner...');
    
    const generator = new BannerGenerator();
    await generator.initialize();
    
    // Xử lý status input
    let statusText = 'ĐÃ THAM GIA';
    if (status === '2') {
      statusText = 'ĐÃ RỜI KHỎI';
    }
    
    const config = {
      userName: userName || 'Tân Sinh Viên',
      status: statusText,
      outputPath,
      datetimeFormat: {
        showDate: true,
        showTime: true,
        dateFormat: 'dd/mm/yyyy',
        timeFormat: '24h',
        separator: ' | '
      }
    };
    
    if (avatarUrl.trim()) {
      config.avatarUrl = avatarUrl.trim();
    }
    
    await generator.generateBanner(config);
    
    console.log('✅ Banner đã được tạo thành công!');
    console.log(`📁 File: ${outputPath}`);
    
  } catch (error) {
    console.error('❌ Lỗi:', error.message);
  } finally {
    rl.close();
  }
}

// 📄 Sử dụng config file
async function useConfigFile(configPath) {
  try {
    if (!fs.existsSync(configPath)) {
      console.error(`❌ Không tìm thấy file config: ${configPath}`);
      return;
    }
    
    const configData = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(configData);
    
    console.log('🎨 Đang tạo banner từ config file...');
    
    const generator = new BannerGenerator();
    await generator.initialize();
    await generator.generateBanner(config);
    
    console.log('✅ Banner đã được tạo thành công!');
    console.log(`📁 File: ${config.outputPath || 'output-banner.jpg'}`);
    
  } catch (error) {
    console.error('❌ Lỗi:', error.message);
  }
}

// 🎯 Main function
async function main() {
  const args = process.argv.slice(2);
  
  // Hiện help
  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }
  
  // Sử dụng config file
  const configIndex = args.indexOf('--config');
  if (configIndex !== -1 && args[configIndex + 1]) {
    await useConfigFile(args[configIndex + 1]);
    return;
  }
  
  // Interactive mode (mặc định)
  await interactiveMode();
}

// Chạy CLI
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main, interactiveMode, useConfigFile }; 