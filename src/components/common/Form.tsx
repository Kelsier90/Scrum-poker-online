import React from 'react'

interface FormProps {
  onSubmit: (data: unknown) => void
  children: unknown
}

const Form = ({ onSubmit, children }: FormProps) => {
  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()

    const form = ev.target as HTMLFormElement

    const data: Record<string, unknown> = {}
    for (let i = 0; i < form.elements.length; i++) {
      const formElement = form.elements.item(i)
      if (
        formElement.hasAttribute('name') &&
        (formElement instanceof HTMLInputElement ||
          formElement instanceof HTMLSelectElement ||
          formElement instanceof HTMLTextAreaElement)
      ) {
        const name = formElement.getAttribute('name')
        data[name] = (formElement as any).value
      }
    }

    onSubmit(data)
  }

  return <form onSubmit={handleSubmit}>{children}</form>
}

export default Form
