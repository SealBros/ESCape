import useProducts from '@/hooks/useProducts'
import ProductList from './ProductList'
import { CATEGORY_MAPPING } from '@/libs/constants/category'
import useInfiniteProducts from '@/hooks/useInfiniteProduct'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'

import { useEffect } from 'react'
import useRouteHandler from '@/hooks/useRouteHandler'

export default function ProductMain() {
  const { keyword, order, category } = useRouteHandler()
  const { data: reviewCountData } = useProducts({ order: 'reviewCount' })
  const { data: ratingData } = useProducts({ order: 'rating' })
  const { data: productData, fetchNextPage } = useInfiniteProducts({
    keyword: (keyword as string) || null,
    order: (order as 'rating' | 'recent' | 'reviewCount') || null,
    categoryId: Number(category as string) || null,
  })
  const { targetRef } = useInfiniteScroll({
    loadMore: () => {
      fetchNextPage()
    },
    hasMore: !!productData?.pageParams,
  })

  useEffect(() => {}, [keyword, order, category])

  const hotProducts = reviewCountData?.list.slice(0, 6) || null
  const ratingProducts = ratingData?.list.slice(0, 6) || null
  const allProducts = productData?.pages.flatMap((page) => page.list)
  return (
    <div className="xl:h-100vh-xl scroll-hidden flex w-full max-w-[940px] flex-col gap-[60px] xl:min-w-[940px] xl:gap-[80px] xl:pt-[60px]">
      {category && (
        <>
          <ProductList productList={allProducts}>
            <div>'{CATEGORY_MAPPING[`${category}`]}'의 모든 테마</div>
          </ProductList>
          <div ref={targetRef} className="mb-4"></div>
        </>
      )}
      {keyword && (
        <>
          <ProductList productList={allProducts}>
            <div>'{keyword}'에 대한 검색 결과</div>
          </ProductList>
          <div ref={targetRef} className="mb-4"></div>
        </>
      )}
      {!category && !keyword && (
        <>
          <ProductList productList={hotProducts}>
            <div>
              지금 핫한 테마
              <span className="bg-gradation bg-clip-text text-transparent">TOP 6</span>
            </div>
          </ProductList>
          <ProductList productList={ratingProducts}>
            <div>별점이 높은 테마</div>
          </ProductList>
        </>
      )}
    </div>
  )
}
