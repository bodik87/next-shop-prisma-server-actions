"use client"

import React, { useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import { PrevButton, NextButton, usePrevNextButtons } from './ui/EmblaCarouselDotButton'
import { DotButton, useDotButton } from './ui/EmblaCarouselArrowButtons'

type PropType = { options?: EmblaOptionsType }

const slides = [
  { id: 1, title: "Img", slideImage: "/1.png" },
  { id: 2, title: "Img", slideImage: "/2.png" },
  { id: 3, title: "Img", slideImage: "/3.png" },
];

const Carousel: React.FC<PropType> = (props) => {
  const { options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay: any = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

    resetOrStop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  )

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi, onNavButtonClick)

  return (
    <section className="embla md:w-1/2 relative">

      <div className="overflow-hidden rounded" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((image) => (
            <div className="embla__slide" key={image.id}>
              <Link href={`#`}>
                <Image
                  src={image.slideImage}
                  alt={image.title}
                  width={650}
                  height={312}
                  className="w-full h-full rounded"
                  priority
                  quality={100}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-3 inset-x-0 z-10 px-3 mt-2 flex items-end justify-between opacity-80">
        <div className="flex items-center gap-3">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="flex justify-end items-center">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Carousel
