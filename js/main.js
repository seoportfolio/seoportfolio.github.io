// ============================
// 배너 자동 스크롤
// ============================
const track = document.getElementById('bannerTrack');
if (track) {
  let speed = 0.5; // 속도 조절 (너무 빠르면 버벅임)
  let position = 0;

  const imgWidth = track.querySelector('img').offsetWidth;
  const totalWidth = imgWidth * track.querySelectorAll('img').length;

  function scrollBanner() {
    position -= speed;
    if (Math.abs(position) >= imgWidth) position = 0;
    track.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(scrollBanner);
  }

  requestAnimationFrame(scrollBanner);
}

// ============================
// draggable (실제 위치 이동 반영)
// ============================
let zIndexCounter = 1000;

const draggables = document.querySelectorAll('.draggable');

draggables.forEach(img => {
  let isDragging = false;
  let startX, startY, initialX, initialY;

  img.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;

    const rect = img.getBoundingClientRect();
    const parentRect = img.offsetParent.getBoundingClientRect();
    initialX = rect.left - parentRect.left;
    initialY = rect.top - parentRect.top;

    img.style.cursor = 'grabbing';
    img.style.transition = 'none'; // 드래그 중 transition 제거
    img.style.zIndex = ++zIndexCounter; // 맨 위로
  });

  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    img.style.left = `${initialX + dx}px`;
    img.style.top = `${initialY + dy}px`;
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    img.style.cursor = 'grab';
    img.style.transition = 'top 0.5s ease, left 0.5s ease'; // 드래그 후 transition 복원
  });
});

// ============================
// 랜덤 위치 초기화
// ============================
window.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("#fixedImages .draggable");

  images.forEach(img => {
    const randomTop = Math.random() * 60 + 10;  // 20% ~ 80%
    const randomLeft = Math.random() * 60 + 20; // 20% ~ 80%

    img.style.top = `${randomTop}%`;
    img.style.left = `${randomLeft}%`;
    img.style.position = "absolute";
  });
});

// ============================
// 흑백 → 컬러 효과
// ============================
const hoverImages = document.querySelectorAll('.facilites_img img');

document.addEventListener('mousemove', (e) => {
  hoverImages.forEach((img) => {
    const rect = img.getBoundingClientRect();
    const buffer = 5; // 인식 범위 약간 확대

    const inRange =
      e.clientX >= rect.left - buffer &&
      e.clientX <= rect.right + buffer &&
      e.clientY >= rect.top - buffer &&
      e.clientY <= rect.bottom + buffer;

    img.style.filter = inRange ? 'grayscale(0%)' : 'grayscale(100%)';
  });
});
