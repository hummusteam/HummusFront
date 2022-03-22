import '../styles/Button.css'

export default function Button({ text }: { text: string }) {
  return (
    <button type="button" className="btn-primary">
      {text}
    </button>
  )
}
