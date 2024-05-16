import { ref } from 'vue';

export function useVerifyToken() {
    // Funció per verificar el token
    const verifyToken = () => {
        // Obtenim el token desat al localStorage
        const tokenString = ref(!!localStorage.getItem('token')) ? localStorage.getItem('token') : null;

        // Obtenim l'hora actual
        const now = new Date();

        // Parsegem el token a un objecte JSON
        const tokenObj = JSON.parse(tokenString!);

        // Comprovem si el temps actual és superior al temps d'expiració del token
        return now.getTime() > tokenObj.expiry ? (localStorage.removeItem('token'), null) : tokenObj.value;
    };

    // Funció per definir el token amb un temps d'expiració
    const setWithExpiry = (value: any) => {
        // Obtenim l'hora actual
        const now = new Date();

        // Definim el temps de vida del token a 24 hores
        const ttl = 24 * 60 * 60 * 1000;

        // Creem l'objecte que conté el valor del token i el temps d'expiració
        const item = {
            value: value,
            expiry: now.getTime() + ttl
        };
        // Es desa el token al localStorage com a cadena JSON
        localStorage.setItem('token', JSON.stringify(item));
    };

    // Retornem les funcions de verificació i definició del token perquè es puguin utilitzar externament
    return { verifyToken, setWithExpiry };
}
