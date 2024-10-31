// Inicialización cuando el DOM está cargado
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeTypewriter();
    initializeContactForm();
});

// Manejo del tema con iconos de Font Awesome
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(themeToggle, savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(themeToggle, newTheme);
    });
}

// Función para actualizar el icono del tema
function updateThemeIcon(button, theme) {
    button.innerHTML = '';
    const icon = document.createElement('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    button.setAttribute('aria-label', theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro');
    button.appendChild(icon);
}

// Efecto de máquina de escribir
function initializeTypewriter() {
    const nameTitle = document.getElementById('nameTitle');
    const jobTitle = document.getElementById('jobTitle');
    
    if (nameTitle && jobTitle) {
        typeWriter(nameTitle, 'Martín G. Cardoze Salado', 100, () => {
            setTimeout(() => {
                typeWriter(jobTitle, 'Desarrollador de Videojuegos', 100);
            }, 500);
        });
    }
}

function typeWriter(element, text, speed = 100, callback) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    
    type();
}

// Manejo del formulario de contacto
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        try {
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            // Simulación de envío
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            alert('¡Mensaje enviado con éxito! Te responderé pronto.');
            contactForm.reset();
            
        } catch (error) {
            alert('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
}