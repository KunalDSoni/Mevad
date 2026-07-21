/* ==========================================================================
   MEVAD — HINDI

   Two sections:

     data : mirrors the shape of window.MEVAD. Deep-merged over it, so only
            translated fields need to appear. NUMBERS ARE NEVER REPEATED HERE —
            they live in projects.js alone, which stays the single source of
            truth for every figure on the site.

            `status` is deliberately NOT translated: the calculator compares it
            against 'Operational' / 'Under construction' to decide construction
            delay. Its display text is translated through the `ui` map instead.

     ui   : maps normalised English page copy to Hindi. Keyed by the source
            text itself, so the HTML needed no key annotations. A missing entry
            falls back to English rather than breaking.
   ========================================================================== */

window.MEVAD_HI = {

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
      placeholderNotice: 'पूर्वावलोकन संस्करण · इस पृष्ठ का हर आँकड़ा काल्पनिक है, वास्तविक प्रस्ताव नहीं'
    },

    brand: {
      positioning: 'भारत की पहली औद्योगिक होटल श्रृंखला',
      /* Transliterations — please confirm the spelling of both names. */
      contacts: [
        { name: 'हेमेंद्र सिंह सोलंकी' },
        { name: 'भेरू सिंह राजपूत' }
      ]
    },

    market: {
      headline: [
        { label: 'भारत में संगठित औद्योगिक होटल श्रृंखलाएँ', note: 'मेवाड़ पहली है' },
        { label: 'एक सामान्य स्थल के 5 किमी भीतर एंकर कारखाने', note: 'मांग का विपणन नहीं करना पड़ता' },
        { label: 'औद्योगिक गलियारे की मांग कार्यदिवसों की है', note: 'अवकाश होटलों के विपरीत चक्र' },
        { label: 'अनुबंधित कॉर्पोरेट ठहराव पर OTA कमीशन', note: 'सीधी बुकिंग, दर अनुबंध पर' }
      ],
      occupancy: {
        months: ['जन','फर','मार्च','अप्रै','मई','जून','जुल','अग','सित','अक्तू','नव','दिस'],
        series: [
          { label: 'औद्योगिक होटल', sublabel: 'मेवाड़ मॉडल' },
          { label: 'अवकाश होटल', sublabel: 'समकक्ष श्रेणी' }
        ]
      },
      supplyGap: {
        unit: 'प्रति 1,000 औद्योगिक कर्मचारियों पर संगठित होटल कमरे',
        benchmark: { label: 'व्यावसायिक क्षेत्र मानक' },
        corridors: [
          { name: 'साणंद, गुज' },
          { name: 'दहेज, गुज' },
          { name: 'हालोल, गुज' },
          { name: 'चाकण, महा' },
          { name: 'श्री सिटी, आंध्र' },
          { name: 'होसुर, तमि' }
        ]
      }
    },

    demand: [
      {
        title: 'कमीशनिंग टीमें',
        stay: '4–9 महीने',
        body: 'एक नई उत्पादन लाइन के साथ 30–50 इंजीनियर आते हैं, जिन्हें लाइन चालू होने तक लगातार ठहराना पड़ता है। यह एक खरीद आदेश है, बुकिंग नहीं।'
      },
      {
        title: 'EPC ठेकेदार',
        stay: '6–24 महीने',
        body: 'संयंत्र निर्माण वर्षों चलता है। परियोजना प्रबंधक, साइट पर्यवेक्षक और गुणवत्ता कर्मी पूरी अवधि तक उन्हीं कमरों में बदलते रहते हैं।'
      },
      {
        title: 'OEM सेवा इंजीनियर',
        stay: '3–15 रातें',
        body: 'फ़्लोर की हर मशीन के पीछे एक सेवा अनुबंध होता है। मशीन रुकते ही कोई उसी रात पहुँचता है - जो भी दर उपलब्ध हो।'
      },
      {
        title: 'ऑडिटर और क्रेता',
        stay: '2–6 रातें',
        body: 'गुणवत्ता ऑडिट, विक्रेता निरीक्षण और क्रय यात्राएँ तय कैलेंडर पर चलती हैं, चाहे पर्यटन का मौसम हो या न हो।'
      },
      {
        title: 'स्थानांतरित कर्मचारी',
        stay: '1–3 महीने',
        body: 'संयंत्र में स्थानांतरित कर्मचारियों को पारिवारिक आवास मिलने तक अंतरिम ठहराव चाहिए। भुगतान नियोक्ता करता है, कॉर्पोरेट दर अनुबंध पर।'
      },
      {
        title: 'प्रशिक्षण दल',
        stay: '1–4 सप्ताह',
        body: 'प्रशिक्षु बैच और डीलर प्रशिक्षण एक साथ कई कमरे भरते हैं, वार्षिक प्रशिक्षण बजट के विरुद्ध महीनों पहले बुक किए जाते हैं।'
      }
    ],

    asset: {
      intro: 'ऐसे मेहमान के लिए बनाया गया जो रात 2 बजे पहुँचता है, 12 घंटे की शिफ़्ट करता है और महीनों रुकता है। हनीमून के लिए नहीं।',
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
        { title: 'बड़े पैमाने पर लॉन्ड्री', body: 'औद्योगिक स्तर की, उसी दिन, शुल्क में शामिल। यहाँ मेहमान तीन कमीज़ लेकर छह महीने के लिए आता है।' },
        { title: 'काम के लिए बने कमरे', body: 'मेज़, वायर्ड इंटरनेट, दिन में सोने वालों के लिए ब्लैकआउट, और 24 घंटे के उपयोग के अनुरूप ध्वनिरोधन।' },
        { title: 'परिवहन डेस्क', body: 'एंकर संयंत्र के गेट तक निर्धारित शटल, शिफ़्ट बदलने और हवाई अड्डे के आगमन के समय अनुसार।' },
        { title: 'बैठक सुविधाएँ', body: '20 लोगों की विक्रेता समीक्षा के लिए कमरे, क्योंकि विकल्प है शहर के होटल तक दो घंटे की यात्रा।' },
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
        name: 'मेवाड़ दहेज', state: 'गुजरात', corridor: 'दहेज PCPIR · भरूच',
        anchors: ['पेट्रोरसायन', 'विशेष रसायन', 'बंदरगाह लॉजिस्टिक्स'],
        blurb: 'एक पेट्रोरसायन निवेश क्षेत्र जहाँ लगातार शटडाउन और टर्नअराउंड चक्र चलते हैं, हर बार सैकड़ों ठेका कर्मी लाते हैं।'
      },
      {
        name: 'मेवाड़ चाकण', state: 'महाराष्ट्र', corridor: 'चाकण MIDC · पुणे',
        opened: '2027 (अपेक्षित)',
        anchors: ['ऑटोमोटिव OEM', 'भारी इंजीनियरिंग', 'इलेक्ट्रॉनिक्स'],
        blurb: 'भारत की सबसे सघन ऑटो-विनिर्माण पट्टी, जहाँ आने वाले इंजीनियर आज पुणे शहर से डेढ़ घंटे आते-जाते हैं।'
      },
      {
        name: 'मेवाड़ श्री सिटी', state: 'आंध्र प्रदेश', corridor: 'श्री सिटी SEZ · तिरुपति',
        opened: '2028 (अपेक्षित)',
        anchors: ['इलेक्ट्रॉनिक्स', 'FMCG', 'गतिशीलता', 'खाद्य प्रसंस्करण'],
        blurb: 'दो सौ से अधिक इकाइयों वाला बहु-क्षेत्रीय SEZ, जिसके भीतर व्यावहारिक रूप से कोई संगठित आवास नहीं है।'
      },
      {
        name: 'मेवाड़ होसुर', state: 'तमिलनाडु', corridor: 'होसुर · कृष्णागिरि',
        opened: '2028 (अपेक्षित)',
        anchors: ['EV विनिर्माण', 'इलेक्ट्रॉनिक्स', 'एयरोस्पेस'],
        blurb: 'भारत के EV विस्तार का केंद्र, जो बुनियादी ढाँचे से कहीं तेज़ी से पूँजी सोख रहा है।'
      }
    ],

    structures: [
      {
        name: 'स्वामित्व + राजस्व हिस्सेदारी', short: 'राजस्व हिस्सेदारी',
        summary: 'आप एक विशिष्ट, पंजीकृत कमरे के मालिक होते हैं। उस कमरे की कमाई का एक हिस्सा आपको मिलता है।',
        liquidity: 'पंजीकृत इकाई की पुनर्बिक्री',
        risk: 'प्रतिफल अधिभोग के साथ बदलता है',
        forWho: 'वे निवेशक जो अच्छे प्रदर्शन का लाभ चाहते हैं और उतार-चढ़ाव स्वीकार कर सकते हैं।',
        detail: 'कमरे का राजस्व ADR × 365 × अधिभोग से निकाला जाता है। परिचालन लागत मेवाड़ वहन करता है; मालिक का हिस्सा शुद्ध कमरा राजस्व पर तय होकर तिमाही भुगतान होता है।'
      },
      {
        name: 'स्वामित्व + निश्चित प्रतिफल', short: 'निश्चित प्रतिफल',
        summary: 'कमरा आपका। मेवाड़ उसे तय वार्षिक दर पर पट्टे पर लेता है, अधिभोग चाहे जो हो।',
        liquidity: 'पंजीकृत इकाई की पुनर्बिक्री',
        risk: 'निश्चित भुगतान, मेवाड़ की साख पर निर्भर',
        forWho: 'वे निवेशक जो अधिक लाभ की संभावना से ऊपर निश्चितता को महत्व देते हैं।',
        detail: 'पट्टा/लाइसेंस अनुबंध वार्षिक भुगतान तय कर देता है। यह अधिभोग के साथ नहीं बदलता - अर्थात् संपत्ति के बेहतर प्रदर्शन पर भी नहीं बढ़ता।'
      },
      {
        name: 'मिश्रित: पहले न्यूनतम, फिर हिस्सेदारी', short: 'मिश्रित',
        summary: 'संपत्ति के स्थिर होने तक एक सुनिश्चित न्यूनतम, उसके बाद राजस्व हिस्सेदारी।',
        liquidity: 'पंजीकृत इकाई की पुनर्बिक्री',
        risk: 'शुरू में सुरक्षित, बाद में परिवर्तनशील',
        forWho: 'वे निवेशक जो उद्घाटन-पूर्व संपत्ति में निवेश करते हुए शुरुआती अवधि में सुरक्षा चाहते हैं।',
        detail: 'पहले तीन वर्ष मालिक को न्यूनतम राशि या राजस्व हिस्सेदारी, जो अधिक हो, मिलती है। चौथे वर्ष से केवल राजस्व हिस्सेदारी, थोड़े कम प्रतिशत पर - यही पहले मिली सुरक्षा की कीमत है।'
      },
      {
        name: 'SPV इकाइयाँ', short: 'SPV इकाइयाँ',
        summary: 'कई मेवाड़ होटलों को रखने वाली इकाई में हिस्सेदारी। कोई विशिष्ट कमरा नहीं; पूरे पोर्टफोलियो में भागीदारी।',
        liquidity: 'इकाई हस्तांतरण, SPV अनुबंध के अधीन',
        risk: 'कई संपत्तियों में विविधीकृत; किसी एक पर निर्भरता नहीं',
        forWho: 'वे निवेशक जो एक होटल नहीं, पूरी श्रृंखला चाहते हैं, वह भी कम प्रवेश राशि पर।',
        detail: 'प्रतिफल SPV की हर संपत्ति के मिश्रित प्रदर्शन पर तय होता है, जिससे किसी एक संपत्ति की शुरुआती अवधि का असर घट जाता है। पूरा कमरा नहीं खरीदा जाता, इसलिए प्रवेश राशि कम रहती है।'
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
        heading: 'चारों संरचनाएँ, वही पूँजी',
        payoutYr: 'स्थिर वार्षिक भुगतान',
        perMonth: 'प्रति माह',
        yieldOnCost: 'लागत पर प्रतिफल',
        firstPayout: 'पहला भुगतान',
        income: 'आय',
        exitValue: 'निकास मूल्य',
        multiple: 'कुल / निवेशित',
        footnote: 'IRR पूरी नकदी-प्रवाह शृंखला पर निकाला जाता है: वर्ष शून्य में पूँजी बाहर, हर वर्ष भुगतान, और अवधि के अंत में हिस्सेदारी की बिक्री। निर्माण और स्थिरीकरण भी लागू हैं - जो संपत्ति खुली ही नहीं, वह भुगतान नहीं करती।'
      }
    },

    journey: [
      { step: 'थीसिस समझें', body: 'समझें कि औद्योगिक आतिथ्य भारत की हर दूसरी होटल संपत्ति से अलग व्यवहार क्यों करता है।', where: 'इसी वेबसाइट पर' },
      { step: 'अपना प्रतिफल आँकें', body: 'चारों संरचनाओं पर अपने आँकड़े चलाएँ, निचले परिदृश्य सहित।', where: 'इसी वेबसाइट पर' },
      { step: 'अपनी संरचना चुनें', body: 'संपत्ति, राशि और वह प्रतिफल मॉडल चुनें जो आपकी जोखिम क्षमता से मेल खाए।', where: 'इसी वेबसाइट पर' },
      { step: 'मीटिंग बुक करें', body: 'निवेश टीम के साथ 45 मिनट की बातचीत। कोई बाध्यता नहीं, कोई दस्तावेज़ नहीं।', where: 'शेड्यूलिंग' },
      { step: 'KYC पूरा करें', body: 'पहचान और धन-स्रोत सत्यापन, पूरी तरह हमारे अनुपालन साझेदार द्वारा।', where: 'अनुपालन साझेदार' },
      { step: 'निवेशक किट प्राप्त करें', body: 'संपत्ति के वित्तीय विवरण, कानूनी संरचना, स्वामित्व दस्तावेज़ और पूरा अनुबंध, ईमेल पर।', where: 'ईमेल' },
      { step: 'स्थल का दौरा करें', body: 'संपत्ति देखें। संचालन टीम से मिलें। पड़ोस के एंकर उद्यमों से बात करें।', where: 'स्थल पर' },
      { step: 'हस्ताक्षर और भुगतान', body: 'अनुबंध पर डिजिटल हस्ताक्षर करें और पंजीकरण पूरा करें।', where: 'ई-हस्ताक्षर' }
    ],

    faq: [
      {
        q: 'यदि कोई एक एंकर कारखाना बंद हो जाए तो क्या होगा?',
        a: 'कोई भी मेवाड़ स्थल एक ही किरायेदार पर निर्भर नहीं है। हर संपत्ति एक निश्चित दायरे में, एक से अधिक क्षेत्रों में फैले, न्यूनतम संख्या में स्वतंत्र एंकर नियोक्ताओं के आधार पर आँकी जाती है, ताकि किसी एक संयंत्र का बंद होना झेला जा सके, घातक न हो।'
      },
      {
        q: 'औद्योगिक ADR शहरी होटलों से कम है। यह अच्छा कैसे हुआ?',
        a: 'अकेले यह अच्छा नहीं है - संयोजन में अच्छा है। कम दर, कहीं अधिक और स्थिर अधिभोग, लगभग शून्य ग्राहक-अधिग्रहण लागत और मौसमी गिरावट का अभाव मिलकर ऐसा RevPAR बनाते हैं जो किसी एक शिखर महीने में कम प्रभावशाली, पर दशक भर में कहीं अधिक भरोसेमंद होता है। आप वक्र का आकार खरीद रहे हैं, उसका सबसे ऊँचा बिंदु नहीं।'
      },
      {
        q: 'क्या निश्चित प्रतिफल की गारंटी है?',
        a: 'यह संचालन इकाई का अनुबंधात्मक दायित्व है, नियामक अर्थ में गारंटी नहीं, और यह उतना ही मज़बूत है जितनी उसके पीछे की साख। इसीलिए इस साइट का कैलकुलेटर उसके साथ-साथ राजस्व हिस्सेदारी भी दिखाता है: निश्चित राशि लेने का निर्णय करने से पहले आपको पता होना चाहिए कि संपत्ति वास्तव में कितना कमाती है।'
      },
      {
        q: 'क्या मैं स्वयं उस कमरे में रुक सकता हूँ?',
        a: 'मालिक के ठहरने के अधिकार अनुबंध में तय हैं और संरचना के अनुसार बदलते हैं। ये जानबूझकर सीमित हैं - जिस कमरे में मालिक रुकता है, वह कमरा उस समय कमाई नहीं कर रहा होता।'
      },
      {
        q: 'मैं निवेश से बाहर कैसे निकलूँ?',
        a: 'स्वामित्व संरचनाओं से निकास पंजीकृत इकाई बेचकर होता है; SPV इकाइयाँ SPV अनुबंध की शर्तों के अनुसार हस्तांतरित होती हैं। दोनों में से कोई भी सूचीबद्ध प्रतिभूति नहीं है, और न ही इन्हें तरल माना जाना चाहिए। पूरी अवधि की योजना बनाकर चलें।'
      },
      {
        q: 'होटलों का संचालन कौन करता है?',
        a: 'श्रृंखला की हर संपत्ति का संचालन मेवाड़ स्वयं करता है। ब्रांड, मानक और कॉर्पोरेट दर अनुबंध ही असली संपत्ति हैं; संचालन बाहर देने का अर्थ होगा वही चीज़ गँवा देना जो मांग को अनुबंधात्मक बनाती है।'
      }
    ],

    legal: {
      disclaimer: 'इस वेबसाइट पर दिखाए गए सभी आँकड़े, प्रतिफल कैलकुलेटर के हर परिणाम सहित, बताई गई मान्यताओं पर आधारित उदाहरणात्मक अनुमान हैं। ये न पूर्वानुमान हैं, न गारंटी, और न ही निवेश का प्रस्ताव या आमंत्रण। वास्तविक प्रतिफल भिन्न होंगे, काफ़ी कम हो सकते हैं, और ऋणात्मक भी हो सकते हैं। होटल निवेश तरल नहीं होते, अधिभोग, दर, नियामक और संचालक जोखिम के अधीन होते हैं, और इनमें पूँजी सुरक्षित नहीं होती। इस साइट पर कुछ भी निवेश, कानूनी या कर सलाह नहीं है। संभावित निवेशक पूँजी लगाने से पहले पूरा प्रस्ताव दस्तावेज़ अवश्य पढ़ें और स्वतंत्र पेशेवर सलाह लें।'
    }
  },

  /* ----------------------------------------------------------------------
     PAGE COPY — keyed by the normalised English source string
     ---------------------------------------------------------------------- */
  ui: {
    /* Nav + chrome */
    'Thesis': 'थीसिस',
    'Demand': 'मांग',
    'Properties': 'संपत्तियाँ',
    'Returns': 'प्रतिफल',
    'Invest': 'निवेश',
    'Book a meeting': 'मीटिंग बुक करें',
    'MEVAD': 'मेवाड़',
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
    'Illustrative figures only - not an offer to invest.': 'केवल उदाहरणात्मक आँकड़े - निवेश का प्रस्ताव नहीं।',

    /* Hero */
    "India's first industrial hotel chain": 'भारत की पहली औद्योगिक होटल श्रृंखला',
    "Tourists cancel.<br><em>Factories don't.</em>": 'पर्यटक रद्द करते हैं।<br><em>कारखाने नहीं।</em>',
    "Mevad builds hotels inside India's industrial corridors - where a commissioning team of forty needs beds for eight months, and the nearest decent room is ninety minutes away. Demand here arrives on a purchase order, not a whim.":
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
    'The Mevad hotel': 'मेवाड़ होटल',
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
    '<strong>Lower ADR. Higher, steadier RevPAR.</strong> That trade is the entire proposition, and it is the one most investors get backwards. A Mevad room will never command what a beachfront suite commands in December. It will also never sit empty in July.':
      '<strong>कम ADR। अधिक और अधिक स्थिर RevPAR।</strong> यही अदला-बदली पूरा प्रस्ताव है, और अधिकांश निवेशक इसे उल्टा समझते हैं। मेवाड़ का कमरा वह दर कभी नहीं पाएगा जो दिसंबर में समुद्रतट का सुइट पाता है। पर वह जुलाई में खाली भी कभी नहीं रहेगा।',
    'You are not buying the highest point on the curve. You are buying <strong>the shape of the curve</strong> - and over a ten-year hold, shape beats peak. The chart below is the whole argument in one picture.':
      'आप वक्र का सबसे ऊँचा बिंदु नहीं खरीद रहे। आप <strong>वक्र का आकार</strong> खरीद रहे हैं - और दस साल की अवधि में आकार शिखर से बड़ा पड़ता है। नीचे का चार्ट पूरा तर्क एक तस्वीर में है।',

    /* Exhibit 1 */
    'Exhibit 01: occupancy': 'प्रदर्श 01: अधिभोग',
    'One of these is an investment. The other is a season.': 'इनमें से एक निवेश है। दूसरा एक मौसम।',
    'Monthly occupancy: industrial vs leisure': 'मासिक अधिभोग: औद्योगिक बनाम अवकाश',
    'Illustrative stabilised year. Hover for monthly values.': 'उदाहरणात्मक स्थिर वर्ष। मासिक आँकड़ों के लिए कर्सर ले जाएँ।',
    'Industrial hotel - Mevad model': 'औद्योगिक होटल - मेवाड़ मॉडल',
    'Leisure hotel - comparable tier': 'अवकाश होटल - समकक्ष श्रेणी',
    'Show data table': 'डेटा तालिका देखें',
    'Month': 'माह',
    'The leisure line peaks higher. It also spends a third of the year below 50% - and a hotel at 40% occupancy is not earning a reduced return, it is losing money, because the cost base does not shrink when the guests leave.':
      'अवकाश वाली रेखा ऊँचा शिखर छूती है। वह साल का एक तिहाई हिस्सा 50% से नीचे भी बिताती है - और 40% अधिभोग वाला होटल कम प्रतिफल नहीं कमा रहा होता, वह घाटे में होता है, क्योंकि मेहमानों के जाने से लागत घटती नहीं।',
    'The industrial line never touches the leisure peak. It never touches the leisure trough either. <strong>Stability is the product</strong> - and it is what turns a hotel from a trade into an asset.':
      'औद्योगिक रेखा अवकाश वाले शिखर को कभी नहीं छूती। वह उसकी गहराई को भी कभी नहीं छूती। <strong>स्थिरता ही उत्पाद है</strong> - और यही होटल को सौदे से संपत्ति बनाती है।',

    /* Exhibit 2 */
    'Exhibit 02: supply': 'प्रदर्श 02: आपूर्ति',
    'India is building factories faster than it is building beds.': 'भारत कारखाने बिस्तरों से तेज़ बना रहा है।',
    'PLI, Gati Shakti and the freight corridors have moved hundreds of thousands of manufacturing jobs into industrial estates. Organised hospitality did not follow.':
      'PLI, गति शक्ति और माल गलियारों ने लाखों विनिर्माण नौकरियाँ औद्योगिक क्षेत्रों में पहुँचा दीं। संगठित आतिथ्य पीछे नहीं आया।',
    'Organised hotel rooms per 1,000 industrial workers': 'प्रति 1,000 औद्योगिक कर्मचारियों पर संगठित होटल कमरे',
    'Selected corridors, against the business-district benchmark.': 'चुनिंदा गलियारे, व्यावसायिक क्षेत्र के मानक के मुकाबले।',
    'Every corridor above runs at a fraction of the benchmark. That gap is not a forecast or a projection - it is the current state of the ground, and it is why an engineer flying into Dahej tonight will sleep in an unbranded lodge or commute from Vadodara.':
      'ऊपर का हर गलियारा मानक के एक अंश पर चल रहा है। यह अंतर कोई पूर्वानुमान या प्रक्षेपण नहीं - यह ज़मीन की मौजूदा हालत है, और इसीलिए आज रात दहेज पहुँचने वाला इंजीनियर या तो बेनाम लॉज में सोएगा या वडोदरा से आना-जाना करेगा।',
    'Supply gaps this wide usually close fast. This one has not, because building a hotel for factories requires you to want the least glamorous asset in hospitality. <strong>That reluctance is the moat.</strong>':
      'इतने चौड़े आपूर्ति अंतर आमतौर पर जल्दी भर जाते हैं। यह नहीं भरा, क्योंकि कारखानों के लिए होटल बनाने का अर्थ है आतिथ्य की सबसे कम चमकदार संपत्ति चाहना। <strong>यही अनिच्छा हमारी खाई है।</strong>',

    /* Demand */
    'The demand engine': 'मांग का इंजन',
    'Six reasons a room stays full on a Tuesday in July.': 'जुलाई के मंगलवार को कमरा भरा रहने के छह कारण।',
    'None of these guests chose the destination. Every one of them is billed to a corporate account against a budget approved months in advance.':
      'इनमें से किसी मेहमान ने गंतव्य नहीं चुना। हर एक का बिल कॉर्पोरेट खाते में जाता है, महीनों पहले स्वीकृत बजट के विरुद्ध।',

    /* Asset */
    'The asset': 'संपत्ति',
    'Built for the guest who arrives at 2am.': 'उस मेहमान के लिए बना जो रात 2 बजे पहुँचता है।',
    'Engineered around a person who works a twelve-hour shift and stays for months. Every design decision follows from that, and none of them follow from a brochure.':
      'ऐसे व्यक्ति को ध्यान में रखकर बनाया गया जो बारह घंटे की शिफ़्ट करता है और महीनों रुकता है। हर डिज़ाइन निर्णय इसी से निकला है, किसी विज्ञापन पुस्तिका से नहीं।',
    'Property specification': 'संपत्ति विशिष्टियाँ',
    'Standard across the chain.': 'पूरी श्रृंखला में एक समान।',
    'A city hotel treats a long-stay guest as an anomaly. A Mevad hotel is built for them: forty per cent of keys are long-stay inventory, the kitchen runs to shift timings rather than restaurant timings, and the laundry is sized for a guest who packed three shirts for a six-month posting.':
      'शहर का होटल लंबे ठहराव वाले मेहमान को अपवाद मानता है। मेवाड़ होटल उसी के लिए बना है: चालीस प्रतिशत कमरे दीर्घ-ठहराव के हैं, रसोई रेस्तराँ के नहीं बल्कि शिफ़्ट के समय पर चलती है, और लॉन्ड्री उस मेहमान के हिसाब से है जो छह महीने की तैनाती पर तीन कमीज़ लेकर आया है।',
    'None of it photographs well. All of it is why the anchor plant next door signs an annual rate agreement instead of putting people in a lodge.':
      'इसमें से कुछ भी तस्वीर में अच्छा नहीं लगता। इसी सबके कारण पड़ोस का एंकर संयंत्र लोगों को लॉज में ठहराने के बजाय वार्षिक दर अनुबंध करता है।',

    /* Chain */
    'The chain': 'श्रृंखला',
    'Five corridors. One operating standard.': 'पाँच गलियारे। एक संचालन मानक।',
    'Each property is underwritten against the industrial base around it - the count of anchor employers, the sector mix, and the distance to the gate.':
      'हर संपत्ति अपने आसपास के औद्योगिक आधार पर आँकी जाती है - एंकर नियोक्ताओं की संख्या, क्षेत्रों का मिश्रण, और गेट तक की दूरी।',
    'We build where the trucks are.': 'हम वहाँ बनाते हैं जहाँ ट्रक हैं।',
    'Every Mevad site is chosen the same way: count the anchor employers inside a fixed radius, check the sector mix, measure the drive to the plant gate. If the industrial base does not carry the hotel on its own, we do not build.':
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
    '<strong>Why we show all four structures at once.</strong> An assured return looks best in a downside year and worst in a good decade. A revenue share is the reverse. Seeing them side by side against the same property is the only honest way to choose between them.':
      '<strong>हम चारों संरचनाएँ एक साथ क्यों दिखाते हैं।</strong> निश्चित प्रतिफल बुरे वर्ष में सबसे अच्छा और अच्छे दशक में सबसे कमज़ोर दिखता है। राजस्व हिस्सेदारी में उल्टा होता है। एक ही संपत्ति पर उन्हें अगल-बगल देखना ही उनके बीच चुनाव का एकमात्र ईमानदार तरीका है।',
    '<strong>Why the first payout is not year one.</strong> A property under construction cannot pay a return, and one that just opened does not reach stabilised occupancy for a further nine to twelve months. The model applies both. Projections that skip this are the reason investors are disappointed.':
      '<strong>पहला भुगतान पहले वर्ष क्यों नहीं।</strong> निर्माणाधीन संपत्ति प्रतिफल नहीं दे सकती, और अभी-अभी खुली संपत्ति नौ से बारह महीने तक स्थिर अधिभोग तक नहीं पहुँचती। यह मॉडल दोनों लागू करता है। जो अनुमान इसे छोड़ देते हैं, वही निवेशकों की निराशा का कारण बनते हैं।',
    'How to read it': 'इसे कैसे पढ़ें',
    'What the model does, and what it refuses to do.': 'यह मॉडल क्या करता है, और क्या करने से इनकार करता है।',
    'It uses IRR, not headline yield': 'यह IRR इस्तेमाल करता है, सुर्खियों वाला प्रतिफल नहीं',
    'It applies construction and ramp-up': 'यह निर्माण और शुरुआती अवधि को लागू करता है',
    'It shows the downside first-class': 'यह निचले परिदृश्य को बराबरी का दर्जा देता है',
    'It cannot predict the future': 'यह भविष्य नहीं बता सकता',

    /* Structures / invest */
    'Four ways in': 'भीतर आने के चार रास्ते',
    'Own a room, own a floor of the return, or own the chain.':
      'एक कमरा रखें, प्रतिफल की एक न्यूनतम सीमा रखें, या पूरी श्रृंखला रखें।',
    'The same asset, four risk profiles. Pick the one that matches how you want to be exposed - not the one with the largest number on it.':
      'वही संपत्ति, चार जोखिम प्रोफ़ाइल। वह चुनें जो आपकी जोखिम इच्छा से मेल खाए - वह नहीं जिस पर सबसे बड़ा आँकड़ा लिखा है।',
    'Choose your exposure, not your number.': 'अपना जोखिम चुनें, अपना आँकड़ा नहीं।',
    'The same hotel can be bought four ways. The difference between them is not how much you might make - it is what you are exposed to, and when you get paid.':
      'वही होटल चार तरीकों से खरीदा जा सकता है। इनका फ़र्क़ यह नहीं कि आप कितना कमा सकते हैं - बल्कि यह कि आप किस जोखिम में हैं, और भुगतान कब मिलता है।',

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

    /* properties.html — the four site-selection tests */
    'A minimum count of independent anchor employers within the catchment. Not one large plant - several, under separate ownership, so that a single closure is absorbed rather than fatal.':
      'एक निश्चित दायरे के भीतर स्वतंत्र एंकर नियोक्ताओं की न्यूनतम संख्या। कोई एक बड़ा संयंत्र नहीं - बल्कि कई, अलग-अलग स्वामित्व वाले, ताकि किसी एक के बंद होने का असर झेला जा सके, घातक न हो।',
    "More than one industry represented. Automotive, chemicals, electronics and pharma do not enter downturns on the same calendar, and a corridor that depends on one sector inherits that sector's cycle.":
      'एक से अधिक उद्योग मौजूद हों। ऑटोमोटिव, रसायन, इलेक्ट्रॉनिक्स और फार्मा एक ही समय मंदी में नहीं जाते, और जो गलियारा एक ही क्षेत्र पर निर्भर है वह उसी क्षेत्र का चक्र ढोता है।',
    'Under fifteen minutes to the anchor gate. Beyond that, a guest weighs the hotel against a longer commute from the nearest city, and the pricing power that makes the asset work disappears.':
      'एंकर गेट तक पंद्रह मिनट से कम। उससे आगे मेहमान होटल की तुलना नज़दीकी शहर से लंबी यात्रा के साथ करने लगता है, और वह मूल्य-शक्ति ख़त्म हो जाती है जो इस संपत्ति को चलाती है।',
    'Organised room supply well below the business-district benchmark, with no credible pipeline. We are looking for a gap that has stayed open - because a gap that stayed open is a gap others considered and declined.':
      'संगठित कमरों की आपूर्ति व्यावसायिक क्षेत्र के मानक से काफ़ी नीचे हो, और कोई विश्वसनीय परियोजना पाइपलाइन में न हो। हम ऐसा अंतर खोजते हैं जो खुला रह गया हो - क्योंकि जो अंतर खुला रह गया, उसे औरों ने देखा और छोड़ दिया।',

    /* returns.html — how to read the model */
    'A headline yield tells you nothing about <em>when</em> money arrives. The IRR here runs a full cashflow - capital out at year zero, each year\'s payout in sequence, and the sale of the holding at the end. Money received in year eight is discounted accordingly, because it is worth less than money received in year one.':
      'सुर्खियों वाला प्रतिफल यह नहीं बताता कि पैसा <em>कब</em> आता है। यहाँ IRR पूरी नकदी-प्रवाह शृंखला पर चलता है - वर्ष शून्य में पूँजी बाहर, हर वर्ष का भुगतान क्रम से, और अंत में हिस्सेदारी की बिक्री। आठवें वर्ष मिला पैसा उसी अनुपात में छूट पाता है, क्योंकि वह पहले वर्ष मिले पैसे से कम मूल्यवान है।',
    'A property under construction pays nothing until it opens. One that has just opened runs below stabilised occupancy for a further nine to twelve months. Both are modelled. This is the single most common omission in Indian hospitality projections, and it is why returns disappoint.':
      'निर्माणाधीन संपत्ति खुलने तक कुछ नहीं देती। और जो अभी-अभी खुली है वह अगले नौ से बारह महीने स्थिर अधिभोग से नीचे चलती है। मॉडल दोनों लागू करता है। भारतीय आतिथ्य अनुमानों में यही सबसे आम चूक है, और इसी से प्रतिफल निराश करते हैं।',
    'The downside scenario is not a footnote - it is a button, and it moves the same numbers the upside does. In a genuine downside the assured structure outperforms the revenue share. We would rather show you that than have you discover it in year four.':
      'निचला परिदृश्य कोई फ़ुटनोट नहीं - वह एक बटन है, और वह उन्हीं आँकड़ों को हिलाता है जिन्हें ऊपरी परिदृश्य हिलाता है। सच्ची गिरावट में निश्चित प्रतिफल राजस्व हिस्सेदारी से बेहतर करता है। हम चाहेंगे कि आप यह अभी जान लें, चौथे वर्ष में नहीं।',
    'Every output is arithmetic performed on assumptions you can see and change. It is not a forecast. Occupancy, rate, capital appreciation and operator performance are all uncertain, and the true outcome may fall outside every scenario shown here - including below the downside.':
      'हर परिणाम उन मान्यताओं पर किया गया गणित है जिन्हें आप देख और बदल सकते हैं। यह पूर्वानुमान नहीं है। अधिभोग, दर, पूँजी वृद्धि और संचालक का प्रदर्शन - सब अनिश्चित हैं, और वास्तविक नतीजा यहाँ दिखाए हर परिदृश्य के बाहर भी जा सकता है, निचले परिदृश्य से भी नीचे।',

    /* invest.html */
    '<strong>There is no best structure.</strong> In a strong decade the revenue share wins. In a weak one the assured return wins, and it wins decisively. The hybrid gives up some of both to reduce the range of outcomes, and the SPV trades single-asset upside for the smoothing effect of a portfolio.':
      '<strong>कोई एक सर्वश्रेष्ठ संरचना नहीं है।</strong> अच्छे दशक में राजस्व हिस्सेदारी जीतती है। कमज़ोर दशक में निश्चित प्रतिफल जीतता है, और निर्णायक रूप से। मिश्रित संरचना नतीजों का दायरा घटाने के लिए दोनों में से कुछ छोड़ती है, और SPV एक ही संपत्ति के अतिरिक्त लाभ के बदले पोर्टफोलियो का संतुलन देता है।',
    'Anyone who tells you one of these dominates the others has not modelled the downside. <a href="returns.html" style="color:var(--accent-ink)">Run it yourself</a> - set occupancy to 40% and watch the ranking invert.':
      'जो आपसे कहे कि इनमें से कोई एक बाक़ी सब पर भारी है, उसने गिरावट का आकलन नहीं किया। <a href="returns.html" style="color:var(--accent-ink)">स्वयं चलाकर देखिए</a> - अधिभोग 40% पर रखिए और क्रम को उलटते देखिए।',
    'Run it yourself': 'स्वयं चलाकर देखिए',
    'This site collects no identity documents and stores no personal files. KYC is handled entirely by a regulated compliance partner on their own infrastructure, and the link is issued to you directly after the first call.':
      'यह वेबसाइट कोई पहचान दस्तावेज़ नहीं लेती और कोई निजी फ़ाइल संग्रहित नहीं करती। KYC पूरी तरह एक विनियमित अनुपालन साझेदार द्वारा, उनके अपने बुनियादी ढाँचे पर किया जाता है, और उसका लिंक पहली बातचीत के बाद सीधे आपको भेजा जाता है।',
    'Identity verification, address proof and source-of-funds declaration, as required for a property transaction in India. NRI investors have an additional set determined by residency and the funding route.':
      'पहचान सत्यापन, पता प्रमाण और धन-स्रोत घोषणा, जैसा भारत में संपत्ति लेन-देन के लिए आवश्यक है। अनिवासी भारतीय निवेशकों के लिए निवास और भुगतान मार्ग के अनुसार कुछ अतिरिक्त दस्तावेज़ लगते हैं।',
    'The agreement is executed through a recognised e-signature provider. Where the structure involves a registered unit, physical registration follows at the relevant sub-registrar office.':
      'अनुबंध एक मान्यता प्राप्त ई-हस्ताक्षर सेवा के माध्यम से निष्पादित होता है। जहाँ संरचना में पंजीकृत इकाई शामिल है, वहाँ भौतिक पंजीकरण संबंधित उप-पंजीयक कार्यालय में होता है।'
  }
};
