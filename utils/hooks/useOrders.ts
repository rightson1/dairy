import { eCheck } from "@/components/helpers/functions";
import { IOrder, IOrderFetched } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async (order: IOrder) =>
      axios.post("/api/order", order).then(eCheck),
  });
};
//get by ether business id or user id
export const useGetOrders = ({
  business,
  uid,
}: {
  business?: string;
  uid?: string;
}) => {
  return useQuery({
    queryKey: ["orders", business, uid],
    queryFn: async () => {
      const query = business ? { business } : { uid };
      return axios.get("/api/order", { params: query }).then(eCheck);
    },
  });
};
//edit order
export const useEditOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      order: Partial<IOrderFetched> & {
        _id: string;
      }
    ) => axios.put("/api/order", order).then(eCheck),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "orders",
      });
    },
  });
};
