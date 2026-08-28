const base = import.meta.env.BASE_URL;

export default function Slide1() {
  return (
    <div className="deep relative h-screen w-screen overflow-hidden text-[#fbf8ed]">
      <div className="absolute inset-y-0 right-0 w-[53vw] overflow-hidden">
        <img
          src={`${base}cover-camp.jpg`}
          crossOrigin="anonymous"
          alt="مخيم وعائلات"
          className="h-full w-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#203b2a]/35 to-[#203b2a]" />
      </div>
      <div className="absolute -left-[8vw] -top-[14vh] h-[44vw] w-[44vw] rounded-full border-[0.12vw] border-[#d4bb49]/30" />
      <div className="absolute -left-[4vw] -top-[10vh] h-[36vw] w-[36vw] rounded-full border-[0.12vw] border-[#d4bb49]/20" />
      <div className="relative z-10 flex h-full w-[58vw] flex-col justify-center px-[8vw] text-right">
        <div className="rule mb-[4vh] mr-0" />
        <h1 className="display max-w-[48vw] text-[6.2vw] font-bold leading-[1.05] tracking-tight text-[#fbf8ed]">
          مخيم الأقصى للإغاثة والتنمية
        </h1>
        <p className="arabic mt-[4vh] max-w-[39vw] text-[2.45vw] font-bold leading-[1.45] text-[#f2e7b2]">
          نحوّل الأمل إلى واقع بإنسانية وشفافية
        </p>
        <p className="arabic mt-[2vh] max-w-[38vw] text-[2vw] leading-[1.65] text-[#fbf8ed]/80">
          منصة رقمية تربط الإغاثة بالإنسان، وتدعم مجتمعًا نابضًا بالحياة.
        </p>
      </div>
      <div className="absolute bottom-[6vh] right-[8vw] text-[1.5vw] tracking-[0.18em] text-[#fbf8ed]/60">
        AL-AQSA CAMP
      </div>
    </div>
  );
}