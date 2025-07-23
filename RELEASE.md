# 🚀 Release Guide - Version 1.1.0

Hướng dẫn step-by-step để release phiên bản mới lên GitHub và NPM.

## 📋 Checklist trước khi release

- ✅ **Code đã test**: Chạy `npm start` để test
- ✅ **Version updated**: package.json → `1.1.0`
- ✅ **Documentation updated**: README.md, CHANGELOG.md
- ✅ **Author info updated**: package.json author field
- ✅ **Repository URLs updated**: GitHub links

## 🎯 Step 1: Test Local

```bash
# Test CLI
npm run cli

# Test API
npm start

# Test CLI với config
node cli.js --config example-config.json

# Test package structure
npm pack
ls -la *.tgz  # Kiểm tra file được tạo
```

## 🎯 Step 2: Git Commit & Push

### 2.1 Khởi tạo Git (nếu chưa có)
```bash
git init
git add .
git commit -m "🎉 Initial commit - v1.1.0"
```

### 2.2 Tạo GitHub Repository
1. Đi tới https://github.com/new
2. Repository name: `humg-banner-generator`
3. Description: `🎓 Tạo banner chào mừng sinh viên HUMG với avatar, tên, trạng thái và thời gian`
4. Public repository
5. **KHÔNG** check "Add README file" (vì ta đã có)
6. Create repository

### 2.3 Connect & Push
```bash
git branch -M main
git remote add origin https://github.com/Epchannel/humg-banner-generator.git
git push -u origin main
```

### 2.4 Tạo Release Tag
```bash
# Tạo tag cho version mới
git tag -a v1.1.0 -m "🎉 Release v1.1.0 - Added 3-line text layout with status support"

# Push tag lên GitHub
git push origin v1.1.0
```

## 🎯 Step 3: GitHub Release

1. Đi tới: https://github.com/Epchannel/humg-banner-generator/releases
2. Click **"Create a new release"**
3. **Tag version**: `v1.1.0`
4. **Release title**: `🎉 Version 1.1.0 - Enhanced Text Layout`
5. **Description**:
```markdown
## 🎉 What's New in v1.1.0

### ✨ New Features
- **3-line customizable text layout**:
  - 📝 "Chào mừng, [USERNAME]" 
  - 📋 "[STATUS]" (ĐÃ THAM GIA / ĐÃ RỜI KHỎI)
  - 🏫 "CỘNG ĐỒNG TÂN SINH VIÊN K70 HUMG"
- **Status selection** in both CLI and API
- **Enhanced positioning** for better visual balance
- **Improved styling** with UTM_AvoBold font

### 🔧 Improvements
- Better CLI user experience
- More intuitive API options
- Updated documentation

### 📦 Installation
```bash
npm install -g humg-banner-generator
npx humg-banner-generator
```

Full changelog: [CHANGELOG.md](CHANGELOG.md)
```
6. Check **"Set as the latest release"**
7. Click **"Publish release"**

## 🎯 Step 4: NPM Release

### 4.1 Đăng nhập NPM
```bash
# Đăng nhập (nếu chưa)
npm login

# Verify
npm whoami
```

### 4.2 Test before publish
```bash
# Dry run - kiểm tra trước khi publish
npm publish --dry-run

# Kiểm tra package content
npm pack && tar -tzf *.tgz
```

### 4.3 Publish
```bash
# Publish lên NPM
npm publish

# Nếu lần đầu hoặc có lỗi, thử:
npm publish --access public
```

### 4.4 Verify NPM
```bash
# Kiểm tra package đã publish
npm view humg-banner-generator

# Test install global
npm install -g humg-banner-generator@latest

# Test CLI
humg-banner --help
```

## 🎯 Step 5: Post-Release

### 5.1 Cập nhật README badges
Kiểm tra badges trong README.md có hoạt động không:
- [![npm version](https://badge.fury.io/js/humg-banner-generator.svg)](https://www.npmjs.com/package/humg-banner-generator)

### 5.2 Test từ NPM
```bash
# Tạo project test
mkdir test-humg-banner
cd test-humg-banner

# Test cài đặt
npm init -y
npm install humg-banner-generator

# Test API
node -e "
const BannerGenerator = require('humg-banner-generator');
console.log('Package loaded successfully!');
"

# Test CLI
npx humg-banner-generator --help
```

### 5.3 Clean up
```bash
# Xóa file .tgz từ npm pack
rm -f *.tgz
```

## 📢 Marketing & Share

### Chia sẻ trên:
- ✅ **Facebook groups**: Node.js Vietnam, JavaScript Vietnam
- ✅ **Reddit**: r/node, r/javascript, r/vietnam
- ✅ **Dev.to**: Viết blog post về project
- ✅ **Discord/Slack**: Các community tech Vietnam

### Sample post:
```
🎓 Vừa release HUMG Banner Generator v1.1.0!

✨ Tính năng mới:
- 3 dòng text tùy chỉnh
- Hỗ trợ trạng thái thành viên
- CLI interactive thân thiện
- API JavaScript đầy đủ

📦 Install: npm install -g humg-banner-generator
🚀 Usage: npx humg-banner-generator

GitHub: https://github.com/Epchannel/humg-banner-generator
NPM: https://www.npmjs.com/package/humg-banner-generator

#nodejs #canvas #humg #vietnam #opensource
```

## 🔄 Future Updates

Để update version sau:
```bash
# Patch version (1.1.0 → 1.1.1)
npm version patch

# Minor version (1.1.0 → 1.2.0)  
npm version minor

# Major version (1.1.0 → 2.0.0)
npm version major

# Sau đó:
git push origin main --tags
npm publish
```

---

🎉 **Success! Package v1.1.0 is now live!** 🎉 