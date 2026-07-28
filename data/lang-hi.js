/* ==========================================================================
   MEWAD: HINDI

   Two sections:

     data : mirrors the shape of window.MEWAD. Deep-merged over it, so only
            translated fields need to appear. NUMBERS ARE NEVER REPEATED HERE  - 
            they live in projects.js alone, which stays the single source of
            truth for every figure on the site.

            `status` is deliberately NOT translated: the calculator compares it
            against 'Operational' / 'Under construction' to decide construction
            delay. Its display text is translated through the `ui` map instead.

     ui   : maps normalised English page copy to Hindi. Keyed by the source
            text itself, so the HTML needed no key annotations. A missing entry
            falls back to English rather than breaking.
   ========================================================================== */

window.MEWAD_HI = {

  data: {
    words: {
      menu: 'मेन्यू',
      close: 'बंद करें',
      showTable: 'डेटा तालिका देखें',
      hideTable: 'तालिका छिपाएँ',
      keys: 'कमरे',
      year: 'वर्ष',
      irr: 'IRR',
      years: 'वर्ष',
      yrs: 'वर्ष',
      typicalStay: 'सामान्य ठहराव',
      risk: 'जोखिम',
      exit: 'निकास',
      suits: 'किनके लिए',
      bestBadge: 'सर्वाधिक अनुमानित IRR',
      source: 'स्रोत',
      placeholderNotice: 'पूर्वावलोकन संस्करण · इस पृष्ठ का हर आँकड़ा काल्पनिक है, वास्तविक प्रस्ताव नहीं',
      chainLiveLabel: 'अभी परिचालन में',
      chainPipelineLabel: 'भविष्य के गलियारे'
    },

    brand: {
      positioning: 'भारत की पहली औद्योगिक होटल श्रृंखला',
      /* Transliterations - please confirm the spelling of both names. */
      contacts: [
        { name: 'हेमेंद्र सिंह सोलंकी' },
        { name: 'भेरू सिंह राजपूत' }
      ]
    },

    demand: [
      {
        num: '01',
        title: 'कमीशनिंग टीमें',
        stay: '4–9 महीने',
        body: 'एक नई उत्पादन लाइन के साथ 30–50 इंजीनियर आते हैं, जिन्हें लाइन चालू होने तक लगातार ठहराना पड़ता है। यह एक खरीद आदेश है, बुकिंग नहीं।'
      },
      {
        num: '02',
        title: 'EPC ठेकेदार',
        stay: '6–24 महीने',
        body: 'संयंत्र निर्माण वर्षों चलता है। परियोजना प्रबंधक, साइट पर्यवेक्षक और गुणवत्ता कर्मी पूरी अवधि तक उन्हीं कमरों में बदलते रहते हैं।'
      },
      {
        num: '03',
        title: 'OEM सेवा इंजीनियर',
        stay: '3–15 रातें',
        body: 'फ़्लोर की हर मशीन के पीछे एक सेवा अनुबंध होता है। मशीन रुकते ही कोई उसी रात पहुँचता है - जो भी दर उपलब्ध हो।'
      },
      {
        num: '04',
        title: 'ऑडिटर और क्रेता',
        stay: '2–6 रातें',
        body: 'गुणवत्ता ऑडिट, विक्रेता निरीक्षण और क्रय यात्राएँ तय कैलेंडर पर चलती हैं, चाहे पर्यटन का मौसम हो या न हो।'
      },
      {
        num: '05',
        title: 'स्थानांतरित कर्मचारी',
        stay: '1–3 महीने',
        body: 'संयंत्र में स्थानांतरित कर्मचारियों को पारिवारिक आवास मिलने तक अंतरिम ठहराव चाहिए। भुगतान नियोक्ता करता है, कॉर्पोरेट दर अनुबंध पर।'
      },
      {
        num: '06',
        title: 'प्रशिक्षण दल',
        stay: '1–4 सप्ताह',
        body: 'प्रशिक्षु बैच और डीलर प्रशिक्षण एक साथ कई कमरे भरते हैं, वार्षिक प्रशिक्षण बजट के विरुद्ध महीनों पहले बुक किए जाते हैं।'
      }
    ],

    asset: {
      intro: 'ऐसे मेहमान के लिए बनाया गया जो रात 2 बजे पहुँचता है, 12 घंटे की शिफ़्ट करता है और महीनों रुकता है। हनीमून के लिए नहीं।',
      guestSide: [
        'रात 2 बजे शिफ़्ट बदलने के बाद पहुँचता है, फ़्लाइट से नहीं।',
        'रसोई रात 3 बजे और दोपहर 3 बजे गरम भोजन परोसती है - जब शिफ़्ट बदलती है, ब्रंच के समय नहीं।',
        'छह महीने के प्रवास के लिए तीन कमीज़ें लाया; लॉन्ड्री औद्योगिक स्तर की, उसी दिन, शुल्क में शामिल।',
        'दिन में सोता है: ब्लैकआउट पर्दे, ध्वनिरोधन, नज़ारे की जगह मेज़ और वायर्ड इंटरनेट।'
      ],
      plantSide: [
        'प्रति-रात बुकिंग की जगह वार्षिक दर अनुबंध।',
        'एकल-PO बिलिंग और GST-अनुरूप चालान, जिसे खरीद विभाग वास्तव में संसाधित कर सके।',
        'शिफ़्ट रोस्टर और ठेका चक्रों से जुड़ा अधिभोग, मौसम या छुट्टियों से नहीं।',
        'संयंत्र के गेट से 15 मिनट से कम दूरी के लिए चुना गया स्थान, नज़ारे के लिए नहीं।'
      ],
      specs: [
        { k: 'प्रति संपत्ति कमरे',      v: '60 – 90' },
        { k: 'भूमि क्षेत्र',            v: '1.5 – 3.0 एकड़' },
        { k: 'एंकर गेट से दूरी',        v: '15 मिनट से कम' },
        { k: 'भोजन सेवा',              v: '24 / 7, शिफ़्ट अनुसार' },
        { k: 'दीर्घ-ठहराव कमरे',        v: 'कुल कमरों का 40%' },
        { k: 'निर्माण से उद्घाटन',      v: '14 – 18 महीने' },
        { k: 'स्थिरीकरण',              v: '9 – 12 महीने' },
        { k: 'संचालक',                 v: 'मेवाड़, स्वयं' }
      ],
      features: [
        { title: 'शिफ़्ट के अनुरूप रसोई', body: 'रात 3 बजे और दोपहर 3 बजे गरम भोजन, क्योंकि तभी शिफ़्ट बदलती है। शाकाहारी, जैन और क्षेत्रीय भोजन मानक रूप से।' },
        { title: 'परिवहन डेस्क', body: 'एंकर संयंत्र के गेट तक निर्धारित शटल, शिफ़्ट बदलने और हवाई अड्डे के आगमन के समय अनुसार।' },
        { title: 'कॉर्पोरेट अनुबंध', body: 'वार्षिक दर अनुबंध, GST-अनुरूप चालान और एकल-PO बिलिंग, जिसे खरीद विभाग वास्तव में संसाधित कर सके।' }
      ]
    },

    properties: [
      {
        name: 'मेवाड़ साणंद', state: 'गुजरात', corridor: 'साणंद GIDC · अहमदाबाद',
        anchors: ['ऑटोमोटिव OEM', 'ऑटो कंपोनेंट', 'पैकेजिंग', 'फार्मा'],
        blurb: 'गुजरात का सबसे सघन ऑटोमोटिव क्लस्टर, जहाँ कारखानों के पीछे सुसज्जित होटल कभी आए ही नहीं।'
      },
      {
        name: 'मेवाड़ वटवा', state: 'गुजरात', corridor: 'GIDC वटवा · अहमदाबाद',
        anchors: ['रसायन', 'डाई और पिगमेंट', 'इंजीनियरिंग'],
        blurb: 'गुजरात के सबसे पुराने और सघन रासायनिक क्षेत्रों में से एक, जहाँ गेट के भीतर अब भी कोई संगठित आवास नहीं है।'
      },
      {
        name: 'मेवाड़ नरोदा', state: 'गुजरात', corridor: 'GIDC नरोदा · अहमदाबाद',
        opened: '2027 (अपेक्षित)',
        anchors: ['टेक्सटाइल', 'इंजीनियरिंग', 'प्लास्टिक'],
        blurb: 'अहमदाबाद के पूर्वी छोर पर एक सघन विनिर्माण क्षेत्र, जो शहर में निरंतर विक्रेता और ठेकेदार आवाजाही लाता है।'
      },
      {
        name: 'मेवाड़ ओढव', state: 'गुजरात', corridor: 'GIDC ओढव · अहमदाबाद',
        opened: '2028 (अपेक्षित)',
        anchors: ['इंजीनियरिंग', 'ऑटो कंपोनेंट', 'पैकेजिंग'],
        blurb: 'एक लंबे समय से स्थापित औद्योगिक क्षेत्र, जो अहमदाबाद के अधिक सघन गलियारों से अतिरिक्त माँग सोख रहा है।'
      },
      {
        name: 'मेवाड़ चांगोदर', state: 'गुजरात', corridor: 'GIDC चांगोदर · अहमदाबाद',
        opened: '2028 (अपेक्षित)',
        anchors: ['ऑटोमोटिव OEM', 'ऑटो कंपोनेंट', 'लॉजिस्टिक्स'],
        blurb: 'अहमदाबाद के दक्षिण-पश्चिमी छोर पर तेज़ी से बढ़ता गलियारा, जो पड़ोसी साणंद ऑटोमोटिव क्लस्टर से अतिरिक्त माँग खींच रहा है।'
      }
    ],

    structures: [
      {
        name: 'सीधा संपत्ति स्वामित्व', short: 'एक होटल',
        summary: 'आप सीधे एक होटल में निवेश करते हैं। आपकी हिस्सेदारी उतनी ही है जितना आपकी पूँजी संपत्ति के मूल्य में योगदान देती है - संपत्ति के मूल्य का 10% लगाएँ, उसका 10% मालिक बनें।',
        liquidity: 'मेवाड़ या किसी नए निवेशक के साथ सहमति से अपनी हिस्सेदारी बेचना',
        risk: 'प्रतिफल उस होटल के अधिभोग और दर के साथ बदलता है',
        forWho: 'वे निवेशक जो एक तय संपत्ति में सीधा जोखिम चाहते हैं और एकल-संपत्ति उतार-चढ़ाव स्वीकार कर सकते हैं।',
        detail: 'मेवाड़ होटल का संचालन करता है और वार्षिक लाभ में से 20% प्रबंधन शुल्क लेता है। शेष 80% मालिकों में उनकी उस होटल में हिस्सेदारी के अनुपात में बाँटा जाता है।'
      },
      {
        name: 'SPV इकाइयाँ (मूल कंपनी)', short: 'मूल कंपनी',
        summary: 'मेवाड़ की मूल कंपनी में हिस्सेदारी, जो हर संचालित होटल में भागीदार होती है। कोई विशिष्ट संपत्ति नहीं; पूरी श्रृंखला में भागीदारी।',
        liquidity: 'इकाई हस्तांतरण, मूल कंपनी के संस्थापन दस्तावेज़ों के अधीन',
        risk: 'श्रृंखला के हर होटल में विविधीकृत; किसी एक पर निर्भरता नहीं',
        forWho: 'वे निवेशक जो एक होटल नहीं, मूल कंपनी के खुलने पर पूरी श्रृंखला चाहते हैं।',
        detail: 'मूल कंपनी हर मेवाड़ होटल में हिस्सेदारी रखती है, जिसमें मेवाड़ साणंद भी शामिल है। हर होटल के 20% प्रबंधन शुल्क के बाद उसका अपना लाभ, मूल कंपनी के इकाई-धारकों में उनकी हिस्सेदारी के अनुपात में बाँटा जाता है। यह संरचना तब खुलती है जब मेवाड़ 4-5 होटल संचालित कर रहा हो; सीधा संपत्ति स्वामित्व आज से, मेवाड़ साणंद से शुरू, उपलब्ध है।'
      }
    ],

    calculator: {
      summaryTemplate: '{property} में {amount}, {years} वर्ष के लिए, {occ}% अधिभोग और {adr} ADR पर।',
      scenarios: [{ label: 'निचला' }, { label: 'आधार' }, { label: 'ऊपरी' }],
      labels: {
        property: 'संपत्ति',
        investment: 'निवेश',
        horizon: 'निवेश अवधि',
        scenario: 'परिदृश्य',
        occupancy: 'अधिभोग',
        adr: 'औसत दैनिक दर',
        heading: 'दोनों संरचनाएँ, वही पूँजी',
        ownershipPct: 'आपकी स्वामित्व हिस्सेदारी',
        payoutYr: 'स्थिर वार्षिक भुगतान',
        perMonth: 'प्रति माह',
        yieldOnCost: 'लागत पर प्रतिफल',
        firstPayout: 'पहला भुगतान',
        income: 'आय',
        exitValue: 'निकास मूल्य',
        multiple: 'कुल / निवेशित',
        footnote: 'भुगतान संपत्ति के लाभ का 80% (मेवाड़ के 20% प्रबंधन शुल्क के बाद) है, जो स्वामित्व प्रतिशत के अनुसार बाँटा जाता है। IRR पूरी नकदी-प्रवाह शृंखला पर निकाला जाता है: वर्ष शून्य में पूँजी बाहर, हर वर्ष भुगतान, और अवधि के अंत में हिस्सेदारी की बिक्री। निर्माण और स्थिरीकरण भी लागू हैं - जो संपत्ति खुली ही नहीं, वह भुगतान नहीं करती।'
      }
    },

    journey: [
      { step: 'थीसिस समझें', body: 'समझें कि औद्योगिक आतिथ्य भारत की हर दूसरी होटल संपत्ति से अलग व्यवहार क्यों करता है।', where: 'इसी वेबसाइट पर' },
      { step: 'अपना प्रतिफल आँकें', body: 'दोनों संरचनाओं पर अपने आँकड़े चलाएँ, निचले परिदृश्य सहित।', where: 'इसी वेबसाइट पर' },
      { step: 'अपनी संरचना चुनें', body: 'संपत्ति, राशि और वह प्रतिफल मॉडल चुनें जो आपकी जोखिम क्षमता से मेल खाए।', where: 'इसी वेबसाइट पर' },
      { step: 'मीटिंग बुक करें', body: 'निवेश टीम के साथ 45 मिनट की बातचीत। कोई बाध्यता नहीं, कोई दस्तावेज़ नहीं।', where: 'शेड्यूलिंग' },
      { step: 'KYC पूरा करें', body: 'पहचान और धन-स्रोत सत्यापन, पूरी तरह हमारे अनुपालन साझेदार द्वारा।', where: 'अनुपालन साझेदार' },
      { step: 'निवेशक किट प्राप्त करें', body: 'संपत्ति के वित्तीय विवरण, कानूनी संरचना, स्वामित्व दस्तावेज़ और पूरा अनुबंध, ईमेल पर।', where: 'ईमेल' },
      { step: 'स्थल का दौरा करें', body: 'संपत्ति देखें। संचालन टीम से मिलें। पड़ोस के एंकर उद्यमों से बात करें।', where: 'स्थल पर' },
      { step: 'हस्ताक्षर और भुगतान', body: 'अनुबंध पर डिजिटल हस्ताक्षर करें और पंजीकरण पूरा करें।', where: 'ई-हस्ताक्षर' }
    ],

    faq: [
      {
        q: 'होटलों का संचालन कौन करता है?',
        a: 'श्रृंखला की हर संपत्ति का संचालन मेवाड़ स्वयं करता है। ब्रांड, मानक और कॉर्पोरेट दर अनुबंध ही असली संपत्ति हैं; संचालन बाहर देने का अर्थ होगा वही चीज़ गँवा देना जो मांग को अनुबंधात्मक बनाती है।'
      },
      {
        q: '20% प्रबंधन शुल्क किसलिए है?',
        a: 'मेवाड़ श्रृंखला की हर संपत्ति का संचालन करता है - स्टाफ़िंग, कॉर्पोरेट दर अनुबंध, F&B, रखरखाव, सब कुछ। शुल्क राजस्व पर नहीं, लाभ पर लिया जाता है, और पहले लिया जाता है: शेष राशि मालिकों में सख्ती से स्वामित्व प्रतिशत के अनुसार बाँटी जाती है, इसलिए मेवाड़ तभी अधिक कमाता है जब संपत्ति भी अधिक कमाती है।'
      },
      {
        q: 'मेरी स्वामित्व हिस्सेदारी ठीक-ठीक कितनी होगी?',
        a: 'आपके निवेश की राशि, निवेश के समय उस संपत्ति के कुल मूल्य से भाग देने पर। किसी होटल के मूल्य का 10% लगाएँ, तो उसके 10% के मालिक बनते हैं - और जब तक हिस्सेदारी रखते हैं, उसके वितरण योग्य लाभ के 10% के भी।'
      },
      {
        q: 'मैं एक होटल की जगह मूल कंपनी में कब निवेश कर सकता हूँ?',
        a: 'अभी नहीं। एक तय, नामित होटल में सीधा स्वामित्व आज उपलब्ध है, मेवाड़ साणंद से शुरू। मूल कंपनी - जो हर संचालित होटल में हिस्सेदारी रखेगी - तब निवेश के लिए खुलेगी जब मेवाड़ 4-5 होटल चला रहा होगा, ताकि "श्रृंखला" एक वादा नहीं, वास्तविक पोर्टफोलियो हो।'
      },
      {
        q: 'मैं निवेश से बाहर कैसे निकलूँ?',
        a: 'अपनी हिस्सेदारी बेचकर - किसी होटल में, या बाद में मूल कंपनी में - मेवाड़ या किसी नए निवेशक के साथ सहमति से। इनमें से कोई भी सूचीबद्ध प्रतिभूति नहीं है, और न ही इन्हें तरल माना जाना चाहिए। पूरी अवधि की योजना बनाकर चलें।'
      },
      {
        q: 'यदि कोई एक एंकर कारखाना बंद हो जाए तो क्या होगा?',
        a: 'कोई भी मेवाड़ स्थल एक ही किरायेदार पर निर्भर नहीं है। हर संपत्ति एक निश्चित दायरे में, एक से अधिक क्षेत्रों में फैले, न्यूनतम संख्या में स्वतंत्र एंकर नियोक्ताओं के आधार पर आँकी जाती है, ताकि किसी एक संयंत्र का बंद होना झेला जा सके, घातक न हो।'
      },
      {
        q: 'औद्योगिक ADR शहरी होटलों से कम है। यह अच्छा कैसे हुआ?',
        a: 'अकेले यह अच्छा नहीं है - संयोजन में अच्छा है। कम दर, कहीं अधिक और स्थिर अधिभोग, लगभग शून्य ग्राहक-अधिग्रहण लागत और मौसमी गिरावट का अभाव मिलकर ऐसा RevPAR बनाते हैं जो किसी एक शिखर महीने में कम प्रभावशाली, पर दशक भर में कहीं अधिक भरोसेमंद होता है। आप वक्र का आकार खरीद रहे हैं, उसका सबसे ऊँचा बिंदु नहीं।'
      }
    ],

    /* index.html data-render mounts below - added because these sections
       (story, performance, growthJourney, businessModel, capitalAllocation,
       proof, philosophy, whyInvest, founder) had no Hindi override at all
       and were silently staying in English. */
    story: [
      {
        heading: 'एक होटल, ऐसे मेहमान के लिए बना जिसके लिए और कोई नहीं बना रहा था।',
        body: 'होटल मेवाड़ साणंद में इसलिए खुला क्योंकि मेहमान पहले से मौजूद था: आसपास बन रहे संयंत्रों द्वारा भेजे गए इंजीनियर और ठेकेदार, जिनके छह महीने के ठहराव के लिए कुछ भी बना नहीं था।'
      },
      {
        heading: 'साणंद, क्योंकि मांग पहले से वहाँ थी।',
        body: 'एक ऑटोमोटिव और कंपोनेंट क्लस्टर, जहाँ साल के बारहों महीने खरीद-आदेश वाला मेहमान आता है - कोई ऐसा गंतव्य नहीं जिसे कोई शौक से चुने, और यही कारण है कि कमरा भरा रहा।'
      },
      {
        heading: 'व्यवसाय वैसे ही बढ़ा जैसे असली व्यवसाय बढ़ता है।',
        body: 'पहले होटल के लाभ ने अगला कमरा, फिर अगली संपत्ति फंड की। यहाँ कुछ भी किसी पिच डेक से पहले फंड नहीं हुआ - हर चीज़ भरे हुए कमरे से फंड हुई।'
      }
    ],

    performance: {
      capitalDeployedBreakdown: [
        { label: 'अतिरिक्त कमरे', note: 'बदलें: श्रेणी राशि' },
        { label: 'बुनियादी ढाँचे में सुधार', note: 'बदलें: श्रेणी राशि' },
        { label: 'सहायक व्यावसायिक संपत्तियाँ', note: 'बदलें: श्रेणी राशि' }
      ],
      caption: 'आँकड़े वास्तविक ऐतिहासिक संचालन प्रदर्शन दर्शाते हैं, कोई अनुमान नहीं।'
    },

    growthJourney: [
      { step: 'होटल मेवाड़', body: 'पहली संपत्ति साणंद में खुलती है।' },
      { step: 'विस्तार', body: 'संचालन लाभ को बाँटने के बजाय पुनर्निवेशित किया जाता है।' },
      { step: 'अतिरिक्त कमरे', body: 'पहले से दर्ज मांग को पूरा करने के लिए मूल संपत्ति में सूची जोड़ी गई।' },
      { step: 'वर्तमान संचालन', body: 'आज मेवाड़ बिज़नेस होटल्स के अंतर्गत संपत्ति संचालित है।' },
      { step: 'भविष्य की वृद्धि', body: 'अगला गलियारा, पिछले जैसे ही तरीके से वित्तपोषित।' }
    ],

    businessModel: ['पूँजी', 'निर्माण', 'संचालन', 'नकदी प्रवाह उत्पन्न करें', 'विस्तार', 'दोहराएँ'],

    capitalAllocation: [
      { label: 'निवेशित पूँजी', note: '~₹1.49 करोड़ अतिरिक्त कमरों, बुनियादी ढाँचे और सहायक संपत्तियों में लगाए गए।' },
      { label: 'बनी संपत्तियाँ', note: 'अतिरिक्त कमरे और विस्तारित क्षमता, केवल बड़ा बैंक बैलेंस नहीं।' },
      { label: 'उत्पन्न संचालन लाभ', note: '~₹57.37 लाख का ऐतिहासिक संचालन लाभ।' },
      { label: 'विस्तार', note: 'लाभ को बाँटने के बजाय अगले चरण में पुनर्निवेशित किया गया।' },
      { label: 'और संपत्तियाँ', note: 'हर चरण अगली संपत्ति को फंड करता है।' },
      { label: 'भविष्य की वृद्धि', note: 'वही चक्र, अगले औद्योगिक गलियारे पर लागू।' }
    ],

    proof: {
      photos: [
        { label: 'रिसेप्शन' },
        { label: 'कमरे' },
        { label: 'रेस्तराँ' },
        { label: 'पार्किंग' },
        { label: 'लॉबी' }
      ]
    },

    philosophy: [
      { title: 'पूँजी भागीदार, मकान-मालिक नहीं', body: 'आप एक संचालित संपत्ति में हिस्सेदारी रखते हैं; आप उसे प्रबंधित नहीं कर रहे।' },
      { title: 'पेशेवर प्रबंधन संचालन के लिए जवाबदेह रहता है', body: 'मेवाड़ बिज़नेस होटल्स श्रृंखला की हर संपत्ति का संचालन स्वयं करता है।' },
      { title: 'पारदर्शी संचालन-व्यवस्था', body: 'यहाँ दिखाए गए वही आँकड़े हैं जिन पर व्यवसाय चलाया जाता है।' },
      { title: 'दीर्घकालिक संपत्ति-निर्माण', body: 'बहु-वर्षीय ठहराव के लिए बनाया गया, त्वरित निकास के लिए नहीं।' }
    ],

    whyInvest: [
      'वास्तविक व्यवसाय - आज संचालित, कागज़ पर नहीं',
      'वास्तविक संपत्तियाँ - होटल मेवाड़, आज संचालित',
      'वास्तविक ग्राहक - कॉर्पोरेट खाते, वॉक-इन नहीं',
      'नियमित नकदी प्रवाह - अधिभोग औद्योगिक गतिविधि से जुड़ा, पर्यटन के मौसम से नहीं',
      'विनिर्माण वृद्धि - मांग आधार मेवाड़ से स्वतंत्र रूप से बढ़ रहा है',
      'एक विस्तार-योग्य मॉडल - एक बार सिद्ध, अब दोहराया जा रहा'
    ],

    founder: {
      quote: 'हर बड़ी आतिथ्य कंपनी एक होटल से शुरू हुई।',
      body: 'हमारी शुरुआत होटल मेवाड़ से हुई। जिस मॉडल को इसने सिद्ध किया, मेवाड़ बिज़नेस होटल्स अब उसे भारत के औद्योगिक गलियारों में दोहराने का इरादा रखता है।'
    }
  },

  /* ----------------------------------------------------------------------
     PAGE COPY - keyed by the normalised English source string
     ---------------------------------------------------------------------- */
  ui: {
    /* Nav + chrome */
    'Thesis': 'थीसिस',
    'Demand': 'मांग',
    'Properties': 'संपत्तियाँ',
    'Returns': 'प्रतिफल',
    'Invest': 'निवेश',
    'Book a meeting': 'मीटिंग बुक करें',
    'MEWAD': 'मेवाड़',
    'Operational': 'संचालनरत',
    'Under construction': 'निर्माणाधीन',
    'Announced': 'घोषित',
    'email': 'ईमेल',
    'Contact': 'संपर्क',
    'The case': 'तर्क',
    'Thesis ': 'थीसिस',
    'Demand engine': 'मांग का इंजन',
    'Returns calculator': 'प्रतिफल कैलकुलेटर',
    'Structures': 'संरचनाएँ',
    'Process': 'प्रक्रिया',
    "India's first industrial hotel chain.": 'भारत की पहली औद्योगिक होटल श्रृंखला।',

    /* Hero */
    "India's first industrial hotel chain": 'भारत की पहली औद्योगिक होटल श्रृंखला',
    "Tourists cancel.<br><em>Factories don't.</em>": 'पर्यटक रद्द करते हैं।<br><em>कारखाने नहीं।</em>',
    "Mewad builds hotels inside India's industrial corridors - where a commissioning team of forty needs beds for eight months, and the nearest decent room is ninety minutes away. Demand here arrives on a purchase order, not a whim.":
      'मेवाड़ भारत के औद्योगिक गलियारों के भीतर होटल बनाता है - जहाँ चालीस लोगों की कमीशनिंग टीम को आठ महीने तक कमरे चाहिए, और निकटतम ढंग का कमरा नब्बे मिनट दूर है। यहाँ मांग किसी सनक से नहीं, खरीद आदेश से आती है।',
    'Model your returns <span class="btn__arrow">→</span>': 'अपना प्रतिफल आँकें <span class="btn__arrow">→</span>',
    'Read the thesis': 'थीसिस पढ़ें',

    /* Thesis */
    'The thesis': 'थीसिस',
    'The best hotel asset in India is the one nobody wants to photograph.':
      'भारत की सबसे अच्छी होटल संपत्ति वही है जिसकी कोई तस्वीर नहीं खींचना चाहता।',
    'Leisure hospitality competes for a guest who might not come. Industrial hospitality serves a guest whose employer has already signed the contract that puts them there.':
      'अवकाश आतिथ्य ऐसे मेहमान के लिए होड़ करता है जो शायद आए ही नहीं। औद्योगिक आतिथ्य ऐसे मेहमान की सेवा करता है जिसके नियोक्ता ने वह अनुबंध पहले ही कर रखा है जो उसे वहाँ भेजता है।',
    'The leisure hotel': 'अवकाश होटल',
    'The Mewad hotel': 'मेवाड़ होटल',
    'Guests choose to come, and can choose not to': 'मेहमान आना चुनते हैं, और न आना भी चुन सकते हैं',
    'Occupancy collapses for four months a year': 'साल में चार महीने अधिभोग ढह जाता है',
    '18–22% of every booking goes to an OTA': 'हर बुकिंग का 18–22% OTA को चला जाता है',
    'Competes with every other hotel in the city': 'शहर के हर दूसरे होटल से प्रतिस्पर्धा',
    'Weekend-weighted, holiday-dependent, weather-exposed': 'सप्ताहांत पर निर्भर, छुट्टियों पर निर्भर, मौसम के अधीन',
    'Rate is high in December and irrelevant in July': 'दर दिसंबर में ऊँची और जुलाई में बेमानी',
    'Guests are sent, on a schedule set by capital expenditure': 'मेहमान भेजे जाते हैं, पूँजीगत व्यय से तय समय पर',
    'Occupancy holds within a narrow band all twelve months': 'बारहों महीने अधिभोग एक सँकरे दायरे में टिका रहता है',
    'Booked direct, on annual corporate rate agreements': 'सीधी बुकिंग, वार्षिक कॉर्पोरेट दर अनुबंध पर',
    'Competes with a ninety-minute drive and an unbranded lodge': 'प्रतिस्पर्धा नब्बे मिनट की यात्रा और एक बेनाम लॉज से है',
    'Weekday-weighted, shift-driven, weather-indifferent': 'कार्यदिवसों पर केंद्रित, शिफ़्ट से संचालित, मौसम से निरपेक्ष',
    'Rate is modest - and it is the same every month': 'दर मामूली है - और हर महीने वही रहती है',
    '<strong>Lower ADR. Higher, steadier RevPAR.</strong> That trade is the entire proposition, and it is the one most investors get backwards. A Mewad room will never command what a beachfront suite commands in December. It will also never sit empty in July.':
      '<strong>कम ADR। अधिक और अधिक स्थिर RevPAR।</strong> यही अदला-बदली पूरा प्रस्ताव है, और अधिकांश निवेशक इसे उल्टा समझते हैं। मेवाड़ का कमरा वह दर कभी नहीं पाएगा जो दिसंबर में समुद्रतट का सुइट पाता है। पर वह जुलाई में खाली भी कभी नहीं रहेगा।',
    'You are not buying the highest point on the curve. You are buying <strong>the shape of the curve</strong> - and over a ten-year hold, shape beats peak.':
      'आप वक्र का सबसे ऊँचा बिंदु नहीं खरीद रहे। आप <strong>वक्र का आकार</strong> खरीद रहे हैं - और दस साल की अवधि में आकार शिखर से बड़ा पड़ता है।',

    /* Demand */
    'The demand engine': 'मांग का इंजन',
    'Six reasons a room stays full on a Tuesday in July.': 'जुलाई के मंगलवार को कमरा भरा रहने के छह कारण।',
    'None of these guests chose the destination. Every one of them is billed to a corporate account against a budget approved months in advance.':
      'इनमें से किसी मेहमान ने गंतव्य नहीं चुना। हर एक का बिल कॉर्पोरेट खाते में जाता है, महीनों पहले स्वीकृत बजट के विरुद्ध।',

    /* Asset */
    'The asset': 'संपत्ति',
    'Built for the guest who arrives anytime.': 'उस मेहमान के लिए बना जो कभी भी पहुँचता है।',
    'Engineered around a person who works a twelve-hour shift and stays for months. Every design decision follows from that, and none of them follow from a brochure.':
      'ऐसे व्यक्ति को ध्यान में रखकर बनाया गया जो बारह घंटे की शिफ़्ट करता है और महीनों रुकता है। हर डिज़ाइन निर्णय इसी से निकला है, किसी विज्ञापन पुस्तिका से नहीं।',
    'Property specification': 'संपत्ति विशिष्टियाँ',
    'Standard across the chain.': 'पूरी श्रृंखला में एक समान।',
    'A city hotel treats a long-stay guest as an anomaly. A Mewad hotel is built for them: forty per cent of keys are long-stay inventory, the kitchen runs to shift timings rather than restaurant timings, and the laundry is sized for a guest who packed three shirts for a six-month posting.':
      'शहर का होटल लंबे ठहराव वाले मेहमान को अपवाद मानता है। मेवाड़ होटल उसी के लिए बना है: चालीस प्रतिशत कमरे दीर्घ-ठहराव के हैं, रसोई रेस्तराँ के नहीं बल्कि शिफ़्ट के समय पर चलती है, और लॉन्ड्री उस मेहमान के हिसाब से है जो छह महीने की तैनाती पर तीन कमीज़ लेकर आया है।',
    'None of it photographs well. All of it is why the anchor plant next door signs an annual rate agreement instead of putting people in a lodge.':
      'इसमें से कुछ भी तस्वीर में अच्छा नहीं लगता। इसी सबके कारण पड़ोस का एंकर संयंत्र लोगों को लॉज में ठहराने के बजाय वार्षिक दर अनुबंध करता है।',

    /* Chain */
    'The chain': 'श्रृंखला',
    'One hotel open. Four more corridors underwritten.': 'एक होटल परिचालन में। चार और गलियारे प्रगति पर।',
    'Each property is underwritten against the industrial base around it - the count of anchor employers, the sector mix, and the distance to the gate.':
      'हर संपत्ति अपने आसपास के औद्योगिक आधार पर आँकी जाती है - एंकर नियोक्ताओं की संख्या, क्षेत्रों का मिश्रण, और गेट तक की दूरी।',
    'We build where the trucks are.': 'हम वहाँ बनाते हैं जहाँ ट्रक हैं।',
    'Every Mewad site is chosen the same way: count the anchor employers inside a fixed radius, check the sector mix, measure the drive to the plant gate. If the industrial base does not carry the hotel on its own, we do not build.':
      'हर मेवाड़ स्थल एक ही तरीके से चुना जाता है: तय दायरे के भीतर एंकर नियोक्ता गिनें, क्षेत्रों का मिश्रण जाँचें, संयंत्र के गेट तक की दूरी नापें। यदि औद्योगिक आधार अकेले होटल को न सँभाल सके, तो हम नहीं बनाते।',
    'Site selection': 'स्थल चयन',
    'The four tests a location has to pass.': 'वे चार कसौटियाँ जिन पर स्थल को खरा उतरना है।',
    'Test 01': 'कसौटी 01', 'Test 02': 'कसौटी 02', 'Test 03': 'कसौटी 03', 'Test 04': 'कसौटी 04',
    'Anchor depth': 'एंकर की गहराई',
    'Sector mix': 'क्षेत्रों का मिश्रण',
    'Gate distance': 'गेट से दूरी',
    'Existing supply': 'मौजूदा आपूर्ति',

    /* Calculator */
    'Model it yourself': 'स्वयं आँकें',
    "Run your own numbers - including the ones we'd rather you didn't.":
      'अपने आँकड़े चलाएँ - वे भी जो शायद हम आपको न दिखाना चाहते।',
    'Every assumption behind these figures is exposed and adjustable. Drag occupancy down to 40% and watch what happens. We would rather you found the floor here than after you had signed.':
      'इन आँकड़ों के पीछे की हर मान्यता खुली और बदली जा सकने वाली है। अधिभोग को 40% तक खींचें और देखें क्या होता है। हम चाहेंगे कि आप तली यहीं देख लें, हस्ताक्षर के बाद नहीं।',
    'Every assumption, exposed.': 'हर मान्यता, खुली हुई।',
    'Most investment calculators are a marketing device with a slider attached. This one lets you break it. Drag occupancy to 40%, cut the rate, extend the hold - and see which structure survives.':
      'ज़्यादातर निवेश कैलकुलेटर स्लाइडर लगा हुआ विज्ञापन भर होते हैं। यह आपको इसे तोड़ने देता है। अधिभोग 40% पर लाएँ, दर घटाएँ, अवधि बढ़ाएँ - और देखें कौन-सी संरचना टिकती है।',
    '<strong>Why ownership, not a fixed return.</strong> There is no assured or guaranteed leg here. You own a percentage of a real property - or, once it opens, of the parent company - and you are paid your share of what it actually earns, after a flat 20% management fee. That is the whole model.':
      '<strong>स्वामित्व क्यों, निश्चित प्रतिफल नहीं।</strong> यहाँ कोई निश्चित या गारंटीशुदा हिस्सा नहीं है। आप किसी वास्तविक संपत्ति के - या, इसके खुलने पर, मूल कंपनी के - एक प्रतिशत के मालिक होते हैं, और आपको वह मिलता है जो वह वास्तव में कमाती है, 20% प्रबंधन शुल्क के बाद। यही पूरा मॉडल है।',
    '<strong>Why the first payout is not year one.</strong> A property under construction cannot pay a return, and one that just opened does not reach stabilised occupancy for a further nine to twelve months. The model applies both. Projections that skip this are the reason investors are disappointed.':
      '<strong>पहला भुगतान पहले वर्ष क्यों नहीं।</strong> निर्माणाधीन संपत्ति प्रतिफल नहीं दे सकती, और अभी-अभी खुली संपत्ति नौ से बारह महीने तक स्थिर अधिभोग तक नहीं पहुँचती। यह मॉडल दोनों लागू करता है। जो अनुमान इसे छोड़ देते हैं, वही निवेशकों की निराशा का कारण बनते हैं।',
    'How to read it': 'इसे कैसे पढ़ें',
    'What the model does, and what it refuses to do.': 'यह मॉडल क्या करता है, और क्या करने से इनकार करता है।',
    'It uses IRR, not headline yield': 'यह IRR इस्तेमाल करता है, सुर्खियों वाला प्रतिफल नहीं',
    'It applies construction and ramp-up': 'यह निर्माण और शुरुआती अवधि को लागू करता है',
    'It shows the downside first-class': 'यह निचले परिदृश्य को बराबरी का दर्जा देता है',
    'It cannot predict the future': 'यह भविष्य नहीं बता सकता',

    /* Structures / invest */
    'Two ways in': 'भीतर आने के दो रास्ते',
    'Own a hotel, or own the chain.': 'एक होटल रखें, या पूरी श्रृंखला रखें।',
    'Start by owning a percentage of one named property - Mewad Sanand today. As more hotels come online, own a slice of the parent company instead.':
      'एक नामित संपत्ति के प्रतिशत के मालिक बनकर शुरू करें - आज मेवाड़ साणंद। जैसे-जैसे और होटल जुड़ते हैं, इसके बजाय मूल कंपनी का हिस्सा रखें।',
    'Own the hotel, not a promise about it.': 'होटल के मालिक बनें, उसके बारे में किए वादे के नहीं।',
    'You put in capital, you get a matching percentage of that property. No fixed return, no assured leg - just your share of what the hotel actually earns, after Mewad\'s 20% management fee.':
      'आप पूँजी लगाते हैं, आपको उस संपत्ति का उतना ही प्रतिशत मिलता है। कोई निश्चित प्रतिफल नहीं, कोई गारंटीशुदा हिस्सा नहीं - बस वह हिस्सा जो होटल वास्तव में कमाता है, मेवाड़ के 20% प्रबंधन शुल्क के बाद।',

    /* Process */
    'The process': 'प्रक्रिया',
    'From this page to a signed agreement.': 'इस पृष्ठ से हस्ताक्षरित अनुबंध तक।',
    'Eight steps, no surprises. Nothing is asked of you until after the first conversation, and the site visit comes before the signature - never after.':
      'आठ चरण, कोई अचरज नहीं। पहली बातचीत से पहले आपसे कुछ नहीं माँगा जाता, और स्थल का दौरा हस्ताक्षर से पहले होता है - बाद में कभी नहीं।',
    'Eight steps. Nothing asked of you until step five.': 'आठ चरण। पाँचवें चरण तक आपसे कुछ नहीं माँगा जाता।',
    'You do not upload a document, share an ID or commit to anything before the first conversation. And you walk the property before you sign, not after.':
      'पहली बातचीत से पहले आप न कोई दस्तावेज़ अपलोड करते हैं, न पहचान साझा करते हैं, न कोई वचन देते हैं। और आप हस्ताक्षर से पहले संपत्ति देखते हैं, बाद में नहीं।',
    'Documents &amp; compliance': 'दस्तावेज़ और अनुपालन',
    'Where your documents actually go.': 'आपके दस्तावेज़ असल में कहाँ जाते हैं।',
    'Not to this website': 'इस वेबसाइट पर नहीं',
    'What KYC covers': 'KYC में क्या शामिल है',
    'Signature and registration': 'हस्ताक्षर और पंजीकरण',

    /* FAQ + legal */
    'Questions we get asked': 'हमसे पूछे जाने वाले सवाल',
    'The hard ones, answered plainly.': 'कठिन सवाल, सीधे जवाब।',
    'Important: please read': 'महत्वपूर्ण: कृपया पढ़ें',
    'Sources': 'स्रोत',
    'Where these figures come from.': 'ये आँकड़े कहाँ से आते हैं।',

    /* CTAs */
    'Come and look': 'आइए, देखिए',
    'Come see a hotel with no view.': 'ऐसा होटल देखिए जिसमें कोई नज़ारा नहीं।',
    'No lobby waterfall. No infinity pool. No sunset. Just rooms that were full last Tuesday, next to a plant that will still be running in 2040.':
      'न लॉबी का झरना। न इनफ़िनिटी पूल। न सूर्यास्त। बस वे कमरे जो पिछले मंगलवार भरे थे, उस संयंत्र के बगल में जो 2040 में भी चल रहा होगा।',
    'Rooms that were full last Tuesday, next to a plant that will still be running in 2040.':
      'वे कमरे जो पिछले मंगलवार भरे थे, उस संयंत्र के बगल में जो 2040 में भी चल रहा होगा।',
    'Model the returns first <span class="btn__arrow">→</span>': 'पहले प्रतिफल आँकें <span class="btn__arrow">→</span>',
    'Model the returns <span class="btn__arrow">→</span>': 'प्रतिफल आँकें <span class="btn__arrow">→</span>',
    'See the structures <span class="btn__arrow">→</span>': 'संरचनाएँ देखें <span class="btn__arrow">→</span>',
    'Numbers look right? Come and stress-test them with us.': 'आँकड़े ठीक लगे? आइए, हमारे साथ इन्हें कसकर परखें।',
    'Bring your own assumptions. The investment team will run them against the actual operating data of a live property.':
      'अपनी मान्यताएँ लेकर आइए। निवेश टीम उन्हें किसी चालू संपत्ति के वास्तविक संचालन आँकड़ों पर चलाकर दिखाएगी।',
    'Walk one before you fund one.': 'पैसा लगाने से पहले एक बार चलकर देखिए।',
    'Site visits happen before signature, never after. Meet the operating team and talk to the anchor tenants next door.':
      'स्थल का दौरा हस्ताक्षर से पहले होता है, बाद में कभी नहीं। संचालन टीम से मिलिए और पड़ोस के एंकर किरायेदारों से बात कीजिए।',

    /* properties.html: the four site-selection tests */
    'A minimum count of independent anchor employers within the catchment. Not one large plant - several, under separate ownership, so that a single closure is absorbed rather than fatal.':
      'एक निश्चित दायरे के भीतर स्वतंत्र एंकर नियोक्ताओं की न्यूनतम संख्या। कोई एक बड़ा संयंत्र नहीं - बल्कि कई, अलग-अलग स्वामित्व वाले, ताकि किसी एक के बंद होने का असर झेला जा सके, घातक न हो।',
    "More than one industry represented. Automotive, chemicals, electronics and pharma do not enter downturns on the same calendar, and a corridor that depends on one sector inherits that sector's cycle.":
      'एक से अधिक उद्योग मौजूद हों। ऑटोमोटिव, रसायन, इलेक्ट्रॉनिक्स और फार्मा एक ही समय मंदी में नहीं जाते, और जो गलियारा एक ही क्षेत्र पर निर्भर है वह उसी क्षेत्र का चक्र ढोता है।',
    'Under fifteen minutes to the anchor gate. Beyond that, a guest weighs the hotel against a longer commute from the nearest city, and the pricing power that makes the asset work disappears.':
      'एंकर गेट तक पंद्रह मिनट से कम। उससे आगे मेहमान होटल की तुलना नज़दीकी शहर से लंबी यात्रा के साथ करने लगता है, और वह मूल्य-शक्ति ख़त्म हो जाती है जो इस संपत्ति को चलाती है।',
    'Organised room supply well below the business-district benchmark, with no credible pipeline. We are looking for a gap that has stayed open - because a gap that stayed open is a gap others considered and declined.':
      'संगठित कमरों की आपूर्ति व्यावसायिक क्षेत्र के मानक से काफ़ी नीचे हो, और कोई विश्वसनीय परियोजना पाइपलाइन में न हो। हम ऐसा अंतर खोजते हैं जो खुला रह गया हो - क्योंकि जो अंतर खुला रह गया, उसे औरों ने देखा और छोड़ दिया।',

    /* returns.html: how to read the model */
    'A headline yield tells you nothing about <em>when</em> money arrives. The IRR here runs a full cashflow - capital out at year zero, each year\'s payout in sequence, and the sale of the holding at the end. Money received in year eight is discounted accordingly, because it is worth less than money received in year one.':
      'सुर्खियों वाला प्रतिफल यह नहीं बताता कि पैसा <em>कब</em> आता है। यहाँ IRR पूरी नकदी-प्रवाह शृंखला पर चलता है - वर्ष शून्य में पूँजी बाहर, हर वर्ष का भुगतान क्रम से, और अंत में हिस्सेदारी की बिक्री। आठवें वर्ष मिला पैसा उसी अनुपात में छूट पाता है, क्योंकि वह पहले वर्ष मिले पैसे से कम मूल्यवान है।',
    'A property under construction pays nothing until it opens. One that has just opened runs below stabilised occupancy for a further nine to twelve months. Both are modelled. This is the single most common omission in Indian hospitality projections, and it is why returns disappoint.':
      'निर्माणाधीन संपत्ति खुलने तक कुछ नहीं देती। और जो अभी-अभी खुली है वह अगले नौ से बारह महीने स्थिर अधिभोग से नीचे चलती है। मॉडल दोनों लागू करता है। भारतीय आतिथ्य अनुमानों में यही सबसे आम चूक है, और इसी से प्रतिफल निराश करते हैं।',
    'The downside scenario is not a footnote - it is a button, and it moves the same numbers the upside does. Because both structures are pure profit share with no fixed floor, a weak year means a smaller payout for everyone holding a stake. We would rather show you that than have you discover it in year four.':
      'निचला परिदृश्य कोई फ़ुटनोट नहीं - वह एक बटन है, और वह उन्हीं आँकड़ों को हिलाता है जिन्हें ऊपरी परिदृश्य हिलाता है। चूँकि दोनों संरचनाएँ शुद्ध लाभ-हिस्सेदारी हैं, कोई निश्चित न्यूनतम नहीं है, कमज़ोर वर्ष का मतलब है हर हिस्सेदार के लिए छोटा भुगतान। हम चाहेंगे कि आप यह अभी जान लें, चौथे वर्ष में नहीं।',
    'Every output is arithmetic performed on assumptions you can see and change. It is not a forecast. Occupancy, rate, capital appreciation and operator performance are all uncertain, and the true outcome may fall outside every scenario shown here - including below the downside.':
      'हर परिणाम उन मान्यताओं पर किया गया गणित है जिन्हें आप देख और बदल सकते हैं। यह पूर्वानुमान नहीं है। अधिभोग, दर, पूँजी वृद्धि और संचालक का प्रदर्शन - सब अनिश्चित हैं, और वास्तविक नतीजा यहाँ दिखाए हर परिदृश्य के बाहर भी जा सकता है, निचले परिदृश्य से भी नीचे।',

    /* invest.html */
    '<strong>Direct ownership is live today.</strong> Invest into a named property - starting with Mewad Sanand - and your stake is exactly the percentage of that hotel your capital represents. As Mewad opens more hotels, the same structure repeats for each one.':
      '<strong>सीधा स्वामित्व आज उपलब्ध है।</strong> एक नामित संपत्ति में निवेश करें - मेवाड़ साणंद से शुरू - और आपकी हिस्सेदारी ठीक उतनी ही होगी जितना प्रतिशत आपकी पूँजी उस होटल में दर्शाती है। जैसे-जैसे मेवाड़ और होटल खोलता है, यही संरचना हर एक के लिए दोहराई जाती है।',
    '<strong>The parent company is the next phase.</strong> Once Mewad is running 4-5 hotels, a parent company holding a stake across all of them opens for investment - for investors who want the chain rather than one property. <a href="returns.html" style="color:var(--accent-ink)">Model both</a> against the same assumptions.':
      '<strong>मूल कंपनी अगला चरण है।</strong> जब मेवाड़ 4-5 होटल चला रहा होगा, तब सभी में हिस्सेदारी रखने वाली मूल कंपनी निवेश के लिए खुलेगी - उन निवेशकों के लिए जो एक संपत्ति नहीं, पूरी श्रृंखला चाहते हैं। <a href="returns.html" style="color:var(--accent-ink)">दोनों को आँकें</a> वही मान्यताओं पर।',
    'Run it yourself': 'स्वयं चलाकर देखिए',
    'This site collects no identity documents and stores no personal files. KYC is handled entirely by a regulated compliance partner on their own infrastructure, and the link is issued to you directly after the first call.':
      'यह वेबसाइट कोई पहचान दस्तावेज़ नहीं लेती और कोई निजी फ़ाइल संग्रहित नहीं करती। KYC पूरी तरह एक विनियमित अनुपालन साझेदार द्वारा, उनके अपने बुनियादी ढाँचे पर किया जाता है, और उसका लिंक पहली बातचीत के बाद सीधे आपको भेजा जाता है।',
    'Identity verification, address proof and source-of-funds declaration, as required for a property transaction in India. NRI investors have an additional set determined by residency and the funding route.':
      'पहचान सत्यापन, पता प्रमाण और धन-स्रोत घोषणा, जैसा भारत में संपत्ति लेन-देन के लिए आवश्यक है। अनिवासी भारतीय निवेशकों के लिए निवास और भुगतान मार्ग के अनुसार कुछ अतिरिक्त दस्तावेज़ लगते हैं।',
    'The agreement is executed through a recognised e-signature provider. Where the structure involves a registered unit, physical registration follows at the relevant sub-registrar office.':
      'अनुबंध एक मान्यता प्राप्त ई-हस्ताक्षर सेवा के माध्यम से निष्पादित होता है। जहाँ संरचना में पंजीकृत इकाई शामिल है, वहाँ भौतिक पंजीकरण संबंधित उप-पंजीयक कार्यालय में होता है।',

    /* ------------------------------------------------------------------
       Added: the site was restructured (new index.html layout - Story,
       Performance, Growth journey, Business model, Capital allocation,
       Philosophy, Why invest, Founder vision sections) after this file was
       last updated, and several headings across all four pages are split
       across multiple <span> elements rather than one sentence, so each
       fragment needs its own key. Everything below is new as of this pass.
       ------------------------------------------------------------------ */

    /* Nav (all four pages) */
    'MENU': 'मेन्यू',
    'Story': 'कहानी',
    'Performance': 'प्रदर्शन',
    'Expansion': 'विस्तार',
    'Explore': 'अन्वेषण',
    'Expansion vision': 'विस्तार दृष्टि',
    'The company behind Hotel Mewad, Sanand - India\'s first industrial hotel chain.':
      'होटल मेवाड़, साणंद के पीछे की कंपनी - भारत की पहली औद्योगिक होटल श्रृंखला।',

    /* index.html: hero */
    'Hotel Mewad': 'होटल मेवाड़',
    'India\'s first Industrial Hotel. The flagship property of Mewad Business Hotels, building the hospitality infrastructure behind India\'s manufacturing revolution.':
      'भारत का पहला औद्योगिक होटल। मेवाड़ बिज़नेस होटल्स की प्रमुख संपत्ति, जो भारत की विनिर्माण क्रांति के पीछे आतिथ्य अवसंरचना का निर्माण कर रही है।',
    'View performance <span class="btn__arrow">→</span>': 'प्रदर्शन देखें <span class="btn__arrow">→</span>',
    'Our story': 'हमारी कहानी',
    'Become a capital partner': 'पूँजी भागीदार बनें',
    'Become a capital partner <span class="btn__arrow">→</span>': 'पूँजी भागीदार बनें <span class="btn__arrow">→</span>',

    /* index.html: story */
    'Who we are': 'हम कौन हैं',
    'One hotel.': 'एक होटल।',
    'A proven model.': 'एक सिद्ध मॉडल।',
    'A company being built to repeat it.': 'इसे दोहराने के लिए बन रही कंपनी।',
    'Mewad Business Hotels is the company. Hotel Mewad, Sanand is its first proven, operating asset - not the whole business.':
      'मेवाड़ बिज़नेस होटल्स कंपनी है। होटल मेवाड़, साणंद इसकी पहली सिद्ध, संचालित संपत्ति है - पूरा व्यवसाय नहीं।',

    /* index.html: the opportunity */
    'The opportunity': 'अवसर',
    'Industrial India is growing.': 'औद्योगिक भारत बढ़ रहा है।',
    'Its hotel supply isn\'t.': 'उसकी होटल आपूर्ति नहीं।',
    'Every factory that opens creates continuous business travel - engineers, consultants, auditors, contractors, corporate visitors. Existing hotels were never built for them.':
      'हर नया कारखाना निरंतर व्यावसायिक यात्रा पैदा करता है - इंजीनियर, सलाहकार, ऑडिटर, ठेकेदार, कॉर्पोरेट आगंतुक। मौजूदा होटल कभी उनके लिए बने ही नहीं।',
    'Six paying reasons. <span style="color:var(--accent-ink)">Zero of them are on vacation.</span>':
      'भुगतान करने वाले छह कारण। <span style="color:var(--accent-ink)">इनमें से कोई भी छुट्टी पर नहीं है।</span>',

    /* index.html: why Mewad wins */
    'Why Hotel Mewad wins': 'होटल मेवाड़ क्यों जीतता है',
    'Built for the guest': 'उस मेहमान के लिए बना',
    'who arrives anytime.': 'जो कभी भी पहुँचता है।',
    'Corporate customers, repeat business, a location chosen for the plants next door, and a cost base built to match. None of it photographs well. All of it is why the anchor plant signs an annual rate agreement instead of putting people in a lodge.':
      'कॉर्पोरेट ग्राहक, दोहराया जाने वाला व्यवसाय, पड़ोस के संयंत्रों के लिए चुना गया स्थान, और उसी के अनुरूप लागत आधार। इनमें से कुछ भी तस्वीर में अच्छा नहीं लगता। इसी सबके कारण एंकर संयंत्र लोगों को लॉज में ठहराने के बजाय वार्षिक दर अनुबंध करता है।',
    'A city hotel treats a long-stay guest as an anomaly. A Mewad hotel is built for them: forty per cent of keys are long-stay inventory, the kitchen runs to shift timings, and the laundry is sized for a guest who packed three shirts for a six-month posting.':
      'शहर का होटल लंबे ठहराव वाले मेहमान को अपवाद मानता है। मेवाड़ होटल उसी के लिए बना है: चालीस प्रतिशत कमरे दीर्घ-ठहराव के हैं, रसोई शिफ़्ट के समय पर चलती है, और लॉन्ड्री उस मेहमान के हिसाब से है जो छह महीने की तैनाती पर तीन कमीज़ लेकर आया है।',

    /* index.html: proof */
    'Proof': 'प्रमाण',
    'Not "trust us."': '"हम पर भरोसा करें" नहीं।',
    'Evidence.': 'सबूत।',
    'Reception, rooms, restaurant, parking, lobby - and what guests actually say.':
      'रिसेप्शन, कमरे, रेस्तराँ, पार्किंग, लॉबी - और मेहमान वास्तव में क्या कहते हैं।',

    /* index.html: performance */
    'Historical operating performance,': 'ऐतिहासिक संचालन प्रदर्शन,',
    'not a forecast.': 'पूर्वानुमान नहीं।',
    'Capital deployed, and what it has generated - to date.': 'लगाई गई पूँजी, और अब तक उसने क्या उत्पन्न किया।',
    'Capital deployed (historical)': 'लगाई गई पूँजी (ऐतिहासिक)',
    'Operating profit generated (historical)': 'उत्पन्न संचालन लाभ (ऐतिहासिक)',

    /* index.html: growth journey */
    'Growth journey': 'विकास यात्रा',
    'How one hotel': 'कैसे एक होटल',
    'became a company.': 'कंपनी बन गया।',

    /* index.html: business model */
    'Business model': 'व्यवसाय मॉडल',
    'A simple loop,': 'एक सरल चक्र,',
    'run on repeat.': 'बार-बार दोहराया जाता है।',

    /* index.html: capital allocation */
    'Capital allocation': 'पूँजी आवंटन',
    'Profit became assets,': 'लाभ संपत्तियों में बदला,',
    'not a bigger bank balance.': 'बड़ा बैंक बैलेंस नहीं।',

    /* index.html: expansion vision */
    'One hotel open.': 'एक होटल परिचालन में।',
    'An industrial hospitality platform underway.': 'एक औद्योगिक आतिथ्य मंच निर्माणाधीन।',

    /* index.html: calculator */
    'Run your own numbers': 'अपने आँकड़े चलाएँ',

    /* index.html: structures */
    'Own a hotel,': 'एक होटल रखें,',
    'or own the chain.': 'या पूरी श्रृंखला रखें।',

    /* index.html: investment philosophy */
    'Investment philosophy': 'निवेश दर्शन',
    'We are not selling hotel rooms.': 'हम होटल के कमरे नहीं बेच रहे।',
    'We are building hospitality assets.': 'हम आतिथ्य संपत्तियाँ बना रहे हैं।',

    /* index.html: why invest */
    'Why invest': 'क्यों निवेश करें',
    'An operating business,': 'एक संचालित व्यवसाय,',
    'not an idea.': 'कोई विचार मात्र नहीं।',

    /* index.html / invest.html: process, split headline */
    'From this page': 'इस पृष्ठ से',
    'to a signed agreement.': 'हस्ताक्षरित अनुबंध तक।',
    'Eight steps.': 'आठ चरण।',
    'Nothing asked of you until step five.': 'पाँचवें चरण तक आपसे कुछ नहीं माँगा जाता।',

    /* index.html / invest.html: FAQ, split headline */
    'The hard ones,': 'कठिन सवाल,',
    'answered plainly.': 'सीधे जवाब।',

    /* index.html: founder vision */
    'Founder vision': 'संस्थापक दृष्टि',

    /* index.html: sources, split headline */
    'Where these figures': 'ये आँकड़े',
    'come from.': 'कहाँ से आते हैं।',

    /* index.html: closing CTA band */
    'Hotel Mewad, Sanand': 'होटल मेवाड़, साणंद',
    'The first chapter': 'पहला अध्याय',
    'of something much bigger.': 'कहीं बड़ी चीज़ का।',
    'Built in Sanand. Designed for industrial India. Built to scale.':
      'साणंद में बना। औद्योगिक भारत के लिए डिज़ाइन किया गया। बड़े पैमाने के लिए बना।',
    'Schedule a meeting': 'मीटिंग शेड्यूल करें',
    'Download investment memorandum': 'निवेश ज्ञापन डाउनलोड करें',

    /* invest.html: documents & compliance, split headline */
    'Where your documents': 'आपके दस्तावेज़',
    'actually go.': 'असल में कहाँ जाते हैं।',

    /* invest.html: CTA, split headline */
    'Come see a hotel': 'ऐसा होटल देखिए',
    'with no view.': 'जिसमें कोई नज़ारा नहीं।',

    /* properties.html: site selection, split headline */
    'The four tests': 'वे चार कसौटियाँ',
    'a location has to pass.': 'जिन पर स्थल को खरा उतरना है।',

    /* properties.html: CTA, split headline */
    'Walk one': 'एक बार चलकर देखिए',
    'before you fund one.': 'पैसा लगाने से पहले।',

    /* returns.html: how to read it, split headline */
    'What the model does,': 'यह मॉडल क्या करता है,',
    'and what it refuses to do.': 'और क्या करने से इनकार करता है।',

    /* returns.html: CTA, split headline */
    'Numbers look right?': 'आँकड़े ठीक लगे?',
    'Come and stress-test them with us.': 'आइए, हमारे साथ इन्हें कसकर परखें।'
  }
};
