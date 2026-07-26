document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('themeToggle');
    const storedTheme = localStorage.getItem('theme') || 'light'; // Default to light mode

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (themeToggleBtn) {
            const icon = themeToggleBtn.querySelector('i');
            if (theme === 'light') {
                icon.className = 'fa-solid fa-moon';
                themeToggleBtn.setAttribute('title', 'Beralih ke Mode Gelap');
            } else {
                icon.className = 'fa-solid fa-sun';
                themeToggleBtn.setAttribute('title', 'Beralih ke Mode Terang');
            }
        }
    }

    setTheme(storedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
        });
    }

    // 1. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 2. Calculator Tabs & Calculation Logic
    const calcTabs = document.querySelectorAll('.calc-tab');
    const tabContents = document.querySelectorAll('.calc-tab-content');

    calcTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            calcTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            const targetId = `tab-${tab.dataset.tab}`;
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Prices Definition
    const ALAT_PRICES = {
        excavator: { name: 'Excavator PC200', price: 250000, unit: 'Jam' },
        excavator_mini: { name: 'Excavator Mini PC75', price: 180000, unit: 'Jam' },
        dump_truck: { name: 'Dump Truck', price: 750000, unit: 'Hari' },
        bulldozer: { name: 'Bulldozer D65', price: 300000, unit: 'Jam' }
    };

    const MATERIAL_PRICES = {
        pasir: { name: 'Pasir Alami', price: 700000, unit: 'Ret' },
        batu: { name: 'Batu Kali / Pondasi', price: 750000, unit: 'Ret' },
        batu_split: { name: 'Batu Split', price: 850000, unit: 'Ret' },
        tanah: { name: 'Tanah Urug Super', price: 450000, unit: 'Ret' }
    };

    // Calculate Sewa Alat
    const alatSelect = document.getElementById('alatType');
    const durasiInput = document.getElementById('durasiSewa');
    const totalSewaEl = document.getElementById('totalSewa');
    const btnOrderSewa = document.getElementById('btnOrderSewa');

    function updateSewaCalc() {
        if (!alatSelect || !durasiInput || !totalSewaEl) return;
        const selected = ALAT_PRICES[alatSelect.value];
        const durasi = Math.max(1, parseInt(durasiInput.value) || 1);
        const total = selected.price * durasi;

        totalSewaEl.textContent = `Rp ${total.toLocaleString('id-ID')}`;
    }

    if (alatSelect && durasiInput) {
        alatSelect.addEventListener('change', updateSewaCalc);
        durasiInput.addEventListener('input', updateSewaCalc);
        updateSewaCalc();
    }

    if (btnOrderSewa) {
        btnOrderSewa.addEventListener('click', () => {
            const selected = ALAT_PRICES[alatSelect.value];
            const durasi = Math.max(1, parseInt(durasiInput.value) || 1);
            const total = selected.price * durasi;
            const message = `Halo PT SURYA BERKAH SEJAGAD, saya ingin bertanya/sewa alat berat:\n\n- Jenis Alat: ${selected.name}\n- Estimasi Durasi: ${durasi} ${selected.unit}\n- Perkiraan Biaya: Rp ${total.toLocaleString('id-ID')}\n\nMohon info ketersediaan unit dan lokasi pengiriman. Terima kasih!`;
            
            window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, '_blank');
        });
    }

    // Calculate Material
    const matSelect = document.getElementById('matType');
    const retInput = document.getElementById('jumlahRet');
    const totalMaterialEl = document.getElementById('totalMaterial');
    const btnOrderMaterial = document.getElementById('btnOrderMaterial');

    function updateMaterialCalc() {
        if (!matSelect || !retInput || !totalMaterialEl) return;
        const selected = MATERIAL_PRICES[matSelect.value];
        const jumlahRet = Math.max(1, parseInt(retInput.value) || 1);
        const total = selected.price * jumlahRet;

        totalMaterialEl.textContent = `Rp ${total.toLocaleString('id-ID')}`;
    }

    if (matSelect && retInput) {
        matSelect.addEventListener('change', updateMaterialCalc);
        retInput.addEventListener('input', updateMaterialCalc);
        updateMaterialCalc();
    }

    if (btnOrderMaterial) {
        btnOrderMaterial.addEventListener('click', () => {
            const selected = MATERIAL_PRICES[matSelect.value];
            const jumlahRet = Math.max(1, parseInt(retInput.value) || 1);
            const total = selected.price * jumlahRet;
            const message = `Halo PT SURYA BERKAH SEJAGAD, saya ingin memesan material bangunan:\n\n- Material: ${selected.name}\n- Jumlah: ${jumlahRet} Ret Truck\n- Estimasi Total: Rp ${total.toLocaleString('id-ID')}\n\nMohon informasi ketersediaan stok & jadwal pengiriman ke lokasi proyek saya. Terima kasih!`;

            window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, '_blank');
        });
    }

    // 3. Active Nav Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    });
});
