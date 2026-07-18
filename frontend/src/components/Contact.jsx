import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Mail, Phone, MapPin, ArrowRight, Clock } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const SERVICES = [
  "Wohnungsumzug (nah)",
  "Fernumzug",
  "Auslandsumzug",
  "Entrümpelung",
  "Möbelmontage",
  "Sonstiges",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: SERVICES[0],
    move_date: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.message) {
      toast.error("Bitte füllen Sie alle Pflichtfelder aus.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Anfrage gesendet. Wir melden uns innerhalb von 24 Stunden.");
      setSent(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        service: SERVICES[0],
        move_date: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Etwas ist schiefgelaufen. Bitte rufen Sie uns direkt an.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="kontakt"
      data-testid="contact-section"
      className="bg-[var(--ink)] text-[var(--bone)] px-6 md:px-10 py-24 md:py-40"
    >
      <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-8 md:gap-12">
        {/* Left: heading + info */}
        <div className="col-span-12 md:col-span-5">
          <div className="mono text-xs uppercase tracking-widest text-[var(--bone)]/60 mb-8">
            § Kontakt — Kostenlose Besichtigung
          </div>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.9] tracking-tighter mb-10 text-balance">
            Ein Anruf.
            <br />
            <span className="italic font-normal text-[var(--rust)]">
              Ein Festpreis.
            </span>
            <br />
            Ein Umzug.
          </h2>

          <div className="space-y-6 mt-12">
            <a
              href="tel:+498987579385"
              data-testid="contact-phone"
              className="flex items-center gap-4 group"
            >
              <Phone
                size={18}
                className="text-[var(--rust)] flex-shrink-0"
              />
              <div>
                <div className="mono text-[10px] uppercase tracking-widest text-[var(--bone)]/60">
                  Telefon
                </div>
                <div className="font-display text-2xl md:text-3xl group-hover:text-[var(--rust)] transition-colors duration-300">
                  089 / 87579385
                </div>
              </div>
            </a>

            <a
              href="mailto:Info@amel.de"
              data-testid="contact-email"
              className="flex items-center gap-4 group"
            >
              <Mail
                size={18}
                className="text-[var(--rust)] flex-shrink-0"
              />
              <div>
                <div className="mono text-[10px] uppercase tracking-widest text-[var(--bone)]/60">
                  E-Mail
                </div>
                <div className="font-display text-2xl md:text-3xl group-hover:text-[var(--rust)] transition-colors duration-300">
                  Info@amel.de
                </div>
              </div>
            </a>

            <div
              data-testid="contact-address"
              className="flex items-center gap-4"
            >
              <MapPin
                size={18}
                className="text-[var(--rust)] flex-shrink-0"
              />
              <div>
                <div className="mono text-[10px] uppercase tracking-widest text-[var(--bone)]/60">
                  Adresse
                </div>
                <div className="font-display text-2xl md:text-3xl">
                  Ravensburgerring 23
                  <span className="block text-lg md:text-xl text-[var(--bone)]/80 font-normal">
                    81243 München
                  </span>
                </div>
              </div>
            </div>

            <div
              data-testid="contact-hours"
              className="flex items-center gap-4"
            >
              <Clock
                size={18}
                className="text-[var(--rust)] flex-shrink-0"
              />
              <div>
                <div className="mono text-[10px] uppercase tracking-widest text-[var(--bone)]/60">
                  Öffnungszeiten
                </div>
                <div className="font-display text-2xl md:text-3xl">
                  Mo – Sa
                  <span className="block text-lg md:text-xl text-[var(--bone)]/80 font-normal">
                    08:00 – 18:00 Uhr
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          onSubmit={submit}
          data-testid="contact-form"
          className="col-span-12 md:col-span-7 md:pl-6"
        >
          <div className="mono text-xs uppercase tracking-widest text-[var(--bone)]/60 mb-8">
            → Anfrage stellen — kostenlos & unverbindlich
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            <Field label="Name" required>
              <input
                type="text"
                value={form.name}
                onChange={update("name")}
                className="brut-input !border-[var(--bone)]/40 !text-[var(--bone)] focus:!border-[var(--rust)]"
                placeholder="Ihr vollständiger Name"
                data-testid="contact-input-name"
                required
              />
            </Field>

            <Field label="E-Mail" required>
              <input
                type="email"
                value={form.email}
                onChange={update("email")}
                className="brut-input !border-[var(--bone)]/40 !text-[var(--bone)] focus:!border-[var(--rust)]"
                placeholder="ihre@mail.de"
                data-testid="contact-input-email"
                required
              />
            </Field>

            <Field label="Telefon" required>
              <input
                type="tel"
                value={form.phone}
                onChange={update("phone")}
                className="brut-input !border-[var(--bone)]/40 !text-[var(--bone)] focus:!border-[var(--rust)]"
                placeholder="0176 …"
                data-testid="contact-input-phone"
                required
              />
            </Field>

            <Field label="Wunschtermin">
              <input
                type="date"
                value={form.move_date}
                onChange={update("move_date")}
                className="brut-input !border-[var(--bone)]/40 !text-[var(--bone)] focus:!border-[var(--rust)]"
                data-testid="contact-input-date"
              />
            </Field>

            <Field label="Leistung" required className="md:col-span-2">
              <select
                value={form.service}
                onChange={update("service")}
                className="brut-input !border-[var(--bone)]/40 !text-[var(--bone)] focus:!border-[var(--rust)] bg-transparent appearance-none"
                data-testid="contact-input-service"
              >
                {SERVICES.map((s) => (
                  <option key={s} value={s} className="text-black">
                    {s}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Nachricht" required className="md:col-span-2">
              <textarea
                value={form.message}
                onChange={update("message")}
                rows={4}
                className="brut-input !border-[var(--bone)]/40 !text-[var(--bone)] focus:!border-[var(--rust)] resize-none"
                placeholder="Beschreiben Sie kurz Ihren Umzug oder Ihr Anliegen …"
                data-testid="contact-input-message"
                required
              />
            </Field>
          </div>

          <div className="mt-10 flex items-center justify-between gap-6 flex-wrap">
            <p className="text-xs text-[var(--bone)]/50 max-w-xs mono">
              Mit dem Absenden stimmen Sie zu, dass wir Ihre Daten zur
              Bearbeitung Ihrer Anfrage speichern.
            </p>

            <button
              type="submit"
              disabled={loading}
              data-testid="contact-submit"
              className="group relative inline-flex items-center gap-3 bg-[var(--rust)] text-white px-8 py-4 text-xs uppercase tracking-widest overflow-hidden disabled:opacity-70"
            >
              <span className="relative z-10">
                {loading ? "Wird gesendet …" : sent ? "Erneut senden" : "Anfrage absenden"}
              </span>
              <ArrowRight size={16} className="relative z-10" />
              <span className="absolute inset-0 bg-[var(--bone)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)]" />
              <span className="absolute inset-0 flex items-center justify-center gap-3 text-[var(--ink)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] uppercase tracking-widest">
                {loading ? "Wird gesendet …" : sent ? "Erneut senden" : "Anfrage absenden"}
                <ArrowRight size={16} />
              </span>
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function Field({ label, required, className = "", children }) {
  return (
    <label className={`block py-4 ${className}`}>
      <span className="mono text-[10px] uppercase tracking-widest text-[var(--bone)]/60 block mb-1">
        {label}
        {required && <span className="text-[var(--rust)]"> *</span>}
      </span>
      {children}
    </label>
  );
}
