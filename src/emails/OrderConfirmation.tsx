// Order Confirmation Email Template (React Email)
// https://react.email/docs/introduction

import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface OrderConfirmationEmailProps {
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

export const OrderConfirmationEmail = ({
  orderNumber = 'OZ-2026-001234',
  customerName = 'Mario Rossi',
  items = [
    { name: 'Cristallo - 50ml', quantity: 1, price: 150 },
    { name: 'Scintilla - 10ml', quantity: 1, price: 48 },
  ],
  subtotal = 198,
  shipping = 5,
  total = 203,
}: OrderConfirmationEmailProps) => {
  const previewText = `Conferma Ordine ${orderNumber} - OZ Extrait`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>OZ Extrait</Heading>
            <Text style={tagline}>L&apos;Arte della Profumeria Italiana</Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h2}>Grazie per il tuo ordine!</Heading>
            <Text style={paragraph}>Ciao {customerName},</Text>
            <Text style={paragraph}>
              Abbiamo ricevuto il tuo ordine <strong>{orderNumber}</strong> e lo stiamo
              preparando con cura.
            </Text>

            {/* Order Items */}
            <Section style={orderBox}>
              <Heading as="h3" style={h3}>
                Riepilogo Ordine
              </Heading>

              {items.map((item, index) => (
                <Row key={index} style={itemRow}>
                  <Column style={itemName}>
                    <Text style={itemText}>
                      {item.name} × {item.quantity}
                    </Text>
                  </Column>
                  <Column style={itemPrice}>
                    <Text style={itemText}>€{item.price.toFixed(2)}</Text>
                  </Column>
                </Row>
              ))}

              <div style={divider} />

              {/* Subtotal */}
              <Row style={totalRow}>
                <Column>
                  <Text style={totalLabel}>Subtotale:</Text>
                </Column>
                <Column style={itemPrice}>
                  <Text style={totalValue}>€{subtotal.toFixed(2)}</Text>
                </Column>
              </Row>

              {/* Shipping */}
              <Row style={totalRow}>
                <Column>
                  <Text style={totalLabel}>Spedizione:</Text>
                </Column>
                <Column style={itemPrice}>
                  <Text style={totalValue}>€{shipping.toFixed(2)}</Text>
                </Column>
              </Row>

              {/* Total */}
              <Row style={totalRow}>
                <Column>
                  <Text style={totalLabelBold}>Totale:</Text>
                </Column>
                <Column style={itemPrice}>
                  <Text style={totalValueBold}>€{total.toFixed(2)}</Text>
                </Column>
              </Row>
            </Section>

            {/* Shipping Info */}
            <Section style={infoBox}>
              <Text style={infoTitle}>📦 Spedizione</Text>
              <Text style={infoParagraph}>
                Il tuo ordine sarà spedito entro 1-2 giorni lavorativi. Riceverai una email
                con il tracking non appena il pacco sarà affidato al corriere.
              </Text>
            </Section>

            {/* CTA Button */}
            <Section style={buttonContainer}>
              <Link
                style={button}
                href={`https://oz.fodivps2.cloud/account/orders/${orderNumber}`}
              >
                Traccia il tuo ordine
              </Link>
            </Section>

            {/* Contact */}
            <Text style={paragraph}>
              Per qualsiasi domanda, non esitare a contattarci a{' '}
              <Link href="mailto:info@oz.fodivps2.cloud" style={link}>
                info@oz.fodivps2.cloud
              </Link>
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} OZ Extrait. Tutti i diritti riservati.
            </Text>
            <Text style={footerText}>Made with passion in Italy 🇮🇹</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};


// Styles
const main = {
  backgroundColor: '#0a0a0a',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '600px',
};

const header = {
  textAlign: 'center' as const,
  marginBottom: '40px',
};

const h1 = {
  color: '#d4af37',
  fontSize: '36px',
  fontWeight: 'bold',
  margin: '0',
  fontFamily: '"Cinzel", serif',
};

const tagline = {
  color: '#888',
  fontSize: '14px',
  margin: '8px 0 0',
};

const content = {
  backgroundColor: '#1a1a1a',
  border: '1px solid #333',
  borderRadius: '8px',
  padding: '40px',
};

const h2 = {
  color: '#d4af37',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 20px',
};

const h3 = {
  color: '#d4af37',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 16px',
};

const paragraph = {
  color: '#ddd',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px',
};

const orderBox = {
  backgroundColor: '#0a0a0a',
  border: '1px solid #333',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
};

const itemRow = {
  marginBottom: '12px',
};

const itemName = {
  width: '70%',
};

const itemPrice = {
  width: '30%',
  textAlign: 'right' as const,
};

const itemText = {
  color: '#ddd',
  fontSize: '14px',
  margin: '0',
};

const divider = {
  borderTop: '1px solid #333',
  margin: '16px 0',
};

const totalRow = {
  marginTop: '8px',
};

const totalLabel = {
  color: '#aaa',
  fontSize: '14px',
  margin: '0',
};

const totalValue = {
  color: '#ddd',
  fontSize: '14px',
  margin: '0',
};

const totalLabelBold = {
  color: '#d4af37',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0',
};

const totalValueBold = {
  color: '#d4af37',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0',
};

const infoBox = {
  backgroundColor: '#1a1a1a',
  border: '1px solid #333',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
};

const infoTitle = {
  color: '#d4af37',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 8px',
};

const infoParagraph = {
  color: '#aaa',
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#d4af37',
  color: '#000',
  padding: '14px 32px',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  borderRadius: '4px',
  display: 'inline-block',
};

const link = {
  color: '#d4af37',
  textDecoration: 'underline',
};

const footer = {
  textAlign: 'center' as const,
  marginTop: '40px',
};

const footerText = {
  color: '#666',
  fontSize: '12px',
  margin: '4px 0',
};
