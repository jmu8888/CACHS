// ==========================================================================
// CACHS — shared site script (mobile nav, FAQ accordion, donate amounts)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {

  /* ---- Mobile nav drawer ---- */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const primaryNav = document.getElementById('primaryNav');
  const navScrim = document.getElementById('navScrim');

  if (hamburgerBtn && primaryNav && navScrim) {
    function closeNav(){
      primaryNav.classList.remove('open');
      hamburgerBtn.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded','false');
      navScrim.classList.remove('show');
    }
    function toggleNav(){
      const isOpen = primaryNav.classList.toggle('open');
      hamburgerBtn.classList.toggle('open', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navScrim.classList.toggle('show', isOpen);
    }
    hamburgerBtn.addEventListener('click', toggleNav);
    navScrim.addEventListener('click', closeNav);

    // Tapping a top-level link that has a submenu toggles it on mobile instead of navigating
    document.querySelectorAll('.primary-nav > ul > li').forEach(li => {
      const link = li.querySelector(':scope > a');
      const submenu = li.querySelector(':scope > .submenu');
      if(!submenu || !link) return;
      link.addEventListener('click', (e) => {
        if(window.innerWidth <= 880){
          e.preventDefault();
          li.classList.toggle('open');
        }
      });
    });

    document.querySelectorAll('.primary-nav .submenu a, .primary-nav .nav-donate').forEach(a=>{
      a.addEventListener('click', closeNav);
    });
    window.addEventListener('resize', ()=>{ if(window.innerWidth > 880) closeNav(); });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-item .faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if(!wasOpen) item.classList.add('open');
    });
  });

  /* ---- Donate amount picker ---- */
  const amountBtns = document.querySelectorAll('.amount-btn');
  const customAmount = document.getElementById('customAmount');
  amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      amountBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      if(customAmount) customAmount.value = btn.dataset.amount || '';
    });
  });

  /* ---- Mark active nav link based on current page ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.primary-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage) a.classList.add('active');
  });

});
