# 📦 Hướng dẫn Publish NPM Package

## 🎯 Chuẩn bị trước khi publish

### 1. **Tài khoản NPM**
```bash
# Đăng ký tại: https://www.npmjs.com
# Đăng nhập
npm login
```

### 2. **Cập nhật thông tin**
Sửa các thông tin trong `package.json`:
```json
{
  "name": "humg-banner-generator",  // Tên package (phải unique)
  "author": {
    "name": "Pham Hong Hiep",
    "email": "epchannel1208@gmail.",
    "url": "https://github.com/Epchannel"
  },
  "repository": {
    "url": "https://github.com/Epchannel/humg-banner-generator.git"
  }
}
```

### 3. **Tạo GitHub Repository**
```bash
# Tạo repo trên GitHub, sau đó:
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/Epchannel/humg-banner-generator.git
git push -u origin main
```

## 🚀 Publish lên NPM

### Kiểm tra trước khi publish
```bash
# Test CLI locally
npm run cli

# Test package structure
npm pack
# Sẽ tạo file .tgz, kiểm tra nội dung

# Dry run publish
npm publish --dry-run
```

### Publish
```bash
# Publish lần đầu
npm publish

# Hoặc nếu tên package đã tồn tại, thử:
npm publish --access public
```

### Cập nhật version
```bash
# Patch version (1.0.0 -> 1.0.1)
npm version patch

# Minor version (1.0.0 -> 1.1.0)  
npm version minor

# Major version (1.0.0 -> 2.0.0)
npm version major

# Publish version mới
npm publish
```

## 🎉 Sau khi publish

### 1. **Test package**
```bash
# Test cài đặt global
npm install -g your-package-name

# Test CLI
npx your-package-name

# Test local install
mkdir test-project
cd test-project
npm init -y
npm install your-package-name
```

### 2. **Cập nhật README badges**
Thay đổi URLs trong README.md:
```markdown
[![npm version](https://badge.fury.io/js/your-package-name.svg)]
```

### 3. **Marketing**

#### Chia sẻ trên:
- ✅ GitHub (tạo release)
- ✅ Dev.to blog post
- ✅ Reddit r/node, r/javascript
- ✅ Facebook groups
- ✅ Discord/Slack communities

#### Tạo demo:
- ✅ GitHub Pages demo
- ✅ CodeSandbox example
- ✅ Video tutorial

## 📈 Monitoring & Maintenance

### NPM Analytics
- Xem stats tại: https://www.npmjs.com/package/your-package-name
- Monitor downloads, dependents

### GitHub
- Enable Discussions
- Create Issues templates
- Setup GitHub Actions for CI/CD

### Updates
- Regular security updates
- Feature requests từ community
- Bug fixes

## 🎯 Gợi ý tên package

Nếu `humg-banner-generator` đã tồn tại:
- `@your-username/humg-banner-generator`
- `humg-student-banner`
- `university-banner-maker`
- `banner-generator-humg`
- `humg-welcome-banner`

## 🔧 Troubleshooting

### Package name conflicts
```bash
# Check availability
npm view package-name

# Use scoped package
npm publish --access public
```

### Permission errors
```bash
# Re-login
npm logout
npm login

# Check auth
npm whoami
```

### CLI not working
```bash
# Check bin field in package.json
# Make cli.js executable
chmod +x cli.js
```

---

🎉 **Chúc mừng! Package của bạn đã live trên NPM!** 