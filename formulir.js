// Menangani pengiriman formulir kontak
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const contactName = document.getElementById('contactName').value;
    const contactPhone = document.getElementById('contactPhone').value;
    const contactEmail = document.getElementById('contactEmail').value;
    const contactMessage = document.getElementById('contactMessage').value;

    fetch('contact.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `name=${contactName}&phone=${contactPhone}&email=${contactEmail}&message=${contactMessage}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Pesan berhasil dikirim');
        } else {
            alert('Gagal mengirim pesan');
        }
    });

    document.getElementById('contactForm').reset();
});

// Fungsi untuk mengambil dan menampilkan data kontak
function fetchContacts() {
    fetch('get_contacts.php')
    .then(response => response.json())
    .then(data => {
        const adminContactTable = document.getElementById('adminContactTable');
        adminContactTable.innerHTML = '';
        data.forEach(contact => {
            const row = adminContactTable.insertRow();
            row.insertCell(0).innerText = contact.name;
            row.insertCell(1).innerText = contact.phone;
            row.insertCell(2).innerText = contact.email;
            row.insertCell(3).innerText = contact.message;
            row.insertCell(4).innerText = contact.created_at;
        });
    });
}

// Panggil fungsi untuk mengambil data kontak saat admin dashboard ditampilkan
document.getElementById('adminDashboard').addEventListener('display', function() {
    fetchContacts();
});
