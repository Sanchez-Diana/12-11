document.getElementById('searchInput').addEventListener('input', function() {
    const searchValue = this.value.toLowerCase();
    const heading = document.getElementById('contenido');
    
    if (searchValue) {
        heading.style.display = 'none';
    } else {
        heading.style.display = 'block';
    }
});
