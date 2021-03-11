import React, { useContext } from "react";
import useAddProduct from "../hooks/useAddProduct";

const ProductsContext = React.createContext();

const ProductsProvider = (props) => {
	const doAddProduct = useAddProduct();
	const addProduct = (userId, title, description) => {
		doAddProduct(
			{
				variables: { userId, title, description },
			},
			{ refetchQueries: [`getProductsByUserId`] },
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
