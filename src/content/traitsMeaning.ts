// Felt-experience prose for the traits page — turns raw percentages, lists,
// and binary flags into something a reader actually understands about themselves.

export const ELEMENT_MEANING: Record<'fire' | 'earth' | 'air' | 'water', { essence: string; lesson: string }> = {
  fire: {
    essence:
      'You live with the heat of action — you begin things before waiting for them to be complete. Your presence opens spaces, but it can burn what it started if you don\'t follow through.',
    lesson: 'Your most important lesson: to learn to stay where you began.',
  },
  earth: {
    essence:
      'You live through the tangible — you need to see the result, smell the scent, feel the weight. What is built through you is built to last.',
    lesson: 'Your most important lesson: to allow things to move without gripping too tightly.',
  },
  air: {
    essence:
      'You live through idea and word — you connect what doesn\'t seem connected. You carry a lightness that you give to others like a window opening.',
    lesson: 'Your most important lesson: to descend into the body when the mind gets lost in possibilities.',
  },
  water: {
    essence:
      'You live through feeling and depth — you read what lies beneath the surface before it is spoken. You carry a sensitivity that both protects and touches.',
    lesson: 'Your most important lesson: to guard your own shore when you receive the wave of another.',
  },
};

export const MINERAL_MEANING: Record<string, string> = {
  Gold: 'Your essential presence — when you radiate, it becomes real.',
  Silver: 'Your emotional receptivity — a mirror of your inner mood.',
  Quicksilver: 'Your mind in constant motion — learning and connecting.',
  Copper: 'Your conductor for value and beauty — what you choose to care for.',
  Iron: 'Your will when it hardens — your capacity to hold steady in action.',
  Tin: 'Your openness to meaning — what expands you toward something greater than yourself.',
  Lead: 'Your weight that ripens — the structure that protects your longevity.',
  Uranium: 'Your electricity that breaks the pattern — the sudden awakening.',
  'Deep Stone': 'Your inner ocean — the boundary between dissolution and clarity.',
  Obsidian: 'Your deep well — what dies in you so something new can be born.',
  Charoite: 'Your teaching wound — the place from which you heal others.',
  Turquoise: 'Your direction in this life — where you are meant to grow.',
  Carnelian: 'What you carry from before — your old comfort that you must move beyond.',
};

export const ORGAN_SIGNAL: Record<string, string> = {
  Heart: 'When the Sun\'s light within you dims, the heart complains — a lack of meaning exhausts it.',
  Brain: 'When the Moon within you is disturbed, the inner rhythm is disrupted — sleep, nourishment, mood.',
  Lungs: 'When Mercury within you is suffocated, the breath tightens — words unspoken or unwritten.',
  Gallbladder: 'When Mars is suppressed, the gallbladder stagnates — anger swallowed and never released.',
  Liver: 'When Jupiter contracts, the liver is burdened — meaning left undigested.',
  Spleen: 'When Saturn grows harsh, the spleen cools — a boundary imposed without gentleness.',
};

