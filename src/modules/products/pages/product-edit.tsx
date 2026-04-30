import type { FC } from "react";
import { useProductEditProps } from "../props/product-edit";

export const ProductEditPage: FC = () => {
  const {} = useProductEditProps();
  return <section>ProductEditPage</section>;
};
