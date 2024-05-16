import { ref } from 'vue';

export function useVerifyToken() {
    const verifyToken = () => {
        const tokenString = ref(!!localStorage.getItem('token')) ? localStorage.getItem('token') : null;
        const now = new Date();
        const tokenObj = JSON.parse(tokenString!);
        return now.getTime() > tokenObj.expiry ? (localStorage.removeItem('token'), null) : tokenObj.value;
    };

    const setWithExpiry = (value: any) => {
        const now = new Date();
        const ttl = 24 * 60 * 60 * 1000; // 24 horas en milisegons
        const item = {
            value: value,
            expiry: now.getTime() + ttl
        };
        localStorage.setItem('token', JSON.stringify(item));
    };

    return { verifyToken, setWithExpiry };
}
