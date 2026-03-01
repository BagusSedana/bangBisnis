import { motion } from "motion/react";

export function LocalSEO() {
    return (
        <section className="py-24 px-6 bg-neutral-50 relative overflow-hidden">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-[2rem] md:text-[2.5rem] tracking-tight text-neutral-900 mb-6 font-semibold" style={{ fontFamily: "Space Grotesk, sans-serif", lineHeight: 1.2 }}>
                        Mengapa Bisnis di Bali Membutuhkan Website Profesional?
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="prose prose-neutral prose-lg mx-auto text-neutral-600 text-[1rem] md:text-[1.125rem]"
                    style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.8 }}
                >
                    <p className="mb-6">
                        Bali adalah salah satu destinasi wisata dan pusat bisnis yang paling kompetitif. Dengan ribuan turis dan ekspatriat yang mencari layanan setiap hari, <strong>persaingan digital di Bali</strong> sangatlah ketat. Jika bisnis Anda tidak bisa ditemukan di Google, pelanggan potensial Anda pasti akan berbelanja di tempat kompetitor.
                    </p>
                    <p className="mb-6">
                        Sebagai penyedia <strong>jasa website Bali</strong>, kami memahami bahwa sekadar memiliki media sosial tidaklah cukup. Baik Anda menjalankan restoran di Seminyak, villa di Canggu, atau mengelola <strong>bisnis di Jimbaran</strong>, sebuah website profesional bertindak sebagai etalase digital Anda yang buka 24 jam sehari—membangun kredibilitas, memamerkan portofolio, dan menerima pesanan otomatis dari mana saja.
                    </p>
                    <p>
                        Itulah mengapa kami fokus pada <strong>pembuatan website di Badung</strong> dan wilayah sekitarnya yang dioptimasi khusus agar bisnis lokal Anda menduduki halaman pertama pencarian. Website yang kami buat dirancang cepat, responsif, dan siap mengubah pengunjung menjadi pelanggan setia, tanpa proses yang rumit untuk Anda.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
