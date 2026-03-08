const allBtns = document.querySelectorAll('.btns .btn');
const allBtn = document.getElementById('btn-all');
const openBtn = document.getElementById('btn-open');
const closeBtn = document.getElementById('btn-close');

allBtn.addEventListener('click', ()=> {
    allBtns.forEach(btn => {
        btn.classList.remove('btn-primary', 'text-white');
        btn.classList.add('btn-soft', 'text-[#64748B]');
        allBtn.classList.remove('btn-soft', 'text-[#64748B]');
        allBtn.classList.add('btn-primary', 'text-white');
    })
})

openBtn.addEventListener('click', ()=> {
    allBtns.forEach(btn => {
        btn.classList.remove('btn-primary', 'text-white');
        btn.classList.add('btn-soft', 'text-[#64748B]');
        openBtn.classList.remove('btn-soft', 'text-[#64748B]');
        openBtn.classList.add('btn-primary', 'text-white');
    })
})

closeBtn.addEventListener('click', ()=> {
    allBtns.forEach(btn => {
        btn.classList.remove('btn-primary', 'text-white');
        btn.classList.add('btn-soft', 'text-[#64748B]');
        closeBtn.classList.remove('btn-soft', 'text-[#64748B]');
        closeBtn.classList.add('btn-primary', 'text-white');
    })
})