const base = import.meta.env.BASE_URL;

export default function Slide2() {
  return (
    <div className="paper relative h-screen w-screen overflow-hidden text-[#2e2e2e]">
      <div className="absolute left-0 top-0 h-[1.2vh] w-full bg-[#345e40]" />
      <div className="absolute bottom-[-13vw] left-[-9vw] h-[34vw] w-[34vw] rounded-full border-[0.13vw] border-[#97a483]/40" />
      <div className="grid h-full grid-cols-[1.08fr_0.92fr] gap-[6vw] px-[8vw] py-[10vh]">
        <div className="flex flex-col justify-center text-right">
          <div className="rule mb-[3vh] mr-0" />
          <h2 className="display text-[4.4vw] font-bold leading-[1.12] text-[#345e40]">لماذا مخيم الأقصى؟</h2>
          <div className="mt-[6vh] space-y-[3.2vh]">
            <p className="arabic border-r-[0.28vw] border-[#d4bb49] pr-[1.5vw] text-[2.15vw] font-medium leading-[1.45]">
              الحياة اليومية للنازحين تحتاج إلى أكثر من استجابة مؤقتة
            </p>
            <p className="arabic border-r-[0.28vw] border-[#d4bb49] pr-[1.5vw] text-[2.15vw] font-medium leading-[1.45]">
              المساعدة الفعّالة تبدأ بفهم الاحتياج وتنسيق الجهود
            </p>
            <p className="arabic border-r-[0.28vw] border-[#d4bb49] pr-[1.5vw] text-[2.15vw] font-medium leading-[1.45]">
              نخفف العبء اليومي ونيسّر الوصول إلى المساعدات الإنسانية
            </p>
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="absolute -right-[2vw] top-[8vh] h-[52vh] w-[31vw] rounded-[1.6vw] bg-[#97a483]/30" />
          <div className="relative h-[64vh] w-[34vw] overflow-hidden rounded-[1.6vw]">
            <img
              src={`${base}cover-camp.jpg`}
              crossOrigin="anonymous"
              alt="لقطة إنسانية هادئة لمخيم وعائلة"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#203b2a]/60 via-transparent to-transparent" />
            <div className="absolute bottom-[4vh] right-[2.5vw] left-[2.5vw] h-[0.35vh] bg-[#d4bb49]" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-[5vh] left-[8vw] text-[1.5vw] text-[#66736a]">02 / 09</div>
    </div>
  );
}