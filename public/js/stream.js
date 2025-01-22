if (!localStorage.getItem("termsAccepted")) {
    Swal.fire({
        title: 'Perhatian!',
        text: "Dengan menggunakan layanan ini, Anda bertanggung jawab penuh atas segala risiko.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Setuju',
        cancelButtonText: 'Tidak Setuju',
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Terima Kasih!', 'Anda Telah Menyetujui Syarat Penggunaan', 'success');
            localStorage.setItem("termsAccepted", "true");
        } else {
            window.location.href = "https://api.febrita.biz.id";
        }
    });
}

document.getElementById("searchButton").addEventListener("click", async () => {
    const query = document.getElementById("searchInput").value;
    const searchingDiv = document.getElementById("searching");
    const resultsDiv = document.getElementById("results");

    resultsDiv.innerHTML = '';
    searchingDiv.style.display = 'none';

    if (query.trim() === '') {
        alertPopUp('Masukkan kata kunci terlebih dahulu!');
        return;
    }

    searchingDiv.style.display = 'block';

    try {
        const response = await axios.get(`https://api.febrita.biz.id/tools/xnxxsearch?text=${query}`);
        const data = response.data;

        searchingDiv.style.display = 'none';

        if (data && data.message.success && data.message.data) {
            data.message.data.forEach(item => {
                const card = document.createElement("div");
                card.classList.add("card");

                const title = document.createElement("h3");
                title.textContent = item.title || "No Title Available";
                card.appendChild(title);

                const thumbnail = document.createElement("img");
                thumbnail.src = item.thumbnail || "https://via.placeholder.com/150";
                card.appendChild(thumbnail);

                resultsDiv.appendChild(card);
            });
        } else {
            resultsDiv.innerHTML = '<p>Tidak ada hasil ditemukan.</p>';
        }
    } catch (error) {
        searchingDiv.style.display = 'none';
        alertPopUp('Terjadi kesalahan, coba lagi!');
        console.error(error);
    }
});

function alertPopUp(message) {
    Swal.fire({
        title: "Oops...",
        text: message,
        icon: "error"
    });
}