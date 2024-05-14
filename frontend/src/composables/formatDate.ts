export function useFormatDate() {
    // Definim una funció interna per formatar la data
    const formatDate = (date: string | Date | null): string => {
        // Si la data és nul·la, retornem un missatge indicant que no s'ha proporcionat cap data
        if (date === null) {
            return 'Date not provided';
        }

        // Si la data és de tipus cadena, la convertim a objecte Data
        if (typeof date === 'string') {
            date = new Date(date);
        }

        // Retornem la data formatada amb el format desitjat
        return new Intl.DateTimeFormat('en-gb', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
    };

    // Retornem la funció de format de data per poder ser utilitzada externament
    return { formatDate };
}
