import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  fr: {
    translation: {
      welcome: { title: "De l'aéroport à la citoyenneté", cta: 'Commencer — 2 min', signin: "J'ai déjà un compte" },
      nav: { home: 'Accueil', checklist: 'Checklist', tools: 'Outils', quiz: 'Quiz', profile: 'Profil' },
      onboarding: { step: 'Étape {{current}} sur {{total}}', next: 'Suivant', back: 'Retour', generating: 'Génération de ton parcours...', done: 'Ton parcours est prêt !' },
      dashboard: { hello: 'Bonjour', urgent: "Urgent aujourd'hui", week: 'Cette semaine', month: 'Ce mois', progress: '{{pct}}% complété' },
      quiz: { start: 'Commencer', practice: 'Mode pratique', exam: 'Mode examen', result: 'Résultat', score: 'Score : {{score}}/{{total}}', pass: 'Réussi !', fail: 'Continuez à étudier' },
      common: { complete: 'Terminé', skip: 'Ignorer', save: 'Sauvegarder', cancel: 'Annuler', loading: 'Chargement...', error: 'Une erreur est survenue', retry: 'Réessayer' },
    }
  },
  en: {
    translation: {
      welcome: { title: 'From the airport to citizenship', cta: 'Get Started — 2 min', signin: 'I already have an account' },
      nav: { home: 'Home', checklist: 'Checklist', tools: 'Tools', quiz: 'Quiz', profile: 'Profile' },
      onboarding: { step: 'Step {{current}} of {{total}}', next: 'Next', back: 'Back', generating: 'Generating your journey...', done: 'Your journey is ready!' },
      dashboard: { hello: 'Hello', urgent: 'Urgent today', week: 'This week', month: 'This month', progress: '{{pct}}% complete' },
      quiz: { start: 'Start', practice: 'Practice Mode', exam: 'Exam Mode', result: 'Result', score: 'Score: {{score}}/{{total}}', pass: 'Passed!', fail: 'Keep studying' },
      common: { complete: 'Done', skip: 'Skip', save: 'Save', cancel: 'Cancel', loading: 'Loading...', error: 'An error occurred', retry: 'Retry' },
    }
  },
  ar: {
    translation: {
      welcome: { title: 'من المطار إلى الجنسية', cta: 'ابدأ الآن - دقيقتان', signin: 'لدي حساب بالفعل' },
      nav: { home: 'الرئيسية', checklist: 'قائمة', tools: 'أدوات', quiz: 'اختبار', profile: 'الملف' },
      onboarding: { step: 'الخطوة {{current}} من {{total}}', next: 'التالي', back: 'رجوع', generating: 'جاري إنشاء مسارك...', done: 'مسارك جاهز!' },
      dashboard: { hello: 'مرحباً', urgent: 'عاجل اليوم', week: 'هذا الأسبوع', month: 'هذا الشهر', progress: 'اكتمل {{pct}}%' },
      quiz: { start: 'ابدأ', practice: 'وضع التدريب', exam: 'وضع الامتحان', result: 'النتيجة', score: 'النتيجة: {{score}}/{{total}}', pass: 'نجحت!', fail: 'واصل الدراسة' },
      common: { complete: 'تم', skip: 'تخطي', save: 'حفظ', cancel: 'إلغاء', loading: 'جار التحميل...', error: 'حدث خطأ', retry: 'حاول مجدداً' },
    }
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'fr',
  fallbackLng: 'fr',
  interpolation: { escapeValue: false },
})

export default i18n
