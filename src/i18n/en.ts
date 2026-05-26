const en = {
  app_name: 'Hygiea',

  // Tabs
  tab_today:    'Today',
  tab_explore:  'Rhythms',
  tab_self:     'Self',

  // Header
  header_settings:  'Settings',
  header_search:    'Search',
  header_log_event: 'Log a moment',
  header_saved:     'Saved',

  // Onboarding
  onboarding_welcome_title:    'Welcome to Hygiea',
  onboarding_welcome_subtitle: 'Your constitution. Your calendar. Your hygiene.',
  onboarding_welcome_cta:      'Begin',
  onboarding_name_label:       'Your name',
  onboarding_name_placeholder: 'Enter your name',
  onboarding_birth_date_label:  'Date of birth',
  onboarding_birth_time_label:  'Time of birth',
  onboarding_birth_time_unknown:'I do not know my birth time',
  onboarding_birth_place_label: 'Place of birth',
  onboarding_birth_place_placeholder: 'Search for your city',
  onboarding_next:        'Continue',
  onboarding_back:        'Back',
  onboarding_calculating: 'Calculating your chart…',

  // Today
  today_reflection_placeholder: 'What are you carrying today?',
  today_card_transit:    'Transit',
  today_card_body:       'Body',
  today_card_two_winds:  'Two Currents',
  today_card_question:   'Question of the day',
  today_card_learning:   'Study',

  // Resonance voting
  vote_warm:    'Warm',
  vote_quiet:   'Quiet',
  vote_stirring:'Stirring',
  vote_flat:    'Flat',

  // Self
  self_chart:              'Chart',
  self_subtab_planets:     'Planets',
  self_subtab_signs:       'Signs',
  self_subtab_houses:      'Houses',
  self_subtab_aspects:     'Aspects',
  self_subtab_fixed_stars: 'Fixed Stars',
  self_subtab_active:      'Active Influences',
  self_body:               'Body',
  self_saved:              'Saved',

  // Explore / Rhythms
  explore_tonight_sky:      'Tonight\'s Sky',
  explore_life_arc:         'Life Arc',
  explore_landmark_transits:'Great Transits',

  // Event logger
  event_what_happened:   'What happened?',
  event_which_stream:    'Which current?',
  event_stream_feeling:  'Feeling',
  event_stream_thinking: 'Thinking',
  event_stream_willing:  'Willing',
  event_rhythm:          'Rhythm',
  event_placements:      'Placements',
  event_save:            'Save',

  // Voice arc
  voice_observation:  'Observation',
  voice_meaning:      'Quality',
  voice_shadow:       'Shadow',
  voice_soul_question:'Soul question',
  voice_practice:     'Practice',

  // Settings
  settings_title:          'Settings',
  settings_profile:        'Profile',
  settings_calibration:    'Calibration',
  settings_practice:       'Consultations & Practice',
  settings_language:       'Language',
  settings_data:           'Your Data',
  settings_about:          'About Hygiea',
  settings_privacy:        'Privacy Policy',
  settings_delete_account: 'Delete Account',

  // General
  general_loading: 'Loading…',
  general_error:   'Something went wrong',
  general_retry:   'Try again',
  general_cancel:  'Cancel',
  general_done:    'Done',
  general_applies: 'Applies',
} as const;

export type TranslationKey = keyof typeof en;
export default en;
