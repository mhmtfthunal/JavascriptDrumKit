// Tüm tuş elementlerini seç
const keys = document.querySelectorAll('.key');

// Ses çalma fonksiyonu
function playSound(e) {
    // Klavye tuşu veya tıklama olayından key code'u al
    const keyCode = e.keyCode || this.getAttribute('data-key');
    
    // İlgili ses elementini bul
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    
    // İlgili tuş elementini bul
    const key = document.querySelector(`.key[data-key="${keyCode}"]`);
    
    // Eğer ses veya tuş bulunamazsa işlemi durdur
    if (!audio || !key) return;
    
    // Sesi başa sar (aynı tuşa hızlı basıldığında tekrar çalabilmesi için)
    audio.currentTime = 0;
    
    // Sesi çal
    audio.play();
    
    // Animasyon için 'playing' class'ını ekle
    key.classList.add('playing');
}

// Animasyonun bittiğinde 'playing' class'ını kaldır
function removeTransition(e) {
    // Sadece transform animasyonunu dinle
    if (e.propertyName !== 'transform') return;
    
    // 'playing' class'ını kaldır
    this.classList.remove('playing');
}

// Tıklama olayı için handler
function handleClick() {
    playSound.call(this);
}

// Her tuş için event listener'ları ekle
keys.forEach(key => {
    // Tıklama olayını dinle
    key.addEventListener('click', handleClick);
    
    // Animasyon bitişini dinle
    key.addEventListener('transitionend', removeTransition);
});

// Klavye tuşlarını dinle
window.addEventListener('keydown', playSound);

// Sayfa yüklendiğinde bir karşılama mesajı (isteğe bağlı)
console.log('🥁 Drum Kit Hazır! A, S, D, F, G, H, J, K, L tuşlarına basın veya düğmelere tıklayın.');

// Touch desteği için (mobil cihazlar)
keys.forEach(key => {
    key.addEventListener('touchstart', function(e) {
        e.preventDefault();
        handleClick.call(this);
    });
});

// Özel animasyon efektleri (bonus)
const specialEffects = {
    65: 'pulse',      // A - Clap
    83: 'shake',      // S - Hi-Hat
    68: 'bounce',     // D - Kick
    70: 'rotate',     // F - Open Hat
    71: 'glow',       // G - Boom
    72: 'shake',      // H - Ride
    74: 'bounce',     // J - Snare
    75: 'rotate',     // K - Tom
    76: 'pulse'       // L - Tink
};

// Görsel geri bildirim iyileştirmesi
function enhancedPlaySound(e) {
    const keyCode = e.keyCode || this.getAttribute('data-key');
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${keyCode}"]`);
    
    if (!audio || !key) return;
    
    // Ses kontrolü
    audio.currentTime = 0;
    audio.volume = 0.7; // Ses seviyesini ayarla
    
    // Ses çalma promise'i
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                // Ses başarıyla çalıyor
                console.log(`🎵 ${key.querySelector('.sound').textContent} çalınıyor...`);
            })
            .catch(error => {
                console.error('Ses çalma hatası:', error);
            });
    }
    
    // Animasyon efektini ekle
    key.classList.add('playing');
    
    // Rastgele bir parıltı efekti ekle (bonus görsel efekt)
    createSparkle(key);
}

// Parıltı efekti oluştur (bonus animasyon)
function createSparkle(element) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'absolute';
    sparkle.style.width = '10px';
    sparkle.style.height = '10px';
    sparkle.style.background = 'rgba(255, 215, 0, 0.8)';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    
    const rect = element.getBoundingClientRect();
    const x = rect.left + Math.random() * rect.width;
    const y = rect.top + Math.random() * rect.height;
    
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    
    document.body.appendChild(sparkle);
    
    // Parıltıyı animasyonla yukarı hareket ettir ve kaybet
    let opacity = 1;
    let posY = y;
    
    const animate = setInterval(() => {
        opacity -= 0.05;
        posY -= 2;
        
        sparkle.style.opacity = opacity;
        sparkle.style.top = posY + 'px';
        
        if (opacity <= 0) {
            clearInterval(animate);
            sparkle.remove();
        }
    }, 30);
}

// Klavye kısayolları için yardım mesajı
function showHelp() {
    console.log(`
    🎹 Klavye Kısayolları:
    A - Clap
    S - Hi-Hat
    D - Kick
    F - Open Hat
    G - Boom
    H - Ride
    J - Snare
    K - Tom
    L - Tink
    
    💡 İpucu: Tuşlara tıklayabilir veya klavyenizdeki karşılık gelen harflere basabilirsiniz!
    `);
}

// Sayfa yüklendiğinde yardımı göster
window.addEventListener('load', () => {
    showHelp();
    console.log('✨ Bonus animasyonlar aktif!');
});

