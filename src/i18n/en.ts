const en = {
  app_name: 'Hygiea',

  // Tabs
  tab_today: 'Today',
  tab_spheres: 'Spheres',
  tab_events: 'Events',
  tab_self: 'Self',
  tab_settings: 'Settings',

  // Header
  header_settings: 'Settings',
  header_log_event: 'Log Event',
  header_saved: 'Saved',

  // Onboarding
  onboarding_welcome_title: 'Welcome to Hygiea',
  onboarding_welcome_subtitle: 'Your chart. Your spheres. Your practice.',
  onboarding_welcome_cta: 'Begin',
  onboarding_name_label: 'Your name',
  onboarding_name_placeholder: 'Enter your name',
  onboarding_birth_date_label: 'Date of birth',
  onboarding_birth_time_label: 'Time of birth',
  onboarding_birth_time_unknown: 'I don\'t know my birth time',
  onboarding_birth_place_label: 'Place of birth',
  onboarding_birth_place_placeholder: 'Search your city',
  onboarding_next: 'Next',
  onboarding_back: 'Back',
  onboarding_calculating: 'Calculating your chart...',

  // Today
  today_sphere_of_day: 'Sphere of the Day',
  today_organ_focus: 'Organ Focus',
  today_daily_practice: 'Daily Practice',
  today_evening_reflection: 'Evening Reflection',
  today_threshold: 'Enter',

  // Spheres
  spheres_title: 'The Seven Spheres',
  spheres_hierarchy: 'Hierarchy',
  spheres_body_member: 'Body Member',
  spheres_sense: 'Zodiacal Sense',
  spheres_organ: 'Organ',
  spheres_metal: 'Metal',
  spheres_luciferic: 'Luciferic Pole',
  spheres_ahrimanic: 'Ahrimanic Pole',
  spheres_your_placement: 'Your Placement',
  spheres_sign_reading: 'Sign Reading',
  spheres_house_reading: 'House Reading',

  // Events
  event_what_happened: 'What happened?',
  event_which_sphere: 'Which sphere?',
  event_save: 'Save',
  event_sphere_sun: 'Sun',
  event_sphere_moon: 'Moon',
  event_sphere_mercury: 'Mercury',
  event_sphere_venus: 'Venus',
  event_sphere_mars: 'Mars',
  event_sphere_jupiter: 'Jupiter',
  event_sphere_saturn: 'Saturn',

  // Voice arc (placement detail)
  voice_traditional: 'The Configuration',
  voice_evolutionary: 'Soul Development',
  voice_developmental: 'The Task',
  voice_aphorism: '',

  // Settings
  settings_title: 'Settings',
  settings_profile: 'Profile',
  settings_data: 'Your Data',
  settings_privacy: 'Privacy',
  settings_about: 'About Hygiea',
  settings_edit_birth: 'Edit Birth Data',
  settings_sovereignty: 'Data Sovereignty',
  settings_export: 'Export Data',
  settings_delete: 'Delete All Data',
  settings_ai_synthesis: 'AI Synthesis',
  settings_ai_off: 'Off',
  settings_ai_on: 'On (◇)',

  // Common
  common_loading: 'Loading...',
  common_save: 'Save',
  common_cancel: 'Cancel',
  common_done: 'Done',
  common_back: 'Back',
  common_close: 'Close',
  common_unknown: 'Unknown',
  common_retrograde: 'Retrograde',
} as const;

export default en;
export type TranslationKey = keyof typeof en;
