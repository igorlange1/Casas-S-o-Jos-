
// Mobile Menu Toggle
function setupMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                // Force reflow
                mobileMenu.offsetHeight;
                mobileMenu.classList.remove('scale-y-0', 'opacity-0');
                mobileMenu.classList.add('scale-y-100', 'opacity-100');
            } else {
                mobileMenu.classList.remove('scale-y-100', 'opacity-100');
                mobileMenu.classList.add('scale-y-0', 'opacity-0');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
            }

            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', isHidden ? 'x' : 'menu');
                lucide.createIcons();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('scale-y-100', 'opacity-100');
                mobileMenu.classList.add('scale-y-0', 'opacity-0');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
                
                const icon = menuBtn.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            }
        });
    }
}

// Navbar Scroll Effect
function setupNavbarScroll() {
    const navbar = document.querySelector('nav');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-sm');
                navbar.classList.remove('bg-transparent');
            } else {
                navbar.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-sm');
                navbar.classList.add('bg-transparent');
            }
        });
    }
}

// Exit Intent Pop-up
function setupExitIntent() {
    const modal = document.getElementById('lead-modal');
    if (!modal) return;

    const hasShown = sessionStorage.getItem('exit_popup_shown');
    if (hasShown) return;

    const handleMouseOut = (e) => {
        if (e.clientY <= 0 || e.relatedTarget == null) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            sessionStorage.setItem('exit_popup_shown', 'true');
            document.removeEventListener('mouseout', handleMouseOut);
        }
    };

    document.addEventListener('mouseout', handleMouseOut);
    
    const closeBtn = modal.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        });
    }
}

