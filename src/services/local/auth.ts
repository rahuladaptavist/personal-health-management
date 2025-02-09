import { IAuthCheckRqDto, IAuthCheckRsDto } from "@/types/dtos";
import axiosInstance from "./axiosInstance";

export const authApi = {
  check: async (data: IAuthCheckRqDto): Promise<IAuthCheckRsDto> => {
    try {
      const response = await axiosInstance.post<IAuthCheckRsDto>(
        "/auth/check",
        data
      );
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw error;
    }
  },
};
