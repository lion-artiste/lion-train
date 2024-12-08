export type FormErrors = {
    [key: string]: string
}

export type FormValues = {
    [key: string]: string
}

export type FormContent = {
    values?: FormValues,
    errors?: FormErrors
}