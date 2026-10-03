import type { EstagioCrescimento } from '../types'

type Props = {
  stage?: EstagioCrescimento
  size?: number
}

const levels: Record<EstagioCrescimento, number> = {
  SEMENTE: 0,
  BROTO: 1,
  PLANTA_PEQUENA: 2,
  PLANTA_MEDIA: 3,
  PLANTA_GRANDE: 4,
  FLORESCIMENTO: 5,
}

export default function PlantIllustration({ stage = 'SEMENTE', size = 110 }: Props) {
  const level = levels[stage]

  return (
    <svg
      className="plant-illustration"
      viewBox="0 0 120 120"
      width={size}
      height={size}
      aria-label={`Estágio ${stage.toLowerCase().replaceAll('_', ' ')}`}
      role="img"
    >
      <path d="M42 89h36l-4 19H46z" className="plant-pot" />
      <path d="M38 86h44" className="plant-line" />
      {level === 0 ? (
        <>
          <ellipse cx="60" cy="81" rx="15" ry="4" className="plant-soil" />
          <path d="M55 79c2-5 8-5 11 0-3 4-8 4-11 0Z" className="plant-seed" />
        </>
      ) : (
        <>
          <path d={`M60 86 C60 ${82 - level * 10}, 60 ${72 - level * 9}, 60 ${64 - level * 9}`} className="plant-stem" />
          {level >= 1 && <path d="M60 72c-9-12-17-7-17-7 2 10 8 14 17 11" className="plant-leaf" />}
          {level >= 2 && <path d="M60 62c10-13 19-7 19-7-2 10-9 15-19 12" className="plant-leaf" />}
          {level >= 3 && <path d="M59 49c-10-13-20-7-20-7 2 11 10 16 20 12" className="plant-leaf" />}
          {level >= 4 && <path d="M61 38c10-12 20-5 20-5-3 10-11 14-20 10" className="plant-leaf" />}
          {level >= 5 && (
            <g className="plant-flower">
              <circle cx="60" cy="24" r="5" />
              <circle cx="60" cy="14" r="6" />
              <circle cx="70" cy="21" r="6" />
              <circle cx="66" cy="31" r="6" />
              <circle cx="54" cy="31" r="6" />
              <circle cx="50" cy="21" r="6" />
            </g>
          )}
        </>
      )}
    </svg>
  )
}
