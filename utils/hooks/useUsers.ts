import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IUser, IUserFetched } from "@/types";
import { useAuth } from "../AuthContext";
import toast from "react-hot-toast";
export const useAddUser = () => {
  return useMutation({
    mutationFn: (user: IUser) => axios.post("/api/users", user),
    onError: (error) => toast.error(error.message),
  });
};
//update user
export const useUpdateUser = () => {
  return useMutation({
    mutationFn: (
      user: Partial<
        IUser & {
          _id: string;
        }
      >
    ) => axios.put("/api/users", user),
    onError: (error) => toast.error(error.message),
  });
};
