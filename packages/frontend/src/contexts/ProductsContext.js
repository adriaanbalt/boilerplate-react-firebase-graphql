import React, { useContext } from "react";
import useGetProducts from "hooks/useGetProducts";
import useAddProduct from "hooks/useAddProduct";

const ProductsContext = React.createContext();

const ProductsProvider = (props) => {
	const doGetProducts = useGetProducts();
	const doAddProduct = useAddProduct();
	const getProducts = (userId) => {
		console.log("getProducts!!");
		// const { loading, error, data } = doGetProducts();
		// return { loading, error, data };
	};
	const addProduct = (userId, title, description) => {
		doAddProduct(
			{
				variables: { userId, title, description },
			},
			{ refetchQueries: [`getProducts`] },
		)
			.then((_) => {
				console.log("successfully added product");
			})
			.catch((e) => console.log(e));
	};
	const removeProduct = (productId) => {
		console.log("remove product", productId);
	};

	const { children } = props;
	return (
		<ProductsContext.Provider
			value={{
				getProducts: getProducts,
				addProduct: addProduct,
				removeProduct: removeProduct,
			}}>
			{children}
		</ProductsContext.Provider>
	);
};

function useProducts() {
	return useContext(ProductsContext);
}

const ProductsConsumer = ProductsContext.Consumer;

export { ProductsProvider, ProductsConsumer, useProducts };
