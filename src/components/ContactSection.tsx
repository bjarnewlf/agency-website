'use client'

import { useState } from 'react'
import { contactEmail } from '@/data/content'
import { MagneticButton } from '@/components/MagneticButton'

// Formspree-Endpoint: https://formspree.io/f/xnjownbp
// Account erstellen auf formspree.io, dann die ID hier eintragen.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xnjownbp'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function ContactSection() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormState('submitting')
    setErrorMessage('')

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })

      if (res.ok) {
        setFormState('success')
        form.reset()
      } else {
        const json = await res.json().catch(() => ({}))
        const msg =
          (json as { error?: string }).error ?? 'Etwas ist schiefgelaufen. Bitte versuch es nochmal.'
        setErrorMessage(msg)
        setFormState('error')
      }
    } catch {
      setErrorMessage('Keine Verbindung. Bitte versuch es nochmal.')
      setFormState('error')
    }
  }

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="section-padding border-t border-[var(--border)] px-6"
      style={{ backgroundColor: '#F0EFFF' }}
    >
      <div className="mx-auto" style={{ maxWidth: '680px' }}>
        {/* Headline */}
        <div className="text-center mb-12">
          <h2
            data-animate
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: 'clamp(3rem, 7vw, 4rem)',
              fontWeight: 800,
              color: '#0A0A0F',
              letterSpacing: '-0.03em',
              lineHeight: '0.92',
              marginBottom: '1.25rem',
            }}
          >
            Bereit?
          </h2>

          <p
            data-animate
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '1.25rem',
              color: 'var(--text-secondary)',
            }}
          >
            Schreib uns — wir melden uns innerhalb von 24h.
          </p>
        </div>

        {/* Formular */}
        {formState === 'success' ? (
          <div
            data-animate
            className="text-center py-12"
            style={{
              backgroundColor: 'rgba(79, 70, 229, 0.06)',
              borderRadius: '16px',
              border: '1px solid rgba(79, 70, 229, 0.15)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#0A0A0F',
                marginBottom: '0.5rem',
              }}
            >
              Nachricht angekommen.
            </p>
            <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-secondary)' }}>
              Wir melden uns bald bei dir.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-5">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-name"
                  style={{
                    fontFamily: 'var(--font-jetbrains-mono)',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--text-secondary)',
                  }}
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Dein Name"
                  disabled={formState === 'submitting'}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '10px',
                    padding: '0.875rem 1rem',
                    fontFamily: 'var(--font-inter)',
                    fontSize: '1rem',
                    color: '#0A0A0F',
                    width: '100%',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    outline: 'none',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)'
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
              </div>

              {/* E-Mail */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-email"
                  style={{
                    fontFamily: 'var(--font-jetbrains-mono)',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--text-secondary)',
                  }}
                >
                  E-Mail
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="du@beispiel.de"
                  disabled={formState === 'submitting'}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '10px',
                    padding: '0.875rem 1rem',
                    fontFamily: 'var(--font-inter)',
                    fontSize: '1rem',
                    color: '#0A0A0F',
                    width: '100%',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    outline: 'none',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)'
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
              </div>

              {/* Nachricht */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-message"
                  style={{
                    fontFamily: 'var(--font-jetbrains-mono)',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--text-secondary)',
                  }}
                >
                  Nachricht
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Worum geht's?"
                  disabled={formState === 'submitting'}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '10px',
                    padding: '0.875rem 1rem',
                    fontFamily: 'var(--font-inter)',
                    fontSize: '1rem',
                    color: '#0A0A0F',
                    width: '100%',
                    resize: 'vertical',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    outline: 'none',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)'
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
              </div>

              {/* Error-Feedback */}
              {formState === 'error' && (
                <p
                  role="alert"
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.875rem',
                    color: '#DC2626',
                    backgroundColor: 'rgba(220, 38, 38, 0.06)',
                    borderRadius: '8px',
                    padding: '0.75rem 1rem',
                    border: '1px solid rgba(220, 38, 38, 0.15)',
                  }}
                >
                  {errorMessage}
                </p>
              )}

              {/* Submit */}
              <div className="flex flex-col items-center gap-4 pt-2">
                <MagneticButton>
                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="inline-flex items-center font-semibold text-white rounded-lg px-8 py-4 transition-all duration-200 hover:opacity-90 hover:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: '#6366F1',
                      boxShadow: 'var(--shadow-md)',
                      fontFamily: 'var(--font-syne)',
                      fontSize: '1rem',
                    }}
                  >
                    {formState === 'submitting' ? 'Wird gesendet...' : 'Nachricht senden'}
                  </button>
                </MagneticButton>

                <a
                  href={`mailto:${contactEmail}`}
                  className="transition-colors duration-200 hover:text-[var(--text-primary)]"
                  style={{
                    fontFamily: 'var(--font-jetbrains-mono)',
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {contactEmail}
                </a>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
