import { useUserStore } from '../stores/user'

export const storeSetUser = ({data}):boolean => {
    try {
        const userData:userInterface = data.userData
        
        const userStore = useUserStore()
        
        const { id, username, email, permissionLevel } = userData 
        userStore.setUser({
            id,
            username,
            email,
            permissionLevel
        })
        return true
    } catch(error) {
        console.log(error)
        return false 
    }
}

interface userInterface{
    username: string
    password: string
    id: number
    endereco: string | null
    contato: string | null
    email: string
    permissionLevel: string
    classId: number | null
    terms: any | null
    createdAt: Date
}