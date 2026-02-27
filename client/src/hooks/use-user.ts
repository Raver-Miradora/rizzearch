import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import type { User } from "@/types";
import { useAuthStore } from "@/stores/auth-store";

export function useGetMe() {
  return useQuery<User>({
    queryKey: ["user", "me"],
    queryFn: async () => {
      const { data } = await api.get("/users/me");
      return data;
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (full_name: string) => {
      const { data } = await api.patch(`/users/me`, { full_name });
      return data as User;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["user", "me"], user);
      useAuthStore.getState().setUser(user);
    },
  });
}

export function useUploadAvatar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (file: File) => {
      const form = new FormData();
      form.append("file", file);
      const { data } = await api.post(`/users/me/avatar`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data as User;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["user", "me"], user);
      useAuthStore.getState().setUser(user);
    },
  });
}
