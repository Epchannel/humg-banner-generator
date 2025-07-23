# 🎓 HUMG Banner Generator

[![npm version](https://badge.fury.io/js/humg-banner-generator.svg)](https://www.npmjs.com/package/humg-banner-generator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Ứng dụng Node.js tạo banner chào mừng sinh viên HUMG với avatar, tên người dùng, trạng thái và thời gian. Hỗ trợ CLI và API.

## 🚀 Tính năng

- ✅ **CLI Tool** - Chạy trực tiếp từ command line
- ✅ **JavaScript API** - Tích hợp vào project
- ✅ **3 dòng text tùy chỉnh**:
  - 📝 "Chào mừng, [TÊN NGƯỜI DÙNG]"
  - 📋 "[TRẠNG THÁI]" (ĐÃ THAM GIA / ĐÃ RỜI KHỎI)
  - 🏫 "CỘNG ĐỒNG TÂN SINH VIÊN K70 HUMG"
- ✅ **Avatar người dùng** (hình tròn với viền)
- ✅ **Thời gian hiện tại** tự động
- ✅ **Font UTM_Avo** chuyên nghiệp
- ✅ Hỗ trợ avatar từ URL hoặc file local
- ✅ Vị trí và màu sắc có thể tùy chỉnh
- ✅ Xuất file JPG chất lượng cao

## 📦 Cài đặt

### Cài đặt global (CLI)
```bash
npm install -g humg-banner-generator
```

### Cài đặt local (API)
```bash
npm install humg-banner-generator
```

## 🎯 Cách sử dụng

### 1. CLI Tool (Dễ nhất)

#### Interactive Mode
```bash
npx humg-banner-generator
# Hoặc nếu đã cài global
humg-banner
```

**Sẽ hỏi:**
- 👤 Tên người dùng
- 📋 Trạng thái (1: ĐÃ THAM GIA, 2: ĐÃ RỜI KHỎI)
- 🖼️ URL avatar (tùy chọn)
- 💾 Tên file output

#### Sử dụng config file
```bash
npx humg-banner-generator --config config.json
```

**Ví dụ config.json:**
```json
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
```

### 2. JavaScript API

#### Sử dụng cơ bản
```javascript
const BannerGenerator = require('humg-banner-generator');

async function createBanner() {
  const generator = new BannerGenerator();
  await generator.initialize();
  
  await generator.generateBanner({
    userName: 'NGUYỄN VĂN A',
    status: 'ĐÃ THAM GIA',        // hoặc 'ĐÃ RỜI KHỎI'
    avatarUrl: 'https://example.com/avatar.jpg',
    outputPath: 'welcome-banner.jpg'
  });
}

createBanner();
```

#### Với font tùy chỉnh
```javascript
const generator = new BannerGenerator();

// Đăng ký fonts
await generator.initialize([
  {
    path: './fonts/MyFont.ttf',
    family: 'MyFont',
    weight: 'bold'
  }
]);

await generator.generateBanner({
  userName: 'NGUYỄN VĂN A',
  status: 'ĐÃ RỜI KHỎI',
  avatarUrl: 'https://example.com/avatar.jpg',
  outputPath: 'custom-banner.jpg',
  datetimeFormat: {
    showDate: true,
    showTime: false
  }
});
```

## ⚙️ Tùy chỉnh nâng cao

### Vị trí text
Chỉnh sửa file `position-config.js`:

```javascript
module.exports = {
  text: {
    main: { x: 0.5, y: 0.55 },         // Vị trí tên chính
    status: { x: 0.5, y: 0.67 },       // Vị trí trạng thái
    community: { x: 0.5, y: 0.78 },    // Vị trí text cộng đồng
    datetime: { x: 0.52, y: 0.9 }      // Vị trí thời gian
  }
}
```

### Style text
```javascript
style: {
  mainText: {
    fontSize: 0.005,
    fontFamily: 'UTM_AvoBold, sans-serif',
    color: '#FFFFFF',
    strokeColor: '#004aad'
  },
  statusText: {
    fontSize: 0.025,
    fontFamily: 'UTM_AvoBold, sans-serif', 
    color: '#FFFFFF',         // Màu trắng
    strokeColor: '#004aad'
  },
  communityText: {
    fontSize: 0.025,
    fontFamily: 'UTM_AvoBold, sans-serif',
    color: '#FFFFFF',
    strokeColor: '#004aad',
    fontWeight: 'bold'
  }
}
```

### API Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `userName` | string | `'Tân Sinh Viên'` | Tên hiển thị |
| `status` | string | `'ĐÃ THAM GIA'` | Trạng thái tham gia |
| `avatarUrl` | string | `null` | URL avatar |
| `avatarFile` | string | `null` | Đường dẫn file avatar |
| `outputPath` | string | `'output-banner.jpg'` | File output |
| `datetimeFormat` | object | `{}` | Cấu hình thời gian |

### Status Options

- `"ĐÃ THAM GIA"` - Thành viên hiện tại
- `"ĐÃ RỜI KHỎI"` - Cựu thành viên

## 📁 Template Project

Để tạo project mới từ template:

```bash
npx create-humg-banner my-banner-project
cd my-banner-project
npm start
```

## 🔧 Development

```bash
# Clone repository
git clone https://github.com/Epchannel/humg-banner-generator.git
cd humg-banner-generator

# Cài đặt dependencies  
npm install

# Test CLI
npm run cli

# Test API
npm start
```

## 📝 Ví dụ kết quả

Banner sẽ bao gồm 4 dòng text:
1. **"Chào mừng, NGUYỄN VĂN A"** - Tên người dùng
2. **"ĐÃ THAM GIA"** - Trạng thái (có thể thay đổi)
3. **"CỘNG ĐỒNG TÂN SINH VIÊN K70 HUMG"** - Text cộng đồng
4. **"25/07/2024 | 14:30"** - Thời gian hiện tại

Cùng với:
- Avatar người dùng (hình tròn có viền)
- Font UTM_Avo chuyên nghiệp
- Layout responsive

## 📄 License

MIT © [Pham Hong Hiep](https://github.com/Epchannel)

## 🤝 Contributing

Pull requests welcome! Báo lỗi tại: https://github.com/Epchannel/humg-banner-generator/issues

---

**Made with ❤️ for HUMG Community** 