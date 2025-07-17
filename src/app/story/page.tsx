"use client";

// Hook dan ikon yang tidak perlu sudah dihapus dari import
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Cormorant_Garamond, Dancing_Script, Lato } from "next/font/google";
import { BookHeart, Camera, Heart, X } from "lucide-react";

import * as data from "../data";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "700"] });
const dancing = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] });
const lato = Lato({ subsets: ["latin"], weight: ["300", "400", "700"] });


export default function StoryPage() {
  // State untuk lightbox galeri tetap ada
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // --- LOGIKA UNTUK TIMER DAN PARALLAX HEADER TELAH DIHILANGKAN ---

  return (
    <>
      <main className={`${lato.className} min-h-screen bg-[#fdfcf9] text-[#5c5c5c] antialiased`}>
        
        {/* --- BAGIAN HERO DAN COUNTDOWN TIMER TELAH DIHILANGKAN --- */}

        <div className="max-w-3xl mx-auto pt-24 pb-24"> {/* Menambahkan padding-top sebagai pengganti header */}
          
          {/* Halaman langsung dimulai dari "Our Story Section" */}
          <section className="py-16 md:py-20 px-4 sm:px-6 text-center">
            <motion.div className="flex justify-center text-[#bda08c] mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <BookHeart size={40} strokeWidth={1.5} />
            </motion.div>
            <motion.h2 className={`${cormorant.className} text-4xl md:text-5xl font-bold mb-16 text-[#8c705f]`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
                Our Love Story
            </motion.h2>
            <div className="relative border-l-2 border-gray-200/80 ml-3 md:ml-0 md:before:content-[''] md:before:absolute md:before:left-1/2 md:before:transform md:before:-translate-x-1/2 md:before:h-full md:before:border-l-2 md:before:border-gray-200/80">
              {data.ourStory.map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
                  className="mb-12 md:mb-16 relative"
                >
                  <div className={`md:flex items-center w-full ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                    <div className="md:w-1/2">
                      <div className="absolute w-4 h-4 bg-white border-2 border-[#bda08c] rounded-full -left-2.5 top-1 md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2 flex items-center justify-center">
                        <div className="w-2 h-2 bg-[#bda08c] rounded-full"></div>
                      </div>
                      <div className={`ml-8 md:ml-0 bg-white/60 backdrop-blur-sm p-4 rounded-lg shadow-sm text-left ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                         <p className="text-sm font-semibold text-[#bda08c] tracking-wider mb-1">{story.date}</p>
                         <h3 className={`${cormorant.className} text-xl sm:text-2xl font-bold text-[#8c705f] my-1`}>{story.title}</h3>
                         <p className="text-gray-500 leading-relaxed text-sm sm:text-base">{story.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
          
          <hr className="border-gray-200/80 max-w-sm mx-auto" />

          {/* --- Gallery Section --- */}
          <section className="py-20 md:py-28 px-4 sm:px-6 text-center">
             <motion.div className="flex justify-center text-[#bda08c] mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}><Camera size={40} strokeWidth={1.5}/></motion.div>
             <motion.h2 className={`${cormorant.className} text-4xl md:text-5xl font-bold mb-16 text-[#8c705f]`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>Pre-Wedding Gallery</motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {data.galleryImages.map((src, index) => (
                <motion.div
                  key={src}
                  className="relative overflow-hidden rounded-xl shadow-lg group aspect-[3/4] cursor-pointer"
                  onClick={() => setSelectedImage(src)}
                  layoutId={`card-${src}`}
                  initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                >
                  <Image src={src} alt={`Photo ${index + 1}`} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* --- Footer --- */}
          <footer className="text-center pt-10 pb-6 px-4 text-gray-500">
             <div className="flex justify-center items-center gap-4 text-[#bda08c] mb-4">
                <span className={`${dancing.className} text-3xl`}>{data.groomName}</span>
                <Heart size={20} />
                <span className={`${dancing.className} text-3xl`}>{data.brideName}</span>
             </div>
             <p className="text-xs text-gray-400">
               © {new Date().getFullYear()}  |  All Rights Reserved.
             </p>
          </footer>
        </div>
      </main>

      {/* --- Lightbox Modal (tetap berfungsi untuk galeri) --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div className="relative max-w-3xl max-h-[90vh]" layoutId={`card-${selectedImage}`}>
              <Image 
                src={selectedImage} alt="Selected view" width={1200} height={1600}
                className="object-contain w-auto h-auto max-w-full max-h-[90vh] rounded-lg shadow-2xl"
              />
            </motion.div>
            <motion.button
              className="absolute top-5 right-5 text-white bg-black/50 rounded-full p-2"
              initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.3 } }} exit={{ scale: 0 }}
            >
              <X size={24} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}