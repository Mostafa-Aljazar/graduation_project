import articleResponse from '@/@types/articleResponse.type';
import successStoryResponse from '@/@types/successStoryResponse.type';
import { home_child, img_1, img_2, img_3 } from '@/assets/home';

// HERO

export const HERO_TITLE = 'قيمُنا :';
export const HERO_DESCRIPTION =
  'الإنسانية , الشفافية . الجودة , الحيادية ,العمل التطوعي , التنمية المستدامة';
export const HERO_IMAGES = [img_1, img_2, img_3];

// OUR_BLOG
export const OUR_BLOG_TITLE = 'مدونتنا :';
// export const OUR_BLOG_IMAGE = img_1;
// export const OUR_BLOG_DATE = 'الخميس, 30 مايو 2024';
// export const OUR_BLOG_TITLE = 'الصعوبات التي يواجهها النازحون في الخيام؟';
// export const OUR_BLOG_DESC = 'يواجه  النازحون في الخيام  تحديات يومية تجعل حياتهم مليئة بالمعاناة. من الظروف البيئية القاسية إلى نقص الخدمات الأساسية، ومن المشكلات الصحية إلى التحديات الاقتصادية والاجتماعية، فإن حياة النازحين تحتاج إلى تدخلات عاجلة ومستدامة  و ...';
// export const OUR_BLOG_LINK = 'blog/1';

// ARTICLES
export const ARTICLES_TITLE_ANOTHER = 'مقالات أخرى :';

export const ARTICLE_EXAMPLE: articleResponse = {
  id: '1',
  title: 'الصعوبات التي يواجهها النازحون في الخيام؟',
  brief: 'الصعوبات التي يواجهها النازحون في الخيام؟',
  content: `
  <div class="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h1 class="text-4xl text-center text-gray-800 border-b-2 border-blue-500 pb-4 mb-10">
      المصادر والمراجع العامة
    </h1>

    <div class="mb-8">
      <p class="text-lg text-gray-700 text-justify leading-relaxed">
        يتضمن هذا القسم قائمة بالمصادر والمراجع التي تم الاستناد إليها في إعداد هذا العمل. تشمل هذه المصادر الكتب، المقالات العلمية، المواقع الإلكترونية، والدراسات السابقة التي ساهمت في صياغة المحتوى ودعم الأفكار المطروحة.
      </p>
    </div>

    <div class="mb-8">
      <h2 class="text-2xl text-blue-600 mb-4">1. المقالات العلمية</h2>
      <p class="text-lg text-gray-700 text-justify leading-relaxed">
        - أحمد، محمد. (2020). "تأثير التكنولوجيا على التعليم في العالم العربي". مجلة الدراسات التربوية، المجلد 15، العدد 3، ص 45-60.<br>
        - سالم، خالد. (2019). "تحليل السياسات التعليمية في الدول النامية". مجلة البحوث الأكاديمية، المجلد 10، العدد 2، ص 120-135.
      </p>
    </div>

    <div class="mb-8">
      <h2 class="text-2xl text-blue-600 mb-4">2. الكتب</h2>
      <p class="text-lg text-gray-700 text-justify leading-relaxed">
        - الخالدي، عبد الله. (2018). *التعليم في العصر الرقمي: التحديات والفرص*. الرياض: دار النشر العربية.<br>
        - الصغير، ليلى. (2021). *استراتيجيات التعليم الحديثة*. القاهرة: مكتبة الأنجلو المصرية.
      </p>
    </div>

    <div class="mb-8">
      <h2 class="text-2xl text-blue-600 mb-4">3. المواقع الإلكترونية</h2>
      <p class="text-lg text-gray-700 text-justify leading-relaxed">
        - منظمة اليونسكو. (2023). "تقرير التعليم العالمي 2023". متاح على: www.unesco.org.<br>
        - مركز البحوث التربوية. (2022). "إحصاءات التعليم في الوطن العربي". متاح على: www.eduresearch.org.
      </p>
    </div>

    <div class="mb-8">
      <h2 class="text-2xl text-blue-600 mb-4">4. الدراسات السابقة</h2>
      <p class="text-lg text-gray-700 text-justify leading-relaxed">
        - دراسة أجرتها جامعة الملك سعود (2021). "تقييم الأداء التعليمي في المدارس الحكومية".<br>
        - بحث مقدم في مؤتمر التعليم الدولي (2020). "دور التكنولوجيا في تحسين جودة التعليم".
      </p>
    </div>
  </div>
`,
  image:
    'https://nbrdqfucz2.ufs.sh/f/PCSTGU6DUS94IG816rCYcRDMP0JG93E2lV7IBpoSgbUkrNQC',
  createdAt: new Date(Date.now()),
  updatedAt: new Date(Date.now()),
};

export const SUCCESS_STORY_EXAMPLE: successStoryResponse = {
  id: '1',
  title: 'خالد ورحلة التعلم',
  content: `
<div class="max-w-7xl mx-auto bg-white rounded-2xl">


  <div class="mb-10">
    <p class="text-xl text-gray-700 text-right leading-loose">
      خالد، شابٌ في الثالثة والعشرين من عمره، يجسد قوة الإرادة والصبر. رغم التحديات الصعبة التي يواجهها، بما فيها الإعاقة الجسدية والعقلية، وقيود اجتماعية تعيق وصوله إلى الفرص التعليمية، إلا أن خالد لم يسمح لأي عائق أن يقف بينه وبين حلمه.
    </p>
  </div>

  <div class="mb-10">
    <p class="text-xl text-gray-700 text-right leading-loose">
      يوميًا، يستعد خالد لرحلته الشاقة نحو إحدى مساحات العمل المشتركة. رحلة قد تبدو بسيطة لغيره، لكنها بالنسبة له مغامرة حقيقية، مليئة بالتحديات اليومية: عبور الحفر العميقة، تفادي مستنقعات مياه الصرف، وتخطي طرق محفوفة بكارات الحمير وعراقيل الحياة اليومية.
    </p>
  </div>

  <div class="mb-10">
    <p class="text-xl text-gray-700 text-right leading-loose">
      وعلى الرغم من كل ذلك، يصل خالد بابتسامته المعهودة، وطاقته التي تلهم كل من حوله. في مساحة العمل، لا يختلف عن زملائه في الجامعة؛ يشاركهم الطموح، الاجتهاد، والأمل. يتعلم، يتفاعل، ويثبت في كل يوم أن التحديات قد تعيق الجسد لكنها لا تكسر الروح.
    </p>
  </div>

  <div class="mb-10">
    <p class="text-xl text-gray-700 text-right leading-loose">
      قصة خالد ليست مجرد قصة طالب يتحدى الظروف، بل قصة إنسان يؤمن بأن التعليم هو مفتاح الحياة الأفضل، وأن الإصرار يمكن أن يحطم أصعب القيود. خالد اليوم هو رمز حي للأمل والصمود، ودعوة مفتوحة لكل من يعتقد أن الطريق مستحيل.
    </p>
  </div>
</div>
`,
  img:
    // 'https://nbrdqfucz2.ufs.sh/f/PCSTGU6DUS94IG816rCYcRDMP0JG93E2lV7IBpoSgbUkrNQC',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
  createdAt: new Date(),
};
