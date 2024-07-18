const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const userDashboard = document.getElementById('userDashboard');
    const adminDashboard = document.getElementById('adminDashboard');
    const contactAdminForm = document.getElementById('contactAdminForm');
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');
    const contactLink = document.getElementById('contactLink');
    const logoutLink = document.getElementById('logoutLink');

    loginLink.addEventListener('click', function() {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        userDashboard.style.display = 'none';
        adminDashboard.style.display = 'none';
        contactAdminForm.style.display = 'none';
    });

    registerLink.addEventListener('click', function() {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        userDashboard.style.display = 'none';
        adminDashboard.style.display = 'none';
        contactAdminForm.style.display = 'none';
    });

    contactLink.addEventListener('click', function() {
        loginForm.style.display = 'none';
        registerForm.style.display = 'none';
        userDashboard.style.display = 'none';
        adminDashboard.style.display = 'none';
        contactAdminForm.style.display = 'block';
    });

    document.getElementById('login').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch('login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `username=${username}&password=${password}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loginForm.style.display = 'none';
                if (data.role === 'admin') {
                    adminDashboard.style.display = 'block';
                } else {
                    userDashboard.style.display = 'block';
                    fetchBookings();
                }
                loginLink.style.display = 'none';
                registerLink.style.display = 'none';
                contactLink.style.display = 'none';
                logoutLink.style.display = 'block';
            } else {
                alert('Username atau password salah');
            }
        });
    });

    logoutLink.addEventListener('click', function() {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        userDashboard.style.display = 'none';
        adminDashboard.style.display = 'none';
        contactAdminForm.style.display = 'none';
        loginLink.style.display = 'block';
        registerLink.style.display = 'block';
        contactLink.style.display = 'block';
        logoutLink.style.display = 'none';
    });

       document.addEventListener('DOMContentLoaded', function() {
    const timeSlots = document.querySelectorAll('.timeSlot');
    const timeInput = document.getElementById('time');
    const bookingForm = document.getElementById('bookingForm');
    const scheduleTable = document.getElementById('scheduleTable');
    const whatsappLink = document.getElementById('whatsappLink');
    const adminPhoneNumber = '62xxxxxxxxxx'; // Ganti dengan nomor WhatsApp admin

    // Fungsi untuk menampilkan data pemesanan
    function fetchBookings() {
        fetch('get_bookings.php')
        .then(response => response.json())
        .then(data => {
            scheduleTable.innerHTML = '';
            data.forEach(booking => {
                const row = scheduleTable.insertRow();
                row.insertCell(0).innerText = booking.name;
                row.insertCell(1).innerText = booking.date;
                row.insertCell(2).innerText = booking.time;
                row.insertCell(3).innerText = booking.phone;
                row.insertCell(4).innerText = booking.status;
            });
        });
    }

    // Mengatur event listener pada tombol waktu
    timeSlots.forEach(button => {
        button.addEventListener('click', function() {
            timeSlots.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            timeInput.value = button.getAttribute('data-time');
        });
    });

    // Mengatur event listener pada form pemesanan
    bookingForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(bookingForm);
        fetch('booking.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                fetchBookings();
                confirmationMessage.style.display = 'block';
                const name = formData.get('name');
                const phone = formData.get('phone');
                const date = formData.get('date');
                const time = formData.get('time');
                const whatsappMessage = `Halo Admin, saya ${name} dengan nomor HP ${phone} telah melakukan pemesanan lapangan pada tanggal ${date} pukul ${time}. Mohon konfirmasi pembayaran.`;
                whatsappLink.href = `https://wa.me/${adminPhoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
            } else {
                alert('Gagal melakukan pemesanan: ' + (data.error || ''));
            }
        });

        bookingForm.reset();
        timeSlots.forEach(btn => btn.classList.remove('selected'));
    });

    // Memuat data pemesanan saat halaman dimuat
    fetchBookings();
});

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
            body: `contactName=${contactName}&contactPhone=${contactPhone}&contactEmail=${contactEmail}&contactMessage=${contactMessage}`
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
    document.addEventListener('DOMContentLoaded', function() {
    const adminContactTable = document.getElementById('adminContactTable');
    const filterForm = document.getElementById('filterForm');
    const periodSelect = document.getElementById('period');
    const monthYearFields = document.getElementById('monthYearFields');
    const monthSelect = document.getElementById('month');
    const yearInput = document.getElementById('year');

    // Fungsi untuk mengambil data penyewaan
    function fetchBookings(period, periodValue) {
        fetch('get_bookings_by_period.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `period=${period}&period_value=${JSON.stringify(periodValue)}`
        })
        .then(response => response.json())
        .then(data => {
            adminContactTable.innerHTML = '';
            data.forEach(booking => {
                const row = adminContactTable.insertRow();
                row.insertCell(0).innerText = booking.name;
                row.insertCell(1).innerText = booking.date;
                row.insertCell(2).innerText = booking.time;
                row.insertCell(3).innerText = booking.phone;
                row.insertCell(4).innerText = booking.status;

                const actionCell = row.insertCell(5);
                if (booking.status !== 'booked') {
                    const bookButton = document.createElement('button');
                    bookButton.innerText = 'konfirmasi';
                    bookButton.addEventListener('click', function() {
                        updateBookingStatus(booking.id, 'booked');
                    });
                    actionCell.appendChild(bookButton);
                }
            });
        });
    }

    // Fungsi untuk mengupdate status penyewaan
    function updateBookingStatus(id, status) {
        fetch('update_status.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `id=${id}&status=${status}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Status updated successfully');
                // Refresh data penyewaan
                const period = periodSelect.value;
                const periodValue = {
                    month: parseInt(monthSelect.value),
                    year: parseInt(yearInput.value)
                };
                fetchBookings(period, periodValue);
            } else {
                alert('Failed to update status: ' + data.error);
            }
        });
    }

    // Event listener untuk perubahan periode
    periodSelect.addEventListener('change', function() {
        if (periodSelect.value === 'monthly') {
            monthYearFields.style.display = 'block';
        } else {
            monthYearFields.style.display = 'none';
        }
    });

    // Event listener untuk form filter
    filterForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const period = periodSelect.value;
        const periodValue = {
            month: parseInt(monthSelect.value),
            year: parseInt(yearInput.value)
        };
        fetchBookings(period, periodValue);
    });

    // Memuat data penyewaan saat halaman dimuat
    fetchBookings('monthly', { month: new Date().getMonth() + 1, year: new Date().getFullYear() });
});