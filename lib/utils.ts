import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatDate(date: Date, formatStr: string = "PPP") {
  return format(date, formatStr, { locale: es })
}

export function formatTime(date: Date) {
  return format(date, "HH:mm")
}

export function getDayKey(date: Date): string {
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  return days[date.getDay()]
}

export function parseTime(time: string) {
  const [hours, minutes] = time.split(':').map(Number)
  return { hours, minutes }
}

export function capitalize(str: string) {
  if (!str) return ""
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function buildWhatsAppLink(phone: string, message: string) {
  const cleanPhone = phone.replace(/\D/g, '')
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
}
