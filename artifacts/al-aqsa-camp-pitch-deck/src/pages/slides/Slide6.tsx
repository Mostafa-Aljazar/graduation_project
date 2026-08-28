export default function Slide6() {
  return (
    <div className="paper relative h-screen w-screen overflow-hidden text-[#2e2e2e]">
      <div className="absolute left-0 top-0 h-full w-[1vw] bg-[#97a483]" />
      <div className="relative flex h-full flex-col px-[8vw] py-[9vh] text-right">
        <div className="flex items-end justify-between">
          <div>
            <div className="rule mb-[3vh] mr-0" />
            <h2 className="display text-[4.1vw] font-bold leading-[1.1] text-[#345e40]">كيف تتحول الحاجة إلى استجابة؟</h2>
          </div>
          <div className="pb-[1vh] text-[1.5vw] tracking-[0.18em] text-[#66736a]">FLOW / 06</div>
        </div>
        <div className="relative mt-[10vh] flex items-start justify-between">
          <div className="absolute right-[4vw] left-[4vw] top-[5.7vw] h-[0.35vh] bg-[#d4bb49]" />
          <div className="relative z-10 flex w-[13vw] flex-col items-center text-center">
            <div className="flex h-[11vw] w-[11vw] items-center justify-center rounded-full border-[0.45vw] border-[#345e40] bg-[#fbf8ed] text-[3vw] font-bold text-[#345e40]">01</div>
            <p className="arabic mt-[2.5vh] text-[2vw] font-bold leading-[1.4]">تسجيل النازح وبناء ملف احتياج واضح</p>
          </div>
          <div className="relative z-10 flex w-[13vw] flex-col items-center text-center">
            <div className="flex h-[11vw] w-[11vw] items-center justify-center rounded-full border-[0.45vw] border-[#345e40] bg-[#345e40] text-[3vw] font-bold text-[#f2e7b2]">02</div>
            <p className="arabic mt-[2.5vh] text-[2vw] font-bold leading-[1.4]">إدارة المساعدة وربطها بالمستفيدين</p>
          </div>
          <div className="relative z-10 flex w-[13vw] flex-col items-center text-center">
            <div className="flex h-[11vw] w-[11vw] items-center justify-center rounded-full border-[0.45vw] border-[#345e40] bg-[#fbf8ed] text-[3vw] font-bold text-[#345e40]">03</div>
            <p className="arabic mt-[2.5vh] text-[2vw] font-bold leading-[1.4]">متابعة ما تم استلامه وتسجيل الملاحظات</p>
          </div>
          <div className="relative z-10 flex w-[13vw] flex-col items-center text-center">
            <div className="flex h-[11vw] w-[11vw] items-center justify-center rounded-full border-[0.45vw] border-[#345e40] bg-[#345e40] text-[3vw] font-bold text-[#f2e7b2]">04</div>
            <p className="arabic mt-[2.5vh] text-[2vw] font-bold leading-[1.4]">استقبال الشكاوى والتعامل معها</p>
          </div>
          <div className="relative z-10 flex w-[13vw] flex-col items-center text-center">
            <div className="flex h-[11vw] w-[11vw] items-center justify-center rounded-full border-[0.45vw] border-[#345e40] bg-[#d4bb49] text-[3vw] font-bold text-[#345e40]">05</div>
            <p className="arabic mt-[2.5vh] text-[2vw] font-bold leading-[1.4]">مشاركة التقارير والقصص لبناء الثقة</p>
          </div>
        </div>
        <div className="mt-auto flex items-center justify-center gap-[1.5vw] text-[1.7vw] text-[#66736a]">
          <span>النازح</span><span className="text-[#d4bb49]">←</span><span>المندوب</span><span className="text-[#d4bb49]">←</span><span>المدير</span>
        </div>
      </div>
    </div>
  );
}