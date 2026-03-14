// ============================================================
// Planville News Dashboard — Kuratierte Branchennews
// Aktuelle News, Reddit & Social Media (Q4 2025 – März 2026)
// ============================================================

const TOPICS = [
  { id: 'photovoltaik', label: 'Photovoltaik', icon: 'sun' },
  { id: 'waermepumpen', label: 'Wärmepumpen', icon: 'thermometer' },
  { id: 'dachsanierung', label: 'Dach & Fenster', icon: 'home' },
  { id: 'foerderung', label: 'Förderung & Politik', icon: 'landmark' },
  { id: 'energiewende', label: 'Energiewende', icon: 'leaf' },
  { id: 'mieterstrom', label: 'Mieterstrom', icon: 'building' },
  { id: 'innovation', label: 'Innovation', icon: 'lightbulb' },
  { id: 'handwerk', label: 'Handwerk & Qualität', icon: 'wrench' },
  { id: 'pvpflicht', label: 'PV-Pflicht', icon: 'shield-check' },
];

const SENTIMENTS = ['positiv', 'neutral', 'negativ'];
const SOURCES = ['news', 'reddit', 'social'];
const SOURCE_LABELS = { news: 'Nachricht', reddit: 'Reddit', social: 'Social Media' };

// Kuratierte Artikel — sortiert nach Datum (neueste zuerst)
const DEMO_ARTICLES = [
  // 1 — Mar 6, 2026
  {
    title: 'Photovoltaik erreicht 16 Prozent der deutschen Stromproduktion',
    summary: 'Laut aktuellen Zahlen der Bundesnetzagentur hat Photovoltaik erstmals 16 Prozent der gesamten deutschen Stromproduktion erreicht. Der kontinuierliche Zubau und sinkende Modulpreise treiben die Entwicklung. Besonders Aufdach-Anlagen auf Ein- und Mehrfamilienhäusern wachsen stark.',
    source: 'news',
    outlet: 'pv magazine',
    sourceUrl: 'https://www.pv-magazine.de/2026/03/06/photovoltaik-erreicht-16-prozent-der-deutschen-stromproduktion/',
    topic: 'photovoltaik',
    sentiment: 'positiv',
    relevance: 95,
    dateStr: '2026-03-06',
    aiInsight: 'Starker Aufhänger für einen Reel: "16% Deutschlands Strom kommt von der Sonne — und ein Teil davon von unseren Dächern!" Zeigt Planville-Projektbilder und feiert eure Kunden.',
    contentIdeas: [
      { type: 'Reel', hook: '"2015 waren es 6%. Heute 16%. Und jedes vierte neue Dach in NRW bekommt jetzt PV. Hier sind 3 Gründe, warum der Boom gerade erst anfängt."', hashtags: '#Photovoltaik #Solarrekord #Energiewende #NRW #Aufdachanlage' },
      { type: 'Karussell', hook: '16% Solarstrom — aber was passiert an bewölkten Tagen? 5 Mythen über PV-Leistung im Winter, widerlegt mit echten Monitoring-Daten', hashtags: '#SolarMythen #PVLeistung #Faktencheck #Photovoltaik #Monitoring' },
    ],
  },
  // 2 — Mar 3, 2026
  {
    title: 'TikTok-Trend: Hausbesitzer vergleichen Stromrechnungen vor und nach PV-Anlage',
    summary: 'Unter #Photovoltaik2026 zeigen Hausbesitzer ihre Stromrechnungen im Vorher/Nachher-Vergleich. Manche berichten von über 80% Einsparung. Die Videos erreichen Millionen Views und sorgen für enormes Interesse an PV-Anlagen.',
    source: 'social',
    outlet: 'TikTok @sonnefreihaus',
    sourceUrl: 'https://www.tiktok.com/@sonnefreihaus/video/7297902688778358048',
    topic: 'photovoltaik',
    sentiment: 'positiv',
    relevance: 91,
    dateStr: '2026-03-03',
    aiInsight: 'Unbedingt auf diesen Trend aufspringen! Fragt eure Kunden nach Vorher/Nachher-Rechnungen. Authentischer Content mit echten Zahlen wirkt stärker als jede Werbung.',
    contentIdeas: [
      { type: 'Reel/TikTok', hook: '"Ich filme jetzt jeden Monat meine Stromrechnung. Monat 1: 280€. Monat 12 mit PV: 42€. Hier ist der Beweis." — Kunden-Selfie-Video mit echtem App-Screenshot vom Energieversorger', hashtags: '#Stromrechnung #VorherNachher #PVChallenge #SolarSelbstversuch #12MonatePV' },
      { type: 'Story-Serie', hook: '7-Tage-Challenge: Jeden Tag eine echte Kundenstromrechnung posten (mit Erlaubnis). Tag 1: Ehepaar aus Aachen, 9,8 kWp Anlage, 78% Autarkie. Follower raten: Wie viel zahlen sie noch?', hashtags: '#StromrechnungsChallenge #Autarkie #Kundenbeweise #EchteZahlen' },
    ],
  },
  // 3 — Feb 27, 2026
  {
    title: 'Geleakter EEG-Entwurf: Solarförderung für Anlagen bis 25 kW vor dem Aus',
    summary: 'Details zum geleakten EEG-Entwurf zeigen: Die Einspeisevergütung für private PV-Anlagen bis 25 Kilowatt soll komplett gestrichen werden. Die Branche reagiert geschockt. Experten warnen vor einem drastischen Einbruch beim Zubau kleiner Dachanlagen.',
    source: 'news',
    outlet: 'pv magazine',
    sourceUrl: 'https://www.pv-magazine.de/2026/02/27/geleakter-eeg-entwurf-abschaffung-der-solarfoerderung-fuer-photovoltaik-anlagen-bis-25-kilowatt/',
    topic: 'photovoltaik',
    sentiment: 'negativ',
    relevance: 98,
    dateStr: '2026-02-27',
    aiInsight: 'Höchste Dringlichkeit! Informiert eure Community sofort. Positioniert Planville als Experte: "Wir ordnen ein, was der EEG-Entwurf wirklich bedeutet." Call-to-Action: Jetzt noch beraten lassen.',
    contentIdeas: [
      { type: 'Reel', hook: '"Rechenbeispiel: 10 kWp-Anlage OHNE Einspeisevergütung — lohnt sich das noch? Wir rechnen live mit echten Zahlen: Modulpreis, Speicher, Eigenverbrauch, Amortisation. Das Ergebnis überrascht."', hashtags: '#EEGEntwurf #OhneVergütung #PVrechner #Eigenverbrauch #Amortisation' },
      { type: 'Karussell', hook: 'EEG-Entwurf: 3 Szenarien durchgerechnet — Eigenverbrauch pur vs. Cloud-Speicher vs. Nulleinspeisung. Welches Modell schlägt die alte Einspeisevergütung? Slide-für-Slide mit konkreten €-Beträgen', hashtags: '#EEG2026 #Szenariorechnung #PVStrategie #Eigenverbrauch #Wirtschaftlichkeit' },
    ],
  },
  // 4 — Feb 26, 2026
  {
    title: 'EEG-Entwurf geleakt: Komplette Streichung der Förderung privater PV-Anlagen',
    summary: 'Ein internes Papier des Wirtschaftsministeriums sieht die komplette Abschaffung der Einspeisevergütung für private Photovoltaik-Anlagen vor. Die Solarbranche läuft Sturm gegen die Pläne. Der BSW Solar fordert eine sofortige Korrektur.',
    source: 'news',
    outlet: 'pv magazine',
    sourceUrl: 'https://www.pv-magazine.de/2026/02/26/eeg-entwurf-geleakt-komplette-streichung-der-foerderung-privater-photovoltaik-anlagen-vorgesehen/',
    topic: 'foerderung',
    sentiment: 'negativ',
    relevance: 97,
    dateStr: '2026-02-26',
    aiInsight: 'Top-Relevanz! Verbindet die Nachricht mit eurem Beratungsangebot: "Gerade jetzt lohnt sich professionelle Planung. Wir zeigen dir, wie sich PV auch ohne Einspeisevergütung rechnet." Eigenverbrauch-Strategie betonen.',
    contentIdeas: [
      { type: 'LinkedIn-Post', hook: '"Ich habe gestern 47 Anrufe von verunsicherten Kunden bekommen. Alle fragen: Soll ich meine PV-Bestellung stornieren? Hier ist meine ehrliche Antwort als Installateur mit 200+ Anlagen Erfahrung."', hashtags: '#EEGEntwurf #Branchenreaktion #PVBeratung #Klartext #Installateur' },
      { type: 'Reel', hook: '"Dein Nachbar sagt: PV lohnt sich nicht mehr. Hier sind seine 3 Denkfehler — mit dem Taschenrechner widerlegt in 60 Sekunden."', hashtags: '#PVMythen #Denkfehler #Taschenrechner #SolarLohntSich #Faktencheck' },
    ],
  },
  // 5 — Feb 26, 2026
  {
    title: 'Wärmepumpenmarkt 2026: Stabilisierung, Innovationen und neue Marktlogik',
    summary: 'Nach dem Einbruch 2024 stabilisiert sich der deutsche Wärmepumpenmarkt. Neue Geschäftsmodelle, verbesserte Effizienz und die wachsende Akzeptanz in der Bevölkerung sorgen für eine positive Marktentwicklung. Experten sehen den Markt auf einem neuen, nachhaltigen Wachstumspfad.',
    source: 'news',
    outlet: 'DEEA',
    sourceUrl: 'https://deea.de/2026/02/26/der-waermepumpenmarkt-ab-2026-stabilisierung-innovationen-und-neue-marktlogik/',
    topic: 'waermepumpen',
    sentiment: 'positiv',
    relevance: 92,
    dateStr: '2026-02-26',
    aiInsight: 'Comeback-Story! Positioniert Planville als stabilen Partner: "Wir haben nie aufgehört zu installieren, während andere aufgegeben haben." Zeigt installierte WP-Projekte.',
    contentIdeas: [
      { type: 'LinkedIn-Post', hook: '"Die 3 größten Irrtümer, die den WP-Markt 2024 gelähmt haben — und warum sie 2026 widerlegt sind: 1) Zu teuer im Altbau 2) Zu laut für Nachbarn 3) Kein Handwerker verfügbar. Hier sind die aktuellen Fakten."', hashtags: '#Wärmepumpe #MarktComeback #3Irrtümer #Altbau #WPFakten' },
      { type: 'Reel', hook: '"Zeitraffer: Eine Wärmepumpen-Installation von 7 Uhr morgens bis Feierabend. 8 Stunden in 60 Sekunden — vom leeren Keller bis zur laufenden Anlage."', hashtags: '#Wärmepumpe #Zeitraffer #Installation #Handwerk #EinTagEineAnlage' },
    ],
  },
  // 6 — Feb 25, 2026
  {
    title: 'Uni Stuttgart: Perowskit-Solarzellen besser gegen Umwelteinflüsse geschützt',
    summary: 'Forschende der Universität Stuttgart haben einen Durchbruch bei der Stabilität von Perowskit-Solarzellen erzielt. Eine neue Schutzschicht macht die Zellen deutlich widerstandsfähiger gegen Feuchtigkeit und UV-Strahlung. Dies könnte den Weg für kommerzielle Perowskit-Module ebnen.',
    source: 'news',
    outlet: 'Uni Stuttgart',
    sourceUrl: 'https://www.uni-stuttgart.de/universitaet/aktuelles/meldungen/Perowskit-Solarzellen-besser-gegen-Umwelteinfluesse-schuetzen/',
    topic: 'innovation',
    sentiment: 'positiv',
    relevance: 68,
    dateStr: '2026-02-25',
    aiInsight: 'Innovation-Content für technikaffine Follower: "Die Zukunft der Solarzelle kommt aus Deutschland." Erklärt Perowskit einfach und zeigt, was das für die Branche bedeutet.',
    contentIdeas: [
      { type: 'Karussell', hook: 'Silizium vs. Perowskit: Deine aktuelle Solarzelle hat 22% Wirkungsgrad. Die neue aus Stuttgart schafft 33%. Was das für deine nächste Anlage bedeutet — Vergleich in 5 Slides mit Kosten-Nutzen-Rechnung', hashtags: '#Perowskit #Wirkungsgrad #Solarzelle #UniStuttgart #NextGenSolar' },
      { type: 'Reel', hook: '"Diese Solarzelle ist durchsichtig. Sie könnte bald auf jeder Fensterscheibe kleben. Made in Stuttgart." — kurzer Erklärer mit Laborfotos und Zukunftsausblick', hashtags: '#Perowskit #TransparenteSolarzelle #Innovation #ForschungDeutschland' },
    ],
  },
  // 7 — Feb 24, 2026
  {
    title: 'GMG-Eckpunkte: Heizungsgesetz wird grundlegend reformiert',
    summary: 'Die Koalition hat die Eckpunkte für das neue Gebäude-Modernisierungsgesetz (GMG) vorgelegt. Das bisherige GEG (Heizungsgesetz) wird grundlegend überarbeitet. Statt starrer Vorgaben soll es mehr Technologieoffenheit und vereinfachte Förderverfahren geben.',
    source: 'news',
    outlet: 'GEG-Info',
    sourceUrl: 'https://geg-info.de/geg_news/251211_koalitionsausschuss_bundesregierung.htm',
    topic: 'foerderung',
    sentiment: 'neutral',
    relevance: 93,
    dateStr: '2026-02-24',
    aiInsight: 'Wichtiges Thema für eure Kunden! Viele haben wegen GEG-Unsicherheit abgewartet. Jetzt aufklären: "Das neue GMG bringt Klarheit — und wir helfen euch, die richtige Heizung zu wählen."',
    contentIdeas: [
      { type: 'Reel', hook: '"GEG ist tot. GMG lebt. Aber was ändert sich WIRKLICH für dich? 3 Beispiele: Altbau-Besitzer, Neubau-Planer, Vermieter. Jeder bekommt jetzt andere Optionen." — mit Entscheidungsbaum-Grafik', hashtags: '#GMG #GEGAbschaffung #Heizungstausch #Technologieoffenheit #Entscheidungsbaum' },
      { type: 'Blogartikel', hook: '"Dein Nachbar hat 2024 aus Angst vorm GEG seine Gasheizung behalten. Das kostet ihn jetzt: X€ mehr CO₂-Abgabe + Y€ verpasste Förderung. Konkrete Vergleichsrechnung GEG-Abwarter vs. GMG-Umsteiger"', hashtags: '#GMGvsGEG #Heizungsentscheidung #Vergleichsrechnung #CO2Preis #Förderung' },
    ],
  },
  // — Feb 22, 2026 (PV-Pflicht)
  {
    title: 'Solarpflicht NRW: Ab Januar 2026 gilt PV-Pflicht auch bei Dachsanierung im Bestand',
    summary: 'Seit dem 1. Januar 2026 gilt in NRW die Solarpflicht auch für Bestandsgebäude bei vollständiger Dacherneuerung. Eigentümer müssen mindestens 30 Prozent der Nettodachfläche mit PV belegen. Für Ein- und Zweifamilienhäuser reicht eine 3-kWp-Anlage. Bei Verstößen drohen Bußgelder bis 25.000 Euro.',
    source: 'news',
    outlet: 'Verbraucherzentrale NRW',
    sourceUrl: 'https://www.verbraucherzentrale.nrw/energie/solarpflicht-bei-dachsanierungen-in-nrw-was-kommt-auf-eigentuemerinnen-zu-energie-kompakt-114027',
    topic: 'pvpflicht',
    sentiment: 'neutral',
    relevance: 96,
    dateStr: '2026-02-22',
    aiInsight: 'Höchste Relevanz für Planville in NRW! "Dach sanieren = PV drauf. Das ist jetzt Gesetz." Positioniert euch als Komplettanbieter: Dach + PV aus einer Hand. Sofort Hausverwaltungen und Eigentümer ansprechen.',
    contentIdeas: [
      { type: 'Karussell', hook: 'Solarpflicht NRW Checkliste: Wann greift sie (Dachfläche >50m²), was reicht (min. 3 kWp), wer ist befreit (Denkmalschutz), was kostet der Verstoß (bis 25.000€). Slide-für-Slide mit konkreten Schwellenwerten', hashtags: '#SolarpflichtNRW #Checkliste #Dachsanierung #Bußgeld #3kWp' },
      { type: 'Reel', hook: '"Mein Dachdecker hat gesagt: Sie brauchen jetzt auch PV. Ich hab gefragt: Was kostet das extra? Antwort: Bei Dachsanierung + PV zusammen oft günstiger als getrennt. Hier ist warum." — Kostenvergleich-Grafik', hashtags: '#DachPlusPV #Kombipreis #SolarpflichtNRW #Dachsanierung #Spartipp' },
    ],
  },
  // — Feb 20, 2026
  {
    title: 'Neue Schallgrenzwerte ab 2026: Viele Wärmepumpen nicht mehr förderfähig',
    summary: 'Die neuen Schallschutz-Anforderungen für Wärmepumpen machen einige beliebte Modelle ab 2026 nicht mehr förderfähig. Betroffen sind vor allem günstigere Luft-Wasser-Wärmepumpen. Hersteller müssen nachrüsten oder neue, leisere Modelle auf den Markt bringen.',
    source: 'news',
    outlet: 'energie-experten.org',
    sourceUrl: 'https://www.energie-experten.org/news/neue-schall-grenzwerte-ab-2026-ist-meine-luft-waermepumpe-noch-foerderfaehig',
    topic: 'waermepumpen',
    sentiment: 'negativ',
    relevance: 88,
    dateStr: '2026-02-20',
    aiInsight: 'Chance für Beratungs-Content! Planville kann hier Expertise zeigen: "Wir setzen nur auf Modelle, die die neuen Grenzwerte einhalten." Vertrauensaufbau durch Fachkompetenz.',
    contentIdeas: [
      { type: 'Karussell', hook: 'Schall-Ranking: Die 5 leisesten Luft-Wasser-WP 2026 (alle unter 35 dB). Modell, Hersteller, dB-Wert, Förderstatus — direkt vergleichbar. Plus: So misst du den Schall deiner bestehenden Anlage mit dem Handy', hashtags: '#WPSchallschutz #LeisesteWP #35dB #Förderfähig #Modellvergleich' },
      { type: 'Reel', hook: '"Ich stehe 3 Meter neben dieser Wärmepumpe. Hörst du sie? Nein? Das ist das Modell, das wir 2026 verbauen." — Live-Dezibel-Messung auf der Baustelle mit Schallpegel-App', hashtags: '#WärmepumpeLeise #SchallTest #LiveMessung #Dezibel #Nachbarfreundlich' },
    ],
  },
  // 9 — Feb 18, 2026
  {
    title: 'Instagram-Debatte: Über 1.700 Unternehmen protestieren gegen Energiepolitik',
    summary: 'Eine virale Instagram-Kampagne vereint über 1.700 Unternehmen aus der Solar- und Energiebranche, die gegen die geplante Streichung der PV-Förderung protestieren. Die Kampagne erreicht Millionen Nutzer und wird in den Medien breit aufgegriffen.',
    source: 'social',
    outlet: 'Instagram @stimmenderenergiewende',
    sourceUrl: 'https://www.instagram.com/reel/DTan34Aio1k/',
    topic: 'energiewende',
    sentiment: 'negativ',
    relevance: 86,
    dateStr: '2026-02-18',
    aiInsight: 'Positionierung zeigen! "Auch Planville steht für eine bezahlbare Energiewende." Solidarität mit der Branche zeigen und gleichzeitig Lösungen anbieten.',
    contentIdeas: [
      { type: 'Story-Serie', hook: 'Mitarbeiter-Statements: "Warum ich bei einer Solarfirma arbeite, obwohl die Politik uns hängen lässt." 5 Teammitglieder, 5 persönliche Gründe. Authentisch, direkt in die Kamera, kein Script.', hashtags: '#WarumSolar #TeamMotivation #Branchenprotest #TrotzdemWeitermachen' },
      { type: 'Reel', hook: '"Strom vom eigenen Dach: 11 Cent. Strom vom Versorger: 36 Cent. Und die Regierung will die Förderung streichen? Hier sind 3 Modelle, wie Solar sich auch OHNE Förderung rechnet."', hashtags: '#SolarOhneFörderung #Eigenverbrauch #11vs36Cent #Rechenbeispiel' },
    ],
  },
  // 10 — Feb 15, 2026
  {
    title: 'Stromspeicher-Inspektion 2026: Effizienzrekorde und neue Benchmarks',
    summary: 'Die jährliche Stromspeicher-Inspektion der HTW Berlin zeigt neue Effizienzrekorde bei Photovoltaik-Heimspeichern. Die besten Systeme erreichen einen System Performance Index von über 95%. Gleichzeitig werden neue Benchmarks für die Bewertung von Speichersystemen eingeführt.',
    source: 'news',
    outlet: 'IWR',
    sourceUrl: 'https://www.iwr.de/news/stromspeicher-inspektion-2026-effizienzrekorde-und-neue-benchmarks-fuer-photovoltaik-heimspeicher-news39559',
    topic: 'innovation',
    sentiment: 'positiv',
    relevance: 76,
    dateStr: '2026-02-15',
    aiInsight: 'Speicher-Content mit Daten! Zeigt, welche Speicher Planville verbaut und warum. "Wir empfehlen nur Speicher mit Top-Effizienz" — unterstützt mit den Testergebnissen.',
    contentIdeas: [
      { type: 'Reel', hook: '"Dein Speicher verliert 15% deines Solarstroms? Dann hast du den falschen. HTW Berlin hat gemessen: Der beste verliert nur 5%. Hier ist der Unterschied in € pro Jahr." — Vergleichsrechnung', hashtags: '#SpeicherEffizienz #HTWBerlin #SPI95 #Stromverlust #SpeicherVergleich' },
      { type: 'Karussell', hook: 'Speicher-Inspektion 2026: Gewinner vs. Verlierer. 5 Slides: Testsieger-Modell, Schlusslicht-Modell, was den Unterschied macht (Standby-Verbrauch!), wie du deinen prüfst, Kaufempfehlung', hashtags: '#Stromspeicher #Testsieger2026 #StandbyVerbrauch #SpeicherInspektion #PVSpeicher' },
    ],
  },
  // 11 — Feb 12, 2026
  {
    title: 'Energy Sharing ab Juni 2026: Neue Chancen für Mieterstrommodelle',
    summary: 'Ab Juni 2026 wird Energy Sharing in Deutschland rechtlich möglich. Damit können Verbraucher gemeinsam erzeugten Strom über das öffentliche Netz teilen. Für Mieterstrom-Projekte eröffnen sich völlig neue Geschäftsmodelle und Abrechnungsmöglichkeiten.',
    source: 'news',
    outlet: 'Wattmacher NRW',
    sourceUrl: 'https://www.metergrid.de/blog/solarspitzen-gesetz-2025---neue-regelungen-fur-photovoltaik-und-ihre-auswirkungen-auf-mieterstrommodelle',
    topic: 'mieterstrom',
    sentiment: 'positiv',
    relevance: 96,
    dateStr: '2026-02-12',
    aiInsight: 'Höchste Relevanz für Planville-Mieterstrom! "Energy Sharing macht unser Kerngeschäft noch attraktiver." Erklärt das Konzept einfach und zeigt, wie Planville davon profitiert.',
    contentIdeas: [
      { type: 'LinkedIn-Post', hook: '"Beispielrechnung: 20-Parteien-Mietshaus, 30 kWp Dachanlage. Bisher: 4 Mieter nutzen Mieterstrom. Ab Juni mit Energy Sharing: Alle 20. Die Wirtschaftlichkeit verdreifacht sich. Hier ist die vollständige Kalkulation."', hashtags: '#EnergySharing #Mieterstrom #Kalkulation #20Parteien #Wirtschaftlichkeit' },
      { type: 'Reel', hook: '"Du wohnst im 3. Stock und dein Nachbar im EG hat PV auf dem Dach. Ab Juni kannst du seinen Strom kaufen — über das normale Stromnetz. Klingt verrückt? So funktioniert Energy Sharing." — Animierte Grafik: Strom fließt durchs Haus', hashtags: '#EnergySharing #NachbarStrom #Mieterstrom #StromTeilen #AbJuni2026' },
    ],
  },
  // 12 — Feb 10, 2026
  {
    title: 'Niedrigere Netzentgelte: Strompreise sinken 2026 spürbar',
    summary: 'Die Bundesnetzagentur hat niedrigere Netzentgelte für 2026 festgelegt. In Kombination mit dem wachsenden Anteil erneuerbarer Energien sinken die Strompreise für Verbraucher um durchschnittlich 7 Prozent. Experten sehen den Trend als nachhaltig.',
    source: 'news',
    outlet: 'Bundesregierung',
    sourceUrl: 'https://www.bundesregierung.de/breg-de/aktuelles/niedrigere-netzentgelte-2382396',
    topic: 'energiewende',
    sentiment: 'positiv',
    relevance: 78,
    dateStr: '2026-02-10',
    aiInsight: 'Positiv-Story! "Strom wird billiger — und wer eigenen Strom produziert, profitiert doppelt." Verbindet die Nachricht mit dem Eigenverbrauch-Vorteil einer PV-Anlage.',
    contentIdeas: [
      { type: 'Reel', hook: '"Dein Strompreis sinkt um 7%. Klingt gut? Ein Haushalt mit PV + Speicher zahlt 85% weniger als der Durchschnitt. Hier ist die Rechnung: 36ct Netz vs. 11ct eigener Strom vs. 5ct mit Speicheroptimierung." — Split-Screen Vergleich', hashtags: '#Strompreis #7Prozent #PVvsNetz #Speicheroptimierung #EchteErsparnis' },
      { type: 'Karussell', hook: '"Was passiert mit deiner Einspeisevergütung, wenn der Strompreis sinkt? Und warum Eigenverbrauch jetzt noch wichtiger wird." 5 Slides mit Rechenbeispielen und Handlungsempfehlung', hashtags: '#Netzentgelte #Einspeisevergütung #Eigenverbrauch #Strompreis2026' },
    ],
  },
  // 13 — Feb 9, 2026
  {
    title: 'Netzpaket-Entwurf rüttelt am Einspeisevorrang für Erneuerbare',
    summary: 'Ein neuer Gesetzesentwurf zum Netzpaket sieht Einschränkungen beim Anschluss- und Einspeisevorrang für erneuerbare Energien vor. Netzbetreiber sollen mehr Flexibilität bei der Steuerung von Einspeisungen bekommen. Die Solarbranche warnt vor negativen Folgen für Kleinanlagen.',
    source: 'news',
    outlet: 'pv magazine',
    sourceUrl: 'https://www.pv-magazine.de/2026/02/09/netzpaket-entwurf-ruettelt-am-anschluss-und-einspeisevorrang-fuer-erneuerbare/',
    topic: 'photovoltaik',
    sentiment: 'negativ',
    relevance: 82,
    dateStr: '2026-02-09',
    aiInsight: 'Einordnung gefragt! Viele Kunden fragen sich, ob sich PV noch lohnt. Antwortet klar: "Eigenverbrauch bleibt rentabel — und mit Speicher sogar noch mehr." Beratungstermin anbieten.',
    contentIdeas: [
      { type: 'Blogartikel', hook: '"Netzbetreiber darf deinen Wechselrichter drosseln: Was das Netzpaket 2026 für Bestandsanlagen und Neuanlagen bedeutet. Fallbeispiel: 10 kWp-Anlage in NRW — so viel Ertrag verlierst du schlimmstenfalls."', hashtags: '#Netzpaket #Einspeisevorrang #Drosselung #PVErtrag #Bestandsanlage' },
      { type: 'Reel', hook: '"Dein Wechselrichter wird ferngesteuert. Klingt nach Sci-Fi? Ist ab 2026 real. Was du jetzt tun musst, damit deine Anlage trotzdem maximalen Ertrag bringt." — mit Wechselrichter-Display-Close-up', hashtags: '#Wechselrichter #Netzpaket #Fernsteuerung #PVErtrag #SmartMeter' },
    ],
  },
  // 14 — Feb 5, 2026
  {
    title: 'Forum: "Luft-Wasser-WP bei -15°C im Februar — mein Erfahrungsbericht"',
    summary: 'Ein Nutzer im Bauexpertenforum berichtet detailliert über die Leistung seiner Luft-Wasser-Wärmepumpe bei extremer Kälte im Februar 2026. Trotz -15°C liefert die Anlage stabile 45°C Vorlauftemperatur. Die Diskussion zeigt, dass moderne WP auch bei Extremkälte zuverlässig arbeiten.',
    source: 'reddit',
    outlet: 'Bauexpertenforum',
    sourceUrl: 'https://www.bauexpertenforum.de/threads/luft-wasser-waermepumpe-bei-aktueller-arktischer-kaelte.62945/',
    topic: 'waermepumpen',
    sentiment: 'neutral',
    relevance: 85,
    dateStr: '2026-02-05',
    aiInsight: 'Perfekt gegen WP-Angst! Zeigt echte Monitoring-Daten einer Planville-Installation bei Kälte. "Unsere Wärmepumpe bei -15°C: Das zeigen die echten Daten."',
    contentIdeas: [
      { type: 'Karussell', hook: 'Frost-Protokoll: 7 Tage Extremkälte, jeden Tag Screenshot von der WP-App. Vorlauftemperatur, Außentemperatur, COP-Wert, Heizstab-Laufzeit. Slide 6: Gesamtverbrauch in kWh und € für die Woche', hashtags: '#FrostProtokoll #WPMonitoring #COP #Extremkälte #EchteDaten' },
      { type: 'Reel', hook: '"Es hat -15°C. Mein Nachbar mit Gasheizung zahlt 18€ am Tag. Ich mit Wärmepumpe? Ich zeige dir den Zählerstand." — Splitscreen: Gaszähler vs. WP-App-Screenshot, beide am selben Tag', hashtags: '#GasVsWP #Minus15Grad #Zählerstand #Heizkostenvergleich #WinterTest' },
    ],
  },
  // 15 — Feb 3, 2026
  {
    title: 'NRW startet neue Solarförderung für Mehrfamilienhäuser',
    summary: 'Das Land Nordrhein-Westfalen legt ein neues Förderprogramm für Photovoltaik auf Mehrfamilienhäusern auf. Vermieter und Wohnungsbaugesellschaften erhalten bis zu 30% Zuschuss für PV-Anlagen mit Mieterstrommodell. Das Budget beträgt 50 Millionen Euro.',
    source: 'news',
    outlet: 'Wirtschaft.NRW',
    sourceUrl: 'https://www.wirtschaft.nrw/nordrhein-westfalen-liefert-mehr-solarstrom-fuer-alle-neue-foerderung-fuer-photovoltaik-auf',
    topic: 'dachsanierung',
    sentiment: 'positiv',
    relevance: 94,
    dateStr: '2026-02-03',
    aiInsight: 'Direkte Relevanz für Planville in NRW! "30% Zuschuss für PV auf Mehrfamilienhäusern — wir planen und realisieren diese Projekte." Sofort an Hausverwaltungen kommunizieren.',
    contentIdeas: [
      { type: 'LinkedIn-Post', hook: '"Modellrechnung: 8-Parteien-Mietshaus in Düsseldorf. 25 kWp PV-Anlage, Kosten: 38.000€. NRW-Zuschuss: 11.400€. Mieterstrom-Einnahmen: 4.200€/Jahr. Amortisation: 6,3 Jahre statt 9. Welcher Vermieter sagt da nein?"', hashtags: '#NRWFörderung #Mieterstrom #Modellrechnung #Amortisation #Vermieterprofitabel' },
      { type: 'Reel', hook: '"Du bist Vermieter in NRW? Dann musst du JETZT handeln. 50 Mio. Budget, wer zuerst kommt... Hier sind die 4 Schritte zum Förderantrag — in 60 Sekunden."', hashtags: '#Vermieterpflicht #NRWSolar #Förderantrag #50Mio #WerZuerstKommt' },
    ],
  },
  // — Jan 30, 2026 (PV-Pflicht)
  {
    title: 'EU-Gebäuderichtlinie: Bundesweite Solarpflicht rückt bis Mai 2026 näher',
    summary: 'Die EU-Gebäuderichtlinie (EPBD) muss bis Ende Mai 2026 in nationales Recht umgesetzt werden. Sie sieht eine schrittweise Solarpflicht für Neubauten und Bestandsgebäude vor. Experten erwarten, dass Deutschland die Landesregelungen vereinheitlichen und verschärfen wird. Auch Wohngebäude ab 2029 betroffen.',
    source: 'news',
    outlet: 'immowelt.de',
    sourceUrl: 'https://www.immowelt.de/ratgeber/news/eu-gebaeuderichtlinie-2026-bringt-neue-pflichten-fuer-eigentuemer',
    topic: 'pvpflicht',
    sentiment: 'neutral',
    relevance: 88,
    dateStr: '2026-01-30',
    aiInsight: 'Wichtig für Aufklärung! Viele Kunden wissen nicht, dass die EU-Pflicht kommt. "Die Solarpflicht wird bundesweit — wer jetzt plant, ist vorbereitet." Beratungstermin-CTA.',
    contentIdeas: [
      { type: 'Blogartikel', hook: '"Solarpflicht-Landkarte Deutschland 2026: In welchem Bundesland gilt was? NRW vs. BaWü vs. Berlin vs. Hamburg — jedes Land hat andere Regeln. Interaktive Übersicht mit konkreten m²-Grenzen und Fristen."', hashtags: '#SolarpflichtLandkarte #EPBD #Bundesländervergleich #PVPflicht #Fristen' },
      { type: 'Reel', hook: '"Quiz: In welchen 5 Bundesländern ist Solar schon Pflicht? Wisch nach links für die Antwort." — Interaktives Format, jede Antwort zeigt: Seit wann, für wen, welche Ausnahmen', hashtags: '#SolarpflichtQuiz #Bundesländer #PVPflicht #WissenTest #Solarpflicht2026' },
    ],
  },
  // — Jan 28, 2026
  {
    title: 'Fachkräftemangel erreicht Höchststand: 250.000 Stellen im Handwerk unbesetzt',
    summary: 'Der Zentralverband des Deutschen Handwerks meldet einen neuen Negativrekord: 250.000 Stellen können nicht besetzt werden. Besonders betroffen sind Elektriker, SHK-Installateure und Dachdecker. Die Energiewende droht am Fachkräftemangel zu scheitern.',
    source: 'news',
    outlet: 'handwerk.com',
    sourceUrl: 'https://www.handwerk.com/fachkraeftemangel-erreicht-hoechststand',
    topic: 'handwerk',
    sentiment: 'negativ',
    relevance: 72,
    dateStr: '2026-01-28',
    aiInsight: 'Employer-Branding-Chance! Zeigt, wie Planville als Arbeitgeber dagegenhält: faire Bezahlung, moderne Ausstattung, Weiterbildung. "Bei uns sind die Stellen besetzt."',
    contentIdeas: [
      { type: 'LinkedIn-Post', hook: '"Unsere Fluktuation liegt bei 3%. Branchenschnitt: 18%. Was wir anders machen: 4-Tage-Woche im Winter, eigenes Schulungszentrum, E-Transporter-Flotte. Hier ist unser komplettes Modell für Mitarbeiterbindung."', hashtags: '#Mitarbeiterbindung #3ProzentFluktuation #4TageWoche #Handwerk #Arbeitgebermarke' },
      { type: 'Reel', hook: '"Interview mit Azubi Max, 2. Lehrjahr. Frage: Warum Handwerk statt Büro? Seine Antwort hat mich überrascht." — echtes Azubi-Interview, ungescriptet, auf der Baustelle', hashtags: '#AzubiInterview #HandwerkMitZukunft #WarumHandwerk #Ausbildung #GenZ' },
    ],
  },
  // 17 — Jan 24, 2026
  {
    title: 'SHK+E Messe Essen 2026: Von der Wärmewende bis zur Digitalisierung',
    summary: 'Die SHK+E Messe Essen zeigt die neuesten Trends in Sanitär, Heizung, Klima und Elektrotechnik. Schwerpunkte sind effizientere Wärmepumpen, Smart-Home-Integration und digitale Planungstools. Über 400 Aussteller präsentieren innovative Lösungen für die Energiewende.',
    source: 'news',
    outlet: 'SI SHK',
    sourceUrl: 'https://www.si-shk.de/shke-essen-2026-von-der-waermewende-bis-zur-digitalisierung-244646/',
    topic: 'handwerk',
    sentiment: 'positiv',
    relevance: 70,
    dateStr: '2026-01-24',
    aiInsight: 'Messe-Content! Wenn Planville auf der SHK+E war: Fotos, Eindrücke, Neuheiten zeigen. Wenn nicht: die spannendsten Produkte vorstellen und kommentieren.',
    contentIdeas: [
      { type: 'Story-Serie', hook: 'Messe-Bingo: 10 Dinge, die du auf jeder SHK-Messe siehst (überladene Goodie-Bags, WP-Flüster-Demos, der eine Stand mit Freibier). Humorvoller Rundgang mit echten Produkthighlights dazwischen.', hashtags: '#SHKEssen #MesseBingo #Handwerk #NeueProdukte #MesseHighlights' },
      { type: 'Reel', hook: '"Die 1 Neuheit von der SHK+E, die alles verändert: [Produkt zeigen]. Warum? Weil es X Problem löst, das uns auf jeder 3. Baustelle begegnet." — Hands-on Demo am Messestand', hashtags: '#SHKE2026 #GameChanger #HandsOn #Innovation #SHKTrends' },
    ],
  },
  // — Jan 18, 2026 (PV-Pflicht)
  {
    title: 'Solarpflicht 2026: Neue Herausforderungen für Dachdecker und Sachverständige',
    summary: 'Die ausgeweitete Solarpflicht in mehreren Bundesländern stellt Dachdecker und Sachverständige vor neue Aufgaben. PV-Montage wird dem Dachdeckerhandwerk zugeordnet — nur Meisterbetriebe dürfen installieren. Gleichzeitig steigt die Komplexität bei Wirtschaftlichkeitsprüfungen und Befreiungsanträgen.',
    source: 'news',
    outlet: 'DDH (Das Dachdecker-Handwerk)',
    sourceUrl: 'https://www.ddh.de/neue-solarpflicht-ab-2026-17112025',
    topic: 'pvpflicht',
    sentiment: 'neutral',
    relevance: 82,
    dateStr: '2026-01-18',
    aiInsight: 'Chance für Planville als Meisterbetrieb! "PV-Montage darf nur der Meister — und das sind wir." Vertrauen aufbauen durch Qualifikation. Auch Kooperationen mit Dachdeckern ansprechen.',
    contentIdeas: [
      { type: 'LinkedIn-Post', hook: '"Ein Bekannter hat PV vom günstigsten Anbieter montieren lassen. Undichtes Dach nach 8 Monaten. Warum? Keine Dachdecker-Qualifikation. Seit 2026 ist das illegal. Was die Meisterpflicht für PV konkret bedeutet und warum sie überfällig war."', hashtags: '#Meisterpflicht #PVQualität #Pfusch #Dachdecker #Handwerksqualität' },
      { type: 'Reel', hook: '"Erkennst du den Unterschied? Links: PV-Montage ohne Meister. Rechts: mit Meister. Zoom auf die Dachdurchführung, die Kabelführung, die Befestigung." — Side-by-Side Vergleich echter Installationen', hashtags: '#MeisterVsLaie #PVMontage #Qualitätsvergleich #DetailsMatter #Solarpflicht' },
    ],
  },
  // — Jan 20, 2026
  {
    title: 'BAFA BEG-Einzelmaßnahmen 2026: Neue Anforderungen und verschärfte Prüfungen',
    summary: 'Die BAFA hat die Anforderungen für BEG-Einzelmaßnahmen 2026 aktualisiert. Energieberater müssen strengere Nachweise führen, und die Prüftiefe bei Anträgen steigt. Gleichzeitig werden neue Boni für besonders effiziente Dämmmaßnahmen eingeführt.',
    source: 'news',
    outlet: 'BAFA',
    sourceUrl: 'https://www.bafa.de/DE/Energie/Effiziente_Gebaeude/Sanierung_Wohngebaeude/Gebaeudehuelle/gebaeudehuelle_node.html',
    topic: 'dachsanierung',
    sentiment: 'neutral',
    relevance: 84,
    dateStr: '2026-01-20',
    aiInsight: 'Service-Content: "Förderchaos? Nicht mit uns." Erklärt die neuen BAFA-Anforderungen und zeigt, dass Planville den kompletten Förderprozess übernimmt. Vertrauen durch Expertise.',
    contentIdeas: [
      { type: 'Karussell', hook: 'BAFA-Antrag Autopsy: Wir zeigen einen echten abgelehnten Antrag (anonymisiert). Slide 1: Ablehnung. Slides 2-5: Die 4 Fehler markiert. Slide 6: Der korrigierte Antrag — bewilligt. Slide 7: Checkliste zum Runterladen', hashtags: '#BAFAAntrag #Ablehnungsgründe #FehlerVermeiden #FörderCheckliste #BEG2026' },
      { type: 'Reel', hook: '"Unser Energieberater prüft live einen BAFA-Antrag. In 60 Sekunden findet er 3 Fehler, die 15.000€ Förderung kosten würden. Fehler Nr. 2 macht fast jeder." — Screen-Recording mit Kommentar', hashtags: '#BAFALiveCheck #Energieberater #15000Euro #AntragsProfi #FörderFehler' },
    ],
  },
  // 19 — Jan 15, 2026
  {
    title: 'CO₂-Preis steigt auf 55 Euro — Entlastungen für Verbraucher beschlossen',
    summary: 'Der CO₂-Preis steigt 2026 planmäßig auf 55 Euro pro Tonne. Die Bundesregierung hat gleichzeitig Entlastungsmaßnahmen beschlossen, darunter höhere Pendlerpauschalen und einen Klimabonus. Für Haushalte mit fossiler Heizung steigen die Kosten dennoch spürbar.',
    source: 'news',
    outlet: 'Bundesumweltministerium',
    sourceUrl: 'https://www.bundesumweltministerium.de/pressemitteilung/ab-2026-entlastungen-fuer-verbraucherinnen-und-verbraucher-trotz-steigendem-co2-preis',
    topic: 'foerderung',
    sentiment: 'neutral',
    relevance: 80,
    dateStr: '2026-01-15',
    aiInsight: 'Perfekter Trigger für Heizungstausch-Content: "55€ pro Tonne CO₂ — wer jetzt noch Gas oder Öl verbrennt, zahlt drauf." Call-to-Action: Wärmepumpen-Beratung.',
    contentIdeas: [
      { type: 'Reel', hook: '"Ich habe 3 Nachbarn gefragt, was sie für Heizung zahlen. Nachbar 1 (Gas): 245€/Monat. Nachbar 2 (Öl): 310€/Monat. Nachbar 3 (WP): 89€/Monat. Alle dasselbe Baujahr. Der CO₂-Preis macht den Unterschied." — echte Gespräche über den Gartenzaun', hashtags: '#NachbarVergleich #CO2Preis #GasVsÖlVsWP #Heizkosten #55Euro' },
      { type: 'Karussell', hook: 'CO₂-Preis-Rechner: Slide 1: Dein Gasverbrauch (Durchschnitt 15.000 kWh). Slide 2: CO₂-Ausstoß (3 Tonnen). Slide 3: 55€ x 3 = 165€ extra pro Jahr. Slide 4: Prognose bis 2030 (100€/t = 300€ extra). Slide 5: Umstieg jetzt oder teuer warten?', hashtags: '#CO2Rechner #Heizkosten2026 #GasWirdTeuer #Prognose2030 #JetztUmsteigen' },
    ],
  },
  // 20 — Jan 10, 2026
  {
    title: 'YouTube: Energiesparkommissar warnt vor falsch dimensionierten Wärmepumpen',
    summary: 'Der "Energiesparkommissar" Carsten Herbert warnt in seiner YouTube-Serie "Wärmepumpen Fehler" davor, dass viele Wärmepumpen zu groß oder zu klein dimensioniert werden. Der Diplom-Bauingenieur mit über 100.000 Abonnenten zeigt typische Planungsfehler und deren teure Folgen.',
    source: 'social',
    outlet: 'YouTube @Energiesparkommissar',
    sourceUrl: 'https://www.youtube.com/watch?v=XigFlmHaR3M',
    topic: 'waermepumpen',
    sentiment: 'negativ',
    relevance: 81,
    dateStr: '2026-01-10',
    aiInsight: 'Qualitäts-Content Gold! Zeigt, wie Planville die Dimensionierung macht: Heizlastberechnung, Gebäudeanalyse, keine Pauschalangebote. "Die richtige Größe entscheidet alles."',
    contentIdeas: [
      { type: 'Reel', hook: '"Diese Wärmepumpe ist 4 kW zu groß für dieses Haus. Folge: Sie taktet 15x pro Stunde. Die Stromrechnung ist 40% höher als nötig. Hier siehst du es im Monitoring." — echte Monitoring-Daten mit Taktung-Graph', hashtags: '#ÜberdimensioniertWP #Taktung #40ProzentMehr #Monitoring #Dimensionierung' },
      { type: 'Karussell', hook: 'Selbsttest: Ist deine WP richtig dimensioniert? Slide 1: Prüfe Laufzeiten (unter 10 Min = zu groß). Slide 2: Prüfe Taktung (über 3x/Std = Problem). Slide 3: Prüfe Vorlauftemperatur. Slide 4: Prüfe Jahresarbeitszahl. Slide 5: Ab wann zum Fachmann?', hashtags: '#WPSelbsttest #Taktung #Laufzeiten #Jahresarbeitszahl #WPDiagnose' },
    ],
  },

  // ========== Q4 2025 — Oktober bis Dezember 2025 ==========

  // — Dec 24, 2025
  {
    title: 'Gemeinschaftliche Gebäudeversorgung: Berliner Pilotprojekt zeigt softwarebasiertes Messkonzept',
    summary: 'Eine Berliner Wohnungseigentümergemeinschaft hat ihre PV-Anlage erfolgreich auf gemeinschaftliche Gebäudeversorgung (GGV) umgestellt. Alle neun Eigentümer beteiligten sich an der 14,2-kWp-Anlage. Stromnetz Berlin begleitet das Projekt als Pilotversuch — ein wichtiger Schritt für Mieterstrom in Mehrfamilienhäusern.',
    source: 'news',
    outlet: 'pv magazine',
    sourceUrl: 'https://www.pv-magazine.de/2025/12/24/messkonzept-fuer-gemeinschaftliche-gebaeudeversorgung-softwarebasiert-umgesetzt/',
    topic: 'mieterstrom',
    sentiment: 'positiv',
    relevance: 90,
    dateStr: '2025-12-24',
    aiInsight: 'Mieterstrom-Content Gold! Planville kann dieses Berliner Modell als Referenz nutzen: "So funktioniert Solarstrom im Mehrfamilienhaus — ganz ohne Bürokratie-Monster." Zeigt, dass GGV in der Praxis ankommt.',
    contentIdeas: [
      { type: 'LinkedIn-Post', hook: '"9 Eigentümer. 1 Dach. 14,2 kWp. Kein Messstellenchaos. Berlin zeigt, wie GGV ohne Hardware-Wahnsinn funktioniert: Software statt 9 separate Zähler. Das spart 8.000€ bei der Installation."', hashtags: '#GGV #SoftwareLösung #9Eigentümer #MieterStromDigital #ZählerSparen' },
      { type: 'Karussell', hook: 'GGV vs. klassisches Mieterstrom vs. Energy Sharing: 3 Modelle, 1 Haus. Welches bringt am meisten? Slide-für-Slide Vergleich mit Kosten, Aufwand, Ertrag und Bürokratie-Level', hashtags: '#GGVvsMS #Modellvergleich #MieterstromGuide #KostenNutzen #WelchesModell' },
    ],
  },
  // — Dec 10, 2025
  {
    title: 'Erneuerbare Energien erzeugen 2025 fast 56 Prozent des Stromverbrauchs in Deutschland',
    summary: 'Erneuerbare Energien haben 2025 fast 56 Prozent des Brutto-Stromverbrauchs gedeckt. Die Photovoltaik-Erzeugung stieg um knapp ein Fünftel gegenüber dem Vorjahr. Trotz unterdurchschnittlicher Windbedingungen konnten neue PV-Anlagen die Rückgänge bei Wind und Wasser mehr als ausgleichen.',
    source: 'news',
    outlet: 'Solarserver',
    sourceUrl: 'https://www.solarserver.de/2025/12/10/stromverbrauch-in-deutschland-2025-erneuerbare-energien-erzeugen-fast-56-prozent',
    topic: 'energiewende',
    sentiment: 'positiv',
    relevance: 82,
    dateStr: '2025-12-10',
    aiInsight: 'Starke Zahl für Jahresrückblick-Content: "56% — mehr als die Hälfte unseres Stroms ist grün. Und jedes Dach mit PV bringt uns weiter." Planville als Teil der Energiewende positionieren.',
    contentIdeas: [
      { type: 'Reel', hook: '"56% erneuerbarer Strom. Aber woher kommen die anderen 44%? Und an welchen Tagen haben wir schon 100% geschafft? Die Antwort zeigt, wie nah wir wirklich dran sind." — mit Agorameter-Screenshots', hashtags: '#56Prozent #Erneuerbare #RestDie44 #100ProzentTage #Agorameter' },
      { type: 'Karussell', hook: 'Energiewende-Stoppuhr: Wie schnell wächst PV wirklich? Slide 1: 2020 = 10%. Slide 2: 2023 = 12%. Slide 3: 2025 = 16%. Slide 4: Prognose 2030. Slide 5: Was muss passieren? — Daten vom Fraunhofer ISE', hashtags: '#SolarWachstum #Prognose2030 #FraunhoferISE #PVAnteil #Energiewende2025' },
    ],
  },
  // — Dec 4, 2025
  {
    title: 'Bundestag verabschiedet Geothermie-Beschleunigungsgesetz — Wärmepumpen profitieren',
    summary: 'Der Bundestag hat das Geothermie-Beschleunigungsgesetz beschlossen. Es vereinfacht Genehmigungsverfahren für Geothermie, Wärmepumpen und Wärmespeicher. Errichtung und Betrieb liegen bis 2045 im "überragenden öffentlichen Interesse". Das Gesetz tritt am 1. Januar 2026 in Kraft.',
    source: 'news',
    outlet: 'Bundestag',
    sourceUrl: 'https://www.bundestag.de/dokumente/textarchiv/2025/kw49-de-geothermie-1032870',
    topic: 'innovation',
    sentiment: 'positiv',
    relevance: 79,
    dateStr: '2025-12-04',
    aiInsight: 'Wichtig für die Branche! Schnellere Genehmigungen = mehr Projekte. "Das neue Gesetz macht unsere Arbeit einfacher — Wärmepumpen haben jetzt Vorfahrt." Zeigt Planville als Profiteur der neuen Regelung.',
    contentIdeas: [
      { type: 'LinkedIn-Post', hook: '"Bisher: 14 Monate Genehmigung für eine Erdwärmebohrung. Ab 2026: 3 Monate. Das Geothermie-Beschleunigungsgesetz ist der größte bürokratische Befreiungsschlag für WP seit Jahren. 3 konkrete Beispiele, wo es schneller wird."', hashtags: '#GeoBG #14vs3Monate #Erdwärme #Bürokratieabbau #WPGenehmigung' },
      { type: 'Reel', hook: '"Überragendes öffentliches Interesse — das steht jetzt im Gesetz über Wärmepumpen. Was bedeutet das? Deine Kommune darf deine WP nicht mehr blockieren." — Paragraph-Zoom mit Erklärung', hashtags: '#ÖffentlichesInteresse #WPVorfahrt #GeoBG #GemeindeDarfNicht #Geothermie' },
    ],
  },
  // — Dec 1, 2025
  {
    title: 'BWP hebt Wärmepumpen-Prognose für 2026 deutlich auf 410.000 Geräte an',
    summary: 'Der Bundesverband Wärmepumpe (BWP) korrigiert seine Absatzprognose für 2026 deutlich nach oben — von 350.000 auf 410.000 Geräte. Im ambitionierten Szenario könnten es sogar über 530.000 werden. Grund ist der starke Absatz im Herbst 2025 mit über 30.000 Geräten pro Monat.',
    source: 'news',
    outlet: 'Solarserver',
    sourceUrl: 'https://www.solarserver.de/2025/12/01/bundesverband-hebt-prognose-fuer-absatz-von-waermepumpen-an',
    topic: 'waermepumpen',
    sentiment: 'positiv',
    relevance: 87,
    dateStr: '2025-12-01',
    aiInsight: 'Optimismus-Story! "Die Wärmepumpe kommt zurück — stärker als je zuvor. Und Planville ist bereit." Zeigt eure Kapazitäten und nutzt den positiven Trend für Auftragsgewinnung.',
    contentIdeas: [
      { type: 'Reel', hook: '"350.000 war die alte Prognose. Jetzt sagt der BWP: 410.000. Im Best-Case: 530.000. Das sind 1.400 Wärmepumpen. Pro. Tag. Wer installiert die alle?" — Countdown-Ticker Grafik', hashtags: '#410000WP #BWPPrognose #1400ProTag #WerInstalliertDas #WPBoom' },
      { type: 'LinkedIn-Post', hook: '"30.000 WP pro Monat im Herbst 2025. Zum Vergleich: Im Sommer waren es 18.000. Was hat sich geändert? 3 Faktoren: Förderklarheit, sinkende Gerätepreise, steigende CO₂-Kosten. Chart + Analyse."', hashtags: '#WPAbsatz #30000proMonat #Marktanalyse #FörderEffekt #WPComeback' },
    ],
  },
  // — Nov 18, 2025
  {
    title: 'Neue PV-Anlagen: Nulleinspeisung in immer mehr Netzregionen zur Pflicht',
    summary: 'In immer mehr deutschen Netzregionen dürfen neue Photovoltaikanlagen nur noch mit Nulleinspeisung in Betrieb gehen. Die Netzbetreiber begründen dies mit Netzengpässen. Für Anlagenbetreiber bedeutet das: Ohne Speicher ist der Eigenverbrauch begrenzt. Fachanwälte sehen rechtliche Probleme.',
    source: 'news',
    outlet: 'pv magazine',
    sourceUrl: 'https://www.pv-magazine.de/2025/11/18/nulleinspeisung-fuer-neue-photovoltaikanlagen/',
    topic: 'photovoltaik',
    sentiment: 'negativ',
    relevance: 88,
    dateStr: '2025-11-18',
    aiInsight: 'Beratungs-Chance! Kunden fragen sich: Lohnt sich PV noch ohne Einspeisung? Antwort: "Mit Speicher auf jeden Fall. Wir planen Anlagen, die sich auch ohne Netzeinspeisung rechnen."',
    contentIdeas: [
      { type: 'Karussell', hook: 'Nulleinspeisung erklärt: Slide 1: Was es ist. Slide 2: Welche Regionen betroffen (Karte). Slide 3: Ist es legal? (Fachanwalt-Zitat). Slide 4: Speichergröße berechnen (Formel). Slide 5: Kosten vs. Ertrag mit Speicher-Optimierung', hashtags: '#Nulleinspeisung #WelcheRegion #SpeicherPflicht #RechtlicheGrauzone #Netzbetreiber' },
      { type: 'Reel', hook: '"Mein Netzbetreiber sagt: Keine Einspeisung. Mein Speicher sagt: Kein Problem. 95% Eigenverbrauch, 0% Einspeisung, 78% Autarkie. Hier ist die Anlagen-Konfiguration." — Speicher-Setup zeigen', hashtags: '#Nulleinspeisung #95Eigenverbrauch #SpeicherLösung #Autarkie #NullEuro' },
    ],
  },
  // — Nov 5, 2025
  {
    title: 'Wärmepumpen-Absatz durchbricht 30.000er-Marke im September und Oktober',
    summary: 'Der Bundesverband Wärmepumpe meldet Rekordabsätze: Im September und Oktober 2025 wurden jeweils über 30.000 Wärmepumpen verkauft — ein Plus von 57 Prozent gegenüber dem Vorjahr. Knapp die Hälfte aller verkauften Heizungen sind jetzt Wärmepumpen. Luft-Wasser-Systeme dominieren mit 95% Marktanteil.',
    source: 'news',
    outlet: 'BWP / waermepumpe.de',
    sourceUrl: 'https://www.waermepumpe.de/presse/news/details/ueber-50-prozent-im-plus-waermepumpen-absatz-steigt-2025-deutlich/',
    topic: 'waermepumpen',
    sentiment: 'positiv',
    relevance: 86,
    dateStr: '2025-11-05',
    aiInsight: 'Comeback-Content! "30.000 Wärmepumpen in einem Monat. Die Nachfrage explodiert — und wir liefern." Zeigt eure aktuellen Projekte und Kapazitäten. Wartelisten-Content als Dringlichkeits-Trigger.',
    contentIdeas: [
      { type: 'Reel', hook: '"57% Plus gegenüber Vorjahr. Jede 2. verkaufte Heizung ist jetzt eine Wärmepumpe. Aber: Luft-Wasser dominiert mit 95%. Warum traut sich niemand an Sole-Wasser? Die Antwort überrascht." — Tortendiagramm-Animation', hashtags: '#WPMarktanteil #95ProzentLuft #SoleVsLuft #Heizungsmarkt #Marktdaten' },
      { type: 'Story-Serie', hook: 'Montage-Marathon: 5 WP-Installationen in 5 Tagen. Jeden Tag eine Story: Welches Haus, welche Herausforderung, welche Lösung. Freitag: Alle 5 Kunden zusammen beim Feedback.', hashtags: '#5in5Tagen #WPMarathon #MontageAlltag #KundenFeedback #HandwerkLive' },
    ],
  },
  // — Oct 24, 2025
  {
    title: 'KfW-Heizungsförderung September: 30.000 Anträge bewilligt — 90 Prozent für Wärmepumpen',
    summary: 'Die KfW hat im September 2025 über 30.000 BEG-Förderanträge für den Heizungstausch bewilligt. Der Wärmepumpen-Anteil kletterte auf 90 Prozent — ein neuer Höchstwert. Im gesamten ersten Halbjahr lag der Anteil noch bei 82 Prozent. Solarthermie und Wärmenetze spielen weiterhin eine untergeordnete Rolle.',
    source: 'news',
    outlet: 'Solarserver',
    sourceUrl: 'https://www.solarserver.de/2025/10/24/beg-heizungsfoerderung-der-kfw-anteil-der-waermepumpen-weiter-gestiegen',
    topic: 'foerderung',
    sentiment: 'positiv',
    relevance: 85,
    dateStr: '2025-10-24',
    aiInsight: 'Förderungs-Content! "90% aller Förderanträge gehen an Wärmepumpen. Wir helfen dir beim Antrag — von der Planung bis zur Auszahlung." KfW-Prozess als Service von Planville positionieren.',
    contentIdeas: [
      { type: 'Karussell', hook: 'KfW-Zuschuss-Rechner: Slide 1: Basisförderung 30%. Slide 2: + Einkommensbonus (30k Grenze) = 50%. Slide 3: + Geschwindigkeitsbonus (vor 2028) = 70%. Slide 4: Rechenbeispiel: WP für 25.000€ → 17.500€ Zuschuss → Eigenanteil 7.500€. Slide 5: Antragsprozess', hashtags: '#KfWRechner #70ProzentZuschuss #7500Eigenanteil #BEGAnleitung #FörderMaximal' },
      { type: 'Reel', hook: '"90% WP-Anteil. Solarthermie: 4%. Wärmenetze: 6%. Die KfW-Zahlen sind eindeutig. Aber hier ist der Haken: Die Wartezeit auf den Bescheid beträgt aktuell X Wochen." — Live KfW-Portal zeigen', hashtags: '#KfW90Prozent #WPDominanz #Wartezeit #Förderbescheid #HeizungstauschFörderung' },
    ],
  },
  // — Oct 21, 2025
  {
    title: 'Bertelsmann-Studie: Fachkräfte wandern aus Handwerk und Pflege in andere Branchen ab',
    summary: 'Eine Studie der Bertelsmann Stiftung zeigt: Beschäftigte in Engpassberufen kehren ihrem Job häufiger den Rücken als andere. Nettoverlust: 24.000 Fachkräfte pro Jahr allein aus Pflege, Handwerk und IT. Schlechte Arbeitsbedingungen und niedrige Löhne sind Hauptgründe für den Wechsel.',
    source: 'news',
    outlet: 'Bertelsmann Stiftung',
    sourceUrl: 'https://www.bertelsmann-stiftung.de/de/themen/aktuelle-meldungen/2025/pflege-handwerk-it-weil-beschaeftigte-sich-abwenden-verschaerft-sich-der-fachkraeftemangel',
    topic: 'handwerk',
    sentiment: 'negativ',
    relevance: 75,
    dateStr: '2025-10-21',
    aiInsight: 'Employer-Branding-Pflicht! "24.000 Fachkräfte verlassen das Handwerk pro Jahr. Bei Planville nicht." Zeigt was euch als Arbeitgeber ausmacht: faire Löhne, modernes Equipment, Weiterbildung.',
    contentIdeas: [
      { type: 'LinkedIn-Post', hook: '"Die Bertelsmann-Studie nennt 3 Gründe für die Abwanderung: Lohn, Belastung, Perspektive. Wir haben letztes Jahr alle 3 adressiert. Ergebnis: 0 Kündigungen in 12 Monaten. Hier ist, was wir konkret verändert haben."', hashtags: '#BertelsmannStudie #0Kündigungen #HandwerkNeuDenken #Abwanderung #Gegenmaßnahmen' },
      { type: 'Reel', hook: '"Frage an unseren SHK-Meister nach 15 Jahren im Job: Was würdest du deinem 20-jährigen Ich sagen? Seine Antwort: Geh ins Handwerk, aber such dir den richtigen Betrieb." — ungescriptetes Gespräch', hashtags: '#15JahreHandwerk #MeisterSpricht #RichtigerBetrieb #Karrieretipp #EhrlicheWorte' },
    ],
  },
  // — Oct 17, 2025
  {
    title: 'PV-Markt 2025: Systempreise so günstig wie nie — beste Bedingungen für Kaufinteressierte',
    summary: 'Laut einer Marktanalyse des Großhändlers EWS sind die Bedingungen für PV-Kaufinteressierte so günstig wie lange nicht. Sinkende Modulpreise, freie Handwerkskapazitäten und hohe Speichereffizienz machen 2025 zum idealen Einstiegsjahr. Der Privatkundenmarkt ist jedoch um 25% eingebrochen.',
    source: 'news',
    outlet: 'Solarserver',
    sourceUrl: 'https://www.solarserver.de/2025/10/17/photovoltaik-markt-2025-guenstige-preise-fuer-kaufinteressierte',
    topic: 'photovoltaik',
    sentiment: 'positiv',
    relevance: 92,
    dateStr: '2025-10-17',
    aiInsight: 'Verkaufs-Argument Nummer 1! "Die Preise sind unten, die Kapazitäten da — wer jetzt nicht bestellt, verpasst das beste Fenster." Dringlichkeits-Marketing mit echten Marktzahlen.',
    contentIdeas: [
      { type: 'Reel', hook: '"2022: 10 kWp kostete 18.000€, Wartezeit 6 Monate. 2025: 10 kWp kostet 11.000€, Wartezeit 3 Wochen. Hier ist der Preisverfall als Grafik — und warum er nicht ewig so bleibt."', hashtags: '#PVPreisverfall #2022vs2025 #BestesFenster #JetztOderNie #10kWp' },
      { type: 'Blogartikel', hook: '"Der Privatmarkt ist 25% eingebrochen — paradoxerweise die beste Nachricht für Käufer. Warum weniger Nachfrage = besserer Service, schnellere Installation und mehr Verhandlungsspielraum."', hashtags: '#Käufermarkt #25ProzentEinbruch #Verhandlungsspielraum #PVParadox #JetztKaufen' },
    ],
  },
  // — Oct 7, 2025
  {
    title: 'Reddit-Diskussion: "Solarpflicht bei Dachsanierung — lohnt sich das wirklich?"',
    summary: 'Im Bauexpertenforum diskutieren Eigenheimbesitzer kontrovers über die Solarpflicht bei Dachsanierungen. Viele berichten von positiven Erfahrungen: Die PV-Anlage amortisiert sich schneller als erwartet. Andere kritisieren den Mehraufwand und die Bürokratie. Besonders die Wirtschaftlichkeitsprüfung sorgt für Verwirrung.',
    source: 'reddit',
    outlet: 'Bauexpertenforum',
    sourceUrl: 'https://www.bauexpertenforum.de/threads/solarpflicht-dachsanierung-erfahrungen.63201/',
    topic: 'pvpflicht',
    sentiment: 'neutral',
    relevance: 80,
    dateStr: '2025-10-07',
    aiInsight: 'Community-Fragen aufgreifen! Viele Eigentümer sind unsicher bei der Solarpflicht. "Du musst dein Dach sanieren und PV drauf? Wir machen beides aus einer Hand." FAQ-Content erstellen.',
    contentIdeas: [
      { type: 'Karussell', hook: 'Die 5 echten Fragen aus dem Bauexpertenforum: 1) Gilt die Pflicht bei Teilsanierung? 2) Wer prüft die Wirtschaftlichkeit? 3) Was zählt als Befreiungsgrund? 4) Denkmalschutz = automatisch befreit? 5) Reicht auch Solarthermie? — Expertenbewertung pro Slide', hashtags: '#ForumFragen #SolarpflichtFAQ #Wirtschaftlichkeitsprüfung #Befreiung #Denkmalschutz' },
      { type: 'Reel', hook: '"Ich lese Forumsbeiträge zur Solarpflicht. Aussage: Die Pflicht ist Abzocke. Meine Gegenrechnung: Dachsanierung 35.000€. PV extra: 8.000€. Jährlicher Ertrag: 1.400€. Amortisation: 5,7 Jahre. Abzocke?"', hashtags: '#SolarpflichtAbzocke #Gegenrechnung #Amortisation5Jahre #FaktenStattMeinung' },
    ],
  },
];

