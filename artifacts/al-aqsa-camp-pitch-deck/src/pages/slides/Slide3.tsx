export default function Slide3() {
  return (
    <div className="deep relative h-screen w-screen overflow-hidden text-[#fbf8ed]">
      <div className="grain absolute inset-0 opacity-40" />
      <div className="absolute right-[-11vw] top-[-18vw] h-[42vw] w-[42vw] rounded-full border-[0.15vw] border-[#d4bb49]/25" />
      <div className="absolute bottom-[-22vw] left-[-8vw] h-[48vw] w-[48vw] rounded-full border-[0.15vw] border-[#97a483]/25" />
      <div className="relative z-10 flex h-full flex-col justify-center px-[8vw] text-right">
        <div className="rule mb-[4vh] mr-0" />
        <h2 className="display text-[4.5vw] font-bold leading-[1.1] text-[#f2e7b2]">رسالتنا وهدفنا</h2>
        <div className="mt-[7vh] grid grid-cols-[1fr_1fr] gap-[7vw]">
          <div className="border-r-[0.18vw] border-[#d4bb49]/70 pr-[3vw]">
            <p className="display text-[3.2vw] font-bold leading-[1.3] text-[#fbf8ed]">
              نسعى لخلق الحياة لأناسٍ سُلبت منهم الحياة
            </p>
            <p className="arabic mt-[3vh] text-[2vw] leading-[1.55] text-[#fbf8ed]/75">
              نمنح الأطفال طفولة بريئة وعيونًا تبحث عن الأمل
            </p>
          </div>
          <div className="flex flex-col justify-end">
            <p className="arabic text-[2.2vw] font-bold leading-[1.45] text-[#f2e7b2]">
              مؤسسة مستقلة غير ربحية تأسست عام 2025م
            </p>
            <p className="arabic mt-[3vh] text-[2vw] leading-[1.55] text-[#fbf8ed]/75">
              نعمل على تنفيذ مشاريع إغاثية وتنموية في قطاع غزة المحاصر
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[5vh] right-[8vw] text-[1.5vw] tracking-[0.18em] text-[#fbf8ed]/50">MISSION / 03</div>
    </div>
  );
}