"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { Cormorant_Garamond, Dancing_Script, Lato } from "next/font/google";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { Heart, MapPin, PartyPopper, Gift, Copy, Check, Gem, BookHeart } from "lucide-react";
import * as data from "./data";
import { useAudio } from "./contexts/AudioContext";

// --- PENGATURAN FONT ---
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "600", "700"] });
const dancing = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] });
const lato = Lato({ subsets: ["latin"], weight: ["300", "400", "700"] });

// --- VARIANTS ANIMASI ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, duration: 0.8 },
  },
};

export default function WeddingInvitation() {
  const [remainingTime, setRemainingTime] = useState(0);
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { playAudio } = useAudio();

  useEffect(() => {
    document.title = `The Wedding of ${data.groomName} & ${data.brideName}`;
    const target = new Date(data.targetDate).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;
      setRemainingTime(diff > 0 ? diff : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCountdown = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const d = Math.floor(totalSeconds / (3600 * 24));
    const h = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    
    return (
        <div className="flex justify-center space-x-2 md:space-x-6 text-center text-[#4a4a4a]">
            {[
                { value: d, label: 'Hari' },
                { value: h, label: 'Jam' },
                { value: m, label: 'Menit' },
                { value: s, label: 'Detik' }
            ].map(({value, label}) => (
                <div key={label} className="flex flex-col items-center gap-y-2 w-16 md:w-20">
                    <span className={`${cormorant.className} text-3xl md:text-5xl font-bold text-[#bda08c]`}>{String(value).padStart(2, '0')}</span>
                    <span className={`${lato.className} text-xs uppercase tracking-widest`}>{label}</span>
                </div>
            ))}
        </div>
    );
  };

  const handleOpenInvitation = () => {
    setIsInvitationOpen(true);
    document.body.style.overflow = 'auto';
    playAudio();
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(data.accountNumber);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  useEffect(() => {
    if (!isInvitationOpen) {
        document.body.style.overflow = 'hidden';
    }
  }, [isInvitationOpen]);

  return (
    <>
      <AnimatePresence>
        {!isInvitationOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 1.5, ease: "easeInOut" } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#4a4a4a] text-white p-6 bg-cover bg-center"
            style={{backgroundImage: "url('/bg-pattern.svg')"}}
          >
            <div className="text-center space-y-6 flex flex-col items-center">
              <p className={`${cormorant.className} text-xl tracking-wider text-gray-300`}>The Wedding Of</p>
              <h1 className={`${dancing.className} text-6xl md:text-8xl text-amber-50`}>{data.groomName} & {data.brideName}</h1>
              <p className={`${lato.className} text-lg text-gray-300`}>{data.weddingDate}</p>
              <motion.button
                onClick={handleOpenInvitation}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-8 py-3 bg-[#bda08c] text-white rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300 font-semibold tracking-wider"
              >
                Buka Undangan
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {isInvitationOpen && (
        <div className="fixed bottom-6 right-6 z-40">
          <Link href="/story" passHref>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover="hover"
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
              className="group flex items-center justify-center gap-x-2 h-14 bg-[#bda08c] text-white rounded-full shadow-lg cursor-pointer px-4"
            >
              <motion.div>
                <BookHeart size={22} />
              </motion.div>
              <motion.div
                className="overflow-hidden"
                variants={{
                  initial: { width: 0, opacity: 0 },
                  hover: { width: 'auto', opacity: 1 },
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <span className="text-sm font-semibold whitespace-nowrap pr-1">
                  Cerita Kami
                </span>
              </motion.div>
            </motion.div>
          </Link>
        </div>
      )}

      <main className={`${lato.className} min-h-screen bg-[#fdfcf9] text-[#5c5c5c] antialiased transition-opacity duration-1000 ${isInvitationOpen ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-2xl mx-auto pb-24">
          
          <motion.section 
            variants={containerVariants}
            initial="hidden"
            animate={isInvitationOpen ? "visible" : "hidden"}
            className="text-center min-h-screen flex flex-col justify-center items-center p-6 space-y-4"
          >
            <motion.p variants={itemVariants} className={`${cormorant.className} text-xl md:text-2xl tracking-wider`}>We Are Getting Married</motion.p>
            <motion.h1 variants={itemVariants} className={`${dancing.className} text-7xl md:text-8xl text-[#bda08c]`}>{data.groomName} & {data.brideName}</motion.h1>
            <motion.p variants={itemVariants} className="text-lg font-bold">{data.weddingDate}</motion.p>
              <motion.div variants={itemVariants} className="pt-12">
                {formatCountdown(remainingTime)}
              </motion.div>
          </motion.section>

          <motion.section 
            variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}
            className="text-center py-16 md:py-20 px-6 bg-white shadow-inner"
          >
            <motion.div variants={itemVariants} className="flex justify-center text-[#bda08c] mb-6">
                <Heart size={32} />
            </motion.div>
            <motion.blockquote variants={itemVariants} className={`${cormorant.className} text-xl md:text-2xl italic max-w-xl mx-auto leading-relaxed`}>
              "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang."
            </motion.blockquote>
            <motion.p variants={itemVariants} className="mt-4 font-bold tracking-wider">(QS. Ar-Rum: 21)</motion.p>
          </motion.section>

          <motion.section 
            variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
            className="py-16 md:py-24 px-6 text-center"
          >
            <motion.p variants={itemVariants} className={`${cormorant.className} text-2xl italic mb-12`}>
              Dengan rahmat Allah, kami mengundang Anda untuk berbagi kebahagiaan di hari pernikahan kami:
            </motion.p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-16">
              <motion.div variants={itemVariants} className="space-y-4">
                <h2 className={`${dancing.className} text-6xl text-[#bda08c]`}>{data.groomName}</h2>
                <p className="text-sm">Putra dari {data.parents.groom}</p>
              </motion.div>
              <motion.span variants={itemVariants} className="text-6xl font-thin text-[#bda08c]">&</motion.span>
              <motion.div variants={itemVariants} className="space-y-4">
                <h2 className={`${dancing.className} text-6xl text-[#bda08c]`}>{data.brideName}</h2>
                <p className="text-sm">Putri dari {data.parents.bride}</p>
              </motion.div>
            </div>
          </motion.section>

          <motion.section 
            variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
            className="py-16 md:py-24 px-6 text-center bg-white shadow-inner"
          >
            <motion.h3 variants={itemVariants} className={`${cormorant.className} text-4xl md:text-5xl font-bold mb-4 text-[#bda08c]`}>Save the Date</motion.h3>
            <motion.p variants={itemVariants} className="mb-12 text-lg">{data.weddingDate}</motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-xl mx-auto">
              <motion.div variants={itemVariants} className="bg-[#fdfcf9] p-8 rounded-lg shadow-md border border-gray-200/80">
                <Gem className="mx-auto mb-4 text-[#bda08c]" size={40} />
                <h4 className={`${cormorant.className} text-2xl font-semibold`}>Akad Nikah</h4>
                <p className="mt-2">{data.akadTime}</p>
              </motion.div>
              <motion.div variants={itemVariants} className="bg-[#fdfcf9] p-8 rounded-lg shadow-md border border-gray-200/80">
                <PartyPopper className="mx-auto mb-4 text-[#bda08c]" size={40} />
                <h4 className={`${cormorant.className} text-2xl font-semibold`}>Resepsi</h4>
                <p className="mt-2">{data.resepsiTime}</p>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="mt-12">
                <MapPin className="mx-auto mb-4 text-[#bda08c]" size={40} />
                <h4 className={`${cormorant.className} text-2xl font-semibold`}>{data.locationName}</h4>
                <p className="mt-2 max-w-md mx-auto">{data.locationAddress}</p>
                <div className="mt-8 rounded-xl shadow-lg overflow-hidden border border-gray-200/80">
                  <iframe src={data.mapsUrl} width="100%" height="350" style={{ border:0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </motion.div>
          </motion.section>

          <motion.section 
            variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
            className="py-16 md:py-24 px-6 text-center"
          >
              <motion.div variants={itemVariants} className="flex justify-center text-[#bda08c] mb-6">
                <Gift size={40} />
              </motion.div>
            <motion.h3 variants={itemVariants} className={`${cormorant.className} text-4xl font-bold mb-4 text-[#bda08c]`}>Wedding Gift</motion.h3>
            <motion.p variants={itemVariants} className="max-w-lg mx-auto mb-8">
                Doa restu Anda adalah hadiah terindah bagi kami. Namun, jika Anda ingin memberikan tanda kasih, kami telah menyediakan fitur amplop digital untuk memudahkannya.
            </motion.p>
            <motion.div variants={itemVariants} className="p-6 bg-white rounded-lg shadow-md border border-gray-200/80 max-w-sm mx-auto">
                <p className="font-bold text-lg">{data.bankName}</p>
                <p className="text-2xl my-2 tracking-widest text-[#bda08c]">{data.accountNumber}</p>
                <p className="text-sm">a.n. {data.accountName}</p>
                <button 
                  onClick={handleCopy}
                  className="mt-4 w-full px-4 py-2 bg-[#bda08c] text-white rounded-full flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50"
                  disabled={isCopied}
                >
                  {isCopied ? <><Check size={18}/> Tersalin!</> : <><Copy size={16}/> Salin Rekening</>}
                </button>
            </motion.div>
            <motion.p variants={itemVariants} className="mt-6 text-sm">
                Atau konfirmasi hadiah melalui WhatsApp:
            </motion.p>
              <motion.a 
                variants={itemVariants} 
                href={`https://wa.me/${data.waConfirmation}?text=Halo%20${data.groomName}%20%26%20${data.brideName},%20saya%20ingin%20mengirimkan%20hadiah%20pernikahan.`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block mt-2 px-6 py-2 border border-[#bda08c] text-[#bda08c] rounded-full hover:bg-[#bda08c] hover:text-white transition-colors"
              >
                Hubungi via WhatsApp
              </motion.a>
          </motion.section>

          <section className="py-16 md:py-24 px-6 text-center bg-white shadow-inner">
            <p className={`${cormorant.className} text-xl italic max-w-xl mx-auto mb-8`}>
              Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.
            </p>
            
            <h3 className={`${dancing.className} text-7xl md:text-8xl text-[#bda08c]`}>{data.groomName} & {data.brideName}</h3>
          </section>

          <footer className="text-center py-6 px-4 text-xs text-gray-400">
            <p>© {new Date().getFullYear()} {data.groomName} & {data.brideName}. Dibuat dengan ❤️.</p>
          </footer>
        </div>
      </main>
    </>
  );
}