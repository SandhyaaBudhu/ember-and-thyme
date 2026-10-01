import type { ReactNode } from 'react'

export default function FormField({ label, id, error, optional = false, children }: { label: string; id: string; error?: string; optional?: boolean; children: ReactNode }) {
  return <div className="form-field"><label htmlFor={id}>{label}{optional && <span>Optional</span>}</label>{children}{error && <p className="field-error" id={`${id}-error`}>{error}</p>}</div>
}
