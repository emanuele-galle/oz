// Email Service (Resend)
// https://resend.com/docs/send-with-nextjs

import { Resend } from 'resend';
import { OrderConfirmationEmail } from '@/emails/OrderConfirmation';

if (!process.env.RESEND_API_KEY) {
  console.warn('RESEND_API_KEY not set - email sending disabled');
}

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderConfirmationData {
  orderId: string;
  orderNumber: string;
  email: string;
  customerName: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  shipping: number;
  total: number;
}

/**
 * Send order confirmation email
 */
export async function sendOrderConfirmationEmail(data: OrderConfirmationData) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('Email sending skipped: RESEND_API_KEY not set');
    return null;
  }

  try {
    const result = await resend.emails.send({
      from: 'OZ Extrait <ordini@oz.fodivps2.cloud>',
      to: data.email,
      subject: `Conferma Ordine ${data.orderNumber} - OZ Extrait`,
      react: OrderConfirmationEmail(data),
    });

    console.log('Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}

/**
 * Send order shipped email
 */
export async function sendOrderShippedEmail(data: {
  orderNumber: string;
  email: string;
  customerName: string;
  trackingNumber: string;
  carrier: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('Email sending skipped: RESEND_API_KEY not set');
    return null;
  }

  try {
    const result = await resend.emails.send({
      from: 'OZ Extrait <ordini@oz.fodivps2.cloud>',
      to: data.email,
      subject: `Ordine ${data.orderNumber} Spedito - OZ Extrait`,
      html: `
        <h1>Il tuo ordine è stato spedito!</h1>
        <p>Ciao ${data.customerName},</p>
        <p>Il tuo ordine <strong>${data.orderNumber}</strong> è stato spedito.</p>
        <p><strong>Corriere:</strong> ${data.carrier}<br>
        <strong>Tracking:</strong> ${data.trackingNumber}</p>
        <p>Riceverai il tuo ordine entro 3-5 giorni lavorativi.</p>
        <p>Grazie per il tuo acquisto!<br>
        Team OZ Extrait</p>
      `,
    });

    console.log('Shipping email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Failed to send shipping email:', error);
    throw error;
  }
}

/**
 * Send order delivered email
 */
export async function sendOrderDeliveredEmail(data: {
  orderNumber: string;
  email: string;
  customerName: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('Email sending skipped: RESEND_API_KEY not set');
    return null;
  }

  try {
    const result = await resend.emails.send({
      from: 'OZ Extrait <ordini@oz.fodivps2.cloud>',
      to: data.email,
      subject: `Ordine ${data.orderNumber} Consegnato - OZ Extrait`,
      html: `
        <h1>Il tuo ordine è stato consegnato!</h1>
        <p>Ciao ${data.customerName},</p>
        <p>Il tuo ordine <strong>${data.orderNumber}</strong> è stato consegnato con successo.</p>
        <p>Speriamo che i nostri profumi ti regalino emozioni uniche.</p>
        <p>Se hai un momento, ci farebbe piacere ricevere la tua recensione!</p>
        <p>Grazie per aver scelto OZ Extrait.<br>
        Team OZ Extrait</p>
      `,
    });

    console.log('Delivery email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Failed to send delivery email:', error);
    throw error;
  }
}
