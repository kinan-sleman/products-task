    import React, { useState, useEffect } from "react";
    import { useDispatch, useSelector } from "react-redux";
    import { getAllProducts, Product, searchProducts } from "../../redux/reducers/productsReducer";
    import Button from "../../components/Button";
    import { AppDispatch, RootState } from "../../redux/store";
    import {
        loader,
        rightArrow,
        leftArrow,
        searchIcon,
        asc,
        desc,
    } from "../../assets";
    // Style
    import "./style.css";
    import CheckBox from "../../components/CheckBox";
    import { addToCart } from "../../redux/reducers/cartReducer";

    const Page: React.FC = () => {
        const dispatch = useDispatch<AppDispatch>();
        const { products, loading, error } = useSelector(
            (state: RootState) => state.product
        );

        const { items } = useSelector((state: RootState) => state.cart);
        console.log(items ,'items ')

        const [searchQuery, setSearchQuery] = useState("");
        const [sortingField, setSortingField] = useState<string>("price");
        const [sortingDir, setSortingDir] = useState<"asc" | "desc">("asc");
        const [pageNumber, setPageNumber] = useState(1);
        const [filters, setFilters] = useState({
            price: true,
            rating: false,
            asc: false,
            desc: true,
        });

        const pageSize = 9;
        useEffect(() => {
            setSortingField(filters.price ? "price" : filters.rating ? "rating" : "")
            setSortingDir(filters.asc ? "asc" : filters.desc ? "desc" : "desc")
            const requestData = {
                sortingField,
                sortingDir,
                pageNumber,
                pageSize,
                searchQuery,  
            };
            if (searchQuery) {
                dispatch(searchProducts({ searchQuery }));
            }
            dispatch(getAllProducts(requestData));
        }, [filters, sortingField, sortingDir, pageNumber, searchQuery, dispatch]);

        useEffect(() => {
            dispatch(
                searchProducts({
                    searchQuery,
                })
            );
        }, [searchQuery, dispatch]);

        const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(e.target.value);
        };

        const handleAddToCart = (product: Product) => {
            dispatch(addToCart(product))
            console.log(`Added product with ID: ${product.id} to cart.`);
        };

        const handlePageChange = (page: number) => {
            setPageNumber(page);
        };

        return (
            <div className="product-page-container">
                <aside className="sidebar">
                    <div className="filters">
                        <h3>Filters</h3>
                        <div className="filter-section">
                            <h4>Search</h4>
                            <div className="search-container">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    placeholder="Search products"
                                    className="search-input"
                                />
                                <Button
                                    color="primary"
                                    size="regular"
                                    onClick={() => dispatch(searchProducts({ searchQuery }))}
                                    icon={searchIcon}
                                    iconDirection="right"
                                >
                                    Search
                                </Button>
                            </div>
                        </div>
                        <div className="filter-section">
                            <h4>Sorting By</h4>
                            <div className="sort-container">
                                <CheckBox
                                    label="Price"
                                    checked={filters.price}
                                    onChange={(checked) =>
                                        setFilters((prev) => ({ ...prev, price: checked, rating: !checked }))
                                    }
                                />
                                <CheckBox
                                    label="Rating"
                                    checked={filters.rating}
                                    onChange={(checked) =>
                                        setFilters((prev) => ({ ...prev, price: !checked, rating: checked }))
                                    }
                                />
                            </div>
                        </div>
                        <div className="filter-section">
                            <h4>Sorting Direction</h4>
                            <div className="sort-container">
                                <CheckBox
                                    label=""
                                    icon={asc}
                                    checked={filters.asc}
                                    onChange={(checked) =>
                                        setFilters((prev) => ({ ...prev, asc: checked, desc: !checked }))
                                    }
                                />
                                <CheckBox
                                    label=""
                                    icon={desc}
                                    checked={filters.desc}
                                    onChange={(checked) =>
                                        setFilters((prev) => ({ ...prev, asc: !checked, desc: checked }))
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </aside>

                <main className="product-listing">
                    {loading ? (
                        <div className="loading">
                            <img src={loader} alt="Loading" />
                        </div>
                    ) : error ? (
                        <div>Error: {String(error)}</div>
                    ) : (
                        <>
                            <div className="products-grid">
                                {products?.products?.map((product) => (
                                    <div key={product?.id} className="product-card">
                                        <img src={product?.thumbnail} alt={product?.title} />
                                        <h3>{product?.title}</h3>
                                        <p>{product?.description}</p>
                                        <span>${product?.price}</span>
                                        <Button
                                            color="primary"
                                            size="regular"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            Add to Cart
                                        </Button>
                                    </div>
                                ))}
                            </div>

                            <div className="pagination">
                                <Button
                                    color="primary"
                                    size="small"
                                    onClick={() => handlePageChange(pageNumber - 1)}
                                    disabled={pageNumber === 1}
                                    icon={leftArrow}
                                    iconDirection={"left"}
                                />
                                <Button
                                    color="primary"
                                    size="small"
                                    onClick={() => handlePageChange(pageNumber + 1)}
                                    disabled={pageNumber * pageSize >= (products?.total || 0)}
                                    icon={rightArrow}
                                    iconDirection={"right"}
                                />
                            </div>
                        </>
                    )}
                </main>
            </div>
        );
    };

    export default Page;
