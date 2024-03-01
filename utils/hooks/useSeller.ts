import { eCheck } from "@/components/helpers/functions";
import { ISeller, ISellerBase, ISellerFetched } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddSeller = () => {
  return useMutation({
    mutationFn: async (data: ISeller) =>
      await axios.post("/api/seller", data).then(eCheck),
  });
};
//edit seller
export const useEditSeller = () => {
  return useMutation({
    mutationFn: async (
      data: Partial<ISeller> & {
        _id: string;
      }
    ) => await axios.put("/api/seller", data).then(eCheck),
  });
};
//get products by category
export const useGetSellerByCategory = (category: string) => {
  return useQuery<ISellerFetched[]>({
    queryKey: ["sellers", category],
    queryFn: async () => {
      return await axios
        .get("/api/user/sellers", {
          params: {
            category,
          },
        })
        .then(eCheck);
    },
  });
};
//get seller by _id
export const useGetSellerById = (_id: string) => {
  return useQuery<ISellerFetched>({
    queryKey: ["seller", _id],
    queryFn: async () => {
      return await axios
        .get("/api/seller", {
          params: {
            _id,
          },
        })
        .then(eCheck);
    },
  });
};
//get all sellers
export const useGetSellers = () => {
  return useQuery<ISellerFetched[]>({
    queryKey: ["sellers"],
    queryFn: async () => {
      return await axios.get("/api/seller").then(eCheck);
    },
  });
};
