export default function Slide7() {
  return (
    <div className="paper relative h-screen w-screen overflow-hidden text-[#2e2e2e]">
      <div className="absolute right-0 top-0 h-full w-[37vw] bg-[#345e40]" />
      <div className="absolute bottom-[-12vw] right-[21vw] h-[32vw] w-[32vw] rounded-full border-[0.15vw] border-[#d4bb49]/30" />
      <div className="relative z-10 grid h-full grid-cols-[0.92fr_1.08fr] px-[8vw] py-[10vh]">
        <div className="flex flex-col justify-center text-right">
          <div className="rule mb-[4vh] mr-0" />
          <h2 className="display max-w-[30vw] text-[5vw] font-bold leading-[1.05] text-[#345e40]">الشفافية جزء من الإغاثة</h2>
        </div>
        <div className="flex flex-col justify-center gap-[2.4vh] pr-[5vw] text-right">
          <p className="arabic border-b-[0.1vw] border-[#f2e7b2]/35 pb-[2.2vh] text-[2.15vw] font-bold text-[#fbf8ed]">تقارير ومتابعة على مستوى المندوب والمدير</p>
          <p className="arabic border-b-[0.1vw] border-[#f2e7b2]/35 pb-[2.2vh] text-[2.15vw] font-bold text-[#fbf8ed]">إشعارات تساعد الفرق على البقاء على اطلاع</p>
          <p className="arabic border-b-[0.1vw] border-[#f2e7b2]/35 pb-[2.2vh] text-[2.15vw] font-bold text-[#fbf8ed]">شكاوى ظاهرة في مسارات المستخدمين المعنيين</p>
          <p className="arabic border-b-[0.1vw] border-[#f2e7b2]/35 pb-[2.2vh] text-[2.15vw] font-bold text-[#fbf8ed]">مدونة وقصص نجاح تنقل النشاطات والإنجازات</p>
          <p className="arabic text-[2.15vw] font-bold text-[#fbf8ed]">تواصل مباشر مع المجتمع والداعمين</p>
        </div>
      </div>
      <div className="absolute bottom-[5vh] left-[8vw] text-[1.5vw] text-[#66736a]">07 / 09</div>
    </div>
  );
}