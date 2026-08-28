export default function Slide4() {
  return (
    <div className="paper relative h-screen w-screen overflow-hidden text-[#2e2e2e]">
      <div className="absolute right-0 top-0 h-full w-[1vw] bg-[#345e40]" />
      <div className="absolute left-[-13vw] top-[-13vw] h-[38vw] w-[38vw] rounded-full bg-[#97a483]/20" />
      <div className="relative flex h-full flex-col px-[8vw] py-[9vh] text-right">
        <div className="flex items-end justify-between">
          <div>
            <div className="rule mb-[3vh] mr-0" />
            <h2 className="display text-[4.1vw] font-bold leading-[1.1] text-[#345e40]">منظومة واحدة لخدمة المجتمع</h2>
          </div>
          <div className="pb-[1vh] text-[1.5vw] tracking-[0.18em] text-[#66736a]">ECOSYSTEM / 04</div>
        </div>
        <div className="mt-[6vh] grid flex-1 grid-cols-3 grid-rows-2 gap-[1.4vw]">
          <div className="flex flex-col justify-between bg-[#345e40] p-[2.2vw] text-[#fbf8ed]">
            <span className="text-[3vw] font-bold text-[#d4bb49]">01</span>
            <p className="arabic text-[2vw] font-bold leading-[1.4]">النازحون: الوصول إلى الملف الشخصي والمساعدات المستلمة وتقديم الشكاوى</p>
          </div>
          <div className="flex flex-col justify-between bg-[#e6e6d4] p-[2.2vw]">
            <span className="text-[3vw] font-bold text-[#345e40]">02</span>
            <p className="arabic text-[2vw] font-bold leading-[1.4] text-[#345e40]">المندوبون: إدارة المساعدات، إضافة المستفيدين، رفع التقارير ومتابعة الشكاوى</p>
          </div>
          <div className="flex flex-col justify-between bg-[#d4bb49]/35 p-[2.2vw]">
            <span className="text-[3vw] font-bold text-[#345e40]">03</span>
            <p className="arabic text-[2vw] font-bold leading-[1.4] text-[#345e40]">المديرون: إدارة البرامج والمساعدات والمحتوى والتقارير</p>
          </div>
          <div className="flex flex-col justify-between border-[0.12vw] border-[#97a483] bg-[#fbf8ed] p-[2.2vw]">
            <span className="text-[3vw] font-bold text-[#97a483]">04</span>
            <p className="arabic text-[2vw] font-bold leading-[1.4] text-[#345e40]">رجال الأمن: تنفيذ المهام، الملف الشخصي، ومتابعة الشكاوى</p>
          </div>
          <div className="col-span-2 flex flex-col justify-between bg-[#97a483] p-[2.2vw] text-[#203b2a]">
            <span className="text-[3vw] font-bold text-[#f2e7b2]">05</span>
            <p className="arabic max-w-[50vw] text-[2vw] font-bold leading-[1.4]">الشركاء والداعمون: متابعة المدونة وقصص النجاح والتواصل معنا</p>
          </div>
        </div>
      </div>
    </div>
  );
}