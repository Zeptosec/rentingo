export function ValidateEmail(mail: string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true
    }
    return false
}

export function DateToISO(date: Date) {
    let dt = null;
    if (typeof date === 'object' && date !== null && 'toISOString' in date) {
        dt = date;
    } else dt = new Date();
    const r = dt.toISOString().split('.');
    return r[0];
}