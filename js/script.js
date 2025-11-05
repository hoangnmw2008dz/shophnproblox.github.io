/* PRODUCTS array: edit to change products */
const PRODUCTS = [
  {id:'bf1', title:'Trái Leopard', desc:'Hiếm - Blox Fruits', price:'250000', category:'bloxfruits', img:'assets/leopard.jpg'},
  {id:'bf2', title:'Sword: Saber', desc:'Sword hiếm', price:'150000', category:'bloxfruits', img:'assets/sword.jpg'},
  {id:'gg1', title:'Seed: Golden Tomato', desc:'Grow a Garden - Hạt quý', price:'80000', category:'growagarden', img:'assets/seed.jpg'},
  {id:'sb1', title:'Skin: Brain Hacker', desc:'Steal a Brainot - Skin độc', price:'120000', category:'stealabrainot', img:'assets/skin.jpg'},
  {id:'rb1', title:'Robux 1000', desc:'Gói Robux', price:'190000', category:'robux', img:'assets/robux.jpg'}
];

const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

function formatVND(n){
  return new Intl.NumberFormat('vi-VN').format(Number(n)) + ' đ';
}

function renderProducts(filter='all'){
  const container = $('#productsGrid');
  container.innerHTML = '';
  const list = PRODUCTS.filter(p => filter === 'all' ? true : p.category === filter);
  if(list.length === 0){ container.innerHTML = '<p>Không tìm thấy sản phẩm.</p>'; return; }
  list.forEach(p => {
    const card = document.createElement('div'); card.className = 'card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}" onerror="this.src='https://via.placeholder.com/400x200?text=No+Image'" />
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="price">${formatVND(p.price)}</div>
      <div class="actions">
        <button class="btn" data-buy="${p.id}">Mua ngay</button>
        <button class="nav-btn" data-fav="${p.id}">Yêu thích</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function openBuyModal(product){
  const modal = $('#buyModal');
  const content = document.getElementById('modalContent');
  content.innerHTML = `
    <h3>Mua: ${product.title}</h3>
    <p>${product.desc}</p>
    <p><b>Giá:</b> ${formatVND(product.price)}</p>
    <p><b>ID sản phẩm:</b> ${product.id}</p>
    <p>Liên hệ nhanh qua: <b>Zalo</b> / <b>Discord</b> / <b>Roblox</b></p>
  `;
  const contactLink = $('#contactLink');
  contactLink.href = 'https://discord.com';
  contactLink.textContent = 'Mở Discord';
  $('#copyInfo').onclick = () => {
    const text = `Mua ${product.title} | ${product.id} | Giá: ${formatVND(product.price)}`;
    navigator.clipboard.writeText(text).then(()=> alert('Đã sao chép thông tin sản phẩm'));
  }
  modal.classList.remove('hidden');
}

function init(){
  renderProducts('all');
  $$('.nav-btn').forEach(btn => btn.addEventListener('click', e => {
    const f = e.currentTarget.dataset.filter || e.currentTarget.getAttribute('data-filter');
    if(f) renderProducts(f);
  }));
  $('#productsGrid').addEventListener('click', e => {
    const buy = e.target.closest('[data-buy]');
    if(buy){
      const id = buy.dataset.buy;
      const product = PRODUCTS.find(p=>p.id===id);
      if(product) openBuyModal(product);
    }
  });
  $('#modalClose').addEventListener('click', ()=> $('#buyModal').classList.add('hidden'));
  $('#sendContact').addEventListener('click', ()=>{
    alert('Cảm ơn! Tin nhắn của bạn đã được ghi. Liên hệ sẽ trả lời qua kênh đã cung cấp.');
    $('#cName').value='';$('#cContact').value='';$('#cMessage').value='';
  });
  document.getElementById('year').textContent = new Date().getFullYear();
}

window.addEventListener('DOMContentLoaded', init);