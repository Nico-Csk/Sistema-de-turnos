import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'

interface BookingConfirmationEmailProps {
  clientName: string
  serviceName: string
  stylistName: string
  date: string
  time: string
  price: string
}

export const BookingConfirmationEmail = ({
  clientName,
  serviceName,
  stylistName,
  date,
  time,
  price,
}: BookingConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Tu turno en Tu Peluquería ha sido confirmado</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto py-5 pb-12">
            <Heading className="text-2xl font-bold text-center text-[#c9a84c] mb-8">
              ¡Turno Confirmado!
            </Heading>
            <Text className="text-base leading-6 text-gray-700">
              Hola <strong>{clientName}</strong>,
            </Text>
            <Text className="text-base leading-6 text-gray-700">
              Tu reserva en Tu Peluquería ha sido realizada con éxito. Aquí tenés los detalles:
            </Text>
            
            <Section className="bg-gray-50 rounded-lg p-6 my-6 border border-gray-100">
              <Text className="m-0 mb-2 font-semibold text-gray-900">Detalles del Servicio:</Text>
              <Text className="m-0 text-gray-700">{serviceName}</Text>
              
              <Hr className="border-gray-200 my-4" />
              
              <Text className="m-0 mb-2 font-semibold text-gray-900">Peluquero:</Text>
              <Text className="m-0 text-gray-700">{stylistName}</Text>
              
              <Hr className="border-gray-200 my-4" />
              
              <Text className="m-0 mb-2 font-semibold text-gray-900">Fecha y Hora:</Text>
              <Text className="m-0 text-gray-700">{date} a las {time} hs</Text>
              
              <Hr className="border-gray-200 my-4" />
              
              <Text className="m-0 mb-2 font-semibold text-gray-900">Precio Estimado:</Text>
              <Text className="m-0 text-gray-700 font-bold text-lg">{price}</Text>
            </Section>
            
            <Text className="text-base leading-6 text-gray-700">
              Si necesitás cancelar o reprogramar, por favor contactanos con al menos 24 horas de anticipación.
            </Text>
            
            <Hr className="border-gray-200 my-8" />
            
            <Text className="text-xs text-center text-gray-500 uppercase tracking-widest">
              Tu Peluquería • Calle Ejemplo 123, Buenos Aires
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default BookingConfirmationEmail