// Kanban board initial data (empty — user fills via "Zum Board" from news articles)
const DEMO_KANBAN_ITEMS = [];

const KANBAN_COLUMNS = [
  { id: 'new', label: 'Neu', icon: 'sparkles', color: '#329866' },
  { id: 'planned', label: 'Geplant', icon: 'calendar', color: '#6366F1' },
  { id: 'in_progress', label: 'In Arbeit', icon: 'pen-tool', color: '#F59E0B' },
  { id: 'review', label: 'Review', icon: 'eye', color: '#EC4899' },
  { id: 'published', label: 'Veröffentlicht', icon: 'check-circle', color: '#16A34A' },
];

// Generate articles with fixed dates (already ordered newest first)
function generateDemoArticles() {
  return DEMO_ARTICLES.map((article, i) => {
    const date = new Date(article.dateStr + 'T09:00:00+01:00');
    return {
      ...article,
      id: `article-${i}`,
      date: date.toISOString(),
      timestamp: date.getTime(),
      readTime: Math.floor(Math.random() * 5) + 2,
      engagement: Math.floor(Math.random() * 500) + 50,
    };
  });
}

function generateKanbanItems() {
  const now = new Date();
  return DEMO_KANBAN_ITEMS.map((item, i) => ({
    ...item,
    createdAt: new Date(now.getTime() - (i * 24 + Math.random() * 24) * 60 * 60 * 1000).toISOString(),
  }));
}

// Trending stats
const DEMO_STATS = {
  totalArticles: 847,
  todayArticles: 23,
  avgSentiment: 68,
  topTopic: 'Photovoltaik',
  contentIdeasGenerated: 156,
  publishedThisWeek: 8,
};
