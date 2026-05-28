import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  fr: {
    translation: {
      welcome: { title: "De l'aéroport à la citoyenneté", cta: 'Commencer — 2 min', signin: "J'ai déjà un compte" },
      nav: { home: 'Accueil', checklist: 'Checklist', tools: 'Outils', quiz: 'Quiz', profile: 'Profil' },
      onboarding: { step: 'Étape {{current}} sur {{total}}', next: 'Suivant', back: 'Retour', generating: 'Génération de ton parcours...', done: 'Ton parcours est prêt !' },
      dashboard: {
        hello: 'Bonjour',
        urgent: "Urgent aujourd'hui",
        week: 'Cette semaine',
        month: 'Ce mois',
        progress: '{{pct}}% complété',
        journey: 'Ton parcours',
        quickTools: 'Outils rapides',
        noTasks: "Aucune tâche pour l'instant",
        noTasksDesc: 'Complète le sondage pour générer ton parcours',
        urgentCount_one: "{{count}} tâche urgente aujourd'hui",
        urgentCount_other: "{{count}} tâches urgentes aujourd'hui",
      },
      tools: {
        calculator: 'Calculateur citoyenneté',
        quiz: 'Quiz officiel',
        banks: 'Comparer les banques',
        housing: 'Guide logement',
        forms: 'Mes formulaires',
        benefits: 'Mes bénéfices',
      },
      quiz: { start: 'Commencer', practice: 'Mode pratique', exam: 'Mode examen', result: 'Résultat', score: 'Score : {{score}}/{{total}}', pass: 'Réussi !', fail: 'Continuez à étudier' },
      common: { complete: 'Terminé', skip: 'Ignorer', save: 'Sauvegarder', cancel: 'Annuler', loading: 'Chargement...', error: 'Une erreur est survenue', retry: 'Réessayer' },
    }
  },
  en: {
    translation: {
      welcome: { title: 'From the airport to citizenship', cta: 'Get Started — 2 min', signin: 'I already have an account' },
      nav: { home: 'Home', checklist: 'Checklist', tools: 'Tools', quiz: 'Quiz', profile: 'Profile' },
      onboarding: { step: 'Step {{current}} of {{total}}', next: 'Next', back: 'Back', generating: 'Generating your journey...', done: 'Your journey is ready!' },
      dashboard: {
        hello: 'Hello',
        urgent: 'Urgent today',
        week: 'This week',
        month: 'This month',
        progress: '{{pct}}% complete',
        journey: 'Your journey',
        quickTools: 'Quick tools',
        noTasks: 'No tasks yet',
        noTasksDesc: 'Complete the survey to generate your journey',
        urgentCount_one: '{{count}} urgent task today',
        urgentCount_other: '{{count}} urgent tasks today',
      },
      tools: {
        calculator: 'Citizenship Calculator',
        quiz: 'Official Quiz',
        banks: 'Compare Banks',
        housing: 'Housing Guide',
        forms: 'My Forms',
        benefits: 'My Benefits',
      },
      quiz: { start: 'Start', practice: 'Practice Mode', exam: 'Exam Mode', result: 'Result', score: 'Score: {{score}}/{{total}}', pass: 'Passed!', fail: 'Keep studying' },
      common: { complete: 'Done', skip: 'Skip', save: 'Save', cancel: 'Cancel', loading: 'Loading...', error: 'An error occurred', retry: 'Retry' },
    }
  },
  ar: {
    translation: {
      welcome: { title: 'من المطار إلى الجنسية', cta: 'ابدأ الآن - دقيقتان', signin: 'لدي حساب بالفعل' },
      nav: { home: 'الرئيسية', checklist: 'قائمة', tools: 'أدوات', quiz: 'اختبار', profile: 'الملف' },
      onboarding: { step: 'الخطوة {{current}} من {{total}}', next: 'التالي', back: 'رجوع', generating: 'جاري إنشاء مسارك...', done: 'مسارك جاهز!' },
      dashboard: {
        hello: 'مرحباً',
        urgent: 'عاجل اليوم',
        week: 'هذا الأسبوع',
        month: 'هذا الشهر',
        progress: 'اكتمل {{pct}}%',
        journey: 'مسارك',
        quickTools: 'أدوات سريعة',
        noTasks: 'لا توجد مهام بعد',
        noTasksDesc: 'أكمل الاستبيان لإنشاء مسارك',
        urgentCount_one: '{{count}} مهمة عاجلة اليوم',
        urgentCount_other: '{{count}} مهام عاجلة اليوم',
      },
      tools: {
        calculator: 'حاسبة الجنسية',
        quiz: 'الاختبار الرسمي',
        banks: 'مقارنة البنوك',
        housing: 'دليل السكن',
        forms: 'نماذجي',
        benefits: 'مزاياي',
      },
      quiz: { start: 'ابدأ', practice: 'وضع التدريب', exam: 'وضع الامتحان', result: 'النتيجة', score: 'النتيجة: {{score}}/{{total}}', pass: 'نجحت!', fail: 'واصل الدراسة' },
      common: { complete: 'تم', skip: 'تخطي', save: 'حفظ', cancel: 'إلغاء', loading: 'جار التحميل...', error: 'حدث خطأ', retry: 'حاول مجدداً' },
    }
  },
  es: {
    translation: {
      welcome: { title: 'Del aeropuerto a la ciudadanía', cta: 'Empezar — 2 min', signin: 'Ya tengo una cuenta' },
      nav: { home: 'Inicio', checklist: 'Lista', tools: 'Herramientas', quiz: 'Quiz', profile: 'Perfil' },
      onboarding: { step: 'Paso {{current}} de {{total}}', next: 'Siguiente', back: 'Atrás', generating: 'Generando tu recorrido...', done: '¡Tu recorrido está listo!' },
      dashboard: {
        hello: 'Hola',
        urgent: 'Urgente hoy',
        week: 'Esta semana',
        month: 'Este mes',
        progress: '{{pct}}% completado',
        journey: 'Tu recorrido',
        quickTools: 'Herramientas rápidas',
        noTasks: 'Sin tareas por ahora',
        noTasksDesc: 'Completa la encuesta para generar tu recorrido',
        urgentCount_one: '{{count}} tarea urgente hoy',
        urgentCount_other: '{{count}} tareas urgentes hoy',
      },
      tools: {
        calculator: 'Calculadora ciudadanía',
        quiz: 'Quiz oficial',
        banks: 'Comparar bancos',
        housing: 'Guía vivienda',
        forms: 'Mis formularios',
        benefits: 'Mis beneficios',
      },
      quiz: { start: 'Empezar', practice: 'Modo práctica', exam: 'Modo examen', result: 'Resultado', score: 'Puntuación: {{score}}/{{total}}', pass: '¡Aprobado!', fail: 'Sigue estudiando' },
      common: { complete: 'Hecho', skip: 'Omitir', save: 'Guardar', cancel: 'Cancelar', loading: 'Cargando...', error: 'Ocurrió un error', retry: 'Reintentar' },
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
