import { FC } from 'react'

type Item = {
  description: string
  name: string
  imgSrc: string
  href: string
}

type Props = {
  callouts: Item[]
}

const Categories: FC<Props> = ({ callouts }) => {
  return (
    <div
      id="products-category"
      className="mt-20 lg:grid lg:grid-cols-3 cursor-pointer"
    >
      {callouts.map((callout) => (
        <div key={callout.name} className="group relative">
          <div className="absolute z-10 text-xl font-extrabold text-white p-8">
            {callout.description}
            <div className="text-3xl lg:text-4xl">{callout.name}</div>
          </div>
          <div className="relative bg-black w-full h-80 overflow-hidden group-hover:opacity-75 transition duration-100 ease-in-out sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
            <img
              src={callout.imgSrc}
              className="w-full h-full object-center object-cover opacity-40"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Categories
