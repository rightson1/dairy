import { eCheck } from "@/components/helpers/functions";
import { TConversation, TConversationCreate } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useCreateConversation = () => {
  return useMutation<TConversation, unknown, TConversationCreate, unknown>({
    mutationFn: async (data: TConversationCreate): Promise<TConversation> => {
      console.log(data);
      const response = await axios.post<TConversation>(
        "/api/chat/conversations",
        data
      );
      eCheck(response);
      return response.data;
    },
  });
};
//fetcg conversation by userId
export const useGetUserConversations = (userId?: string, userType?: string) => {
  return useQuery<TConversation[]>({
    queryKey: ["conversations", userId],
    queryFn: async () => {
      const response = await axios.get<TConversation[]>(
        `/api/chat/conversations`,
        {
          params: {
            userId,
            userType,
          },
        }
      );
      eCheck(response);
      return response.data;
    },
    enabled: !!userId,
  });
};
