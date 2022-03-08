import '../styles/Menu.css'
import { Navigation, SmallCategoryCard, MenuItemCard, Meta } from '../components'
import { useState, useEffect } from 'react'
import { Category } from '../types'
import { fetchCategories } from '../api'

export default function Menu() {
  const banner = 'https://www.nestleprofessionalmena.com/sites/default/files/2020-05/Vision%20banner.png'
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetchCategories().then(setCategories)
  }, [])

  return (
    <div className="menu-container">
      <Navigation url={banner} />

      <div className="inner-menu-container">
        <div className="menu-carousel">
          <div className="menu-carousel-inner">
            {categories.length && categories.map(c => {
              return <SmallCategoryCard key={c.id} id={c.id} name={c.name} image={c.image} />
            })}
            {/* <SmallCategoryCard id={'specials'} name={'Specials'} url={'https://www.foodiesfeed.com/wp-content/uploads/2021/01/hot-shakshuka-819x1024.jpg'} />
            <SmallCategoryCard id={'meats'} name={'Meat'} url={'https://thumbs.dreamstime.com/b/sliced-beef-steak-black-plate-dark-background-top-view-sliced-beef-steak-black-plate-175637157.jpg'} />
            <SmallCategoryCard id={'drinks'} name={'Beverages'} url={'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2018/04/8.jpg'} />
            <SmallCategoryCard id={'deserts'} name={'Deserts'} url={'https://thumbs.dreamstime.com/b/top-view-fine-dining-tasty-restaurant-dessert-decorated-pomegranate-grains-white-plate-wooden-table-160410060.jpg'} />
            <SmallCategoryCard id={'appetisers'} name={'Appetisers'} url={'https://media.istockphoto.com/photos/homemade-italian-bruschetta-on-rustic-wooden-table-picture-id1181611076?b=1&k=20&m=1181611076&s=170667a&w=0&h=_UR2cuy4gzTBZcPazSlacMVwjcV6_PCLHQMAPkHVOgc='} />
            <SmallCategoryCard id={'sandwiches'} name={'Sandwiches'} url={'https://images.unsplash.com/photo-1554433607-66b5efe9d304?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c2FuZHdpY2h8ZW58MHx8MHx8&w=1000&q=80'} />
            <SmallCategoryCard id={'sides'} name={'Sides'} url={'https://media.istockphoto.com/photos/all-traditional-thanksgiving-side-dishes-picture-id1036966530?k=20&m=1036966530&s=612x612&w=0&h=LkoTNH81lQD8DfEDTY5TUqglrcCGnyvUrg0KsqsBU1U='} />
            <SmallCategoryCard id={'salads'} name={'Salads'} url={'https://previews.123rf.com/images/pairhandmade/pairhandmade1609/pairhandmade160900688/63330277-un-ni%C3%B1o-gordo-odio-a-comer-ensalada-de-verduras.jpg'} />
            <SmallCategoryCard id={'pizzas'} name={'Pizzas'} url={'https://media.istockphoto.com/photos/fresh-italian-pizza-picture-id1045841884?k=20&m=1045841884&s=612x612&w=0&h=NMPrk4Vd9j3FYICHwBIwCcOvxrY88Ne3mLLzAHpoZ9s='} />
            <SmallCategoryCard id={'grills'} name={'Grills'} url={'https://vaalweekblad.com/wp-content/uploads/sites/119/2021/09/Heritage-Day-braai-recipes-24-SEPTEMBER-MAIN-PHOTO.jpg'} /> */}
          </div>
        </div>

        <div className="menu-header">
          <h1>Menu Items</h1>
          <Meta />
        </div>

        <div className="menu-items">
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
        </div>
      </div>
    </div>
  )
}
