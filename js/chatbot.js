// GameZone - AI Chatbot (GameBot)

// ============================================
// Chatbot Elements
// ============================================
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotForm = document.getElementById('chatbotForm');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSuggestions = document.getElementById('chatbotSuggestions');

// ============================================
// Knowledge Base - Câu trả lời về Game
// ============================================
const knowledgeBase = {
    'xin chào': 'Xin chào game thủ! 🎮 Tôi là GameBot - trợ lý AI của GameZone. Tôi có thể giúp bạn tìm hiểu về PC Gaming, Console, Mobile Gaming và Esports!',
    'hello': 'Hello! 🎮 Tôi là GameBot - trợ lý game của bạn. Hỏi tôi bất cứ điều gì về game nhé!',

    // PC Gaming
    'pc': '🖥️ **PC Gaming Hot 2026:**\n\n• **GTA 6** - Rockstar kỳ vọng nhất năm\n• **Elden Ring DLC** - 40h gameplay mới\n• **Starfield Shattered Space** - DLC mới\n• **Stalker 2** - Survival horror\n\nCấu hình card đồ họa RTX 5090 là best choice!',
    'gta': '🚗 **GTA 6 (Grand Theft Auto VI):**\n\n• Phát hành: Q4 2025\n• Bối cảnh: Vice City hiện đại\n• 2 nhân vật chính: Jason & Lucia\n• Map lớn gấp 3 lần GTA V\n• Ray Tracing, DLSS 3.5\n\nGame được mong đợi nhất thập kỷ!',
    'elden ring': '⚔️ **Elden Ring: Shadow of the Erdtree:**\n\n• DLC kỷ lục của FromSoftware\n• 40+ giờ gameplay\n• 10 boss mới cực khó\n• Map Land of Shadow rộng lớn\n• Vũ khí & phép thuật mới\n\nĐiểm Metacritic: 95/100!',

    // Console
    'console': '🎮 **Console Hot 2026:**\n\n• **PS5 Pro**: 8K Gaming, Ray Tracing++\n• **Xbox Series X2**: Game Pass Ultimate\n• **Nintendo Switch 2**: DLSS, màn OLED\n\nBạn team Console nào?',
    'ps5': '🎮 **PlayStation 5 Pro:**\n\n• GPU 16.7 TFLOPS (gấp 2 PS5 gốc)\n• Ray Tracing 8K, 120fps\n• SSD 2TB siêu nhanh\n• PlayStation VR2 nâng cấp\n\nGiá dự kiến: 14-18 triệu VND',
    'playstation': '🎮 **PlayStation 5 Pro:**\n\n• GPU 16.7 TFLOPS (gấp 2 PS5 gốc)\n• Ray Tracing 8K, 120fps\n• SSD 2TB siêu nhanh\n• PlayStation VR2 nâng cấp\n\nGiá dự kiến: 14-18 triệu VND',
    'xbox': '💚 **Xbox Series X2:**\n\n• Chip AMD RDNA 4 custom\n• Game Pass Ultimate tích hợp\n• Hỗ trợ VR\n• Backward Compatible toàn bộ\n\nMicrosoft đang đầu tư mạnh vào dịch vụ!',
    'nintendo': '🔴 **Nintendo Switch 2:**\n\n• Màn hình OLED 8 inch\n• NVIDIA T239 với DLSS\n• Game độc quyền Mario, Zelda mới\n• Tương thích Joy-Con cũ\n\nDự kiến ra mắt H2/2026!',

    // Mobile Gaming  
    'mobile': '📱 **Mobile Gaming Hot:**\n\n• **Genshin Impact** - Open world RPG\n• **Honkai Star Rail** - Turn-based RPG\n• **PUBG Mobile** - Battle Royale\n• **Wild Rift** - MOBA\n\nGame mobile ngày càng chất lượng!',
    'genshin': '⭐ **Genshin Impact:**\n\n• Version 5.0: Khu vực Natlan\n• 7 nhân vật 5★ mới\n• Archon Quest tiếp diễn\n• Endgame content mới\n• Collab anime sắp tới\n\nFree-to-play, Gacha system!',
    'gacha': '🎰 **Top Gacha Games 2026:**\n\n• Genshin Impact - HoYoverse\n• Honkai Star Rail - HoYoverse  \n• Arknights - Hypergryph\n• Blue Archive - Nexon\n• Nikke - Shift Up\n\nTip: Hãy tiết kiệm đá để roll!',

    // Esports
    'esports': '🏆 **Esports Hot 2026:**\n\n• **LoL**: CKTG - T1 Faker vô địch lần 5\n• **Valorant**: Champions - Fnatic đăng quang\n• **CSGO**: Major - FaZe Clan thống trị\n• **Dota 2**: TI - Team Spirit\n\nVietnam có VCS đang phát triển mạnh!',
    'lol': '🎭 **Liên Minh Huyền Thoại:**\n\n• CKTG 2026: T1 Faker vô địch lần 5!\n• Meta: Tanky Support, Carry Mid\n• Season mới nhiều thay đổi\n• VCS: GAM, TES đang mạnh\n\nFaker là GOAT vô đối!',
    'faker': '👑 **Faker - GOAT of Esports:**\n\n• 5 lần vô địch CKTG (2013, 2015, 2016, 2024, 2026)\n• 10+ năm thi đấu chuyên nghiệp\n• Biểu tượng của T1 và Hàn Quốc\n• Lương cao nhất lịch sử esports\n\nHuyền thoại sống của game!',
    'valorant': '🔫 **Valorant Champions 2026:**\n\n• Fnatic vô địch đánh bại Sentinels 3-1\n• Map mới: Abyss\n• Agent mới: Clove, Iso\n• VCT format mới hấp dẫn\n\nGame FPS tactical hot nhất!',

    // Mua game
    'mua': '🛒 **Mua game ở đâu?**\n\n• **Steam**: Sale thường xuyên, giá rẻ\n• **Epic Games**: Free game mỗi tuần\n• **GOG**: DRM-free, game cũ\n• **PS Store/Xbox Store**: Digital console\n\nTip: Chờ Steam Summer Sale để săn deal!',
    'sale': '💰 **Game Sale đang hot:**\n\n• Steam: Nhiều game giảm 50-90%\n• Epic: Cyberpunk 2077 - 199k\n• PS Plus: God of War Ragnarok free\n• Xbox: Forza Horizon 5 - 299k\n\nFollow GameZone để cập nhật deal!',
    'giá': '💰 **Bảng giá tham khảo:**\n\n• Game AAA mới: 1.4-1.6 triệu\n• Game Indie: 200k-500k\n• PS5 Pro: 14-18 triệu\n• RTX 5090: 45-50 triệu\n\nChờ sale để tiết kiệm!',

    // Default
    'default': '🤔 Tôi chưa hiểu câu hỏi của bạn. Bạn có thể hỏi tôi về:\n\n• 🖥️ PC Gaming (GTA 6, Elden Ring...)\n• 🎮 Console (PS5, Xbox, Switch...)\n• 📱 Mobile Gaming (Genshin, Gacha...)\n• 🏆 Esports (LoL, Valorant...)\n\nHãy thử lại nhé!'
};

