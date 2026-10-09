type Props = {
  message: string
  tone?: 'success' | 'error' | 'info'
}

export default function Feedback({ message, tone = 'info' }: Props) {
  if (!message) return null
  return <div className={`feedback feedback-${tone}`}>{message}</div>
}
