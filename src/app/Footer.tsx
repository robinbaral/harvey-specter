const socials = ['Facebook', 'Instagram', 'X.com', 'Linkedin'];

export default function Footer() {
  return (
    <footer className="bg-black pt-12 px-4 md:px-8">

      {/* ── Mobile ──────────────────────────────────────────── */}
      <div className="md:hidden flex flex-col gap-12">

        {/* CTA + socials + divider */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <p className="text-white text-[24px] font-light italic leading-[1.1] tracking-[-0.04em] uppercase">
              Have a <span className="font-black not-italic">project</span> in mind?
            </p>
            <button className="self-start border border-white text-white text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-full cursor-pointer hover:bg-white hover:text-black transition-colors">
              Let&apos;s talk
            </button>
            <div className="flex flex-col gap-4 mt-2">
              {socials.map((s) => (
                <a key={s} href="#" className="text-white text-[18px] tracking-[-0.04em] uppercase leading-[1.1] hover:opacity-60 transition-opacity">
                  {s}
                </a>
              ))}
            </div>
          </div>
          <div className="h-px w-full bg-white/30" />
        </div>

        {/* Bottom: legal + logotype */}
        <div className="flex flex-col gap-4 pb-0">
          <div className="flex gap-8">
            <a href="#" className="text-white text-[12px] uppercase underline tracking-[-0.04em]">Licences</a>
            <a href="#" className="text-white text-[12px] uppercase underline tracking-[-0.04em]">Privacy Policy</a>
          </div>
          <p className="font-mono text-white text-[10px] uppercase leading-[1.1]">
            [ Coded By Claude ]
          </p>
          {/* Logotype clipped at section edge */}
          <div className="overflow-hidden -mx-4">
            <p className="text-white font-semibold capitalize text-[24.38vw] leading-[0.8] tracking-[-0.06em] whitespace-nowrap px-4">
              H.Studio
            </p>
          </div>
        </div>

      </div>

      {/* ── Desktop ─────────────────────────────────────────── */}
      <div className="hidden md:flex flex-col gap-[120px]">

        {/* Top: 3-col row + divider */}
        <div className="flex flex-col gap-12">
          <div className="flex items-start justify-between">

            {/* CTA */}
            <div className="flex flex-col gap-3 w-[298px] shrink-0">
              <p className="text-white text-[24px] font-light italic leading-[1.1] tracking-[-0.04em] uppercase">
                Have a <span className="font-black not-italic">project</span> in mind?
              </p>
              <button className="self-start border border-white text-white text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-full cursor-pointer hover:bg-white hover:text-black transition-colors">
                Let&apos;s talk
              </button>
            </div>

            {/* Social — center column */}
            <div className="text-white text-[18px] text-center tracking-[-0.04em] uppercase w-[298px] shrink-0">
              <p className="leading-[1.1]">Facebook</p>
              <p className="leading-[1.1]">Instagram</p>
            </div>

            {/* Social — right column */}
            <div className="text-white text-[18px] text-right tracking-[-0.04em] uppercase w-[298px] shrink-0">
              <p className="leading-[1.1]">X.com</p>
              <p className="leading-[1.1]">Linkedin</p>
            </div>

          </div>
          <div className="h-px w-full bg-white/30" />
        </div>

        {/* Bottom: logotype + legal */}
        <div className="flex items-end justify-between">

          {/* H.Studio logotype block */}
          <div className="relative h-[219px] flex-1 overflow-hidden">

            {/* [ Coded By Claude ] — rotated –90°, far left */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-[15px] h-[160px]">
              <div className="-rotate-90 whitespace-nowrap">
                <p className="font-mono text-white text-[14px] uppercase leading-[1.1]">
                  [ Coded By Claude ]
                </p>
              </div>
            </div>

            {/* Logotype — shifted down 6.5px so top of letters sits at container top edge */}
            <div className="absolute -translate-y-1/2 left-0 right-0" style={{ top: 'calc(50% + 6.5px)' }}>
              <p className="text-white font-semibold capitalize leading-[0.8] tracking-[-0.06em] whitespace-nowrap text-[290px]">
                H.Studio
              </p>
            </div>

          </div>

          {/* Legal links — bottom right */}
          <div className="flex gap-[34px] items-center pb-8 shrink-0 ml-8">
            <a href="#" className="text-white text-[12px] uppercase underline tracking-[-0.04em] hover:opacity-60 transition-opacity">
              Licences
            </a>
            <a href="#" className="text-white text-[12px] uppercase underline tracking-[-0.04em] hover:opacity-60 transition-opacity">
              Privacy Policy
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
}
