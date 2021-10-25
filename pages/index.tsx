import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero } from '@components/ui'
import Link from 'next/link'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Categories from '@components/categories/Categories'

const callouts = [
  {
    description: 'Nón dành cho',
    name: 'Nam',
    imageSrc:
      'https://images.pexels.com/photos/6353658/pexels-photo-6353658.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    href: 'https://commerce-dn3s.vercel.app/search/nam',
  },
  {
    description: 'Nón dành cho',
    name: 'Nữ',
    imageSrc:
      'https://images.pexels.com/photos/7765972/pexels-photo-7765972.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    href: 'https://commerce-dn3s.vercel.app/search/n',
  },
  {
    description: 'Nón dành cho',
    name: 'Bé',
    imageSrc:
      'https://images.pexels.com/photos/5560485/pexels-photo-5560485.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    href: 'https://commerce-dn3s.vercel.app/search/tr-em',
  },
]

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 6 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise

  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
    revalidate: 60,
  }
}

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Hero
        headline="Chúng tôi là ĐN^3S"
        description="Với sứ mệnh mang đến những chiếc nón thời trang hấp dẫn, đầy đủ thể loại với giá dễ tiếp cận nhưng đảm bảo chất lượng, đẳng cấp, tinh tế."
      />

      <div className="lg:grid lg:grid-cols-3 cursor-pointer">
        {callouts.map((callout) => (
          <Link key={callout.name} href={callout.href}>
            <div className="group relative">
              <div className="absolute z-10 text-xl font-extrabold text-white p-8">
                {callout.description}
                <div className="text-3xl lg:text-4xl">{callout.name}</div>
              </div>
              <div className="relative bg-black w-full h-80 overflow-hidden group-hover:opacity-75 transition duration-100 ease-in-out sm:aspect-w-2 sm:aspect-h-1 sm:h-96 lg:aspect-w-1 lg:aspect-h-1">
                <img
                  src={callout.imageSrc}
                  className="w-full h-full object-center object-cover opacity-40"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Grid variant="filled">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
            }}
          />
        ))}
      </Grid>

      <Marquee variant="secondary">
        {products.slice(3, 15).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} variant="slim" />
        ))}
      </Marquee>
      <Marquee>
        {products.slice(10).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} variant="slim" />
        ))}
      </Marquee>
    </>
  )
}

Home.Layout = Layout
