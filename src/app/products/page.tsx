"use client";

import { useAppSelector, useAppDispatch } from "@/store/hook";
import { useEffect } from "react";
import { getProducts } from "@/store/slices/productSlice";

export default function ProductPage() {
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {list.map((product: any) => (
          <li key={product.id}>{product.name} - ${product.price}</li>
        ))}
      </ul>
    </div>
  );
}
