/* Усі тексти сайту — в одному місці.
   Щоб виправити слово, шукай його тут, а не в index.html.
   uk — українська, en — англійська. */

window.T = {
  uk: {
    nav_works:'Роботи', nav_video:'Відео', nav_about:'Про',
    nav_legacy:'Legacy', nav_order:'Замовити', nav_contacts:'Контакти',
    cta:'Написати',

    hero_l2:'Райтер',
    hero_role:'Старий райтер. Graffiti director.',
    hero_desc:'Стіни, потяги, мурали для бізнесу — і зйомка того, як лінія лягає.',
    stat_m:'млн', stat_k:'тис.', stat_subs_n:'45,6',
    title:'BIOS — графіті, мурали, відео. Одеса',
    stat_views:'переглядів у одного відео',
    stat_subs:'підписників в Instagram',
    stat_posts:'публікація в архіві',
    stat_shop:'рік, коли відкрив «Вуличний»',

    works_title:'Роботи',
    works_note:'Вибране з архіву: закінчені шматки й кадри процесу.',
    works_more:'Більше в Instagram',

    video_title:'Відео',
    video_lead:'Він знімає графіті від першої особи — руку, балончик і мить, коли фарба торкається поверхні. Ці відео збирають десятки мільйонів переглядів.',
    video_body:'Зйомка процесу — окрема послуга: для брендів, фестивалів і власних проєктів. Матеріал підходить і для реклами, і для соцмереж.',
    cap_views:'переглядів',

    about_title:'Про',
    about_big:'Борис Біосов. Одеса. Понад <em>20 років</em> під тегом BIOS — один із найвідоміших псевдонімів української графіті-сцени.',
    about_crews_l:'крюї',
    about_where_l:'де бачили',
    about_where:'Публікації в блозі Montana&nbsp;Cans, виїзди в Польщу, лекція «Графіті від першого лиця» в артцентрі «Я&nbsp;Галерея» Павла Гудімова.',
    about_now_l:'зараз',
    about_now:'Малює, знімає, тримає графіті-шоп у центрі Одеси й видає журнал про українське графіті.',

    legacy_title:'Не тільки стіни',
    card_mag:'журнал', card_shop:'шоп',
    legacy_text:'Перший український журнал про графіті. 88 сторінок, наклад 600 примірників, сцена 2020 — початку 2021. Разом із Євгеном Шиловим і Олександром Магулою.',
    shop_text:'Графіті-шоп у центрі Одеси, працює з 2017 року. Фарба, маркери, кепи, одяг. Соборна площа, 6.',

    order_title:'Замовити',
    srv1_t:'Мурали й фасади', srv1_d:'Великі формати на стінах будівель.',
    srv2_t:'Оформлення приміщень', srv2_d:'Заклади, офіси, шоуруми, спортзали.',
    srv3_t:'Брендові активації', srv3_d:'Розпис на подіях, вітринах, мерчі.',
    srv4_t:'Зйомка процесу', srv4_d:'Відео від першої особи для реклами й соцмереж.',
    order_cta:'Написати про проєкт',

    contacts_title:'Контакти',
    foot:'[ Одеса, Україна · BIOS ]',
    marquee:['Graffiti','Мурали','Потяги','Відео','Одеса','Lettering']
  },

  en: {
    nav_works:'Work', nav_video:'Video', nav_about:'About',
    nav_legacy:'Legacy', nav_order:'Commission', nav_contacts:'Contact',
    cta:'Get in touch',

    hero_l2:'Writer',
    hero_role:'Old writer. Graffiti director.',
    hero_desc:'Walls, trains, murals for business — and the film of the line going down.',
    stat_m:'m', stat_k:'k', stat_subs_n:'45.6',
    title:'BIOS — graffiti, murals, video. Odesa',
    stat_views:'views on a single video',
    stat_subs:'followers on Instagram',
    stat_posts:'posts in the archive',
    stat_shop:'the year he opened Vulychnyi',

    works_title:'Work',
    works_note:'Selected from the archive: finished pieces and frames from the process.',
    works_more:'More on Instagram',

    video_title:'Video',
    video_lead:'He films graffiti in first person — the hand, the can and the moment paint meets the surface. These clips pull tens of millions of views.',
    video_body:'Filming the process is a service of its own: for brands, festivals and his own projects. The footage works for ads and for social.',
    cap_views:'views',

    about_title:'About',
    about_big:'Borys Biosov. Odesa. Over <em>20 years</em> under the tag BIOS — one of the best-known names on the Ukrainian graffiti scene.',
    about_crews_l:'crews',
    about_where_l:'seen at',
    about_where:'Featured on the Montana&nbsp;Cans blog, painting trips to Poland, a lecture «Graffiti first hand» at Pavlo Gudimov&rsquo;s Ya&nbsp;Gallery art centre.',
    about_now_l:'now',
    about_now:'Painting, filming, running a graffiti shop in central Odesa and publishing a magazine about Ukrainian graffiti.',

    legacy_title:'Not only walls',
    card_mag:'magazine', card_shop:'shop',
    legacy_text:'The first Ukrainian magazine about graffiti. 88 pages, 600 copies, covering the scene from 2020 to early 2021. Made with Yevhen Shylov and Oleksandr Mahula.',
    shop_text:'A graffiti shop in central Odesa, open since 2017. Paint, markers, caps, clothing. 6 Soborna Square.',

    order_title:'Commission',
    srv1_t:'Murals and facades', srv1_d:'Large formats on building walls.',
    srv2_t:'Interiors', srv2_d:'Venues, offices, showrooms, gyms.',
    srv3_t:'Brand activations', srv3_d:'Live painting at events, on windows, on merch.',
    srv4_t:'Filming the process', srv4_d:'First-person video for ads and social media.',
    order_cta:'Tell him about the project',

    contacts_title:'Contact',
    foot:'[ Odesa, Ukraine · BIOS ]',
    marquee:['Graffiti','Murals','Trains','Video','Odesa','Lettering']
  }
};

