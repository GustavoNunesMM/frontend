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
        else return {sucess:true, message:"Validação de login concluida", id:response.data.userId}
}

/*
const validPassword = await verifyPass(data.password, user.password) //verifica se a senha é valida

if (!validPassword) return res.status(401).json({ message: 'Senha inválida' })

const token = jwt.sign({ username: data.username, email: user.email }, SECRET_KEY, { expiresIn: '1h' })

return res.status(200).cookie('token', token)
*/