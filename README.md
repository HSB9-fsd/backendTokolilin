# backendTokolilin

## installation

Install Semua Depedensi yang dibutuhkan dengan cara

    npm install

atau, jika anda menggunakan Yarn

    yarn

Copy file env-example and ganti nama file menjadi .env file

    cp env-example .env

Seuaikan Isi dari .env dengan Konfigurasi yang ada di perangkat anda (jika digunakan)

    DB_USERNAME="root"
    DB_PASSWORD=""
    DB_DATABASE="TokoLilin"
    DB_HOST="127.0.0.1"
    DB_DIALECT= "mysql"

Jalankan perintah untuk reset

    npm run reset

Jalankan Perintah untuk mengenerate seeder ke database yang anda gunakan

    npm run seed

Jalankan Project dengan perintah

    npm start

atau

    yarn start
