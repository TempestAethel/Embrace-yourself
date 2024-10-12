let currentPage = 1;
const totalPages = 20;

function showPage(pageNumber) {
    const pages = document.querySelectorAll('.page');
    pages.forEach((page, index) => {
        page.classList.remove('active');
        if (index === pageNumber - 1) {
            page.classList.add('active');
        }
    });
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
}

function toggleDropdown() {
    const dropdown = document.getElementById('fontDropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function changeFont(font) {
    const pages = document.querySelectorAll('.page p');
    pages.forEach(page => {
        page.style.fontFamily = font;
    });
    toggleDropdown(); // Close the dropdown after selection
}

function togglePageDropdown() {
    const dropdown = document.getElementById('pageDropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function goToPage(pageNumber) {
    if (pageNumber) {
        currentPage = parseInt(pageNumber);
        showPage(currentPage);
    }
    closePageDropdown();
}

function closePageDropdown() {
    document.getElementById('pageDropdown').style.display = 'none';
}
