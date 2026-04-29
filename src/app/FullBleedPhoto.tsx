const photo = 'https://www.figma.com/api/mcp/asset/09b65b35-a764-4f14-b044-3deda445b2d3';

export default function FullBleedPhoto() {
  return (
    // Mobile: 3:4 portrait crop. Desktop: 1440×900 = 8:5 landscape (fixed 900px).
    <section className="relative w-full overflow-hidden aspect-[3/4] md:aspect-auto md:h-[900px]">
      <img
        src={photo}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      />
    </section>
  );
}
