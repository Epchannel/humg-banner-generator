# 🎓 HUMG Banner Generator

[![npm version](https://badge.fury.io/js/humg-banner-generator.svg)](https://www.npmjs.com/package/humg-banner-generator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Ứng dụng Node.js tạo banner chào mừng sinh viên HUMG với avatar, tên người dùng và thời gian. Hỗ trợ CLI và API.

## 🚀 Tính năng

- ✅ **CLI Tool** - Chạy trực tiếp từ command line
- ✅ **JavaScript API** - Tích hợp vào project
- ✅ Thêm avatar người dùng (hình tròn với viền)
- ✅ Hiển thị tên với font đẹp (UTM_Avo)
- ✅ Hiển thị thời gian hiện tại
- ✅ Hỗ trợ avatar từ URL hoặc file local
- ✅ Tự động điều chỉnh kích thước theo ảnh nền
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

#### Sử dụng config file
```bash
# Tạo file config.json
npx humg-banner-generator --config config.json
```

**Ví dụ config.json:**
```json
{
  "userName": "NGUYỄN VĂN A",
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
  avatarUrl: 'https://example.com/avatar.jpg',
  outputPath: 'custom-banner.jpg',
  datetimeFormat: {
    showDate: true,
    showTime: false
  }
});
```

## ⚙️ Tùy chỉnh nâng cao

### Vị trí và kích thước
Tạo file `position-config.js`:

```javascript
module.exports = {
  avatar: {
    x: 0.4483,    // Vị trí ngang (0-1)
    y: 0.268,     // Vị trí dọc (0-1)  
    size: 0.33,   // Kích thước (0-1)
    borderWidth: 0.1,
    borderColor: '#FFFFFF'
  },
  text: {
    main: { x: 0.5, y: 0.56 },      // Vị trí tên
    datetime: { x: 0.52, y: 0.9 }   // Vị trí thời gian
  },
  style: {
    mainText: {
      fontSize: 0.005,
      fontFamily: 'UTM_AvoBold, sans-serif',
      color: '#FFFFFF',
      strokeColor: '#004aad'
    },
    datetimeText: {
      fontSize: 0.02,
      fontFamily: 'UTM_Avo, sans-serif',
      color: '#FFFFFF',
      strokeColor: '#004aad'
    }
  }
};
```

### API Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `userName` | string | `'Tân Sinh Viên'` | Tên hiển thị |
| `avatarUrl` | string | `null` | URL avatar |
| `avatarFile` | string | `null` | Đường dẫn file avatar |
| `outputPath` | string | `'output-banner.jpg'` | File output |
| `datetimeFormat` | object | `{}` | Cấu hình thời gian |

### DateTime Format Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `showDate` | boolean | `true` | Hiển thị ngày |
| `showTime` | boolean | `true` | Hiển thị giờ |
| `dateFormat` | string | `'dd/mm/yyyy'` | Format ngày |
| `timeFormat` | string | `'24h'` | Format giờ (`24h`/`12h`) |
| `separator` | string | `' \| '` | Ký tự ngăn cách |

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
git clone https://github.com/your-username/humg-banner-generator.git
cd humg-banner-generator

# Cài đặt dependencies  
npm install

# Test CLI
npm run cli

# Test API
npm start
```

## 📄 License

MIT © [HUMG](https://github.com/your-username)

## 🤝 Contributing

Pull requests welcome! Đọc [CONTRIBUTING.md](CONTRIBUTING.md) để biết thêm chi tiết.

## 🐛 Issues

Báo lỗi tại: https://github.com/your-username/humg-banner-generator/issues

---

**Made with ❤️ for HUMG Community** 