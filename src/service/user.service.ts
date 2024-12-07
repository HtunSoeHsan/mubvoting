import { getUsers } from "@/repository/user.repo"

export const getUser = async () => {
    return await getUsers();
}