/* Роботи. Порядок тут = порядок на сайті.
   size: '' звичайна, 'wide' широка, 'tall' висока.
   Джерела кожного кадру — у content/works.md */
window.WORKS = [
  {f:'01-bios-character.jpg', size:'wide', uk:'BIOS і персонаж-балончик',  en:'BIOS and the can character', tag:'2024'},
  {f:'05-train-yellow.jpg',   size:'tall', uk:'Вагон, жовте з червоним',   en:'Carriage, yellow on red',    tag:'28,1 млн', tagEn:'28.1m'},
  {f:'02-wall-green.jpg',     size:'',     uk:'Зелений шматок у цеху',     en:'Green piece in a factory',   tag:'2024'},
  {f:'03-wall-blue.jpg',      size:'',     uk:'Синій wildstyle',           en:'Blue wildstyle',             tag:'2024'},
  {f:'07-train-blue.jpg',     size:'',     uk:'Біла лінія по синьому',     en:'White line on blue',         tag:'16,1 млн', tagEn:'16.1m'},
  {f:'06-door-green.jpg',     size:'',     uk:'Зелене по білих дверях',    en:'Green on white doors',       tag:'26,3 млн', tagEn:'26.3m'},
  {f:'04-wall-olive.jpg',     size:'wide', uk:'Оливковий шматок',          en:'Olive piece',                tag:'2024'},
  {f:'08-train-turquoise.jpg',size:'',     uk:'Бірюзовий вагон',           en:'Turquoise carriage',         tag:'14,2 млн', tagEn:'14.2m'},
  {f:'10-concrete-orange.jpg',size:'',     uk:'Помаранчеве по бетону',     en:'Orange on concrete',         tag:'10,9 млн', tagEn:'10.9m'},
  {f:'09-concrete-yellow.jpg',size:'',     uk:'Жовте з червоним',          en:'Yellow and red',             tag:'11,5 млн', tagEn:'11.5m'},
  {f:'12-turquoise-peel.jpg', size:'',     uk:'Бірюза по старій фарбі',    en:'Turquoise on old paint',     tag:'2023'},
  {f:'13-outline-green.jpg',  size:'',     uk:'Контури й салатовий',       en:'Outlines and acid green',    tag:'2023'},
  {f:'11-red-white.jpg',      size:'',     uk:'Червоне по білому',         en:'Red on white',               tag:'2024'},
  {f:'14-line-red-silver.jpg',size:'',     uk:'Червона лінія по сріблу',   en:'Red line on silver',         tag:'2023'},
  {f:'15-pink-wall.jpg',      size:'',     uk:'Рожеві товсті лінії',       en:'Fat pink lines',             tag:'2024'},
  {f:'17-mint-dark.jpg',      size:'',     uk:'М’ятне по темному',         en:'Mint on dark',               tag:'2023'},
  {f:'16-pink-lines.jpg',     size:'',     uk:'Рожевий контур',            en:'Pink outline',               tag:'2023'},
  {f:'18-white-teal.jpg',     size:'',     uk:'Біле по бірюзовому',        en:'White on teal',              tag:'2023'}
];