// Success Modal
function showSuccessModal() {
    // Remove existing if any
    const existing = document.getElementById('success-modal');
    if (existing) existing.remove();

    const modalHtml = `
        <div id="success-modal" class="fixed inset-0 z-[300] flex items-center justify-center p-4 transition-all duration-300 opacity-0">
            <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" id="success-modal-overlay"></div>
            <div class="relative w-full max-w-md bg-white rounded-sm shadow-2xl overflow-hidden p-8 md:p-12 text-center transform scale-95 transition-all duration-300">
                <button id="close-success-modal" class="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 transition-colors">
                    <i data-lucide="x" class="w-6 h-6"></i>
                </button>
                
                <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                    <i data-lucide="check" class="w-10 h-10 text-green-600"></i>
                </div>
                
                <h2 class="text-2xl md:text-3xl font-black text-zinc-900 uppercase tracking-tight mb-4 leading-tight">
                    Recebemos sua mensagem com sucesso!
                </h2>
                
                <p class="text-zinc-500 font-medium mb-10 leading-relaxed">
                    Logo mais entraremos em contato com você a respeito do seu orçamento.
                </p>
                
                <a href="modelos" class="inline-block w-full py-4 bg-red-600 text-white font-black uppercase tracking-widest text-sm shadow-lg hover:bg-red-700 transition-all active:scale-95">
                    Continuar navegando
                </a>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    lucide.createIcons();

    const modal = document.getElementById('success-modal');
    const content = modal.querySelector('div:nth-child(2)');
    
    // Animate in
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        content.classList.remove('scale-95');
        content.classList.add('scale-100');
    }, 10);

    // Close handlers
    const close = () => {
        modal.classList.add('opacity-0');
        content.classList.remove('scale-100');
        content.classList.add('scale-95');
        setTimeout(() => modal.remove(), 300);
    };

    document.getElementById('close-success-modal').addEventListener('click', close);
    document.getElementById('success-modal-overlay').addEventListener('click', close);
}

// Lead Form Submission (PHP API Bridge)
function setupLeadForm() {
    const forms = document.querySelectorAll('.lead-form');
    // Agora apontamos para o nosso próprio servidor (Seguro)
    const apiEndpoint = "/api/send.php";

    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="flex items-center justify-center gap-2"><i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Enviando...</span>';
                lucide.createIcons();
            }

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch(apiEndpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                if (!response.ok) throw new Error('Erro no envio');

                form.reset();
                
                // Fecha o modal de lead se estiver aberto
                const leadModal = document.getElementById('lead-modal');
                if (leadModal) {
                    leadModal.classList.add('hidden');
                    leadModal.classList.remove('flex');
                }

                showSuccessModal();
                
            } catch (error) {
                console.error("Erro ao enviar lead:", error);
                alert("Recebemos sua solicitação, mas houve um pequeno atraso na integração. Não se preocupe, entraremos em contato em breve!");
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = submitBtn.getAttribute('data-original-text') || 'Quero meu orçamento';
                }
            }
        });

        // Armazena o texto original do botão
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.setAttribute('data-original-text', submitBtn.textContent.trim());
        }
    });
}

// Lightbox Functionality
function setupLightbox() {
    // Create lightbox element if it doesn't exist
    if (!document.getElementById('lightbox')) {
        const lightboxHtml = `
            <div id="lightbox" class="fixed inset-0 z-[500] hidden items-center justify-center p-4 md:p-8 transition-all duration-300 opacity-0">
                <div class="absolute inset-0 bg-black/95 backdrop-blur-sm" id="lightbox-overlay"></div>
                
                <!-- Navigation Buttons -->
                <button id="prev-lightbox" class="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[510] hidden">
                    <i data-lucide="chevron-left" class="w-10 h-10 md:w-16 md:h-16"></i>
                </button>
                <button id="next-lightbox" class="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[510] hidden">
                    <i data-lucide="chevron-right" class="w-10 h-10 md:w-16 md:h-16"></i>
                </button>

                <div class="relative max-w-5xl w-full h-full flex items-center justify-center transform scale-95 transition-all duration-300">
                    <button id="close-lightbox" class="absolute -top-12 right-0 md:-right-12 text-white hover:text-red-500 transition-colors z-[510]">
                        <i data-lucide="x" class="w-8 h-8 md:w-10 md:h-10"></i>
                    </button>
                    <img id="lightbox-img" src="" alt="Full Screen" class="max-w-full max-h-full object-contain shadow-2xl rounded-sm">
                    
                    <!-- Counter -->
                    <div id="lightbox-counter" class="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/70 font-bold text-sm tracking-widest uppercase"></div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHtml);
        lucide.createIcons();
    }

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const content = lightbox.querySelector('div:nth-child(3)');
    const prevBtn = document.getElementById('prev-lightbox');
    const nextBtn = document.getElementById('next-lightbox');
    const counter = document.getElementById('lightbox-counter');

    let currentImages = [];
    let currentIndex = 0;

    const updateLightbox = () => {
        lightboxImg.src = currentImages[currentIndex];
        counter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
        
        if (currentImages.length > 1) {
            prevBtn.classList.remove('hidden');
            nextBtn.classList.remove('hidden');
        } else {
            prevBtn.classList.add('hidden');
            nextBtn.classList.add('hidden');
        }
    };

    const openLightbox = (src, group = []) => {
        currentImages = group.length > 0 ? group : [src];
        currentIndex = currentImages.indexOf(src);
        if (currentIndex === -1) currentIndex = 0;

        updateLightbox();
        
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
        
        // Force reflow
        lightbox.offsetHeight;
        
        setTimeout(() => {
            lightbox.classList.remove('opacity-0');
            content.classList.remove('scale-95');
            content.classList.add('scale-100');
        }, 10);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.add('opacity-0');
        content.classList.remove('scale-100');
        content.classList.add('scale-95');
        setTimeout(() => {
            lightbox.classList.add('hidden');
            lightbox.classList.remove('flex');
            document.body.style.overflow = '';
        }, 300);
    };

    const nextImage = (e) => {
        if (e) e.stopPropagation();
        currentIndex = (currentIndex + 1) % currentImages.length;
        updateLightbox();
    };

    const prevImage = (e) => {
        if (e) e.stopPropagation();
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        updateLightbox();
    };

    document.getElementById('close-lightbox').addEventListener('click', closeLightbox);
    document.getElementById('lightbox-overlay').addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);

    // Global listener for images with data-lightbox attribute
    document.addEventListener('click', (e) => {
        const target = e.target.closest('[data-lightbox]');
        if (target) {
            e.preventDefault();
            const src = target.getAttribute('src');
            
            // Find all images in the same group (e.g., in the same gallery container)
            const parent = target.closest('.grid') || target.closest('#project-content') || document;
            const groupImages = Array.from(parent.querySelectorAll('[data-lightbox]')).map(img => img.getAttribute('src'));
            
            openLightbox(src, groupImages);
        }
    });

    // Handle keyboard
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('hidden')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setupNavbarScroll();
    setupExitIntent();
    setupLeadForm();
    setupLightbox();
    
    // Set WhatsApp links
    document.querySelectorAll('.whatsapp-link').forEach(link => {
        link.href = WHATSAPP_URL;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
    });
});
