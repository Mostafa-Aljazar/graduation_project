export default function Slide8() {
  return (
    <div className="paper relative h-screen w-screen overflow-hidden text-[#2e2e2e]">
      <div className="absolute bottom-0 right-0 h-[1.2vh] w-full bg-[#345e40]" />
      <div className="relative flex h-full flex-col px-[8vw] py-[8vh] text-right">
        <div className="flex items-end justify-between">
          <div>
            <div className="rule mb-[3vh] mr-0" />
            <h2 className="display text-[4.1vw] font-bold leading-[1.1] text-[#345e40]">أثر نريد أن يتسع</h2>
          </div>
          <div className="pb-[1vh] text-[1.5vw] tracking-[0.18em] text-[#66736a]">IMPACT / 08</div>
        </div>
        <p className="arabic mt-[3vh] text-[2.35vw] font-bold text-[#66736a]">رغم التحديات إلا أننا مستمرون لنصنع فارق</p>
        <div className="mt-[6vh] grid grid-cols-4 gap-[1.5vw]">
          <div className="bg-[#345e40] p-[2vw] text-[#fbf8ed]">
            <div className="text-[5.7vw] font-bold leading-none text-[#f2e7b2]">5,200</div>
            <div className="arabic mt-[2vh] text-[2vw] font-bold">خيمة</div>
          </div>
          <div className="bg-[#97a483] p-[2vw] text-[#203b2a]">
            <div className="text-[5.7vw] font-bold leading-none text-[#fbf8ed]">5,200</div>
            <div className="arabic mt-[2vh] text-[2vw] font-bold">طفل</div>
          </div>
          <div className="bg-[#d4bb49]/55 p-[2vw] text-[#345e40]">
            <div className="text-[5.7vw] font-bold leading-none">42,300</div>
            <div className="arabic mt-[2vh] text-[2vw] font-bold">عائلة</div>
          </div>
          <div className="bg-[#e6e6d4] p-[2vw] text-[#345e40]">
            <div className="text-[5.7vw] font-bold leading-none">1,200</div>
            <div className="arabic mt-[2vh] text-[2vw] font-bold">مصاب</div>
          </div>
        </div>
        <p className="arabic mt-auto max-w-[72vw] border-r-[0.3vw] border-[#d4bb49] pr-[2vw] text-[2vw] leading-[1.55] text-[#345e40]">
          اليوم، نعمل على تقديم مساعدات منقذة للحياة لألاف الأشخاص الذين يعيشون على حافة البقاء على قيد الحياة.
        </p>
      </div>
    </div>
  );
}