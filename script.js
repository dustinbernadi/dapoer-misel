// Import the functions you need from the SDKs you need
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhP_Imo2BC18ZXJ6jxEE9eEgVlbkAMT4Y",
  authDomain: "dapoer-misel.firebaseapp.com",
  projectId: "dapoer-misel",
  storageBucket: "dapoer-misel.firebasestorage.app",
  messagingSenderId: "603611277982",
  appId: "1:603611277982:web:eef919188270397e2fe98f",
  measurementId: "G-SZ8V0SWET8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//const for app
const db = getFirestore(app);

//const for form
const form = document.getElementById("form-pesanan");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nama = form.nama.value;
  const nomor = form.nomor.value;
  const menu = form.menu.value;
  const jumlah = form.jumlah.value;

  try {
    await addDoc(collection(db, "pesanan"), {
      nama,
      nomor,
      menu,
      jumlah: parseInt(jumlah),
      waktu: new Date(),
    });
    alert("pesanan berhasil dikirim!");
    form.reset();
  } catch (error) {
    console.error("gagal menyimpan pesanan", error);
    alert("terjadi kesalahan saat mengirim pesanan. ");
  }
});

const infoTutup = document.getElementById("info-toko-tutup");

async function cekStatusToko() {

  const snap = await getDoc(doc(db, "pengaturan", "statusToko"));
  const data = snap.data();

  if (!data.buka) {
    infoTutup.classList.remove("hidden");

    // Disable semua elemen input dalam form
    form.querySelectorAll("input, select, button").forEach((el) => {
      el.disabled = true;
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
    cekStatusToko();
});
