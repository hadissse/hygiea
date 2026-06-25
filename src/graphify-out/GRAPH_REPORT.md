# Graph Report - /Users/hadi/Downloads/hygiea-v2/src  (2026-06-25)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 747 nodes · 1228 edges · 65 communities (42 shown, 23 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]

## God Nodes (most connected - your core abstractions)
1. `AstralChart` - 19 edges
2. `planetSvgKey()` - 13 edges
3. `calculateChart()` - 12 edges
4. `getPlacementContent()` - 11 edges
5. `norm360()` - 11 edges
6. `createClient()` - 11 edges
7. `Body()` - 9 edges
8. `Card()` - 9 edges
9. `GradientOrb()` - 9 edges
10. `toRad()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `CoursePoster()` --calls--> `gradientCss()`  [INFERRED]
  app/(app)/learn/[id]/page.tsx → components/learn/primitives.tsx
- `CourseDetailPage()` --calls--> `getCourse()`  [INFERRED]
  app/(app)/learn/[id]/page.tsx → content/courses.ts
- `PlayerInner()` --calls--> `getCourse()`  [INFERRED]
  app/play/[id]/page.tsx → content/courses.ts
- `ZoomableWheelProps` --references--> `AstralChart`  [EXTRACTED]
  components/ZoomableWheel.tsx → lib/chartCalculator.ts
- `SkyPlanetPage()` --calls--> `getPlacementContent()`  [INFERRED]
  app/(app)/explore/sky/[key]/page.tsx → content/placements.ts

## Import Cycles
- None detected.

## Communities (65 total, 23 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (51): Glyph(), GLYPH_ALIASES, GlyphProps, ASPECTS, buildHeaderAndContent(), ELEMENT_AR, getContent(), HeaderData (+43 more)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (43): Chip(), ChipProps, EventDetailClient(), RHYTHM_LABEL(), FrameworkLabel(), FrameworkLabelProps, Meta(), MetaProps (+35 more)

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (32): links, CalEntry, CalibrationPage(), toArabicDigits(), TYPE_AR, VALUE_AR, Body(), BodyProps (+24 more)

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (40): ALL_2026_EVENTS, AR_MONTH_NAMES, buildMonthCells(), buildRawCalEvent(), CAL_TRANSITS, CalEvent, getEvents2026(), getMonthStartWeekday() (+32 more)

### Community 4 - "Community 4"
Cohesion: 0.06
Nodes (34): AstralChart, detectLang(), getCachedLocation(), getTimezoneOffset(), Location, searchLocation(), searchOpenCage(), searchOpenMeteo() (+26 more)

### Community 5 - "Community 5"
Cohesion: 0.12
Nodes (35): BirthData, calculateChart(), CHIRON, chironsLongitude(), decimalToDMS(), eclToDec(), eclToRA(), getSignGlyph() (+27 more)

### Community 6 - "Community 6"
Cohesion: 0.08
Nodes (19): loadTraits(), BodyView(), buildIntroSteps(), ChartIntroOverlay(), chartSubtabs, ELEMENT_AR, ELEMENT_COLORS, elements (+11 more)

### Community 7 - "Community 7"
Cohesion: 0.13
Nodes (9): getUserId(), loadAllRemote(), loadRemoteChart(), loadRemoteProfile(), syncAllLocalData(), syncChart(), syncProfile(), TransitFeedback (+1 more)

### Community 8 - "Community 8"
Cohesion: 0.16
Nodes (16): findStarConjunctions(), FIXED_STARS, FixedStar, fixedStarSlug(), StarConjunction, starLongitudeAtJD(), FilterKey, lonToSignDeg() (+8 more)

### Community 9 - "Community 9"
Cohesion: 0.11
Nodes (7): metadata, ChartSync(), Header(), Sidebar(), tabs, TabBar(), tabs

### Community 10 - "Community 10"
Cohesion: 0.12
Nodes (15): ASPECT_TYPES, PLANET_KEYS, PLANET_SIZES, spreadAngles(), toXY(), ZODIAC_ELEMENT_COLORS, ZODIAC_GLYPHS, ZoomableWheel() (+7 more)

### Community 11 - "Community 11"
Cohesion: 0.14
Nodes (10): INTRO_SLIDES, IntroSlide, MEDIA_BG, SLIDE_BG, IconBack(), Orb(), ORB_PALETTES, PALETTE (+2 more)

### Community 12 - "Community 12"
Cohesion: 0.15
Nodes (14): ALL_COURSES, ASTRO_COURSES, ASTRO_KNOWLEDGE, Course, COURSE_OUTCOMES, COURSES, FOUNDATIONS, getCourse() (+6 more)

### Community 13 - "Community 13"
Cohesion: 0.16
Nodes (12): CHAPTERS, DURATIONS, SETTINGS, SOUNDS, PLAYER_GRADS, PlayerArt(), PlayerControls(), PlayerHeader() (+4 more)

### Community 14 - "Community 14"
Cohesion: 0.14
Nodes (11): ChevronEnd(), CloseIcon(), SearchIcon(), BREATH_LIST, FEELINGS, FILTER_GROUPS, POPULAR, RECENT (+3 more)

### Community 16 - "Community 16"
Cohesion: 0.20
Nodes (10): Headline(), HeadlineProps, sizeClasses, ASPECT_FEEL, NATAL_POSSESSIVE, TRANSIT_FLAVOR, TransitHeroCard(), VOTES (+2 more)

### Community 17 - "Community 17"
Cohesion: 0.17
Nodes (8): GreatTransit, PB_PHASES, PB_TRANSITS, Phase, PhaseStatus, TimelineItemType, UNIFIED_TIMELINE, UnifiedTimelineItem

### Community 18 - "Community 18"
Cohesion: 0.24
Nodes (6): syncTransitFeedback(), Block, ESSAYS, ParaPart, TransitEssay, TransitEssayView()

### Community 19 - "Community 19"
Cohesion: 0.22
Nodes (6): metadata, viewport, AuthContext, AuthProvider(), AuthState, PostHogProvider()

### Community 20 - "Community 20"
Cohesion: 0.24
Nodes (6): SPHERE_ORDER, SphereCard, SphereKey, SPHERES, GLYPHS, SPHERE_GLYPHS

### Community 21 - "Community 21"
Cohesion: 0.22
Nodes (7): BackIcon(), FilterIcon(), GRADS, GradVariant, IconProps, SOLID, NEW_ITEMS

### Community 22 - "Community 22"
Cohesion: 0.20
Nodes (10): ASPECTS, calculateTransits(), findExactHit(), formatExactDate(), NATAL_KEYS, PLANET_AR, PLANET_GLYPH, SEARCH_WINDOW (+2 more)

### Community 24 - "Community 24"
Cohesion: 0.25
Nodes (7): ELEMENT_AR_ORGAN, ELEMENT_MEANING, HD_CENTRE_MEANING, HOUSE_THEME_SHORT, MINERAL_MEANING, ORGAN_SIGN_READING, ORGAN_SIGNAL

### Community 25 - "Community 25"
Cohesion: 0.32
Nodes (4): en, TranslationKey, dictionaries, Locale

### Community 26 - "Community 26"
Cohesion: 0.25
Nodes (5): FlowTopBar(), PrimaryBtn(), HOW_OPTIONS, MOODS, REFLECTIONS

### Community 27 - "Community 27"
Cohesion: 0.38
Nodes (6): TEACHERS, CoursePoster(), gradientCss(), GradientTile(), BIOS, TeacherPage()

### Community 28 - "Community 28"
Cohesion: 0.29
Nodes (7): calculateAspects(), ChartView(), formatPosition(), toAr(), transformChartToHouses(), transformChartToPlanets(), transformChartToSigns()

### Community 29 - "Community 29"
Cohesion: 0.60
Nodes (3): assertNotRefused(), REFUSED_FEATURES, RefusedFeature

### Community 33 - "Community 33"
Cohesion: 0.50
Nodes (3): EXPLORE_CARDS, EXPLORE_CHIPS, STRESS_DETAIL

## Knowledge Gaps
- **235 isolated node(s):** `LoggedEvent`, `PLANET_KEYS_AR`, `ALL_PLANETS`, `PLANET_AR`, `ZODIAC_NAMES_AR` (+230 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **23 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `AstralChart` connect `Community 4` to `Community 0`, `Community 1`, `Community 3`, `Community 5`, `Community 6`, `Community 8`, `Community 10`, `Community 16`, `Community 22`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **Why does `GradientOrb()` connect `Community 2` to `Community 3`, `Community 12`, `Community 13`, `Community 14`, `Community 26`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Why does `planetSvgKey()` connect `Community 0` to `Community 10`, `Community 3`, `Community 28`, `Community 6`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **What connects `LoggedEvent`, `PLANET_KEYS_AR`, `ALL_PLANETS` to the rest of the system?**
  _235 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05009920634920635 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05109126984126984 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.056107539450613676 - nodes in this community are weakly interconnected._