import { useEffect } from "react";
import { useParams } from "react-router";
import { ArrowLeft, CheckCircle2, TrendingUp, Zap, Target, Search, MonitorSmartphone, ShieldCheck } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

// Definisi Tipe Data untuk Layanan
type ServiceType = {
    title: string;
    subtitle: string;
    description: string;
    benefits: { title: string; desc: string; icon: any }[];
    features: string[];
    seoParagraph: string;
};

// Data Layanan yang Diperkaya untuk SEO & Marketing
const serviceData: Record<string, ServiceType> = {
    "website-company-profile": {
        title: "Jasa Pembuatan Website Company Profile di Bali",
        subtitle: "Tingkatkan Kredibilitas & Kepercayaan Klien Profesional Anda",
        description: "Di era digital saat ini, tidak memiliki website sama dengan tidak eksis. Khusus untuk bisnis di Bali yang bersaing di pasar lokal maupun global, website company profile bertindak sebagai representasi digital 24 jam. Kami membangun website yang tidak hanya indah dipandang, tetapi juga merancang struktur informasi yang meyakinkan calon klien, investor, dan mitra bisnis Anda akan profesionalisme perusahaan Anda.",
        benefits: [
            { title: "Kesan Pertama Memukau", desc: "Desain eksklusif yang mencerminkan identitas brand Anda di detik pertama pengunjung masuk.", icon: Target },
            { title: "Kredibilitas Instan", desc: "Membangun kepercayaan seketika dengan portofolio, testimoni, dan profil tim yang terstruktur.", icon: ShieldCheck },
            { title: "Akses Global", desc: "Memperluas jangkauan bisnis Anda melampaui batas geografis Bali ke pasar internasional.", icon: TrendingUp }
        ],
        features: ["Desain UI/UX Eksklusif", "Halaman Tentang Kami & Tim", "Galeri Portofolio/Proyek", "Integrasi Form WhatsApp & Email", "Mobile-Responsive Design", "Optimasi Kecepatan Loading"],
        seoParagraph: "Sebagai penyedia spesialis jasa pembuatan website Bali, kami mengerti bagaimana kompetisi bisnis berjalan. Website company profile yang kami kembangkan didukung dengan fondasi SEO lokal agar bisnis Anda mudah ditemukan oleh pencari jasa di wilayah Kuta, Seminyak, Denpasar, dan seluruh Bali."
    },
    "landing-page": {
        title: "Pembuatan Landing Page Konversi Tinggi",
        subtitle: "Ubah Pengunjung (Traffic) Menjadi Pembeli Aktual",
        description: "Apakah Anda menjalankan iklan di Instagram, Facebook, atau Google Ads? Jika iya, mengarahkan mereka ke homepage biasa adalah pemborosan budget. Landing page kami dirancang secara spesifik dengan prinsip psikologi marketing untuk satu tujuan utama: KONVERSI. Tanpa distraksi menu, fokus pada penawaran (offer) Anda, dan menggunakan teknik copywriting yang mengunci perhatian audiens hingga mereka menekan tombol beli.",
        benefits: [
            { title: "Fokus Pada Penjualan", desc: "Desain tanpa distraksi yang mengarahkan mata pengunjung langsung ke penawaran utama.", icon: Target },
            { title: "Loading Super Cepat", desc: "Kecepatan di bawah 1 detik menyelamatkan budget iklan Anda dari pengunjung yang kabur.", icon: Zap },
            { title: "Copywriting Hipnotis", desc: "Struktur teks (headline, benefit, social proof) yang memicu urgensi pembelian.", icon: TrendingUp }
        ],
        features: ["Struktur Copywriting AIDA/PAS", "Desain Fokus Konversi (CRO)", "A/B Testing Support", "Integrasi Facebook/Tiktok Pixel", "Tombol CTA Mengembang (Sticky)", "Formulir Lead Generation Cepat"],
        seoParagraph: "Setiap kampanye iklan membutuhkan halaman arahan yang sempurna. Layanan pembuatan landing page kami dirancang untuk pebisnis di Bali yang menginginkan ROI maksimal dari setiap rupiah biaya iklan (Ads) yang mereka keluarkan."
    },
    "ui-ux-design": {
        title: "Jasa Desain UI/UX Profesional",
        subtitle: "Rancang Pengalaman Pengguna yang Membuat Pelanggan Ketagihan",
        description: "Desain yang bagus bukan sekadar soal estetika; melainkan bagaimana produk digital Anda digunakan. Kami melakukan riset mendalam terhadap target audiens Anda untuk membangun alur navigasi (User Experience) yang logis dan antarmuka (User Interface) yang memanjakan mata. Hasilnya? Pengguna lebih betah, tingkat pentalan (bounce rate) menurun, dan interaksi aplikasi meningkat drastis.",
        benefits: [
            { title: "Riset Audiens Berbasis Data", desc: "Keputusan desain diambil dari perilaku pengguna nyata, bukan sekadar asumsi.", icon: Search },
            { title: "Retensi Pengguna Tinggi", desc: "Kemudahan navigasi membuat pelanggan akan selalu kembali menggunakan platform Anda.", icon: TrendingUp },
            { title: "Prototyping Siap Dev", desc: "Format design-system rapi yang menghemat puluhan jam kerja tim developer.", icon: Zap }
        ],
        features: ["User Research & Persona", "Wireframing Terstruktur", "Interactive Prototyping", "Design System & Guideline", "Usability Testing", "Hand-off ke Developer Lancar"],
        seoParagraph: "Membangun aplikasi atau platform SaaS? Percayakan UI/UX Design Anda pada studio profesional di Bali yang mengerti standar internasional, namun tetap memiliki sentuhan lokal yang personal."
    },
    "responsive-design": {
        title: "Solusi Responsive Web Design",
        subtitle: "Tampil Sempurna di Smartphone Maupun Layar Lebar",
        description: "Faktanya, lebih dari 70% traffic internet saat ini berasal dari perangkat mobile (smartphone). Jika website Anda rusak saat dibuka dari HP, Anda berpotensi kehilangan 70% pendapatan Anda. Layanan pengembangan kami menggunakan pola pikir \"Mobile-First\", memastikan bahwa setiap elemen visual dan fungsi teknis bekerja selaras sempurna baik di genggaman tangan, tablet, maupun monitor ultra-wide.",
        benefits: [
            { title: "Jangkau Semua Pengguna", desc: "Tidak peduli ukuran layarnya, pesan bisnis Anda tersampaikan tanpa cacat visual.", icon: MonitorSmartphone },
            { title: "Peringkat SEO Naik", desc: "Google memprioritaskan website yang ramah-seluler (Mobile-Friendly) di hasil pencarian.", icon: Search },
            { title: "Hemat Biaya", desc: "Satu codebase website cerdas untuk semua perangkat, tanpa perlu membuat versi aplikasi terpisah.", icon: Zap }
        ],
        features: ["Mobile-First CSS Architecture", "Fluid Typography & Spacing", "Gambar Resolusi Adaptif", "Interaksi Ramah Layar Sentuh", "Uji Coba Lintas Browser & Perangkat", "Menu Navigasi Mobile Eksklusif"],
        seoParagraph: "Google menggunakan Mobile-First Indexing. Memiliki Responsive Design bukan lagi pilihan, tapi kewajiban. Kami memastikan bisnis lokal di wilayah Bali tampil sempurna di setiap genggaman turis maupun warga lokal."
    },
    "seo-optimization": {
        title: "Jasa SEO Optimization di Bali",
        subtitle: "Dominasi Halaman 1 Google Secara Organik Tanpa Iklan",
        description: "Membayar iklan terus-menerus bisa menguras kantong. SEO (Search Engine Optimization) adalah aset jangka panjang terbaik untuk bisnis Anda. Kami mengoptimasi struktur, konten, dan teknikal website Anda agar ketika orang mencari tentang 'layanan X di Bali', nama bisnis Andalah yang pertama kali muncul. Kami tidak menggunakan jalan pintas (black-hat); kami membangun reputasi domain Anda di mata Google secara solid dan berkelanjutan.",
        benefits: [
            { title: "Traffic Gratis & Tertarget", desc: "Datangkan calon pelanggan yang memang sedang aktif mencari layanan Anda, tanpa biaya per klik.", icon: MonitorSmartphone },
            { title: "Kredibilitas Tertinggi", desc: "Berada di pencarian teratas secara organik menimbulkan persepsi bahwa brand Anda adalah pemimpin industri.", icon: ShieldCheck },
            { title: "Investasi Jangka Panjang", desc: "Sekali peringkat teratas terbentuk, Anda akan terus mendapatkan leads secara konsisten.", icon: TrendingUp }
        ],
        features: ["Audit SEO Berbasis Analitik", "Optimasi Kata Kunci (Keyword Research)", "On-Page SEO (Meta, H1, H2, URL)", "Technical SEO (Kecepatan, Schema Markup)", "SEO Konten / Blog Marketing", "Laporan Peringkat Berkala"],
        seoParagraph: "Persaingan bisnis pariwisata, properti, dan F&B di Bali sangat ketat. Melalui layanan Local SEO expert kami, dominasi kata kunci menguntungkan dan dapatkan klik berlimpah (traffic) setiap hari."
    },
    "web-development": {
        title: "Professional Web Development",
        subtitle: "Kinerja Maksimal dengan Teknologi Ekosistem Modern",
        description: "Di balik desain yang cantik, dibutuhkan mesin (kode) yang tangguh. Sebagai developer profesional, kami tidak menggunakan template murah yang berat dan rawan diretas. Kami membangun sistem dari awal (custom) menggunakan teknologi tumpukan (stack) modern seperti ReactJS, Next.js, dan arsitektur infrastruktur terkini. Ini memastikan keamanan data tingkat dewa, waktu muat secepat kilat, dan skalabilitas jika bisnis Anda bertumbuh eksponensial.",
        benefits: [
            { title: "Performa Kelas Enterprise", desc: "Loading kurang dari semenit, database tanpa ngadat—sama seperti perusahaan teknologi besar.", icon: Zap },
            { title: "Sistem Terlindungi", desc: "Lebih tahan terhadap celah serangan hacker, bot spamming, dan eksploitasi data.", icon: ShieldCheck },
            { title: "Custom Sesuai Kebutuhan", desc: "Sistem dapat diubah, ditambah fitur baru tanpa perlu merombak ulang dari nol.", icon: Target }
        ],
        features: ["Pengembangan React & Next.js", "Arsitektur Kode Bersih (Clean Code)", "E-Commerce & Sistem Booking", "Integrasi Payment Gateway (Xendit/Midtrans)", "CMS Kustom Super Mudah", "Maintenance & Dukungan Teknis 24/7"],
        seoParagraph: "Banyak agensi web di Bali sekadar menggunakan drag-and-drop. Kami adalah software engineer sesungguhnya, menghasilkan produk digital berarsitektur solid untuk keamanan inventori dan kredibilitas bisnis jangka panjang Anda."
    }
};

