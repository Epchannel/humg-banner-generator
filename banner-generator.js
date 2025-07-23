const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');
const CONFIG = require('./position-config');
// Remove node-fetch import since we'll use built-in fetch

class BannerGenerator {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.backgroundImage = null;
    this.customFonts = []; // Danh sách fonts đã đăng ký
  }

  // Method để đăng ký font tùy chỉnh
  registerCustomFont(fontPath, fontFamily, fontWeight = 'normal', fontStyle = 'normal') {
    try {
      registerFont(fontPath, { 
        family: fontFamily,
        weight: fontWeight,
        style: fontStyle
      });
      this.customFonts.push({ fontPath, fontFamily, fontWeight, fontStyle });
      console.log(`✅ Font đã đăng ký: ${fontFamily} (${fontPath})`);
    } catch (error) {
      console.error(`❌ Lỗi đăng ký font ${fontPath}:`, error.message);
    }
  }

  // Method để đăng ký nhiều fonts cùng lúc
  registerFonts(fontConfigs) {
    fontConfigs.forEach(config => {
      this.registerCustomFont(config.path, config.family, config.weight, config.style);
    });
  }

  // Method để format thời gian
  formatDateTime(options = {}) {
    const {
      showDate = true,
      showTime = true,
      dateFormat = 'dd/mm/yyyy',  // dd/mm/yyyy, mm/dd/yyyy, yyyy-mm-dd
      timeFormat = '24h',         // 24h, 12h
      separator = ' | ',
      locale = 'vi-VN'
    } = options;

    const now = new Date();
    let dateStr = '';
    let timeStr = '';

    if (showDate) {
      if (dateFormat === 'dd/mm/yyyy') {
        dateStr = now.toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: '2-digit', 
          year: 'numeric'
        });
      } else if (dateFormat === 'yyyy-mm-dd') {
        dateStr = now.toLocaleDateString('sv-SE'); // ISO format
      } else {
        dateStr = now.toLocaleDateString(locale);
      }
    }

    if (showTime) {
      if (timeFormat === '24h') {
        timeStr = now.toLocaleTimeString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        });
      } else {
        timeStr = now.toLocaleTimeString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
      }
    }

    // Kết hợp date và time
    if (showDate && showTime) {
      return dateStr + separator + timeStr;
    } else if (showDate) {
      return dateStr;
    } else if (showTime) {
      return timeStr;
    }
    return '';
  }

  async initialize(fontConfigs = []) {
    // Đăng ký fonts tùy chỉnh trước khi khởi tạo canvas
    if (fontConfigs.length > 0) {
      console.log('🔤 Đang đăng ký fonts tùy chỉnh...');
      this.registerFonts(fontConfigs);
    }

    // Load background image
    try {
      this.backgroundImage = await loadImage('./background.jpg');
      this.canvas = createCanvas(this.backgroundImage.width, this.backgroundImage.height);
      this.ctx = this.canvas.getContext('2d');
      console.log(`Canvas initialized: ${this.backgroundImage.width}x${this.backgroundImage.height}`);
    } catch (error) {
      console.error('Error loading background image:', error);
      throw error;
    }
  }

  async downloadImage(url) {
    try {
      // Check if global fetch is available (Node.js 18+)
      if (typeof fetch === 'undefined') {
        const { default: fetch } = await import('node-fetch');
        global.fetch = fetch;
      }
      
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const buffer = Buffer.from(await response.arrayBuffer());
      return await loadImage(buffer);
    } catch (error) {
      console.error('Error downloading image:', error);
      throw error;
    }
  }

  drawCircularImage(image, x, y, radius) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2);
    this.ctx.clip();
    this.ctx.drawImage(image, x, y, radius * 2, radius * 2);
    this.ctx.restore();
  }

  drawText(text, x, y, options = {}) {
    const {
      fontSize = 40,
      fontFamily = 'Arial, sans-serif',
      color = '#FFFFFF',
      textAlign = 'center',
      fontWeight = 'bold',
      strokeColor = '#000000',
      strokeWidth = 3,
      shadow = false
    } = options;

    this.ctx.save();

    // Set font
    this.ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    this.ctx.textAlign = textAlign;
    this.ctx.textBaseline = 'middle';

    // Add shadow if enabled
    if (shadow) {
      this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      this.ctx.shadowBlur = 4;
      this.ctx.shadowOffsetX = 2;
      this.ctx.shadowOffsetY = 2;
    }

    // Draw stroke if specified
    if (strokeWidth > 0) {
      this.ctx.strokeStyle = strokeColor;
      this.ctx.lineWidth = strokeWidth;
      this.ctx.strokeText(text, x, y);
    }

    // Draw fill text
    this.ctx.fillStyle = color;
    this.ctx.fillText(text, x, y);

    this.ctx.restore();
  }

  async generateBanner(options = {}) {
    const {
      userName = 'Tân Sinh Viên',
      avatarUrl = null,
      avatarFile = null,
      outputPath = 'output-banner.jpg'
    } = options;

    if (!this.backgroundImage) {
      throw new Error('Background image not loaded. Call initialize() first.');
    }

    // Clear canvas and draw background
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.backgroundImage, 0, 0);

    // Avatar settings using CONFIG
    const avatarSize = Math.min(this.canvas.width, this.canvas.height) * CONFIG.avatar.size;
    const avatarRadius = avatarSize / 2;
    
    // Position avatar using CONFIG
    const avatarX = this.canvas.width * CONFIG.avatar.x;
    const avatarY = this.canvas.height * CONFIG.avatar.y - avatarRadius;

    // Add avatar if provided
    if (avatarUrl || avatarFile) {
      try {
        let avatarImage;
        if (avatarUrl) {
          avatarImage = await this.downloadImage(avatarUrl);
        } else if (avatarFile) {
          avatarImage = await loadImage(avatarFile);
        }
        
        // Draw circular avatar
        this.drawCircularImage(avatarImage, avatarX, avatarY, avatarRadius);
        
        // Add border around avatar using CONFIG
        this.ctx.beginPath();
        this.ctx.arc(avatarX + avatarRadius, avatarY + avatarRadius, avatarRadius + 3, 0, Math.PI * 2);
        this.ctx.strokeStyle = CONFIG.avatar.borderColor;
        this.ctx.lineWidth = CONFIG.avatar.borderWidth;
        this.ctx.stroke();
        
        console.log('Avatar added successfully');
      } catch (error) {
        console.error('Error adding avatar:', error);
      }
    }

    // Add username text using CONFIG
    const textX = this.canvas.width * CONFIG.text.main.x;
    const textY = this.canvas.height * CONFIG.text.main.y;
    
    // Kết hợp "CHÀO MỪNG" với tên người dùng trong cùng một dòng
    const fullText = 'Chào mừng, ' + userName;
    
    this.drawText(fullText, textX, textY, {
      fontSize: Math.max(CONFIG.style.mainText.minFontSize, this.canvas.width * CONFIG.style.mainText.fontSize),
      fontFamily: CONFIG.style.mainText.fontFamily,
      color: CONFIG.style.mainText.color,
      strokeColor: CONFIG.style.mainText.strokeColor,
      strokeWidth: CONFIG.style.mainText.strokeWidth,
      fontWeight: CONFIG.style.mainText.fontWeight,
      textAlign: 'center'
    });

    // Add status text (ĐÃ THAM GIA/ĐÃ RỜI KHỎI) using CONFIG
    const statusX = this.canvas.width * CONFIG.text.status.x;
    const statusY = this.canvas.height * CONFIG.text.status.y;
    
    // Lấy status từ options, mặc định là "ĐÃ THAM GIA"
    const statusText = options.status || 'ĐÃ THAM GIA';
    
    this.drawText(statusText, statusX, statusY, {
      fontSize: Math.max(CONFIG.style.statusText.minFontSize, this.canvas.width * CONFIG.style.statusText.fontSize),
      fontFamily: CONFIG.style.statusText.fontFamily,
      color: CONFIG.style.statusText.color,
      strokeColor: CONFIG.style.statusText.strokeColor,
      strokeWidth: CONFIG.style.statusText.strokeWidth,
      fontWeight: CONFIG.style.statusText.fontWeight,
      textAlign: 'center'
    });

    // Add community text using CONFIG
    const communityX = this.canvas.width * CONFIG.text.community.x;
    const communityY = this.canvas.height * CONFIG.text.community.y;
    
    const communityText = 'CỘNG ĐỒNG TÂN SINH VIÊN K70 HUMG';
    
    this.drawText(communityText, communityX, communityY, {
      fontSize: Math.max(CONFIG.style.communityText.minFontSize, this.canvas.width * CONFIG.style.communityText.fontSize),
      fontFamily: CONFIG.style.communityText.fontFamily,
      color: CONFIG.style.communityText.color,
      strokeColor: CONFIG.style.communityText.strokeColor,
      strokeWidth: CONFIG.style.communityText.strokeWidth,
      fontWeight: CONFIG.style.communityText.fontWeight,
      textAlign: 'center'
    });

    // Add datetime text using CONFIG
    const datetimeX = this.canvas.width * CONFIG.text.datetime.x;
    const datetimeY = this.canvas.height * CONFIG.text.datetime.y;
    
    // Format thời gian theo options (có thể tùy chỉnh trong options)
    const datetimeOptions = options.datetimeFormat || {
      showDate: true,
      showTime: true,
      dateFormat: 'dd/mm/yyyy',
      timeFormat: '24h',
      separator: ' | '
    };
    
    const datetimeText = this.formatDateTime(datetimeOptions);
    
    this.drawText(datetimeText, datetimeX, datetimeY, {
      fontSize: Math.max(CONFIG.style.datetimeText.minFontSize, this.canvas.width * CONFIG.style.datetimeText.fontSize),
      fontFamily: CONFIG.style.datetimeText.fontFamily,
      color: CONFIG.style.datetimeText.color,
      strokeColor: CONFIG.style.datetimeText.strokeColor,
      strokeWidth: CONFIG.style.datetimeText.strokeWidth,
      fontWeight: CONFIG.style.datetimeText.fontWeight,
      textAlign: 'center'
    });

    // Save the result
    const buffer = this.canvas.toBuffer('image/jpeg', { quality: 0.95 });
    fs.writeFileSync(outputPath, buffer);
    console.log(`Banner saved to: ${outputPath}`);

    return outputPath;
  }

  // Method to get canvas dimensions for positioning
  getDimensions() {
    return {
      width: this.canvas?.width || 0,
      height: this.canvas?.height || 0
    };
  }
}

// Usage example
async function createBanner() {
  const generator = new BannerGenerator();
  
  try {
    await generator.initialize();
    
    // Example usage - replace with actual values
    await generator.generateBanner({
      userName: 'NGUYỄN VĂN A',
      outputPath: 'welcome-banner.jpg'
    });
    
    console.log('Banner generation completed!');
  } catch (error) {
    console.error('Error generating banner:', error);
  }
}

// Export for use as module
module.exports = BannerGenerator;

// Run if called directly
if (require.main === module) {
  createBanner();
} 