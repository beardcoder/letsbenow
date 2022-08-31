import classNames from 'classnames'
import { FunctionComponent } from 'react'
import { useInView } from 'react-intersection-observer'
import { Typewriter } from 'react-simple-typewriter'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ISnippet } from '@/@types/snippet'

import { HomeSnippetsSnippet } from './HomeSnippetsSnippet/HomeSnippetsSnippet'

type Props = {
  snippets: ISnippet[]
} & JSX.IntrinsicElements['section']

export const HomeSnippets: FunctionComponent<Props> = ({
  snippets,
  className,
  ...props
}): JSX.Element => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
  })
  let text
  if (inView) {
    text = (
      <>
        <Typewriter
          words={['„Conscious experience“']}
          cursor
          cursorStyle='_'
          typeSpeed={100}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </>
    )
  }
  return (
    <section
      className={classNames('relative px-8 overflow-x-hidden', className)}
      {...props}
    >
      <div className='container py-12 mx-auto'>
        <div className='flex flex-col mb-10 md:flex-row'>
          <div className='order-2 w-full md:order-1 md:w-1/2 mr-7'>
            <div className='hidden mb-4 text-right h2 md:text-5xl md:block'>
              100%
            </div>
            <p className='max-w-xl ml-auto prose dark:prose-invert md:text-right'>
              <strong>Nachhaltigkeit beim Programmieren?</strong> Klingt seltsam
              ist aber gar nicht so weit hergeholt. Jeden Tag verbringen wir
              zeit immer wieder die selben Aufgaben zu erledigen. Dies
              verbraucht Rohstoffe, Zeit und Nerven. Warum nicht einfach dinge
              die man oft braucht abspeichern sodass man sie schnell abrufen
              kann. Genau das sind Snippets. Kein Code Schnipsel die das leben
              erleichtern. Hier gehe ich noch einen Schritt weiter und Teile
              meine Schnippsel mit euch damit auch ihr schneller und Effizienter
              mit eueren Rohstoffen umgehen könnt.
            </p>
          </div>
          <div className='order-1 w-full md:order-2 md:w-1/2'>
            <h2 className='pb-1 text-gradient'>Snippets&nbsp;</h2>
            <div className='mb-8 h2 md:mb-14' ref={ref}>
              {text}
            </div>
          </div>
        </div>
        <Swiper
          spaceBetween={32}
          slidesPerView={1.3}
          breakpoints={{
            460: {
              slidesPerView: 2.3,
            },
            768: {
              slidesPerView: 3.5,
            },
          }}
        >
          <div className='w-full'>
            <div className='grid grid-flow-col gap-6 auto-cols-4/5 md:auto-cols-1/3'>
              {snippets.map((snippet, i) => (
                <SwiperSlide key={i}>
                  <HomeSnippetsSnippet snippet={snippet} />
                </SwiperSlide>
              ))}
            </div>
          </div>
        </Swiper>
      </div>
    </section>
  )
}
