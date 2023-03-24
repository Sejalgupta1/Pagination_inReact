import { useEffect, useState } from "react";
import "../styles.css";

export default function Pagination() {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
    }
  };
  console.log(products);
  useEffect(() => {
    fetchProducts();
  }, []);
  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== pages
    ) {
      setPages(selectedPage);
    }
  };
  return (
    <div className="Pagination">
      {products.length > 0 && (
        <div className="products">
          {products.slice(pages * 10 - 10, pages * 10).map((prod) => {
            return (
              <span className="products_single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="paginations">
          <span
            className={pages > 1 ? "" : "pagination__disable"}
            onClick={() => selectPageHandler(pages - 1)}
          >
            ◄
          </span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                className={pages === i + 1 ? "pagination__selected" : ""}
                onClick={() => selectPageHandler(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}

          <span
            className={
              pages < products.length / 10 ? "" : "pagination__disable"
            }
            onClick={() => selectPageHandler(pages + 1)}
          >
            ►
          </span>
        </div>
      )}
    </div>
  );
}
