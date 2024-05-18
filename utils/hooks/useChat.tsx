import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { eCheck } from "@/components/helpers/functions";
import { IMessage, IMessageFetched } from "@/types";

export const useGetChats = (conversationId: string) => {
  return useQuery({
    queryKey: ["chat", conversationId],
    queryFn: async () =>
      await axios
        .get(`/api/chat/messages?conversationId=${conversationId}`)
        .then(eCheck),
  });
};
export const useSendMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (message: IMessage) =>
      axios.post("/api/chat/messages", message).then(eCheck),
    onSuccess: (data: IMessageFetched) => {
      queryClient.setQueriesData(
        {
          queryKey: ["chat", data.conversationId],
        },
        (oldData: IMessageFetched[] | undefined) => {
          return oldData ? [...oldData, data] : [data];
        }
      );
    },
  });
};
