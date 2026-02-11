import { useState, useEffect, useMemo } from "react";

const RACES = [
  {
    id: "luces-2026",
    name: "Maratón de las Luces",
    edition: "2ª Edición",
    date: "2026-02-28",
    dateDisplay: "Sáb 28 de Febrero",
    time: "Nocturna",
    location: "Parque del Bicentenario, Salta Capital",
    distances: ["3K Participativa", "7K Competitiva", "16K Competitiva"],
    prices: ["Sin remera: $30.000", "Con remera: $50.000"],
    description: "Carrera nocturna solidaria a beneficio del Hospital Materno Infantil. Llevá tu propia luz para iluminar el recorrido.",
    url: "https://www.bubilo.com.ar",
    organizer: "Área Operativa Norte",
    type: "nocturna",
    status: "inscripciones-abiertas",
    emoji: "✨",
  },
  {
    id: "nb-salta-2026",
    name: "NB Race Series Salta",
    edition: "Media Maratón",
    date: "2026-03-29",
    dateDisplay: "Dom 29 de Marzo",
    time: "Salida: 08:00 hs",
    location: "Monumento 20 de Febrero, Salta Capital",
    distances: ["10K", "21K"],
    prices: [],
    description: "El Medio Maratón New Balance de Salta combina la pasión por el running con la belleza de una ciudad que respira historia y naturaleza.",
    url: "https://www.newbalance.com.ar/t/race-series-salta-01.html",
    organizer: "New Balance / Sports Facilities",
    type: "ruta",
    status: "inscripciones-abiertas",
    emoji: "🏃",
    extra: "Kit: Sáb 28/03 en Hotel Sheraton (10 a 17 hs). Obligatorio apto físico en Eventick.",
  },
  {
    id: "fc-nocturna-2026",
    name: "Carrera Nocturna Salta",
    edition: "FC Running",
    date: "2026-04-25",
    dateDisplay: "Sáb 25 de Abril",
    time: "Nocturna",
    location: "San Lorenzo, Salta",
    distances: ["4K", "7K", "14K", "21K"],
    prices: ["4K y 7K: $37.000", "14K y 21K: $52.000"],
    description: "Trail urbano nocturno con la vista más linda de Salta. Incluye remera, kit, cronometraje y seguro.",
    url: "https://fcrunning.com.ar/",
    organizer: "FC Running",
    type: "nocturna",
    status: "inscripciones-abiertas",
    emoji: "🌙",
    extra: "Inscripciones abiertas desde el 7 de febrero.",
  },
  {
    id: "running-trip-2026",
    name: "Running Trip",
    edition: "15ª Edición",
    date: "2026-06-18",
    dateDisplay: "Jue 18 a Sáb 20 de Junio",
    time: "Vertical al atardecer / Trail Sáb 20",
    location: "Villa San Lorenzo, Salta",
    distances: ["Vertical", "5K", "10K", "21K", "35K"],
    prices: [],
    description: "Carrera itinerante de trail running por los senderos de San Lorenzo. Incluye expo, vertical al Cerro Elefante y trail entre montañas y ríos.",
    url: "https://runningtrip.com.ar/",
    organizer: "Running Trip",
    type: "trail",
    status: "proximamente",
    emoji: "⛰️",
    extra: "3 días de actividades: expo, vertical y trail. Incluye categoría atletas con discapacidad.",
  },
  {
    id: "hirpace-2026",
    name: "Maratón HIRPACE",
    edition: "36ª Edición – «Corro por vos»",
    date: "2026-09-01",
    dateDisplay: "Sep/Oct 2026 (fecha a confirmar)",
    time: "10:00 hs aprox.",
    location: "Monumento a Güemes / Parque del Bicentenario, Salta Capital",
    distances: ["1.5K Participativa", "3K", "10K Competitiva"],
    prices: [],
    description: "Tradicional maratón solidaria a beneficio de HIRPACE (Hogar Instituto de Rehabilitación del Paralítico Cerebral). Se puede correr, caminar, en bici o patines. ¡Toda la familia!",
    url: "https://www.salta.gob.ar/prensa/noticias/hoy-domingo-se-realiza-la-maraton-de-hirpace-corro-por-vos-103511",
    organizer: "HIRPACE",
    type: "solidaria",
    status: "proximamente",
    emoji: "💙",
    extra: "+35 años de tradición. Pecheras en puntos de venta. Sorteos y show en vivo.",
  },
  {
    id: "qhapaqnam-2026",
    name: "Qhapaqñam Trail Running",
    edition: "6ª Edición",
    date: "2026-10-01",
    dateDisplay: "Octubre 2026 (fecha a confirmar)",
    time: "07:00 hs",
    location: "Cafayate, Valles Calchaquíes",
    distances: ["9K", "15K", "22K", "42K", "Vertical", "3K Kids"],
    prices: [],
    description: "Experiencia que fusiona trail running con la riqueza cultural y belleza natural de los Valles Calchaquíes. Finca Don Lago, Cafayate.",
    url: "https://trailrunningcafayate.com.ar/",
    organizer: "Qhapaqñam",
    type: "trail",
    status: "proximamente",
    emoji: "🏔️",
  },
  {
    id: "caldera-team-2026",
    name: "La Caldera Team Trail",
    edition: "Carrera por equipos",
    date: "2026-11-01",
    dateDisplay: "Noviembre 2026 (fecha a confirmar)",
    time: "A confirmar",
    location: "La Caldera, Salta",
    distances: ["5K", "15K", "30K"],
    prices: [],
    description: "Evento único de trail running por equipos en La Caldera. Modalidad Copa del Mundo: equipos femeninos, masculinos o mixtos de 4 integrantes.",
    url: "https://www.instagram.com/lacalderateamtrail/",
    organizer: "La Caldera Team Trail",
    type: "trail",
    status: "proximamente",
    emoji: "🤝",
  },
  {
    id: "triatlon-cumbre-2026",
    name: "Triatlón de la Cumbre",
    edition: "40ª Edición",
    date: "2026-11-15",
    dateDisplay: "Noviembre 2026 (fecha a confirmar)",
    time: "07:00 hs",
    location: "Balneario Xamena / Cerro San Bernardo, Salta Capital",
    distances: ["Triatlón (natación + ciclismo + trepada)", "Biatlón (ciclismo + trepada)", "Trepada al Cerro San Bernardo"],
    prices: [],
    description: "Competencia clásica de Salta con más de 40 años de historia. Natación en el Xamena, 26km de ciclismo y trepada al San Bernardo.",
    url: "https://www.bubilo.com.ar/muni",
    organizer: "Agencia Salta Deportes / Municipalidad",
    type: "triatlon",
    status: "proximamente",
    emoji: "🏊",
    extra: "600+ atletas. Inscripción online vía Bubilo.",
  },
  {
    id: "san-silvestre-2026",
    name: "Maratón San Silvestre",
    edition: "XXXVI° Edición",
    date: "2026-12-31",
    dateDisplay: "Jue 31 de Diciembre",
    time: "A confirmar",
    location: "Salta - Rosario de Lerma",
    distances: ["Maratón participativa"],
    prices: [],
    description: "Desde 1982, la Maratón San Silvestre une fe, tradición y deporte en Salta. En honor a San Silvestre, cada 31 de diciembre corredores de todo el país celebran el cierre del año corriendo de Salta a Rosario de Lerma.",
    url: "https://bubilo.com.ar/ss",
    organizer: "Organización San Silvestre Salta",
    type: "ruta",
    status: "proximamente",
    emoji: "🎆",
    extra: "Más de 40 años de tradición. Contacto: sansilvestresalta@gmail.com · Tel: 0387 457-7803 · IG: @sansilvestresalta",
  },
  {
    id: "angastaco-trail-2026",
    name: "Angastaco Trail",
    edition: "2026",
    date: "2026-02-08",
    dateDisplay: "Dom 8 de Febrero (CANCELADO)",
    time: "06:00 hs",
    location: "Angastaco, Salta",
    distances: ["6K Participativa", "12K Competitiva", "21K Competitiva"],
    prices: [],
    description: "Trail running en Angastaco, Valles Calchaquíes.",
    url: "https://www.cronobottiming.com/angastaco-trail-2026",
    organizer: "CronoBot Timing",
    type: "trail",
    status: "cancelado",
    emoji: "❌",
  },
];

