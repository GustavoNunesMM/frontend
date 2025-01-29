import axios from 'axios'

export function validateForm(user, confirmPass): FormError {
    const { email, username, password } = user
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const usernameMinLength = 3
    const usernameMaxLength = 20
    const passwordMinLength = 6
    const passwordMaxLength = 20
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,20}$/;

    const formErrors: FormError = {
        email: !emailRegex.test(email),
        username: username.length < usernameMinLength || username.length > usernameMaxLength,
        password: !passwordRegex.test(password) || password.length < passwordMinLength || password.length > passwordMaxLength,
        confirmPass: confirmPass ? password !== user.passwordConfirm : false,
        isValid: false
    }
    formErrors.isValid = !Object.values(formErrors).includes(true)
    console.log(formErrors)
    return formErrors
}

export async function validateCep(cep: string, actualLocation) {
    if (cep === "") return { success: false, message: "Cep vazio" }
    const validacep = /^[0-9]{8}$/
    if (!validacep.test(cep)) return { success: false, message: "Cep incorreto" }

    const script = `https://viacep.com.br/ws/${cep}/json/`
    const { data } = await axios.get(script, { withCredentials: false })

    const newAdress = {
        ...actualLocation,
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf
    }
    console.log(newAdress)
    return newAdress
}

export async function treatData(data, permission:string) {
    const entries = Object.entries(data.adress);
    const newAdress = entries.map(([key, value]) => `${key}: ${value}`).join(', ');
    const { contact, username, password, email } = data;
    const newData = {
        endereco: newAdress,
        contato: contact,
        username: username,
        password: password,
        email: email,
        permissionLevel: permission,
    }
    return newData
}


interface FormError {
    email: boolean;
    username: boolean;
    password: boolean;
    confirmPass: boolean;
    isValid: boolean
}