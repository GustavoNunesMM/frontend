import axios from 'axios';

export async function userAlreadyLoggedIn() {
    try {
        const { data } = await axios.get('http://localhost:3000/auth/validate', { withCredentials: true });
        return (data.isAuth ?  {isAuth: data.isAuthenticated, user: data.user }: false)
    } catch (error) {
        return false;
    }
}
export const responseValidation = async(response) => {
    if(response.status !== 200) return {sucess: false, message: "Não foi possivel realizar o login"}
        else return {sucess:true, message:"Validação de login concluida",
            id:response.data.userData.userId}
}
