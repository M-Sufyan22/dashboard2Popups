let closefiltermodel = document.getElementById('close-btn');
let filterOpenBtn = document.getElementById('filter-model-popup-open');
let filterModelBox = document.getElementById('filterModelBox');
filterOpenBtn.addEventListener('click', () => {
    filterModelBox.classList.toggle('show-filter-popup');
})
closefiltermodel.addEventListener('click', () => {
    filterModelBox.classList.remove('show-filter-popup');
});