import "../styles/Menu.css";
import { Navigation, SmallCategoryCard } from "../components";

export default function Menu() {
  const banner =
    "https://www.nestleprofessionalmena.com/sites/default/files/2020-05/Vision%20banner.png";

  return (
    <div className="menu-container">
      <Navigation url={banner} />

      <div className="menu-carousel">
        <div className="menu-carousel-inner">
          <SmallCategoryCard title={"Meat"} url={"https://thumbs.dreamstime.com/b/sliced-beef-steak-black-plate-dark-background-top-view-sliced-beef-steak-black-plate-175637157.jpg"} />
          <SmallCategoryCard title={"Beverages"} url={"https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2018/04/8.jpg"} />
          <SmallCategoryCard title={"Deserts"} url={"https://thumbs.dreamstime.com/b/top-view-fine-dining-tasty-restaurant-dessert-decorated-pomegranate-grains-white-plate-wooden-table-160410060.jpg"} />
          <SmallCategoryCard title={"Appetisers"} url={"https://media.istockphoto.com/photos/homemade-italian-bruschetta-on-rustic-wooden-table-picture-id1181611076?b=1&k=20&m=1181611076&s=170667a&w=0&h=_UR2cuy4gzTBZcPazSlacMVwjcV6_PCLHQMAPkHVOgc="} />
          <SmallCategoryCard title={"Sandwiches"} url={"https://images.unsplash.com/photo-1554433607-66b5efe9d304?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c2FuZHdpY2h8ZW58MHx8MHx8&w=1000&q=80"} />
          <SmallCategoryCard title={"Sides"} url={"https://media.istockphoto.com/photos/all-traditional-thanksgiving-side-dishes-picture-id1036966530?k=20&m=1036966530&s=612x612&w=0&h=LkoTNH81lQD8DfEDTY5TUqglrcCGnyvUrg0KsqsBU1U="} />
          <SmallCategoryCard title={"Pizzas"} url={"https://media.istockphoto.com/photos/fresh-italian-pizza-picture-id1045841884?k=20&m=1045841884&s=612x612&w=0&h=NMPrk4Vd9j3FYICHwBIwCcOvxrY88Ne3mLLzAHpoZ9s="} />
          <SmallCategoryCard title={"Salads"} url={"https://previews.123rf.com/images/pairhandmade/pairhandmade1609/pairhandmade160900688/63330277-un-ni%C3%B1o-gordo-odio-a-comer-ensalada-de-verduras.jpg"} />
          <SmallCategoryCard title={"Grills"} url={"https://vaalweekblad.com/wp-content/uploads/sites/119/2021/09/Heritage-Day-braai-recipes-24-SEPTEMBER-MAIN-PHOTO.jpg"} />
        </div>
      </div>
    </div>
  );
}
