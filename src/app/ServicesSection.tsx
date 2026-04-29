const services = [
  {
    num: '[ 1 ]',
    title: 'Brand Discovery',
    desc: 'Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.',
    img: 'https://www.figma.com/api/mcp/asset/42842c62-8fb0-448c-b11d-05c3041a9259',
    imgPosition: 'object-center',
  },
  {
    num: '[ 2 ]',
    title: 'Web design & Dev',
    desc: 'Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.',
    img: 'https://www.figma.com/api/mcp/asset/22be5e6b-619b-4c4a-a7c9-04f21e0241a0',
    imgPosition: 'object-center',
  },
  {
    num: '[ 3 ]',
    title: 'Marketing',
    desc: 'Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.',
    img: 'https://www.figma.com/api/mcp/asset/3e81e575-11b4-4b2a-90cb-061aea100e55',
    imgPosition: 'object-center',
  },
  {
    num: '[ 4 ]',
    title: 'Photography',
    desc: 'Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.',
    img: 'https://www.figma.com/api/mcp/asset/b933de53-9ddc-45a6-ac6d-20a7e1750d30',
    imgPosition: 'object-bottom',
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-black px-4 py-12 flex flex-col gap-8 md:px-8 md:py-[80px] md:gap-12">

      {/* [ services ] label */}
      <p className="font-mono text-[14px] text-white uppercase leading-[1.1]">
        [ services ]
      </p>

      {/* [4]  Deliverables heading */}
      <div className="flex items-center justify-between w-full">
        <span className="font-light text-white uppercase tracking-[-0.08em] leading-none text-[8.5vw] md:text-[6.67vw]">
          [4]
        </span>
        <span className="font-light text-white uppercase tracking-[-0.08em] leading-none text-[8.5vw] md:text-[6.67vw]">
          Deliverables
        </span>
      </div>

      {/* Service items */}
      <div className="flex flex-col gap-12 w-full">
        {services.map((s) => (
          <div key={s.num} className="flex flex-col gap-[9px] w-full">

            {/* Number + divider */}
            <p className="font-mono text-[14px] text-white uppercase leading-[1.1]">
              {s.num}
            </p>
            <div className="h-px w-full bg-white/25" />

            {/* Content: title left, description+image right on desktop; stacked on mobile */}
            <div className="flex flex-col gap-4 pt-[9px] lg:flex-row lg:items-start lg:justify-between">
              <p className="text-[36px] font-bold italic text-white uppercase tracking-[-0.04em] leading-[1.1] whitespace-nowrap">
                {s.title}
              </p>
              <div className="flex flex-col gap-4 lg:flex-row lg:gap-6 lg:items-start">
                <p className="text-[14px] text-white leading-[1.3] tracking-[-0.04em] lg:w-[393px]">
                  {s.desc}
                </p>
                {/* 151×151 thumbnail — 1:1 aspect ratio maintained */}
                <div className="relative w-[151px] h-[151px] shrink-0 overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.title}
                    className={`absolute inset-0 w-full h-full object-cover ${s.imgPosition}`}
                  />
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
