import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  fr: {
    translation: {
      welcome: { title: "De l'aéroport à la citoyenneté", cta: 'Commencer — 2 min', signin: "J'ai déjà un compte", f1Title: 'Parcours personnalisé', f1Desc: 'Adapté à ton profil, ta province et ta situation', f2Title: 'Checklists intelligentes', f2Desc: '30+ tâches générées automatiquement selon tes priorités', f3Title: 'Quiz citoyenneté', f3Desc: '100 questions officielles pour préparer ton test' },
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
      profil: {
        langue: "Langue de l'application", province: 'Province', arrival: "Date d'arrivée",
        priorities: 'Priorités', editPriorities: 'Modifier mes priorités', signout: 'Se déconnecter',
        notSet: 'Non renseignée', version: 'Construit avec ❤️ pour les nouveaux Canadiens',
      },
      checklist: {
        title: 'Ma Checklist', tasks: '{{done}}/{{total}} tâches', completed: '{{pct}}% complété',
        all: 'Tout', empty: 'Aucune tâche ici', emptyDesc: 'Cette phase est vide ou tout est complété !',
        phaseComplete: 'Étape terminée !', nextPhase: 'Passer à {{phase}}',
        allDone: '🍁 Parcours complet ! Bonne chance pour ta citoyenneté.',
        validated: 'Étape validée !',
      },
      outils: { title: 'Ressources', subtitle: "Toutes les options pour bien s'établir" },
      quiz: { start: 'Commencer', practice: 'Mode pratique', exam: 'Mode examen', result: 'Résultat', score: 'Score : {{score}}/{{total}}', pass: 'Réussi !', fail: 'Continuez à étudier' },
      common: { complete: 'Terminé', skip: 'Ignorer', save: 'Sauvegarder', cancel: 'Annuler', loading: 'Chargement...', error: 'Une erreur est survenue', retry: 'Réessayer', urgent: 'Urgent' },
    }
  },
  en: {
    translation: {
      welcome: { title: 'From the airport to citizenship', cta: 'Get Started — 2 min', signin: 'I already have an account', f1Title: 'Personalized journey', f1Desc: 'Adapted to your profile, province and situation', f2Title: 'Smart checklists', f2Desc: '30+ tasks generated automatically based on your priorities', f3Title: 'Citizenship quiz', f3Desc: '100 official questions to prepare your test' },
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
      profil: {
        langue: 'App Language', province: 'Province', arrival: 'Arrival Date',
        priorities: 'Priorities', editPriorities: 'Edit my priorities', signout: 'Sign out',
        notSet: 'Not set', version: 'Built with ❤️ for new Canadians',
      },
      checklist: {
        title: 'My Checklist', tasks: '{{done}}/{{total}} tasks', completed: '{{pct}}% complete',
        all: 'All', empty: 'No tasks here', emptyDesc: 'This phase is empty or all done!',
        phaseComplete: 'Phase complete!', nextPhase: 'Move to {{phase}}',
        allDone: '🍁 Journey complete! Good luck with your citizenship.',
        validated: 'Phase validated!',
      },
      outils: { title: 'Resources', subtitle: 'All options to settle in well' },
      quiz: { start: 'Start', practice: 'Practice Mode', exam: 'Exam Mode', result: 'Result', score: 'Score: {{score}}/{{total}}', pass: 'Passed!', fail: 'Keep studying' },
      common: { complete: 'Done', skip: 'Skip', save: 'Save', cancel: 'Cancel', loading: 'Loading...', error: 'An error occurred', retry: 'Retry', urgent: 'Urgent' },
    }
  },
  ar: {
    translation: {
      welcome: { title: 'من المطار إلى الجنسية', cta: 'ابدأ الآن - دقيقتان', signin: 'لدي حساب بالفعل', f1Title: 'مسار شخصي', f1Desc: 'مُكيَّف مع ملفك الشخصي ومقاطعتك ووضعك', f2Title: 'قوائم ذكية', f2Desc: 'أكثر من 30 مهمة تُنشأ تلقائياً وفق أولوياتك', f3Title: 'اختبار الجنسية', f3Desc: '100 سؤال رسمي للتحضير لاختبارك' },
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
      profil: {
        langue: 'لغة التطبيق', province: 'المقاطعة', arrival: 'تاريخ الوصول',
        priorities: 'الأولويات', editPriorities: 'تعديل أولوياتي', signout: 'تسجيل الخروج',
        notSet: 'غير محدد', version: 'مبني بـ ❤️ للكنديين الجدد',
      },
      checklist: {
        title: 'قائمتي', tasks: '{{done}}/{{total}} مهام', completed: 'اكتمل {{pct}}%',
        all: 'الكل', empty: 'لا توجد مهام هنا', emptyDesc: 'هذه المرحلة فارغة أو مكتملة!',
        phaseComplete: 'المرحلة مكتملة!', nextPhase: 'الانتقال إلى {{phase}}',
        allDone: '🍁 الرحلة مكتملة! حظاً موفقاً في الحصول على الجنسية.',
        validated: 'تم التحقق من المرحلة!',
      },
      outils: { title: 'الموارد', subtitle: 'جميع الخيارات للاستقرار بشكل جيد' },
      quiz: { start: 'ابدأ', practice: 'وضع التدريب', exam: 'وضع الامتحان', result: 'النتيجة', score: 'النتيجة: {{score}}/{{total}}', pass: 'نجحت!', fail: 'واصل الدراسة' },
      common: { complete: 'تم', skip: 'تخطي', save: 'حفظ', cancel: 'إلغاء', loading: 'جار التحميل...', error: 'حدث خطأ', retry: 'حاول مجدداً', urgent: 'عاجل' },
    }
  },
  es: {
    translation: {
      welcome: { title: 'Del aeropuerto a la ciudadanía', cta: 'Empezar — 2 min', signin: 'Ya tengo una cuenta', f1Title: 'Recorrido personalizado', f1Desc: 'Adaptado a tu perfil, provincia y situación', f2Title: 'Listas inteligentes', f2Desc: '30+ tareas generadas automáticamente según tus prioridades', f3Title: 'Quiz de ciudadanía', f3Desc: '100 preguntas oficiales para preparar tu examen' },
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
      profil: {
        langue: 'Idioma de la app', province: 'Provincia', arrival: 'Fecha de llegada',
        priorities: 'Prioridades', editPriorities: 'Editar mis prioridades', signout: 'Cerrar sesión',
        notSet: 'No configurado', version: 'Construido con ❤️ para los nuevos canadienses',
      },
      checklist: {
        title: 'Mi Lista', tasks: '{{done}}/{{total}} tareas', completed: '{{pct}}% completado',
        all: 'Todo', empty: 'Sin tareas aquí', emptyDesc: '¡Esta fase está vacía o todo completado!',
        phaseComplete: '¡Fase completada!', nextPhase: 'Pasar a {{phase}}',
        allDone: '🍁 ¡Recorrido completo! Buena suerte con tu ciudadanía.',
        validated: '¡Fase validada!',
      },
      outils: { title: 'Recursos', subtitle: 'Todas las opciones para instalarse bien' },
      quiz: { start: 'Empezar', practice: 'Modo práctica', exam: 'Modo examen', result: 'Resultado', score: 'Puntuación: {{score}}/{{total}}', pass: '¡Aprobado!', fail: 'Sigue estudiando' },
      common: { complete: 'Hecho', skip: 'Omitir', save: 'Guardar', cancel: 'Cancelar', loading: 'Cargando...', error: 'Ocurrió un error', retry: 'Reintentar', urgent: 'Urgente' },
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
