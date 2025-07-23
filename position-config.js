// 🎨 File cấu hình vị trí và style cho banner
const POSITION_CONFIG = {
  // 🖼️ AVATAR SETTINGS
  avatar: {
    // Vị trí (% của canvas)
    x: 0.4483,        // 8% từ trái (0.0 = sát trái, 0.5 = giữa, 1.0 = sát phải)
    y: 0.268,         // 50% từ trên (0.0 = sát trên, 0.5 = giữa, 1.0 = sát dưới)
    
    // Kích thước (% của chiều nhỏ nhất)
    size: 0.33,     // 15% của min(width, height)
    
    // Viền avatar
    borderWidth: 0.1,
    borderColor: '#FFFFFF'
  },

  // 📝 TEXT SETTINGS
  text: {
    // Vị trí tên chính
    main: {
      x: 0.5,       // 50% = giữa theo chiều ngang
      y: 0.55,       // 45% từ trên xuống (cao hơn để chừa chỗ)
    },
    
    // Vị trí text status (ĐÃ THAM GIA/ĐÃ RỜI KHỎI)
    status: {
      x: 0.5,       // 50% = giữa theo chiều ngang
      y: 0.67,      // 55% từ trên xuống (dưới tên chính)
    },

    // Vị trí text community 
    community: {
      x: 0.5,       // 50% = giữa theo chiều ngang
      y: 0.78,      // 65% từ trên xuống (dưới status)
    },
    
    // Vị trí text chào mừng
    welcome: {
      x: 0.5,       // Cùng x với tên chính
      offsetY: -60  // 60px phía trên tên chính
    },

    // Vị trí dòng thời gian
    datetime: {
      x: 0.52,       // 50% = giữa theo chiều ngang
      y: 0.9,       // 90% từ trên xuống (cuối cùng)
    }
  },

  // 🎨 STYLE SETTINGS
  style: {
    // Style tên chính
    mainText: {
      fontSize: 0.005,           // 4% của canvas width
      minFontSize: 36,          // Kích thước tối thiểu
      fontFamily: 'UTM_AvoBold, sans-serif', // Font family - có thể thay đổi
      color: '#FFFFFF',
      strokeColor: '#004aad',
      strokeWidth: 4,
      fontWeight: 'bold'
    },
    
    // Style text chào mừng
    welcomeText: {
      fontSize: 0.025,          // 2.5% của canvas width
      minFontSize: 24,          // Kích thước tối thiểu
      fontFamily: 'UTM_AvoBold, sans-serif', // Font family - có thể thay đổi
      color: '#FFD700',         // Màu vàng
      strokeColor: '#1a365d',
      strokeWidth: 2,
      fontWeight: 'normal'
    },

    // Style dòng thời gian
    datetimeText: {
      fontSize: 0.02,           // 2% của canvas width
      minFontSize: 20,          // Kích thước tối thiểu
      fontFamily: 'UTM_AvoBold, sans-serif', // Font family - có thể thay đổi
      color: '#FFFFFF',         // Màu xám nhạt
      strokeColor: '#004aad',
      strokeWidth: 1,
      fontWeight: 'normal'
    },

    // Style text status (ĐÃ THAM GIA/ĐÃ RỜI KHỎI)
    statusText: {
      fontSize: 0.025,          // 2.5% của canvas width
      minFontSize: 28,          // Kích thước tối thiểu
      fontFamily: 'UTM_AvoBold, sans-serif', // Font family
      color: '#FFFFFF',         // Màu vàng
      strokeColor: '#004aad',
      strokeWidth: 2,
      fontWeight: 'bold'
    },

    // Style tên nhóm
    communityText: {
      fontSize: 0.025,          // 2.2% của canvas width  
      minFontSize: 24,          // Kích thước tối thiểu
      fontFamily: 'UTM_AvoBold, sans-serif', // Font family
      color: '#FFFFFF',         // Màu trắng
      strokeColor: '#004aad',
      strokeWidth: 2,
      fontWeight: 'bold'
    }
  }
};

module.exports = POSITION_CONFIG; 