// ─────────────────────────────────────────────────────────────────────────────
// MEDICAL ASTROLOGY: Planet × Sign organ interpretations
// Based on Steiner/Hill planetary-organ correspondences and traditional
// melothesia (sign–body-part rulerships). Each entry gives a 2-3 sentence
// English reading of how the planet's sign placement colours the organ's health.
// Key: `${planetKey}:${signIndex}` (signIndex 0=Aries … 11=Pisces)
// ─────────────────────────────────────────────────────────────────────────────
export const ORGAN_SIGN_READING: Record<string, string> = {
  // ─── SUN (Heart) ───────────────────────────────────────────────────────────
  'sun:0':  'The Sun in Aries gives the heart a blazing energy and a strong rhythm, but it may accelerate its beat and exhaust it with impulsiveness. Your heart\'s health is tied to movement and beginnings — beware prolonged stillness. Your heart needs renewed ignition, not relentless pushing.',
  'sun:1':  'The Sun in Taurus gives the heart rare steadiness and endurance. Vital energy here is slow to deplete, but it may accumulate arterial tension when habits become rigid. Nourish your heart with beauty and regularity, and avoid emotional stagnation.',
  'sun:2':  'The Sun in Gemini colours the heart with fluctuating energy and multiple directions — it thrives on variety and tires from monotony. The autonomic nervous system linked to the parasympathetic needs balance. Deep rhythmic breathing restores the heart\'s regularity.',
  'sun:3':  'The Sun in Cancer makes the heart a mirror of emotions — it opens with love and contracts with anxiety. The vascular system is sensitive to mood shifts and the emotional climate of the surrounding environment. Your heart\'s health begins with the health of your relationships.',
  'sun:4':  'The Sun in Leo grants the heart a royal standing — secured by the alignment of inner and outer self. This is a strong placement for solar vitality, but striving excessively for recognition can strain the circulatory system. Let your heart radiate without needing to prove itself.',
  'sun:5':  'The Sun in Virgo gives the heart precision and methodical performance — it works steadily when details are tended to. Over-analysis and anxiety about mistakes create subtle tension in the heart muscle. A structured wellness routine is your best medicine.',
  'sun:6':  'The Sun in Libra places the heart in a cycle of balance — it steadies when relationships are balanced and falters when they weigh heavily. Draining partnerships directly affect blood pressure and rhythm. Seek daily beauty to nourish your vitality.',
  'sun:7':  'The Sun in Scorpio grants the heart intensity and depth — it renews like a phoenix in crisis but is exhausted by suppressed inner conflict. The cardiovascular system needs regular emotional release, not accumulation. Transformation is the style of your health.',
  'sun:8':  'The Sun in Sagittarius gives the heart expansiveness and a living freedom — it thrives on movement and meaning and contracts in confinement. An excess of enthusiasm may exhaust it at first, then motivation may suddenly fade. Balance between movement and rest is the secret of your resilience.',
  'sun:9':  'The Sun in Capricorn gives the heart a structural capacity and long-term endurance. Silent chronic pressure can increase the burden on the coronary arteries over time. Discipline is valuable, but self-compassion is essential — your heart needs tenderness too.',
  'sun:10': 'The Sun in Aquarius grants the heart a unique electromagnetic orientation — the vascular system is sensitive to electrical tensions in the body as well as in the environment. Social disconnection weakens solar vitality. Seek a community that activates your heart.',
  'sun:11': 'The Sun in Pisces softens the heart with deep sensitivity — it responds to music, art, and prayer. Blurred boundaries with others may add hidden burdens to the circulatory system. Meditate daily and give your heart the space of silence.',

  // ─── MOON (Brain) ─────────────────────────────────────────────────────────
  'moon:0':  'The Moon in Aries gives the brain a fiery pulse — reactions are quick and processing is immediate. The nervous system is sensitive to sharp stimuli and may overproduce adrenaline. Physical rest and exercise are your way of discharging the system.',
  'moon:1':  'The Moon in Taurus gives the brain rare sensory stability — memory is reinforced through repetition and emotions are managed calmly. Excess eating and sensory attachment may weigh on glandular function. Connect with nature and touch as a wellness practice.',
  'moon:2':  'The Moon in Gemini colours the brain with a wide network of connections — it processes quickly and sends multiple signals simultaneously. Distraction and mental restlessness are among your most prominent health challenges. Regular sleep and quiet time restore balance.',
  'moon:3':  'The Moon in Cancer gives the brain emotional depth and a vivid memory — it weaves mood with environment. Hormonal sensitivity is high, especially around cycles and seasons. Protect yourself from external emotional burdens.',
  'moon:4':  'The Moon in Leo gives the brain a dramatic cognitive quality — attention centres around identity and expression. An excessive desire for recognition may generate emotional-neural fatigue. Give yourself the space of unconditional joy.',
  'moon:5':  'The Moon in Virgo gives the brain analytical precision — it observes, categorises, and stores details. Obsessive anxiety and nervous digestive issues are among the most common patterns. Breathing exercises and a healthy routine calm the system.',
  'moon:6':  'The Moon in Libra colours the brain with a search for balance — thinking revolves around relationships and fairness. Disruptions in partnerships directly affect hormonal and neural balance. Beauty and harmony are not luxuries — they are protection.',
  'moon:7':  'The Moon in Scorpio gives the brain deep perceptive capacity — it senses what lies beneath the surface, but may lock itself in old emotional patterns. Sleep may be fragmented and rich with dreams. Emotional release is your brain\'s true health.',
  'moon:8':  'The Moon in Sagittarius gives the brain a philosophically optimistic orientation — it finds meaning and nourishes the spirit. Excessive abstract thinking may distance you from the body\'s signals. Pay attention to nutrition and daily rhythm to maintain mental clarity.',
  'moon:9':  'The Moon in Capricorn gives the brain emotional discipline — experience accumulates into wisdom, but long-term suppression weakens neural immunity. Silent chronic stress is a hidden danger. Allow yourself vulnerability sometimes.',
  'moon:10': 'The Moon in Aquarius colours the brain with unconventional electromagnetic sensitivity — collective intuition and subtle signals affect your mood. The tendency for mental detachment may cut the bridge with the body. Stay grounded through movement and nature.',
  'moon:11': 'The Moon in Pisces gives the brain boundless receptivity — highly sensitive to environments and energies. Weak boundaries cause neural exhaustion and disrupted sleep. Meditation and intentional solitude are your refuge and your remedy.',

  // ─── MERCURY (Lungs) ─────────────────────────────────────────────────────
  'mercury:0':  'Mercury in Aries gives the lungs a blazing respiratory energy — the breath is short and fast, reflecting the speed of thought. Susceptibility to respiratory irritation is clear in moments of excitement. Slow breathing exercises balance the sharp arc.',
  'mercury:1':  'Mercury in Taurus gives the lungs respiratory steadiness and a capacity for deep breathing. The voice and throat are sensitive to weather and cold. Maintain vocal warm-ups and adequate moisture for the upper respiratory system.',
  'mercury:2':  'Mercury in Gemini — placed in its own home — gives the lungs exceptional flexibility and exchange vitality. But the alternation of exhale and inhale may be too rapid in moments of tension. Master the art of slowing down and breathing consciously.',
  'mercury:3':  'Mercury in Cancer colours the lungs with emotional sensitivity — suppressed crises constrict the breath and create tightness in the chest. The close link between emotional expression and ease of breathing is clear in your health path.',
  'mercury:4':  'Mercury in Leo gives the lungs a tendency toward powerful expression and a voice that is heard. The respiratory system suffers when expression and creativity are suppressed. Singing, speaking, and writing are literally medicine for your respiratory system.',
  'mercury:5':  'Mercury in Virgo — its health home — gives the lungs precision in regulation and discrimination. Sensitivity to pollutants and odours is evident. Clean air, a regular diet, and moderation enhance respiratory performance.',
  'mercury:6':  'Mercury in Libra gives the lungs an exchange-based style — they breathe at ease in harmony and constrict in tension. The lungs mirror your relationships — when a partnership weighs on you, breathing becomes difficult. Seek open air and speak with those who make you feel refreshed.',
  'mercury:7':  'Mercury in Scorpio gives the lungs depth in breathing and capacity for intensive breathing during transformations. Held secrets and suppressed words manifest as chest tightness. Honest speech is the first medicine.',
  'mercury:8':  'Mercury in Sagittarius gives the lungs expansion and a capacity for deep breathing in the open air. Overdoing exhausting activities without rest may strain the lungs. Nature, travel, and mountain air nourish your respiratory system.',
  'mercury:9':  'Mercury in Capricorn gives the lungs discipline — breathing is organised and quiet, but silent tensions constrict the diaphragm. Set aside time each day for conscious breathing and relaxation exercises to release chest knots.',
  'mercury:10': 'Mercury in Aquarius gives the lungs sensitivity to the electromagnetic environment and collective air. Sudden climatic changes affect the respiratory system more than in others. The surrounding environment and its air quality determine the quality of your breath.',
  'mercury:11': 'Mercury in Pisces colours the lungs with spiritual sensitivity — breathing is linked to inner state more than the external. Rich dreams and unconscious patterns affect the quality of nighttime breathing. Breath meditation is your bridge toward clarity.',

  // ─── VENUS (Kidneys) ──────────────────────────────────────────────────────
  'venus:0':  'Venus in Aries gives the kidneys a driving energy — capable of rapid purification but may over-consume minerals due to intense activity. Increasing fluids and minerals like magnesium supports balance.',
  'venus:1':  'Venus in Taurus gives the kidneys circulatory steadiness — the purification rhythm is slow and stable. Excess rich foods burdens the filtration system. Moderate your salt and fats and remain faithful to your fluids.',
  'venus:2':  'Venus in Gemini colours the kidneys with fluctuating balance — affected by mental activity and constant movement. The kidneys need stability that perpetual distraction cannot provide. Dedicate regular time to water and quiet rest.',
  'venus:3':  'Venus in Cancer links the kidneys to the emotional environment — family tensions are reflected in the body\'s fluid balance. Self-care and emotional security are direct protection for the urinary system.',
  'venus:4':  'Venus in Leo gives the kidneys a regal rhythm — the body performs better when you are in a state of joy and pleasure. Exhaustion from constant performance strains filtration. Give yourself time for purposeless delight.',
  'venus:5':  'Venus in Virgo gives the kidneys precision and methodical filtration — the urinary system works efficiently when dietary details are tended to. Watch for food sensitivities and monitor urinary health regularly.',
  'venus:6':  'Venus in Libra — its home — gives the kidneys an innate balance. But the constant pursuit of perfect balance generates subtle tension. Healthy relationships enhance kidney function — clear boundaries in partnerships protect your health.',
  'venus:7':  'Venus in Scorpio gives the kidneys a deep purifying capacity — removing emotional and physical toxins thoroughly. Excessive emotional intensity burdens the hormonal system. Constant transformation calls for a good hydration protocol.',
  'venus:8':  'Venus in Sagittarius gives the kidneys a tendency toward expansion — your body adapts to travel and change, but dietary regularity remains essential. Beware excess exotic foods or sharp spices.',
  'venus:9':  'Venus in Capricorn gives the kidneys a solid structure and capacity to work under pressure. Excess tasks without rest threaten hormonal balance. Dedicate regular recovery times and do not scrimp on sleep.',
  'venus:10': 'Venus in Aquarius gives the kidneys sensitivity to the electromagnetic field — environmental electrical waves may affect the filtration rhythm. Periodically step away from screens, and try grounding yourself by walking barefoot.',
  'venus:11': 'Venus in Pisces softens the kidneys with deep spirituality — the filtration system is affected by spiritual and psychological state more than any other factor. Rest, meditation, and reducing emotional toxins are your health prescription.',

  // ─── MARS (Gallbladder) ────────────────────────────────────────────────────
  'mars:0':  'Mars in Aries — its home — gives the gallbladder a powerful impulsive energy. Bile secretion is sharp and rapid, but constant ignition is exhausting. Avoid spicy foods and excessive stimulants, and channel your energy into regular exercise.',
  'mars:1':  'Mars in Taurus slows the gallbladder\'s rhythm — bile is secreted slowly and may accumulate. Excess fatty foods are a particular risk for you. Physical movement and daily walking stimulate the digestive rhythm and prevent stagnation.',
  'mars:2':  'Mars in Gemini colours the gallbladder with fluctuating performance — it needs regularity in meal times. Nervousness and mental excitement disrupt the bile secretion rhythm. Set aside quiet times for eating away from screens.',
  'mars:3':  'Mars in Cancer may turn suppressed anger into tension in the gallbladder — unexpressed emotions trigger gallbladder disturbances. Writing, artistic expression, and honest tears are essential for this organ\'s health.',
  'mars:4':  'Mars in Leo gives the gallbladder strong enthusiasm — but the blazing drive for glory and competition raises liver and gallbladder heat. Cooling foods like cucumber, beet juice, and barley balance the fiery excess.',
  'mars:5':  'Mars in Virgo gives the gallbladder digestive precision — it secretes bile on a regular schedule. Clean foods and careful nutritional analysis enhance its performance. Watch for the subtle stress that diverts energy away from digestion.',
  'mars:6':  'Mars in Libra gives the gallbladder a conflict between impulse and hesitation — deferred anger from accommodating others accumulates within it. State your needs clearly and set firm boundaries — your digestive health depends on it.',
  'mars:7':  'Mars in Scorpio — its home — gives the gallbladder sharp purifying intensity. Bile is dense and effective. Excess intensity and pressure may generate inflammation. Periodic fasting and cooling bitter herbs balance the sharpness.',
  'mars:8':  'Mars in Sagittarius gives the gallbladder expansion — the body handles diverse foods with flexibility. Excess fatty foods during travel can strain digestion. Dedicate a light day after each rich week.',
  'mars:9':  'Mars in Capricorn gives the gallbladder discipline and durability — but chronic fatigue slows secretion. Suppressed anger from the pressure of constant endurance needs an outlet — release it through physical effort like weight lifting or running.',
  'mars:10': 'Mars in Aquarius gives the gallbladder irregular performance — it surges with enthusiasm then stops. The digestive system is affected by sudden dietary changes. Regularity in eating routines is essential despite your liberating nature.',
  'mars:11': 'Mars in Pisces colours the gallbladder with spiritual sensitivity — it responds to inner state more than to food. Emotional exhaustion directly disrupts digestion. Meditation before meals and full mindfulness while eating are your remedy.',

  // ─── JUPITER (Liver) ───────────────────────────────────────────────────────
  'jupiter:0':  'Jupiter in Aries gives the liver powerful regenerative energy — it processes and purifies quickly. Excess stimulants and accelerants deplete this energy. Avoid sudden dietary excess and maintain a simple purification routine.',
  'jupiter:1':  'Jupiter in Taurus gives the liver abundant absorptive wealth — it processes rich substances deeply. But the tendency to overindulge in food and drink burdens it. A moderate diet and daily movement restore balance.',
  'jupiter:2':  'Jupiter in Gemini gives the liver versatile assimilating flexibility — it handles diverse nutritional information. Mental exhaustion is reflected in liver function. Dedicate nutritionally simple days to give your system a rest.',
  'jupiter:3':  'Jupiter in Cancer gives the liver a nurturing, caring capacity — but it tends to retain emotional toxins. A troubled home life mirrors the liver\'s condition. Build a comfortable and safe environment to create inner health.',
  'jupiter:4':  'Jupiter in Leo gives the liver royal expansion — generous in absorption but it may over-consume resources. Physical generosity mirrors dietary generosity — moderation in quantity and a leisurely enjoyment is the key to your health.',
  'jupiter:5':  'Jupiter in Virgo — its traditional home — gives the liver exceptional metabolic precision. Cleanse programmes and intermittent fasting are exceptionally beneficial for you. Pay attention to dietary supplements and liver-supporting herbs.',
  'jupiter:6':  'Jupiter in Libra gives the liver a harmonious rhythm — it works best when relationships are at peace. Chronic irritations in partnerships generate tension in the deep digestive system. Inner peace is literal nourishment.',
  'jupiter:7':  'Jupiter in Scorpio gives the liver a deep transformative capacity — it purifies and renews thoroughly. But excess intense experience burdens it. Seasonal cleansing protocols and bitter herbs support this powerful type.',
  'jupiter:8':  'Jupiter in Sagittarius — its home — gives the liver natural expansiveness — capable of handling diverse foods from different cultures. Excess nightlife and dietary adventure exhausts it. Dedicate a simple week after every rich season.',
  'jupiter:9':  'Jupiter in Capricorn gives the liver discipline and quiet efficiency. Professional pressures and overload strain metabolic function. A liver support programme in spring and autumn is essential to maintaining this quietly excellent performance.',
  'jupiter:10': 'Jupiter in Aquarius gives the liver a readiness for the future and renewal — but an irregular rhythm confuses the enzyme system. Regular sleep and eating routines compensate for your experimental nature.',
  'jupiter:11': 'Jupiter in Pisces gives the liver spiritual sensitivity — it is affected by the collective unconscious and responds to spiritual state. Openness to energetic healing and traditional herbs may be effective treatments for your liver\'s health.',

  // ─── SATURN (Spleen) ───────────────────────────────────────────────────────
  'saturn:0':  'Saturn in Aries gives the spleen sharp defence — the immune system responds powerfully to stimuli. Acute inflammations are among the main challenges. A disciplined lifestyle with moderate heat exercises enhances balance.',
  'saturn:1':  'Saturn in Taurus gives the spleen durability and immune steadiness. But clinging to old habits may slow the immune response to renewal. Include blood-building foods like beetroot, pomegranate, and legumes.',
  'saturn:2':  'Saturn in Gemini gives the spleen informational sensitivity — it responds to thinking patterns and mental fatigue. Insomnia and distraction gradually weaken the immune system. Regular sleep rebuilds white blood cells.',
  'saturn:3':  'Saturn in Cancer gives the spleen a deep connection to roots — family safety and a sense of belonging nourish immunity. Loss of security and family tension noticeably weaken the defensive system.',
  'saturn:4':  'Saturn in Leo gives the spleen a selective capacity in filtering emotional and physical toxins. Excessive pursuit of perfection and recognition generates chronic tension that burdens the blood. Pure joy and laughter stimulate spleen activity.',
  'saturn:5':  'Saturn in Virgo gives the spleen precise, analytical blood management efficiency. Obsessive anxiety and excessive thinking burden its function. Adopt a precise diet that supports blood building and reduces digestive burdens.',
  'saturn:6':  'Saturn in Libra gives the spleen selective balance — but chronic indecision weakens the immune system. Clear boundaries in relationships purify blood energy. Inner harmony reflects the health of circulation.',
  'saturn:7':  'Saturn in Scorpio gives the spleen deep purifying depth — it filters blood on profound levels. Excessive heavy emotional burdens may exhaust the immune system. Seasonal cleansing sessions and purifying herbs are valuable for you.',
  'saturn:8':  'Saturn in Sagittarius gives the spleen the ability to adapt to different environments. Living in unsuitable climates may burden immunity. Ensure your living environment suits your physical nature and protect yourself from weather extremes.',
  'saturn:9':  'Saturn in Capricorn — its home — gives the spleen a solid immune structure. Endurance under prolonged pressure is possible, but accumulated fatigue can suddenly surprise the system. Plan periodic recovery retreats before you reach the point of depletion.',
  'saturn:10': 'Saturn in Aquarius gives the spleen sensitivity to collective energy and social currents. Exhaustion from group commitments weakens the immune system. Know when to withdraw and give yourself recovery time in intentional solitude.',
  'saturn:11': 'Saturn in Pisces colours the spleen with deep spirituality — immunity rises with spiritual practices and falls with inner lostness. Deep sleep and lucid dreaming are your primary renewal tool. Do not underestimate the value of your spiritual world.',
};

