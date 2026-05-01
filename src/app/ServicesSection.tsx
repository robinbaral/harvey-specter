import { client } from '@/sanity/lib/client'
import { SERVICES_QUERY } from '@/sanity/lib/queries'

type Service = {
  _id: string
  num: string
  title: string
  description: string
  imageUrl: string | null
  imagePosition: string | null
  order: number
}

export default async function ServicesSection() {
  const services: Service[] = await client.fetch(SERVICES_QUERY, {}, { next: { revalidate: 60 } })

  return (
    <section className="bg-black px-4 py-12 flex flex-col gap-8 md:px-8 md:py-[80px] md:gap-12">

      <p className="font-mono text-[14px] text-white uppercase leading-[1.1]">
        [ services ]
      </p>

      <div className="flex items-center justify-between w-full">
        <span className="font-light text-white uppercase tracking-[-0.08em] leading-none text-[8.5vw] md:text-[6.67vw]">
          [{services.length}]
        </span>
        <span className="font-light text-white uppercase tracking-[-0.08em] leading-none text-[8.5vw] md:text-[6.67vw]">
          Deliverables
        </span>
      </div>

      <div className="flex flex-col gap-12 w-full">
        {services.map((s) => (
          <div key={s._id} className="flex flex-col gap-[9px] w-full group cursor-pointer">

            <p className="font-mono text-[14px] text-white/50 uppercase leading-[1.1] transition-colors duration-300 group-hover:text-white/80">
              {s.num}
            </p>
            <div className="h-px w-full bg-white/25 transition-colors duration-300 group-hover:bg-white/60" />

            <div className="flex flex-col gap-4 pt-[9px] lg:flex-row lg:items-start lg:justify-between">
              <p className="text-[36px] font-bold italic text-white uppercase tracking-[-0.04em] leading-[1.1] whitespace-nowrap transition-transform duration-300 group-hover:translate-x-2">
                {s.title}
              </p>
              <div className="flex flex-col gap-4 lg:flex-row lg:gap-6 lg:items-start">
                <p className="text-[14px] text-white/70 leading-[1.3] tracking-[-0.04em] lg:w-[393px] transition-colors duration-300 group-hover:text-white">
                  {s.description}
                </p>
                {s.imageUrl && (
                  <div className="relative w-[151px] h-[151px] shrink-0 overflow-hidden">
                    <img
                      src={s.imageUrl}
                      alt={s.title}
                      className={`absolute inset-0 w-full h-full object-cover ${s.imagePosition ?? 'object-center'} transition-transform duration-500 group-hover:scale-110`}
                    />
                  </div>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  )
}
