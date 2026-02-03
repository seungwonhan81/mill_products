// ==========================================
// 태양초우리 방앗간 - JavaScript 인터랙션
// ==========================================

// DOM 요소
const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const scrollTopBtn = document.getElementById('scrollTop');
const navLinks = document.querySelectorAll('.nav-link, .mobile-link');

// ==========================================
// Navbar 스크롤 효과
// ==========================================
window.addEventListener('scroll', () => {
    // Navbar 배경 변경
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Scroll to top 버튼 표시
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
    
    // 스크롤 애니메이션 트리거
    handleScrollAnimation();
});

// ==========================================
// 모바일 메뉴 토글
// ==========================================
mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    
    // 아이콘 변경
    const icon = mobileMenuToggle.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// ==========================================
// 부드러운 스크롤 네비게이션
// ==========================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // 내부 링크인 경우에만 처리
        if (href.startsWith('#')) {
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // 모바일 메뉴 닫기
                mobileMenu.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                
                // 스크롤
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ==========================================
// Scroll to Top 버튼
// ==========================================
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// 스크롤 애니메이션 (AOS 대체)
// ==========================================
function handleScrollAnimation() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // 요소가 화면에 80% 들어왔을 때 애니메이션 시작
        if (elementTop < windowHeight * 0.8) {
            element.classList.add('aos-animate');
        }
    });
}

// 초기 실행
handleScrollAnimation();

// ==========================================
// Hero 섹션 인터랙션
// ==========================================
const heroFeatures = document.querySelectorAll('.feature-item');

heroFeatures.forEach((feature, index) => {
    feature.style.animationDelay = `${1 + index * 0.1}s`;
});

// ==========================================
// 제품 카드 호버 효과 강화
// ==========================================
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ==========================================
// 후기 카드 인터랙션
// ==========================================
const testimonialCards = document.querySelectorAll('.testimonial-card');

testimonialCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const stars = this.querySelectorAll('.stars i');
        stars.forEach((star, index) => {
            setTimeout(() => {
                star.style.transform = 'scale(1.2) rotate(15deg)';
                setTimeout(() => {
                    star.style.transform = 'scale(1) rotate(0deg)';
                }, 150);
            }, index * 50);
        });
    });
});

// ==========================================
// 카운터 애니메이션 (숫자가 있다면)
// ==========================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ==========================================
// 페이지 로드 애니메이션
// ==========================================
window.addEventListener('load', () => {
    // 페이지 로드 후 Hero 섹션 애니메이션
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==========================================
// 이미지 Lazy Loading 대체 (실제 이미지가 있을 경우)
// ==========================================
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        }
    });
}, {
    rootMargin: '50px'
});

// 모든 data-src 속성을 가진 이미지에 적용
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ==========================================
// 전화번호 클릭 추적 (분석용)
// ==========================================
const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

phoneLinks.forEach(link => {
    link.addEventListener('click', () => {
        console.log('전화 버튼 클릭됨');
        // Google Analytics 등 추적 코드 추가 가능
    });
});

// ==========================================
// CTA 버튼 클릭 추적
// ==========================================
const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');

ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // 클릭 효과
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
        
        console.log('CTA 버튼 클릭:', button.textContent.trim());
        // 분석 코드 추가 가능
    });
});

// ==========================================
// 스크롤 진행률 표시 (선택사항)
// ==========================================
function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // 프로그레스 바가 있다면 업데이트
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);

// ==========================================
// 터치 스와이프 감지 (모바일 제스처)
// ==========================================
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // 왼쪽으로 스와이프
            console.log('Swiped left');
        } else {
            // 오른쪽으로 스와이프
            console.log('Swiped right');
        }
    }
}

// ==========================================
// 폼 검증 (주문 폼이 있다면)
// ==========================================
const orderForms = document.querySelectorAll('form');

orderForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 폼 검증 로직
        const formData = new FormData(form);
        let isValid = true;
        
        formData.forEach((value, key) => {
            if (!value.trim()) {
                isValid = false;
                console.log(`${key} 필드가 비어있습니다.`);
            }
        });
        
        if (isValid) {
            console.log('폼 제출:', Object.fromEntries(formData));
            // 실제 제출 로직
        } else {
            alert('모든 필드를 입력해주세요.');
        }
    });
});

// ==========================================
// 성능 최적화: Debounce 함수
// ==========================================
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 스크롤 이벤트에 debounce 적용
const debouncedScrollAnimation = debounce(handleScrollAnimation, 10);
window.addEventListener('scroll', debouncedScrollAnimation);

// ==========================================
// 접근성 향상
// ==========================================
// 키보드 네비게이션 지원
document.addEventListener('keydown', (e) => {
    // ESC 키로 모바일 메뉴 닫기
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
    
    // Home 키로 페이지 상단으로
    if (e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // End 키로 페이지 하단으로
    if (e.key === 'End') {
        e.preventDefault();
        window.scrollTo({ 
            top: document.documentElement.scrollHeight, 
            behavior: 'smooth' 
        });
    }
});

// ==========================================
// 콘솔 환영 메시지
// ==========================================
console.log('%c태양초우리 방앗간', 'font-size: 24px; font-weight: bold; color: #8B4513;');
console.log('%c30년 전통의 정직한 맛', 'font-size: 14px; color: #5C4B37;');
console.log('%c웹사이트 개발: 2026', 'font-size: 12px; color: #8A7968;');

// ==========================================
// 초기화 완료
// ==========================================
console.log('✓ JavaScript 초기화 완료');
