export default function Slide5() {
  return (
    <div className="paper relative h-screen w-screen overflow-hidden text-[#2e2e2e]">
      <div className="absolute bottom-0 left-0 h-[1.2vh] w-full bg-[#d4bb49]" />
      <div className="relative flex h-full flex-col px-[8vw] py-[8vh] text-right">
        <div className="flex items-end justify-between">
          <div>
            <div className="rule mb-[3vh] mr-0" />
            <h2 className="display text-[4.1vw] font-bold leading-[1.1] text-[#345e40]">الإغاثة والخدمات الأساسية</h2>
          </div>
          <div className="pb-[1vh] text-[1.5vw] tracking-[0.18em] text-[#66736a]">SERVICES / 05</div>
        </div>
        <div className="mt-[5vh] grid flex-1 grid-cols-3 grid-rows-2 gap-[1.4vw]">
          <div className="border-t-[0.4vh] border-[#345e40] bg-[#fbf8ed] p-[2vw]">
            <div className="text-[3.2vw] text-[#d4bb49]">01</div>
            <h3 className="arabic mt-[1.5vh] text-[2.2vw] font-bold text-[#345e40]">المأوى</h3>
            <p className="arabic mt-[1vh] text-[2vw] leading-[1.4]">مساحات آمنة تضمن الحماية والخصوصية</p>
          </div>
          <div className="border-t-[0.4vh] border-[#345e40] bg-[#e6e6d4] p-[2vw]">
            <div className="text-[3.2vw] text-[#d4bb49]">02</div>
            <h3 className="arabic mt-[1.5vh] text-[2.2vw] font-bold text-[#345e40]">الغذاء والمياه</h3>
            <p className="arabic mt-[1vh] text-[2vw] leading-[1.4]">وجبات متكاملة ومياه نظيفة</p>
          </div>
          <div className="border-t-[0.4vh] border-[#345e40] bg-[#d4bb49]/30 p-[2vw]">
            <div className="text-[3.2vw] text-[#345e40]">03</div>
            <h3 className="arabic mt-[1.5vh] text-[2.2vw] font-bold text-[#345e40]">الرعاية الصحية</h3>
            <p className="arabic mt-[1vh] text-[2vw] leading-[1.4]">خدمات طبية وعلاجات مجانية</p>
          </div>
          <div className="border-t-[0.4vh] border-[#345e40] bg-[#97a483]/40 p-[2vw]">
            <div className="text-[3.2vw] text-[#345e40]">04</div>
            <h3 className="arabic mt-[1.5vh] text-[2.2vw] font-bold text-[#345e40]">الدعم النفسي والاجتماعي</h3>
            <p className="arabic mt-[1vh] text-[2vw] leading-[1.4]">برامج دعم وأنشطة ترفيهية</p>
          </div>
          <div className="border-t-[0.4vh] border-[#345e40] bg-[#345e40] p-[2vw] text-[#fbf8ed]">
            <div className="text-[3.2vw] text-[#d4bb49]">05</div>
            <h3 className="arabic mt-[1.5vh] text-[2.2vw] font-bold text-[#f2e7b2]">التعليم</h3>
            <p className="arabic mt-[1vh] text-[2vw] leading-[1.4] text-[#fbf8ed]/85">مدارس مؤقتة وبرامج ومهارات جديدة</p>
          </div>
          <div className="border-t-[0.4vh] border-[#345e40] bg-[#203b2a] p-[2vw] text-[#fbf8ed]">
            <div className="text-[3.2vw] text-[#d4bb49]">06</div>
            <p className="arabic mt-[4.5vh] text-[2vw] font-bold leading-[1.4] text-[#f2e7b2]">الإنترنت والتكنولوجيا، الإسعافات الأولية، والتوعية الصحية</p>
          </div>
        </div>
      </div>
    </div>
  );
}