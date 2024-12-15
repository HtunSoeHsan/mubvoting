import { postOTP } from "@/service/auth.service";

export const POST = async (request: Request) => await postOTP(request);
