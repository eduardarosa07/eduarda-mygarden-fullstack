import type { EstagioCrescimento } from '../types'

type Props = {
  stage?: EstagioCrescimento
  size?: number
  variant?: number
}

const levels: Record<EstagioCrescimento, number> = {
  SEMENTE: 0,
  BROTO: 1,
  PLANTA_PEQUENA: 2,
  PLANTA_MEDIA: 3,
  PLANTA_GRANDE: 4,
  FLORESCIMENTO: 5,
}

function LeafyPlant({ level }: { level: number }) {
  return (
    <>
      <path d={`M60 86 C60 ${82 - level * 10}, 60 ${72 - level * 9}, 60 ${64 - level * 9}`} className="plant-stem" />
      {level >= 1 && <path d="M60 72c-9-12-17-7-17-7 2 10 8 14 17 11" className="plant-leaf" />}
      {level >= 2 && <path d="M60 62c10-13 19-7 19-7-2 10-9 15-19 12" className="plant-leaf" />}
      {level >= 3 && <path d="M59 49c-10-13-20-7-20-7 2 11 10 16 20 12" className="plant-leaf" />}
      {level >= 4 && <path d="M61 38c10-12 20-5 20-5-3 10-11 14-20 10" className="plant-leaf plant-leaf-dark" />}
      {level >= 5 && (
        <g className="plant-flower">
          <circle cx="60" cy="24" r="5" className="flower-center" />
          <circle cx="60" cy="14" r="6" />
          <circle cx="70" cy="21" r="6" />
          <circle cx="66" cy="31" r="6" />
          <circle cx="54" cy="31" r="6" />
          <circle cx="50" cy="21" r="6" />
        </g>
      )}
    </>
  )
}

function DaisyPlant({ level }: { level: number }) {
  const top = level >= 4 ? 29 : level >= 3 ? 42 : level >= 2 ? 55 : 70
  return (
    <>
      <path d={`M60 86 C58 72, 61 55, 60 ${top}`} className="plant-stem" />
      {level >= 1 && <path d="M59 73c-12-8-18-1-18-1 5 8 11 10 18 6" className="plant-leaf plant-leaf-light" />}
      {level >= 2 && <path d="M61 62c11-9 18-2 18-2-4 8-11 11-18 7" className="plant-leaf" />}
      {level >= 3 && <path d="M59 50c-10-8-17-2-17-2 4 8 10 11 17 7" className="plant-leaf plant-leaf-light" />}
      {level >= 4 && (
        <g className="daisy-flower">
          <circle cx="60" cy="25" r="4" className="daisy-center" />
          <ellipse cx="60" cy="16" rx="4" ry="8" />
          <ellipse cx="69" cy="21" rx="4" ry="8" transform="rotate(55 69 21)" />
          <ellipse cx="68" cy="31" rx="4" ry="8" transform="rotate(120 68 31)" />
          <ellipse cx="52" cy="31" rx="4" ry="8" transform="rotate(60 52 31)" />
          <ellipse cx="51" cy="21" rx="4" ry="8" transform="rotate(125 51 21)" />
        </g>
      )}
      {level >= 5 && <circle cx="83" cy="43" r="6" className="tiny-flower" />}
    </>
  )
}

function SucculentPlant({ level }: { level: number }) {
  const leaves = [
    [60, 76, 8, 18, 0], [50, 78, 7, 16, -35], [70, 78, 7, 16, 35],
    [46, 69, 7, 16, -55], [74, 69, 7, 16, 55], [55, 64, 7, 17, -15],
    [65, 64, 7, 17, 15], [60, 54, 7, 18, 0],
  ]
  const count = Math.min(leaves.length, 2 + level * 2)
  return (
    <g className="succulent-plant">
      {leaves.slice(0, count).map(([cx, cy, rx, ry, rot], index) => (
        <ellipse key={index} cx={cx} cy={cy} rx={rx} ry={ry} transform={`rotate(${rot} ${cx} ${cy})`} className={index % 2 ? 'succulent-leaf alt' : 'succulent-leaf'} />
      ))}
      {level >= 5 && <path d="M60 52c0-15 0-18 0-23" className="plant-stem" />}
      {level >= 5 && <circle cx="60" cy="25" r="7" className="succulent-bloom" />}
    </g>
  )
}

function TulipPlant({ level }: { level: number }) {
  const top = level >= 4 ? 31 : level >= 3 ? 43 : level >= 2 ? 56 : 70
  return (
    <>
      <path d={`M60 87 C59 69, 61 49, 60 ${top}`} className="plant-stem" />
      {level >= 1 && <path d="M60 77c-16-8-19 7-19 7 8 1 14-1 19-6" className="tulip-leaf" />}
      {level >= 2 && <path d="M60 68c16-10 20 5 20 5-7 3-14 1-20-4" className="tulip-leaf alt" />}
      {level >= 3 && <path d="M59 58c-14-8-18 5-18 5 7 2 13 0 18-4" className="tulip-leaf" />}
      {level >= 4 && (
        <path d="M48 29c4-9 9-11 12-3 4-8 9-6 13 3-1 12-8 18-13 18s-12-6-12-18Z" className="tulip-flower" />
      )}
      {level >= 5 && <circle cx="60" cy="34" r="4" className="tulip-center" />}
    </>
  )
}

function HerbPlant({ level }: { level: number }) {
  return (
    <>
      <path d="M60 86c0-18-2-34 0-55" className="plant-stem" />
      {level >= 1 && <path d="M60 72c-8-10-15-5-15-5 2 8 7 12 15 10" className="herb-leaf" />}
      {level >= 2 && <path d="M60 63c8-10 15-5 15-5-2 8-7 12-15 10" className="herb-leaf alt" />}
      {level >= 3 && <path d="M60 53c-8-10-15-5-15-5 2 8 7 12 15 10" className="herb-leaf" />}
      {level >= 4 && <path d="M60 43c8-10 15-5 15-5-2 8-7 12-15 10" className="herb-leaf alt" />}
      {level >= 5 && (
        <g className="herb-blooms">
          <circle cx="60" cy="28" r="4" />
          <circle cx="54" cy="33" r="3" />
          <circle cx="66" cy="34" r="3" />
        </g>
      )}
    </>
  )
}

export default function PlantIllustration({ stage = 'SEMENTE', size = 110, variant = 0 }: Props) {
  const level = levels[stage]
  const species = Math.abs(variant) % 5

  return (
    <svg
      className={`plant-illustration plant-variant-${species}`}
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
          {species === 0 && <LeafyPlant level={level} />}
          {species === 1 && <DaisyPlant level={level} />}
          {species === 2 && <SucculentPlant level={level} />}
          {species === 3 && <TulipPlant level={level} />}
          {species === 4 && <HerbPlant level={level} />}
        </>
      )}
    </svg>
  )
}