const STATUS_MAP = {
  "inscripciones-abiertas": { label: "INSCRIPCIONES ABIERTAS", dark: "#4ade80", light: "#15803d" },
  proximamente: { label: "PRÓXIMAMENTE", dark: "#fbbf24", light: "#a16207" },
  cancelado: { label: "CANCELADO", dark: "#f87171", light: "#dc2626" },
};

const TYPE_LABELS = { nocturna: "Nocturna", ruta: "Ruta", trail: "Trail", solidaria: "Solidaria", triatlon: "Triatlón" };
const MONTHS_ES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const DAYS_ES = ["Lu","Ma","Mi","Ju","Vi","Sá","Do"];

function getSystemTheme() {
  if (typeof window !== "undefined" && window.matchMedia) return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  return "dark";
}

function makeTheme(mode) {
  const d = mode === "dark";
  return {
    mode, bg: d ? "#0f0f0f" : "#f7f7f6", bgCard: d ? "#191919" : "#ffffff",
    bgExpanded: d ? "#141414" : "#fafaf9", bgPill: d ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
    bgPillActive: d ? "rgba(255,255,255,0.88)" : "rgba(0,0,0,0.82)",
    bgDistancePill: d ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)",
    bgNotice: d ? "rgba(200,170,100,0.07)" : "rgba(160,120,40,0.06)",
    borderNotice: d ? "rgba(200,170,100,0.15)" : "rgba(160,120,40,0.18)",
    textNotice: d ? "#c8a864" : "#92700e",
    text: d ? "#d4d4d4" : "#1a1a1a", textSecondary: d ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.48)",
    textMuted: d ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.22)",
    textPill: d ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.48)",
    textPillActive: d ? "#0f0f0f" : "#fafafa",
    border: d ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)",
    accentSoft: d ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)",
    inscribedBorder: d ? "rgba(200,170,100,0.5)" : "rgba(160,120,40,0.45)",
    inscribedBg: d ? "#c8a864" : "#92700e", inscribedText: d ? "#0f0f0f" : "#ffffff",
    headerBg: d ? "linear-gradient(180deg, #1a1a1a 0%, #141414 60%, #0f0f0f 100%)" : "linear-gradient(180deg, #ededed 0%, #e5e5e4 60%, #f7f7f6 100%)",
    headerText: d ? "#e5e5e5" : "#1a1a1a", headerSub: d ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.38)",
    headerCount: d ? "#c8a864" : "#92700e",
    btnPrimary: d ? "rgba(255,255,255,0.88)" : "rgba(0,0,0,0.82)",
    btnPrimaryText: d ? "#0f0f0f" : "#fafafa",
    btnOutline: d ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.15)",
    btnOutlineText: d ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
    calToday: d ? "#c8a864" : "#92700e", calRaceDot: d ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)",
    shadow: d ? "none" : "0 1px 2px rgba(0,0,0,0.04)",
    statusBg: (k) => { const c = STATUS_MAP[k]; return d ? c.dark : c.light; },
    countdownBg: d ? "rgba(200,170,100,0.08)" : "rgba(160,120,40,0.06)",
    countdownBorder: d ? "rgba(200,170,100,0.18)" : "rgba(160,120,40,0.15)",
    countdownText: d ? "#c8a864" : "#92700e",
    countdownNum: d ? "#e5e5e5" : "#1a1a1a",
    contactBg: d ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
    contactBorder: d ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)",
  };
}

