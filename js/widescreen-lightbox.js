// Script para implementar lightbox widescreen 16:9
document.addEventListener('DOMContentLoaded', function() {
    // Criar o elemento do lightbox e adicioná-lo ao body
    const lightboxHTML = `
        <div class="widescreen-lightbox">
            <div class="lightbox-content">
                <img src="" alt="Tela ampliada" class="lightbox-image">
            </div>
            <div class="close-lightbox">&times;</div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    
    // Selecionar elementos do lightbox
    const lightbox = document.querySelector('.widescreen-lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    // Obter todos os links de imagem na seção de telas
    const screenshotLinks = document.querySelectorAll('#app-screenshot-area .preview-icon a');
    
    // Adicionar evento de clique para cada link
    screenshotLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obter URL da imagem
            const imageUrl = this.getAttribute('href');
            
            // Definir a imagem no lightbox
            lightboxImage.setAttribute('src', imageUrl);
            
            // Mostrar o lightbox com animação
            lightbox.style.display = 'flex';
            setTimeout(() => {
                lightbox.style.opacity = '1';
            }, 10);
        });
    });
    
    // Fechar o lightbox ao clicar no botão de fechar
    closeLightbox.addEventListener('click', function() {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            lightbox.style.display = 'none';
        }, 300);
    });
    
    // Fechar o lightbox ao clicar fora da imagem
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox.click();
        }
    });
    
    // Fechar o lightbox com a tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            closeLightbox.click();
        }
    });
});