// ============================================
// Initialize Chatbot
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initChatbot();
});

function initChatbot() {
    if (!chatbotToggle) return;

    // Toggle chatbot window
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
    });

    // Close chatbot
    chatbotClose?.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
    });

    // Handle form submit
    chatbotForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = chatbotInput.value.trim();
        if (message) {
            sendMessage(message);
            chatbotInput.value = '';
        }
    });

    // Suggestion buttons
    const suggestionBtns = chatbotSuggestions?.querySelectorAll('.suggestion-btn');
    suggestionBtns?.forEach(btn => {
        btn.addEventListener('click', () => {
            const message = btn.dataset.message;
            if (message) {
                sendMessage(message);
            }
        });
    });
}

// ============================================
// Send Message
// ============================================
function sendMessage(message) {
    // Add user message
    addMessage(message, 'user');

    // Show typing indicator
    showTyping();

    // Get response after delay
    setTimeout(() => {
        hideTyping();
        const response = getResponse(message);
        addMessage(response, 'bot');
    }, 1000 + Math.random() * 500);
}

// ============================================
// Add Message to Chat
// ============================================
function addMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;

    // Convert markdown-like formatting
    const formattedContent = content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>')
        .replace(/• /g, '&bull; ');

    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${formattedContent}</p>
        </div>
    `;

    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// ============================================
// Typing Indicator
// ============================================
function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot typing-indicator';
    typingDiv.innerHTML = `
        <div class="message-content">
            <div class="typing-dots">
                <span></span><span></span><span></span>
            </div>
        </div>
    `;
    chatbotMessages.appendChild(typingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function hideTyping() {
    const typingIndicator = chatbotMessages.querySelector('.typing-indicator');
    typingIndicator?.remove();
}

// ============================================
// Get Response from Knowledge Base
// ============================================
function getResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Check each keyword
    for (const [keyword, response] of Object.entries(knowledgeBase)) {
        if (keyword !== 'default' && lowerMessage.includes(keyword)) {
            return response;
        }
    }

    // Check for specific patterns
    if (lowerMessage.includes('cảm ơn') || lowerMessage.includes('thank')) {
        return 'Không có gì! 😊 Rất vui được giúp bạn. Hãy hỏi thêm nếu cần nhé! Game on!';
    }

    if (lowerMessage.includes('tạm biệt') || lowerMessage.includes('bye')) {
        return 'Tạm biệt! 👋 Hẹn gặp lại bạn. Đừng quên theo dõi GameZone để cập nhật tin game mới nhất! GG WP!';
    }

    if (lowerMessage.includes('tin mới') || lowerMessage.includes('tin tức') || lowerMessage.includes('game mới')) {
        return '🎮 **Tin game hot nhất:**\n\n• GTA 6 trailer mới gây bão\n• Elden Ring DLC điểm cao kỷ lục\n• PS5 Pro chính thức ra mắt\n• CKTG 2026: T1 Faker vô địch lần 5!\n\nXem thêm trên trang chủ GameZone!';
    }

    // Default response
    return knowledgeBase['default'];
}

// ============================================
// Add typing dots CSS dynamically
// ============================================
const typingCSS = `
.typing-dots {
    display: flex;
    gap: 4px;
    padding: 8px 0;
}
.typing-dots span {
    width: 8px;
    height: 8px;
    background: var(--primary-500);
    border-radius: 50%;
    animation: typingBounce 1.4s infinite ease-in-out;
}
.typing-dots span:nth-child(1) { animation-delay: 0s; }
.typing-dots span:nth-child(2) { animation-delay: 0.2s; }
.typing-dots span:nth-child(3) { animation-delay: 0.4s; }
@keyframes typingBounce {
    0%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-6px); }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = typingCSS;
document.head.appendChild(styleSheet);