// Element names for the organs display
export const ELEMENT_AR_ORGAN: Record<'fire' | 'earth' | 'air' | 'water', string> = {
  fire: 'Fiery',
  earth: 'Earthy',
  air: 'Airy',
  water: 'Watery',
};

// House themes for organ reading context
export const HOUSE_THEME_SHORT: Record<number, string> = {
  1: 'Self',
  2: 'Resources',
  3: 'Mind',
  4: 'Roots',
  5: 'Creativity',
  6: 'Health',
  7: 'Partnership',
  8: 'Transformation',
  9: 'Wisdom',
  10: 'Career',
  11: 'Community',
  12: 'Unconscious',
};

export const HD_CENTRE_MEANING: Record<string, { defined: string; open: string }> = {
  'Head Centre': {
    defined: 'Your inspiration is consistent — your thoughts arrive in a regular rhythm.',
    open: 'You are influenced by the ideas of others — some questions you hold may not truly be yours.',
  },
  'Ajna Centre': {
    defined: 'Your way of thinking is stable — a method you know about yourself.',
    open: 'Your mind takes on the colour of those around you — an openness to many perspectives.',
  },
  'Throat Centre': {
    defined: 'Your expression is consistent — your voice is known.',
    open: 'Your expression shifts — your words need permission, or they take on the voice of those around you.',
  },
  'Identity Centre': {
    defined: 'Your direction is grounded — you know who you are.',
    open: 'Your identity shapes itself according to who you are with — a flexibility that needs mirrors.',
  },
  'Ego/Heart Centre': {
    defined: 'Your will is sustainable — you are able to promise and deliver.',
    open: 'Your will tires from promises — do not commit to what you cannot guarantee.',
  },
  'Sacral Centre': {
    defined: 'Your sustained energy is present — you are able to continue.',
    open: 'Your energy fluctuates — honour the moments of tiredness and do not force yourself.',
  },
  'Solar Plexus Centre': {
    defined: 'Your emotional waves have a rhythm — you recognise them in yourself.',
    open: 'You absorb the feelings of others — learn to distinguish what is yours from what is theirs.',
  },
  'Root Centre': {
    defined: 'Your inner pressure is stable — you move from a steady impulse.',
    open: 'You respond to environmental pressure — know when to pause and take a breath.',
  },
  'Spleen Centre': {
    defined: 'Your intuition is continuously present — it knows about those around you before they speak.',
    open: 'Your intuition is influenced — learn to distinguish your own signals from those of your surroundings.',
  },
};