export default function ServiceDetail() {
    const { slug } = useParams();
    const service = serviceData[slug as string];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!service) {
        return (
            <div className="min-h-screen bg-white flex flex-col pt-32 px-6">
                <Navbar />
                <div className="max-w-4xl mx-auto text-center py-24">
                    <h1 className="text-4xl font-bold mb-6 text-neutral-900">Layanan Tidak Ditemukan</h1>
                    <a href="/#layanan" className="text-neutral-500 underline hover:text-neutral-900 transition-colors">
                        Kembali ke Halaman Layanan
                    </a>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white" style={{ fontFamily: "Inter, sans-serif" }}>
            <Navbar />

            <main className="pt-32 pb-24 relative overflow-hidden">
                {/* Background Grids for Hero Section */}
                <div className="absolute inset-0 opacity-[0.03] top-0 h-[70vh] -z-10" style={{
                    backgroundImage: "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
                    backgroundSize: "60px 60px"
                }} />

                {/* Header Section */}
                <div className="max-w-5xl mx-auto mt-12 px-6 relative z-10 text-center">
                    <a
                        href="/#layanan"
                        className="inline-flex items-center gap-2 text-neutral-500 mb-8 hover:text-neutral-900 transition-colors font-medium border border-neutral-200 px-5 py-2.5 rounded-full text-sm bg-white shadow-sm hover:shadow-md"
                    >
                        <ArrowLeft size={16} />
                        Kembali ke Layanan
                    </a>

                    <div className="mb-4">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-neutral-100 text-neutral-600 text-[0.8125rem] font-bold tracking-widest uppercase" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                            Spesialisasi Kami
                        </span>
                    </div>

                    <h1 className="text-[2.5rem] md:text-[4.5rem] text-neutral-900 tracking-tight leading-[1.05] mb-8 font-semibold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                        {service.title}
                    </h1>

                    <p className="text-xl md:text-2xl text-neutral-500 max-w-3xl mx-auto mb-16 leading-relaxed">
                        {service.subtitle}
                    </p>
                </div>

                {/* Content Body */}
                <div className="max-w-6xl mx-auto px-6 mt-12">
                    <div className="w-full h-px bg-neutral-200 mb-16" />

                    <div className="grid lg:grid-cols-[1fr_380px] gap-16 lg:gap-24 mb-24">
                        {/* Kiri: Penjelasan Utama */}
                        <div>
                            <h2 className="text-3xl font-semibold text-neutral-900 mb-6 tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                                Mengapa Layanan Ini Penting?
                            </h2>
                            <div className="prose prose-lg text-neutral-600 leading-relaxed mb-16">
                                <p>{service.description}</p>
                                <p className="mt-4">{service.seoParagraph}</p>
                            </div>

                            <h2 className="text-3xl font-semibold text-neutral-900 mb-8 tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                                Benefit Untuk Bisnis Anda
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-6 mb-12">
                                {service.benefits.map((benefit, idx) => (
                                    <div key={idx} className="bg-neutral-50 border border-neutral-100 p-8 rounded-3xl hover:-translate-y-1 transition-transform">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-neutral-100">
                                            <benefit.icon className="w-6 h-6 text-neutral-800" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-neutral-900 mb-3" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{benefit.title}</h3>
                                        <p className="text-neutral-500 text-[0.9375rem] leading-relaxed">{benefit.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Kanan: Sidebar Sticky */}
                        <div className="relative">
                            <div className="sticky top-32">
                                {/* Fitur Utama */}
                                <div className="bg-white border border-neutral-200 p-8 rounded-3xl shadow-sm mb-8">
                                    <h3 className="text-lg font-semibold text-neutral-900 uppercase tracking-widest mb-6 border-b border-neutral-100 pb-4" style={{ fontFamily: "Inter, sans-serif" }}>
                                        Yang Akan Anda Dapatkan
                                    </h3>
                                    <ul className="space-y-4">
                                        {service.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3 text-neutral-700 font-medium text-[0.9375rem]">
                                                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30 flex-shrink-0 mt-0.5">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                                                </div>
                                                <span className="leading-relaxed">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* CTA Card Kanan */}
                                <div className="bg-neutral-900 text-white p-8 rounded-3xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />

                                    <h3 className="text-2xl font-semibold mb-4 leading-snug" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                                        Tingkatkan Konversi Bisnis Anda Hari Ini
                                    </h3>
                                    <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                                        Jangan biarkan kompetitor selangkah lebih maju. Dapatkan konsultasi strategi digital gratis bersama kami sekarang.
                                    </p>
                                    <a
                                        href="https://wa.me/6281234567890"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 bg-white text-neutral-900 w-full py-4 rounded-full font-semibold hover:bg-neutral-100 transition-colors"
                                    >
                                        Mulai Konsultasi Gratis
                                    </a>
                                    <p className="text-center text-neutral-500 text-xs mt-4">
                                        *Slot project terbatas setiap bulannya
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
