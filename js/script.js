// Esperar a que todo el HTML esté cargado antes de ejecutar el JS
document.addEventListener("DOMContentLoaded", () => {

    // --- ELEMENTOS DEL DOM ---
    const viewHome = document.getElementById('view-home');
    const viewTech = document.getElementById('view-tech');
    const viewPcLaptops = document.getElementById('view-pclaptops');
    
    const customModal = document.getElementById('custom-modal');
    const modalText = document.getElementById('modal-text');
    
    // Botones de navegación
    const btnHome = document.getElementById('btn-home');
    const catTech = document.getElementById('cat-tech');
    const subcatPc = document.getElementById('subcat-pc');
    const btnBackTech = document.getElementById('btn-back-tech');
    
    // Botones de acción/modales
    const btnCloseModal = document.getElementById('btn-close-modal');
    const btnValidation = document.getElementById('btn-validation');
    const buyButtons = document.querySelectorAll('.btn-buy');

    // --- FUNCIONES ---

    // Cambiar de vista limpiamente
    function showView(viewId) {
        // Ocultar todas las vistas removiendo la clase 'active'
        document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));
        
        // Mostrar la vista que corresponde
        if (viewId === 'home') viewHome.classList.add('active');
        if (viewId === 'tech') viewTech.classList.add('active');
        if (viewId === 'pclaptops') viewPcLaptops.classList.add('active');
    }

    // Navegar a PCs y laptops con control de primera visita (LocalStorage)
    function goToPCLaptops() {
        showView('pclaptops');
        
        // Requisito 3: Revisar si ya ha visitado antes esta sección
        if (!localStorage.getItem('visited_pclaptops')) {
            openModal("¡Bienvenido a PC y laptops!");
            // Guarda el dato en el navegador para la siguiente vez
            localStorage.setItem('visited_pclaptops', 'true');
        }
    }

    // Funciones para abrir y cerrar ventanas emergentes
    function openModal(text) {
        modalText.innerText = text;
        customModal.style.display = 'flex';
    }

    function closeModal() {
        customModal.style.display = 'none';
    }

    // --- ESCUCHADORES DE EVENTOS (LISTENERS) ---

    // Navegación de menús y cajas
    btnHome.addEventListener('click', () => showView('home'));
    
    // Este listener sigue funcionando porque el id cat-tech se mantuvo en el HTML modificado
    catTech.addEventListener('click', () => showView('tech'));
    
    subcatPc.addEventListener('click', goToPCLaptops);
    btnBackTech.addEventListener('click', () => showView('tech'));

    // Cerrar modal al darle click al botón "Aceptar"
    btnCloseModal.addEventListener('click', closeModal);

    // Requisito 6: Botón de simulación de validación (barra lateral)
    btnValidation.addEventListener('click', () => {
        openModal("Seleccione un producto");
    });

    // Requisito 5: Capturar clics en los botones de "Comprar"
    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Lee los atributos de datos (data-name y data-price) del HTML
            const productName = e.target.getAttribute('data-name');
            const productPrice = parseFloat(e.target.getAttribute('data-price')).toFixed(2);
            
            // Lanza el modal con el formato exacto requerido
            openModal(`Vendido — ${productName} — $${productPrice}`);
        });
    });
});