function formatMonth(ds) { return new Date(ds + "T12:00:00").toLocaleString("es-AR", { month: "short" }).toUpperCase(); }
function formatDay(ds) { return new Date(ds + "T12:00:00").getDate(); }
function getDaysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDayOfWeek(y, m) { const d = new Date(y, m, 1).getDay(); return d === 0 ? 6 : d - 1; }

function getNextRace(races) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const upcoming = races
    .filter(r => r.status !== "cancelado" && new Date(r.date + "T12:00:00") >= now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  return upcoming.length > 0 ? upcoming[0] : null;
}

function getDaysUntil(dateStr) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(dateStr + "T00:00:00");
  const diff = target - now;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function SaltaRunning() {
  const [inscribed, setInscribed] = useState({});
  const [filter, setFilter] = useState("todos");
  const [expandedCard, setExpandedCard] = useState(null);
  const [themeMode, setThemeMode] = useState(() => getSystemTheme());
  const [calMonth, setCalMonth] = useState(() => ({ year: 2026, month: new Date().getMonth() }));

  const t = useMemo(() => makeTheme(themeMode), [themeMode]);

  useEffect(() => {
    async function load() {
      try { const r = await window.storage.get("salta-running-inscribed"); if (r && r.value) setInscribed(JSON.parse(r.value)); } catch {}
    }
    if (window.storage) load();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const h = (e) => setThemeMode(e.matches ? "dark" : "light");
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  const toggleInscribed = async (id) => {
    const next = { ...inscribed, [id]: !inscribed[id] };
    if (!next[id]) delete next[id];
    setInscribed(next);
    try { if (window.storage) await window.storage.set("salta-running-inscribed", JSON.stringify(next)); } catch {}
  };

  const filteredRaces = RACES.filter(r => {
    if (filter === "todos") return true;
    if (filter === "inscripto") return inscribed[r.id];
    return r.type === filter;
  }).sort((a, b) => {
    if (a.status === "cancelado" && b.status !== "cancelado") return 1;
    if (b.status === "cancelado" && a.status !== "cancelado") return -1;
    return new Date(a.date) - new Date(b.date);
  });

  const inscribedCount = Object.values(inscribed).filter(Boolean).length;
  const nextRace = useMemo(() => getNextRace(RACES), []);
  const daysUntilNext = nextRace ? getDaysUntil(nextRace.date) : null;

  const raceDates = useMemo(() => {
    const m = {};
    RACES.filter(r => r.status !== "cancelado").forEach(r => { if (!m[r.date]) m[r.date] = []; m[r.date].push(r); });
    return m;
  }, []);

  const calDays = useMemo(() => {
    const { year, month } = calMonth;
    const cells = [];
    for (let i = 0; i < getFirstDayOfWeek(year, month); i++) cells.push(null);
    for (let d = 1; d <= getDaysInMonth(year, month); d++) cells.push(d);
    return cells;
  }, [calMonth]);

  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  const filters = [
    { key: "todos", label: "Todas" },
    { key: "ruta", label: "Ruta" },
    { key: "trail", label: "Trail" },
    { key: "nocturna", label: "Nocturna" },
    { key: "solidaria", label: "Solidaria" },
    { key: "triatlon", label: "Triatlón" },
    { key: "inscripto", label: "Mis carreras" },
  ];

  const scrollToCard = (id) => {
    setExpandedCard(id);
    setTimeout(() => { const el = document.getElementById(`race-${id}`); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); }, 100);
  };

  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text, fontFamily: "-apple-system, 'SF Pro Text', 'Segoe UI', system-ui, sans-serif", transition: "background 0.3s, color 0.3s" }}>

      {/* ── Header ── */}
      <div style={{ background: t.headerBg, padding: "24px 16px 20px", textAlign: "center", position: "relative" }}>
        <button onClick={() => setThemeMode(p => p === "dark" ? "light" : "dark")} style={{ position: "absolute", top: 14, right: 14, background: t.accentSoft, border: "none", borderRadius: "50%", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 15 }}>
          {themeMode === "dark" ? "☀️" : "🌙"}
        </button>
        <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: t.headerSub, marginBottom: 5, fontWeight: 600 }}>Provincia de Salta</div>
        <h1 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 1px", letterSpacing: -0.5, color: t.headerText }}>SALTA CORRE</h1>
        <div style={{ fontSize: 12, color: t.headerSub }}>Calendario de carreras 2026</div>
        <div style={{ marginTop: 14, display: "flex", justifyContent: "center", gap: 28 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: t.headerText }}>{RACES.filter(r => r.status !== "cancelado").length}</div>
            <div style={{ fontSize: 9, color: t.headerSub, textTransform: "uppercase", letterSpacing: 1 }}>Carreras</div>
          </div>
          <div style={{ width: 1, background: t.border }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: t.headerCount }}>{inscribedCount}</div>
            <div style={{ fontSize: 9, color: t.headerSub, textTransform: "uppercase", letterSpacing: 1 }}>Inscripto</div>
          </div>
        </div>
      </div>

      {/* ── Countdown ── */}
      {nextRace && daysUntilNext !== null && (
        <div onClick={() => scrollToCard(nextRace.id)} style={{
          margin: "0 12px", marginTop: -1, padding: "11px 14px",
          background: t.countdownBg, border: `1px solid ${t.countdownBorder}`, borderRadius: "0 0 12px 12px",
          display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", transition: "background 0.2s",
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: t.countdownText, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 2 }}>Próxima carrera</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.text, lineHeight: 1.2 }}>{nextRace.emoji} {nextRace.name}</div>
            <div style={{ fontSize: 10.5, color: t.textSecondary, marginTop: 1 }}>{nextRace.dateDisplay}</div>
          </div>
          <div style={{ textAlign: "center", marginLeft: 12, flexShrink: 0 }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: t.countdownNum, lineHeight: 1 }}>
              {daysUntilNext === 0 ? "HOY" : daysUntilNext}
            </div>
            {daysUntilNext !== 0 && (
              <div style={{ fontSize: 8, fontWeight: 600, color: t.countdownText, textTransform: "uppercase", letterSpacing: 1 }}>
                {daysUntilNext === 1 ? "día" : "días"}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Notice ── */}
      <div style={{ margin: "10px 12px 0", padding: "8px 12px", background: t.bgNotice, border: `1px solid ${t.borderNotice}`, borderRadius: 10, fontSize: 11, color: t.textNotice, display: "flex", alignItems: "center", gap: 7 }}>
        <span style={{ fontSize: 13, flexShrink: 0 }}>💾</span>
        <span>Tus inscripciones se guardan en el navegador. Si limpiás los datos, se perderán.</span>
      </div>

      {/* ── Filters ── */}
      <div style={{ padding: "13px 12px 5px", overflowX: "auto", display: "flex", gap: 6, scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
        {filters.map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)} style={{
            flexShrink: 0, padding: "6px 13px", borderRadius: 18,
            border: filter === f.key ? "none" : `1px solid ${t.border}`,
            background: filter === f.key ? t.bgPillActive : t.bgPill,
            color: filter === f.key ? t.textPillActive : t.textPill,
            fontSize: 11, fontWeight: filter === f.key ? 700 : 500, cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap",
          }}>
            {f.key === "inscripto" && inscribedCount > 0 ? `${f.label} (${inscribedCount})` : f.label}
          </button>
        ))}
      </div>

      {/* ── Race Cards ── */}
      <div style={{ padding: "8px 12px 12px" }}>
        {filteredRaces.length === 0 && (
          <div style={{ textAlign: "center", padding: "36px 16px", color: t.textMuted }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🏃</div>
            <div style={{ fontSize: 13 }}>{filter === "inscripto" ? "Todavía no marcaste ninguna carrera" : "No hay carreras con este filtro"}</div>
          </div>
        )}
        {filteredRaces.map(race => {
          const isExpanded = expandedCard === race.id;
          const isCancelled = race.status === "cancelado";
          const statusColor = t.statusBg(race.status);
          return (
            <div key={race.id} id={`race-${race.id}`} style={{
              marginBottom: 10, borderRadius: 14, overflow: "hidden",
              opacity: isCancelled ? 0.4 : 1, transition: "all 0.25s",
              background: t.bgCard, border: inscribed[race.id] ? `1.5px solid ${t.inscribedBorder}` : `1px solid ${t.border}`,
              boxShadow: t.shadow,
            }}>
              <div onClick={() => setExpandedCard(isExpanded ? null : race.id)} style={{ padding: "13px 13px 10px", cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 4, marginBottom: 6, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: statusColor, color: "#fff", letterSpacing: 0.3 }}>{STATUS_MAP[race.status].label}</span>
                      <span style={{ fontSize: 9, fontWeight: 600, padding: "2px 6px", borderRadius: 4, background: t.bgDistancePill, color: t.textSecondary, letterSpacing: 0.3 }}>{TYPE_LABELS[race.type]}</span>
                      {inscribed[race.id] && <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: t.inscribedBg, color: t.inscribedText }}>✓ INSCRIPTO</span>}
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: t.text, lineHeight: 1.25, marginBottom: 1 }}>{race.emoji} {race.name}</div>
                    <div style={{ fontSize: 11, color: t.textSecondary, fontWeight: 500 }}>{race.edition}</div>
                  </div>
                  <div style={{ textAlign: "center", background: t.accentSoft, borderRadius: 9, padding: "6px 8px", minWidth: 44, flexShrink: 0, marginLeft: 10 }}>
                    <div style={{ fontSize: 9, fontWeight: 700, color: t.textSecondary, letterSpacing: 1 }}>{formatMonth(race.date)}</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: t.text, lineHeight: 1 }}>{formatDay(race.date)}</div>
                  </div>
                </div>
                <div style={{ marginTop: 9, display: "flex", flexWrap: "wrap", gap: 10, fontSize: 11, color: t.textSecondary }}>
                  <span>📍 {race.location.split(",")[0]}</span>
                  <span>⏰ {race.time}</span>
                </div>
                <div style={{ marginTop: 7, display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {race.distances.map(d => <span key={d} style={{ fontSize: 10, padding: "2px 7px", borderRadius: 8, background: t.bgDistancePill, color: t.textSecondary, fontWeight: 600 }}>{d}</span>)}
                </div>
                <div style={{ textAlign: "center", marginTop: 5, color: t.textMuted, fontSize: 9, transition: "transform 0.25s", transform: isExpanded ? "rotate(180deg)" : "" }}>▼</div>
              </div>
              {isExpanded && (
                <div style={{ background: t.bgExpanded, padding: 13, borderTop: `1px solid ${t.border}` }}>
                  <p style={{ fontSize: 12.5, lineHeight: 1.6, color: t.textSecondary, margin: "0 0 10px" }}>{race.description}</p>
                  {race.prices.length > 0 && (
                    <div style={{ marginBottom: 10 }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: t.textMuted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>Precios</div>
                      {race.prices.map(p => <div key={p} style={{ fontSize: 12.5, color: t.text, fontWeight: 600, marginBottom: 1 }}>{p}</div>)}
                    </div>
                  )}
                  {race.extra && <div style={{ fontSize: 11.5, color: t.textSecondary, marginBottom: 10, padding: "7px 9px", background: t.bgPill, borderRadius: 7, lineHeight: 1.5 }}>ℹ️ {race.extra}</div>}
                  <div style={{ fontSize: 10.5, color: t.textMuted, marginBottom: 11 }}>📅 {race.dateDisplay} · 📍 {race.location} · 🏢 {race.organizer}</div>
                  <div style={{ display: "flex", gap: 7 }}>
                    <a href={race.url} target="_blank" rel="noopener noreferrer" style={{
                      flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                      padding: 10, borderRadius: 9, background: t.btnPrimary, color: t.btnPrimaryText,
                      fontWeight: 700, fontSize: 11.5, textDecoration: "none", letterSpacing: 0.3,
                    }}>SITIO OFICIAL ↗</a>
                    {!isCancelled && (
                      <button onClick={(e) => { e.stopPropagation(); toggleInscribed(race.id); }} style={{
                        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                        padding: 10, borderRadius: 9,
                        border: inscribed[race.id] ? "none" : `1.5px solid ${t.btnOutline}`,
                        background: inscribed[race.id] ? t.inscribedBg : "transparent",
                        color: inscribed[race.id] ? t.inscribedText : t.btnOutlineText,
                        fontWeight: 700, fontSize: 11.5, cursor: "pointer", transition: "all 0.2s", letterSpacing: 0.3,
                      }}>{inscribed[race.id] ? "✓ INSCRIPTO" : "MARCAR"}</button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Calendar ── */}
      <div style={{ padding: "4px 12px 16px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: t.textMuted, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8, paddingLeft: 2 }}>Calendario</div>
        <div style={{ background: t.bgCard, borderRadius: 14, border: `1px solid ${t.border}`, boxShadow: t.shadow, overflow: "hidden" }}>
          <div style={{ padding: "12px 12px 8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button onClick={() => setCalMonth(p => { let m = p.month - 1, y = p.year; if (m < 0) { m = 11; y--; } return { year: y, month: m }; })} style={{ background: t.accentSoft, border: "none", borderRadius: 7, width: 30, height: 30, cursor: "pointer", color: t.text, fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{MONTHS_ES[calMonth.month]}</div>
              <div style={{ fontSize: 10, color: t.textMuted }}>{calMonth.year}</div>
            </div>
            <button onClick={() => setCalMonth(p => { let m = p.month + 1, y = p.year; if (m > 11) { m = 0; y++; } return { year: y, month: m }; })} style={{ background: t.accentSoft, border: "none", borderRadius: 7, width: 30, height: 30, cursor: "pointer", color: t.text, fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", padding: "0 8px", gap: 1 }}>
            {DAYS_ES.map(d => <div key={d} style={{ textAlign: "center", fontSize: 9, fontWeight: 600, color: t.textMuted, padding: "3px 0", letterSpacing: 0.5 }}>{d}</div>)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", padding: "3px 8px 10px", gap: 1 }}>
            {calDays.map((day, i) => {
              if (day === null) return <div key={`e${i}`} />;
              const ds = `${calMonth.year}-${String(calMonth.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const isToday = ds === todayStr;
              const rod = raceDates[ds] || [];
              const hasRace = rod.length > 0;
              return (
                <div key={day} onClick={() => { if (hasRace) scrollToCard(rod[0].id); }} style={{
                  textAlign: "center", padding: "5px 1px 3px", borderRadius: 7, cursor: hasRace ? "pointer" : "default",
                  background: isToday ? (t.mode === "dark" ? "rgba(200,168,100,0.12)" : "rgba(146,112,14,0.08)") : "transparent",
                }}>
                  <div style={{ fontSize: 12, fontWeight: isToday || hasRace ? 700 : 400, color: isToday ? t.calToday : hasRace ? t.text : t.textSecondary, lineHeight: 1 }}>{day}</div>
                  {hasRace && (
                    <div style={{ display: "flex", justifyContent: "center", gap: 2, marginTop: 3 }}>
                      {rod.map((r, ri) => <div key={ri} style={{ width: 4, height: 4, borderRadius: "50%", background: inscribed[r.id] ? t.inscribedBorder : t.calRaceDot }} />)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {(() => {
            const mr = RACES.filter(r => {
              const d = new Date(r.date + "T12:00:00");
              return d.getFullYear() === calMonth.year && d.getMonth() === calMonth.month && r.status !== "cancelado";
            }).sort((a, b) => new Date(a.date) - new Date(b.date));
            return (
              <div style={{ borderTop: `1px solid ${t.border}`, padding: "9px 12px 12px" }}>
                {mr.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "6px 0", fontSize: 11, color: t.textMuted }}>Sin carreras en {MONTHS_ES[calMonth.month].toLowerCase()}</div>
                ) : (<>
                  <div style={{ fontSize: 9, fontWeight: 700, color: t.textMuted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{mr.length} carrera{mr.length > 1 ? "s" : ""} en {MONTHS_ES[calMonth.month].toLowerCase()}</div>
                  {mr.map(r => (
                    <div key={r.id} onClick={() => scrollToCard(r.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: `1px solid ${t.border}`, cursor: "pointer" }}>
                      <div style={{ minWidth: 30, textAlign: "center" }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: t.text, lineHeight: 1 }}>{formatDay(r.date)}</div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: t.text }}>{r.emoji} {r.name}</div>
                        <div style={{ fontSize: 10, color: t.textSecondary }}>{r.distances.slice(0, 3).join(" · ")}{r.distances.length > 3 ? " ..." : ""}</div>
                      </div>
                      {inscribed[r.id] && <div style={{ fontSize: 8, fontWeight: 700, padding: "2px 5px", borderRadius: 3, background: t.inscribedBg, color: t.inscribedText }}>✓</div>}
                    </div>
                  ))}
                </>)}
              </div>
            );
          })()}
        </div>
      </div>

      {/* ── Suggest a race ── */}
      <div style={{ padding: "0 12px 120px" }}>
        <div style={{
          background: t.contactBg, border: `1px dashed ${t.contactBorder}`, borderRadius: 14,
          padding: "18px 16px", textAlign: "center",
        }}>
          <div style={{ fontSize: 22, marginBottom: 6 }}>📬</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 4 }}>¿Falta alguna carrera?</div>
          <div style={{ fontSize: 11.5, color: t.textSecondary, lineHeight: 1.5, marginBottom: 12 }}>
            Si organizás o conocés una carrera en la provincia de Salta que no está en la lista, escribime para agregarla.
          </div>
          <a
            href="mailto:leandro.deploya@gmail.com?subject=Salta%20Corre%20-%20Agregar%20carrera&body=Hola!%20Quiero%20sugerir%20una%20carrera%20para%20agregar%20al%20calendario%3A%0A%0ANombre%3A%20%0AFecha%3A%20%0ALugar%3A%20%0ADistancias%3A%20%0AWeb%2FInstagram%3A%20"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "10px 20px", borderRadius: 9,
              background: t.btnPrimary, color: t.btnPrimaryText,
              fontWeight: 700, fontSize: 12, textDecoration: "none", letterSpacing: 0.3,
            }}
          >
            ✉️ SUGERIR CARRERA
          </a>
          <div style={{ fontSize: 10, color: t.textMuted, marginTop: 8 }}>leandro.deploya@gmail.com</div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: `linear-gradient(transparent, ${t.bg} 50%)`, padding: "20px 16px 10px", textAlign: "center", pointerEvents: "none" }}>
        <div style={{ fontSize: 9.5, color: t.textMuted, pointerEvents: "auto" }}>Salta Corre 2026 · Verificá siempre en los sitios oficiales</div>
      </div>
    </div>
  );
}
