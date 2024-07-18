document.addEventListener('DOMContentLoaded', function() {
    const bookingTable = document.getElementById('bookingTable');
    const filterForm = document.getElementById('filterForm');
    const periodSelect = document.getElementById('period');
    const monthYearFields = document.getElementById('monthYearFields');
    const monthSelect = document.getElementById('month');
    const yearInput = document.getElementById('year');

     document.addEventListener('DOMContentLoaded', function() {
    const adminContactTable = document.getElementById('adminContactTable');
    const filterForm = document.getElementById('filterForm');
    const periodSelect = document.getElementById('period');
    const monthYearFields = document.getElementById('monthYearFields');
    const monthSelect = document.getElementById('month');
    const yearInput = document.getElementById('year');
    const confirmButton = document.createElement('button');


    // Fungsi untuk mengambil data penyewaan dari server
    function fetchBookings() {
        fetch('get_bookings.php')
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
                const statusCell = row.insertCell(5);
                if (booking.status === 'pending') {
                    const confirmButton = document.createElement('button');
                    confirmButton.innerText = 'Konfirmasi';
                    confirmButton.onclick = () => updateStatus(booking.id, 'booked');
                    statusCell.appendChild(confirmButton);
                } else {
                    statusCell.innerText = 'Booked';
                }
            });
        });
    }

    // Fungsi untuk mengubah status penyewaan
    function updateStatus(id, status) {
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
                fetchBookings();
            } else {
                alert('Gagal mengubah status: ' + (data.error || ''));
            }
        });
    }

    fetchBookings();
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

                const statusCell = row.insertCell(5);
                if (booking.status === 'pending') {
                    const confirmButton = document.createElement('button');
                    confirmButton.innerText = 'Konfirmasi';
                    confirmButton.onclick = () => updateStatus(booking.id, 'booked');
                    statusCell.appendChild(confirmButton);
                    } else {
                    statusCell.innerText = 'Booked';
                }
            });
        });
    }

    function updateStatus(id, status) {
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
                fetchBookings();
            } else {
                alert('Gagal mengubah status: ' + (data.error || ''));
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