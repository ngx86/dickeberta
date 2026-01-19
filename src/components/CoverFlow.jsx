import React, { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Keyboard, Navigation } from 'swiper/modules'
import AlbumCard from './AlbumCard'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'

export default function CoverFlow({ albums, activeIndex, onSlideChange, swiperRef }) {
  const localSwiperRef = useRef(null)
  const ref = swiperRef || localSwiperRef

  useEffect(() => {
    if (ref.current && ref.current.activeIndex !== activeIndex) {
      ref.current.slideTo(activeIndex, 300)
    }
  }, [activeIndex])

  return (
    <div className="w-full py-8">
      <Swiper
        onSwiper={(swiper) => { ref.current = swiper }}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        initialSlide={activeIndex}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 1.5,
          slideShadows: false,
        }}
        keyboard={{
          enabled: true,
          onlyInViewport: true,
        }}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        onSlideChange={(swiper) => onSlideChange(swiper.activeIndex)}
        modules={[EffectCoverflow, Keyboard, Navigation]}
        className="w-full"
        style={{ paddingTop: '20px', paddingBottom: '20px' }}
      >
        {albums.map((album, index) => (
          <SwiperSlide
            key={album.id}
            style={{ width: 'auto' }}
            className="flex justify-center items-center"
          >
            <AlbumCard album={album} isActive={index === activeIndex} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          className="swiper-button-prev-custom nav-button w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-jukebox-amber hover:bg-jukebox-amber/20 transition-all"
          aria-label="Previous album"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="swiper-button-next-custom nav-button w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-jukebox-amber hover:bg-jukebox-amber/20 transition-all"
          aria-label="Next album"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
