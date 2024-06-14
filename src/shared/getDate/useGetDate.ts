export const useGetDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Месяцы начинаются с 0
    const day = now.getDate().toString().padStart(2, '0');

    const date = `${year}-${month}-${day}`;
    return date
}