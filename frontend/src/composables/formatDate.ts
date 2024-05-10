export function useFormatDate() {
    const formatDate = (date: string | Date | null): string => {
        if (date === null) {
            return 'Date not provided';
        }
        if (typeof date === 'string') {
            date = new Date(date);
        }
        return new Intl.DateTimeFormat('en-gb', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
    };

    return { formatDate };
}
