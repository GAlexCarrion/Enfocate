import type { Dictionary } from "./es";

export const en: Dictionary = {
  nav: {
    inicio: "Home",
    queEs: "What is FocusUp?",
    faq: "FAQ",
    tecnicas: "Techniques",
    apoya: "❤️ Support my work",
    spotifyAria: "Focus playlists",
    abrirMenu: "Open menu",
    cerrarMenu: "Close menu",
    cambiarIdioma: "Cambiar a Español",
    activarNoche: "Turn on night mode",
    activarDia: "Turn on day mode",
  },
  common: {
    comenzarAhora: "Start now",
    explorarTecnicas: "Explore techniques",
    verGuia: "View guide",
    usarAhora: "Use it now",
    conocerMas: "Learn more",
    cerrar: "Close",
    volverInicio: "Back to home",
    scrollHint: "Discover more",
  },
  home: {
    hero: {
      badge: "Free · No sign-up · In your browser",
      titulo1: "Study better,",
      titulo2: "not longer.",
      subtitulo:
        "FocusUp brings together the four most effective study techniques — Pomodoro, Feynman, Cornell and mind maps — in a single tool. Manage your time, take better notes and actually learn.",
      ctaPrimario: "Start now",
      ctaSecundario: "Explore techniques",
    },
    tecnicas: {
      kicker: "Techniques",
      titulo: "Four science-backed methods",
      subtitulo:
        "Each technique tackles a different study problem: focus, understanding, retention and organization. Use them alone or combined.",
    },
    como: {
      kicker: "How it works",
      titulo: "Your study session in three steps",
      subtitulo: "No accounts, no installs. Open the app and start studying.",
      pasos: [
        {
          titulo: "Pick your technique",
          desc: "Focus, understanding, recall or organization? Each method solves something different.",
        },
        {
          titulo: "Follow the step-by-step guide",
          desc: "Every technique includes a guide with real screenshots so you master it in minutes.",
        },
        {
          titulo: "Study and repeat",
          desc: "Complete your blocks, track your progress and turn habit into results.",
        },
      ],
    },
    features: {
      kicker: "All included",
      titulo: "Much more than a timer",
      items: [
        {
          titulo: "Step-by-step guides",
          desc: "Clear instructions with real app screenshots to master every method.",
        },
        {
          titulo: "Exportable notes",
          desc: "Take Cornell-method notes and download them ready to print or share.",
        },
        {
          titulo: "Feynman recording",
          desc: "Record yourself explaining the topic with your camera and spot gaps in your understanding.",
        },
        {
          titulo: "Focus playlists",
          desc: "Lofi and ambient music selections designed to accompany your sessions.",
        },
        {
          titulo: "Editable templates",
          desc: "12 mind-map templates ready to customize in Canva with one click.",
        },
        {
          titulo: "Night mode",
          desc: "A starry sky with shooting stars for comfortable late-night studying.",
        },
      ],
    },
    cta: {
      titulo: "Ready for your first session?",
      subtitulo: "Open FocusUp, pick a technique and feel the difference in 25 minutes.",
      boton: "Start for free",
    },
    picker: {
      titulo: "Pick a technique",
      subtitulo: "You can check its guide before you start.",
    },
    faq: {
      kicker: "FAQ",
      titulo: "Frequently asked questions",
      subtitulo: "The essentials about study techniques and how to use FocusUp.",
      preguntas: [
        {
          p: "What is the Pomodoro technique?",
          r: "It's a time management method that splits study sessions into 25-minute blocks of full focus separated by short 5-minute breaks. Every four blocks you take a longer 15-minute break.",
        },
        {
          p: "What is the best study technique for memorizing?",
          r: "It depends on the material, but the Feynman technique is one of the most effective for understanding and remembering: it forces you to explain the topic in simple words, revealing gaps in your knowledge.",
        },
        {
          p: "What is the Cornell method?",
          r: "It's a note-taking system that organizes the page into three zones: main ideas, class notes and a final summary. It's the most widely used method at universities and makes exam review easier.",
        },
        {
          p: "How does the Feynman technique work?",
          r: "It consists of explaining a concept as if talking to a 10-year-old. Wherever you stumble or lean on jargon, there's a gap you need to review in your notes.",
        },
        {
          p: "What are mind maps and when should I use them?",
          r: "They're visual diagrams that connect ideas around a central topic. They're ideal for summarizing broad subjects, preparing presentations and reviewing visually before an exam.",
        },
        {
          p: "Is FocusUp free?",
          r: "Yes. All FocusUp tools are completely free and require no sign-up.",
        },
      ],
    },
  },
  tecnicas: {
    pomodoro: {
      nombre: "Pomodoro",
      lema: "Master your focus",
      descripcion:
        "Split your study into 25-minute blocks with short breaks in between. Perfect for staying concentrated and avoiding burnout.",
    },
    feynman: {
      nombre: "Feynman",
      lema: "Learn by teaching",
      descripcion:
        "Study a topic and record yourself explaining it in your own words. If you can't explain it simply, you don't get it yet — that's the gold.",
    },
    cornell: {
      nombre: "Cornell",
      lema: "Notes that work",
      descripcion:
        "Structure your notes into key ideas, details and a summary. The most widely used note system at universities, ready to export as PDF.",
    },
    mapasMentales: {
      nombre: "Mind maps",
      lema: "Think visually",
      descripcion:
        "Map out connected ideas and concepts. A visual technique perfect for planning, memorizing or reviewing complex topics.",
    },
  },
  pomodoro: {
    ingresaTarea: "Enter your task",
    tareaPlaceholder: "What are you studying? e.g. Calculus, chapter 3",
    guardar: "Save task",
    trabajando: "Work time",
    descansando: "Break time",
    descansoCorto: "Short break",
    descansoLargo: "Long break",
    ciclos: "Completed cycles",
    sesionesHoy: "sessions today",
    comenzar: "Start",
    pausar: "Pause",
    reanudar: "Resume",
    reiniciar: "Reset",
    terminarCiclo: "End cycle",
    cambiarTarea: "Change task",
    finCiclosTitulo: "Done with this task?",
    si: "Yes, done",
    no: "Not yet",
    felicTitulo: "Congratulations!",
    felicTexto: "You completed your task successfully. Your future self says thanks.",
    nuevaTarea: "New task",
    tipTitulo: "Study with intention, rest with purpose",
    tipTexto:
      "During breaks, step away from the screen: stretch, drink water or look out the window. Your brain consolidates what you learned while you rest.",
    errorVacia: "Please enter a task.",
    errorEspacio: "Leading spaces are not allowed.",
    verGuia: "How does Pomodoro work?",
    gifPie: "Study with intention, rest with purpose",
    gifAlt: "Animation of a lofi girl studying",
  },
  feynman: {
    titulo: "Feynman technique",
    nombreTarea: "Topic name",
    temaPlaceholder: "What topic will you explain? e.g. Photosynthesis",
    activarCamara: "Enable camera",
    camaraActiva: "Camera ready",
    grabar: "Record",
    pausar: "Pause",
    reanudar: "Resume",
    detener: "Stop",
    descargar: "Download",
    nuevaGrabacion: "New recording",
    vistaPrevia: "Recording preview",
    errorCamara: "Could not access the camera or microphone.",
    errorStream: "No camera or microphone access.",
    errorEspacio: "Leading spaces are not allowed.",
    permisoBloqueado: "Your camera or microphone is blocked for this site.",
    permisoAyuda: "Click the camera or lock icon in the address bar, allow access, and try again.",
    reintentarAcceso: "Retry access",
    explicacion:
      "Explain the topic as if talking to a 10-year-old. Wherever you stumble or lean on jargon, there's a gap you need to review.",
    paso1: "Pick a concept and write its name.",
    paso2: "Record yourself explaining it in simple words.",
    paso3: "Listen back and find where you struggled.",
    paso4: "Review that part and explain it better again.",
  },
  cornell: {
    titulo: "Cornell method",
    campoTitulo: "Title",
    phTitulo: "Today's topic or lecture",
    campoIdeas: "Key ideas",
    phIdeas: "Key concepts, questions, facts you don't want to forget…",
    campoNotas: "Class notes",
    phNotas: "Details go here: definitions, examples, formulas…",
    campoResumen: "Summary",
    phResumen: "Wrap up with 2–3 lines of essentials, in your own words.",
    descargarPdf: "Download as PDF",
    errorCampos: "Please fill in every field before downloading.",
    explicacion:
      "Divide the page into three zones: key ideas on the left, notes on the right and a summary at the bottom. When reviewing, cover the notes and try to recall them from the key ideas.",
  },
  mapas: {
    titulo: "Mind maps",
    subtitulo:
      "Twelve templates ready to edit in Canva: change texts, colors and icons to make them yours in minutes.",
    editar: "Edit template",
    plantillaAria: "Mind map template",
  },
  spotify: {
    titulo: "Find your rhythm to focus",
    subtitulo:
      "Hand-picked playlists for your sessions: lofi, piano and ambient. Pick one, hit play and let the background do the rest.",
    escuchar: "Listen now",
  },
  guia: {
    kicker: "Step-by-step guide",
    comoUsar: "How to use",
    pasos: {
      pomodoro: [
        "Choose a task you want to work on and write it down to focus only on it.",
        "Set the timer to 25 minutes — that's your work block.",
        "Press Start. You can pause, reset or end the cycle whenever you like.",
        "After each block you get a 5-minute short break. Step away from the screen.",
        "After completing 4 cycles you'll earn a 15-minute long break and the app will ask if you finished the task.",
        "If you answer “Yes”, you'll see your congratulations screen and can go home or start a new task.",
      ],
      feynman: [
        "Choose a topic you want to learn and type its name.",
        "Turn on your camera and get ready to explain.",
        "Use the Record, Pause, Resume and Stop buttons while explaining the topic in your own words.",
        "When done you'll see a preview: review it, download the video and study what was hardest to explain.",
      ],
      cornell: [
        "Write the title of the topic you're studying.",
        "In the left column note the key ideas: main concepts and questions.",
        "In the right column develop the detailed class notes.",
        "Finish with a summary at the bottom and download your notes as PDF with the button below.",
      ],
      mapasMentales: [
        "Pick one of the templates available in the gallery.",
        "Press the Edit button to open it in Canva.",
        "Customize texts, colors and icons — make it yours!",
      ],
    },
    irTecnica: "Go to the technique",
    noEncontrada: "We couldn't find that technique. Try from the Techniques menu.",
  },
  about: {
    kicker: "Our story",
    titulo: "What is FocusUp?",
    parrafo1:
      "FocusUp is a free web tool that brings together four science-backed study techniques: Pomodoro, Feynman, the Cornell method and mind maps. Everything runs in your browser, with no accounts or installs.",
    parrafo2:
      "It began as a university project and today keeps growing as an open project maintained by DracarySoft, with the same mission: studying better shouldn't depend on paying for a subscription.",
    stats: [
      { valor: "4", etiqueta: "study techniques" },
      { valor: "12", etiqueta: "mind map templates" },
      { valor: "6", etiqueta: "focus playlists" },
      { valor: "$0", etiqueta: "now and forever" },
    ],
    puedesTitulo: "What can you do with FocusUp?",
    puedes: [
      "Study in Pomodoro blocks with automatic cycles and breaks.",
      "Take Cornell notes and download print-ready PDFs.",
      "Record yourself explaining a topic and spot gaps in your understanding.",
      "Edit mind-map templates directly in Canva.",
      "Listen to playlists designed for deep focus.",
      "Switch between day and night mode depending on when you study.",
    ],
    equipoTitulo: "The people behind the project",
    equipoTexto:
      "FocusUp started as a course project. This team built it, and it lives on thanks to those who keep maintaining it.",
    equipo: [
      { nombre: "Luis Castillo", rol: "Project lead · Development" },
      { nombre: "Alisson Guapulema", rol: "Development · QA" },
      { nombre: "Andres Falcon", rol: "Development" },
      { nombre: "Cristopher Chasiloa", rol: "Development" },
      { nombre: "Jean Carlos Itaz", rol: "Development · Design" },
    ],
  },
  footer: {
    tagline: "Four study techniques. One free tool.",
    colExplora: "Explore",
    colTecnicas: "Techniques",
    colRecursos: "Resources",
    guias: "Study guides",
    proyectoDe: "A DracarySoft project",
    hechoCon: "Made with React, TypeScript and Tailwind CSS",
    koFi: "Support the project on Ko-fi",
  },
  notFound: {
    titulo: "This page went out for a break",
    texto: "The address you're looking for doesn't exist or moved somewhere else.",
    boton: "Back to home",
  },
};
