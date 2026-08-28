export default function Slide9() {
  return (
    <div className="deep relative h-screen w-screen overflow-hidden text-[#fbf8ed]">
      <div className="absolute right-[-12vw] top-[-16vw] h-[43vw] w-[43vw] rounded-full border-[0.15vw] border-[#d4bb49]/30" />
      <div className="absolute bottom-[-18vw] left-[-9vw] h-[40vw] w-[40vw] rounded-full border-[0.15vw] border-[#97a483]/25" />
      <div className="relative z-10 flex h-full flex-col justify-center px-[8vw] text-right">
        <div className="rule mb-[4vh] mr-0" />
        <h2 className="display max-w-[62vw] text-[5.3vw] font-bold leading-[1.05] text-[#f2e7b2]">كونوا جزءًا من النجاح</h2>
        <div className="mt-[5vh] grid max-w-[72vw] grid-cols-2 gap-x-[5vw] gap-y-[2vh]">
          <p className="arabic text-[2vw] leading-[1.45] text-[#fbf8ed]/85">شاركونا بناء استجابة أكثر إنسانية وتنظيمًا</p>
          <p className="arabic text-[2vw] leading-[1.45] text-[#fbf8ed]/85">ادعموا المأوى والغذاء والمياه والرعاية والتعليم</p>
          <p className="arabic text-[2vw] leading-[1.45] text-[#fbf8ed]/85">ساهموا في نشر قصص الصمود والإنجاز</p>
          <p className="arabic text-[2vw] leading-[1.45] text-[#fbf8ed]/85">تواصلوا معنا لمعرفة كيفية تقديم الدعم والمساعدة</p>
        </div>
        <div className="mt-[7vh] flex items-center gap-[2vw] text-[1.7vw] text-[#f2e7b2]">
          <span className="arabic">مخيم الأقصى — غزة</span>
          <span className="h-[2.5vh] w-[0.15vw] bg-[#d4bb49]" />
          <span className="arabic">تواصل معنا</span>
          <span className="h-[2.5vh] w-[0.15vw] bg-[#d4bb49]" />
          <span className="arabic">تابعنا على وسائل التواصل الاجتماعي</span>
        </div>
      </div>
      <div className="absolute bottom-[6vh] left-[8vw] text-[1.5vw] tracking-[0.18em] text-[#fbf8ed]/50">AL-AQSA CAMP / 09</div>
    </div>
  );
}