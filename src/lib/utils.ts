import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { v4 as uuid } from "uuid"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const getMonth = (month: number) => {
    const months: string[] = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]

    // Check if monthNumber is between 1 and 12
    if (month < 1 || month > 12) {
        return "Invalid month number. Please enter a number between 1 and 12."
    }

    // Return the month (adjust for zero-based index)
    return months[month - 1]
}

export const generateUUID = () => uuid()

export const duplicateValidation = (arr: string[], el: string) => {
    if (!arr.find((t) => t === el)) {
        arr.push(el)
        return arr
    } else {
        arr = arr.filter((t) => t !== el)
        return arr
    }
}
