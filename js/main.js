// GameZone - Main JavaScript

// ============================================
// DOM Elements
// ============================================
const header = document.getElementById('header');
const nav = document.getElementById('nav');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const searchBtn = document.getElementById('searchBtn');
const searchModal = document.getElementById('searchModal');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');
const themeToggle = document.getElementById('themeToggle');
const heroSlider = document.getElementById('heroSlider');
const heroPrev = document.getElementById('heroPrev');
const heroNext = document.getElementById('heroNext');
const heroDots = document.getElementById('heroDots');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const pageTransition = document.getElementById('pageTransition');

// ============================================
// Sample Articles Data (Tin Tức Game)
// ============================================
const sampleArticles = [
    {
        id: 1,
        title: 'GTA 6 Chính Thức Ra Mắt Q4 2025',
        excerpt: 'Rockstar Games công bố ngày phát hành GTA VI với trailer mới gây bão cộng đồng game thủ toàn cầu.',
        category: 'PC Gaming',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800',
        date: '01/02/2026',
        views: 58420
    },
    {
        id: 2,
        title: 'CKTG 2026: T1 Faker Đăng Quang Lần 5',
        excerpt: 'Huyền thoại Faker lập kỳ tích vô tiền khoáng hậu với chức vô địch thế giới thứ 5 liên tiếp.',
        category: 'Esports',
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800',
        date: '31/01/2026',
        views: 45350
    },
    {
        id: 3,
        title: 'Elden Ring DLC Shadow of the Erdtree',
        excerpt: 'FromSoftware công bố bản mở rộng kỷ lục với 40 giờ gameplay và 10 boss mới.',
        category: 'PC Gaming',
        image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800',
        date: '30/01/2026',
        views: 32870
    },
    {
        id: 4,
        title: 'PS5 Pro Chính Thức Ra Mắt',
        excerpt: 'Sony công bố PS5 Pro với chip AMD mới, hỗ trợ 8K gaming và Ray Tracing nâng cao.',
        category: 'Console',
        image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800',
        date: '29/01/2026',
        views: 28540
    },
    {
        id: 5,
        title: 'Genshin Impact 5.0: Khu Vực Mới Natlan',
        excerpt: 'HoYoverse mở cửa vùng đất lửa Natlan với 7 nhân vật 5 sao mới và questline epic.',
        category: 'Mobile',
        image: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800',
        date: '28/01/2026',
        views: 25650
    },
    {
        id: 6,
        title: 'Valorant Champions 2026: Fnatic Vô Địch',
        excerpt: 'Fnatic đánh bại Sentinels 3-1 trong trận chung kết kịch tính tại Tokyo.',
        category: 'Esports',
        image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800',
        date: '27/01/2026',
        views: 21890
    }
];

// ============================================
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initSearch();
    initHeroSlider();
    initLightbox();
    initPageTransitions();
    initScrollEffects();
    loadArticles();
});

// ============================================
// Theme Toggle (Dark Mode - Default Dark)
// ============================================
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
}

function updateThemeIcon(theme) {
    if (themeToggle) {
        themeToggle.innerHTML = theme === 'dark'
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
    }
}

// ============================================
// Mobile Menu
// ============================================
function initMobileMenu() {
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        // Handle dropdown in mobile
        const dropdowns = nav.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('.nav-link');
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        });
    }
}

// ============================================
// Search Modal
// ============================================
function initSearch() {
    if (searchBtn && searchModal) {
        searchBtn.addEventListener('click', () => {
            searchModal.classList.add('active');
            setTimeout(() => searchInput?.focus(), 100);
        });

        searchClose?.addEventListener('click', () => {
            searchModal.classList.remove('active');
        });

        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) {
                searchModal.classList.remove('active');
            }
        });

        // Handle search
        searchInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    // Redirect to category page with search query
                    window.location.href = `category.html?search=${encodeURIComponent(query)}`;
                }
            }
        });
    }
}

// ============================================
// Hero Slider
// ============================================
let currentSlide = 0;
let slideInterval;

function initHeroSlider() {
    if (!heroSlider) return;

    const slides = heroSlider.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;

    // Create dots
    if (heroDots) {
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `hero-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(index));
            heroDots.appendChild(dot);
        });
    }

    // Navigation buttons
    heroPrev?.addEventListener('click', () => changeSlide(-1));
    heroNext?.addEventListener('click', () => changeSlide(1));

    // Auto slide
    startAutoSlide();

    // Pause on hover
    heroSlider.addEventListener('mouseenter', stopAutoSlide);
    heroSlider.addEventListener('mouseleave', startAutoSlide);
}

function changeSlide(direction) {
    const slides = heroSlider.querySelectorAll('.hero-slide');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function updateSlider() {
    const slides = heroSlider.querySelectorAll('.hero-slide');
    const dots = heroDots?.querySelectorAll('.hero-dot');

    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });

    dots?.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function startAutoSlide() {
    stopAutoSlide();
    slideInterval = setInterval(() => changeSlide(1), 5000);
}

function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

// ============================================
// Lightbox (Image Zoom)
// ============================================
function initLightbox() {
    // Click on images to open lightbox
    document.addEventListener('click', (e) => {
        const img = e.target.closest('.article-featured-image img, .article-image img');
        if (img && lightbox) {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });

    // Close lightbox
    lightboxClose?.addEventListener('click', closeLightbox);
    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox?.classList.contains('active')) {
            closeLightbox();
        }
    });
}

function closeLightbox() {
    lightbox?.classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================
// Page Transitions
// ============================================
function initPageTransitions() {
    // Add transition effect to internal links
    document.querySelectorAll('a[href]:not([href^="#"]):not([href^="http"])').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && pageTransition) {
                e.preventDefault();
                pageTransition.classList.add('active');
                setTimeout(() => {
                    window.location.href = href;
                }, 400);
            }
        });
    });

    // Hide transition on page load
    window.addEventListener('load', () => {
        if (pageTransition) {
            pageTransition.classList.remove('active');
        }
    });
}

// ============================================
// Scroll Effects
// ============================================
function initScrollEffects() {
    // Header shadow on scroll
    window.addEventListener('scroll', () => {
        if (header) {
            header.style.boxShadow = window.scrollY > 50
                ? 'var(--shadow-md)'
                : 'none';
        }
    });

    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
}

// ============================================
// Load Articles
// ============================================
function loadArticles() {
    const articlesContainer = document.getElementById('latestArticles');
    if (!articlesContainer) return;

    // Get articles from localStorage or use sample data
    let articles = JSON.parse(localStorage.getItem('articles')) || sampleArticles;

    articlesContainer.innerHTML = articles.slice(0, 6).map((article, index) => `
        <article class="article-card ${index === 0 ? 'featured' : ''} reveal" style="animation-delay: ${index * 0.1}s">
            <div class="article-image img-zoom">
                <img src="${article.image}" alt="${article.title}">
                <span class="article-category">${article.category}</span>
            </div>
            <div class="article-content">
                <div class="article-meta">
                    <span><i class="far fa-calendar"></i> ${article.date}</span>
                    <span><i class="far fa-eye"></i> ${article.views.toLocaleString()}</span>
                </div>
                <h3 class="article-title">${article.title}</h3>
                <p class="article-excerpt">${article.excerpt}</p>
            </div>
        </article>
    `).join('');

    // Trigger reveal animation
    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
    }, 100);
}

// ============================================
// Utility Functions
// ============================================
function formatDate(date) {
    return new Date(date).toLocaleDateString('vi-VN');
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Export for use in other scripts
window.GameZone = {
    articles: sampleArticles,
    loadArticles,
    formatDate,
    truncateText
};
