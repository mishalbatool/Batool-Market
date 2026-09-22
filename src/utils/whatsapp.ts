import { Product } from '../types';

export interface OrderWhatsAppParams {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  customerName?: string;
  customerPhone?: string;
  customerCity?: string;
  customerAddress?: string;
  whatsappNumber: string;
}

export function formatPKR(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-PK')}`;
}

export function generateWhatsAppOrderUrl(params: OrderWhatsAppParams): string {
  const {
    product,
    quantity,
    selectedSize,
    selectedColor,
    customerName,
    customerPhone,
    customerCity,
    customerAddress,
    whatsappNumber,
  } = params;

  const totalAmount = product.price * quantity;

  // Clean WhatsApp phone number (strip spaces, dashes, plus)
  let cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  if (cleanNumber.startsWith('0')) {
    cleanNumber = '92' + cleanNumber.substring(1);
  } else if (!cleanNumber.startsWith('92')) {
    cleanNumber = '92' + cleanNumber;
  }

  let message = `*Assalam-o-Alaikum Batool Market!* 🛍️\n\n`;
  message += `I would like to place an order for:\n\n`;
  message += `📦 *Product:* ${product.name}\n`;
  message += `💰 *Price:* ${formatPKR(product.price)} each\n`;
  message += `🔢 *Quantity:* ${quantity}\n`;

  if (selectedSize) {
    message += `📏 *Size:* ${selectedSize}\n`;
  }
  if (selectedColor) {
    message += `🎨 *Color:* ${selectedColor}\n`;
  }

  message += `💵 *Total Amount:* ${formatPKR(totalAmount)}\n`;
  message += `🚚 *Delivery:* FREE Delivery (All Pakistan)\n`;
  message += `💳 *Payment:* 100% Cash on Delivery (COD)\n\n`;

  if (customerName || customerPhone || customerCity || customerAddress) {
    message += `*--- My Delivery Details for COD ---*\n`;
    if (customerName) message += `👤 *Name:* ${customerName}\n`;
    if (customerPhone) message += `📱 *Phone:* ${customerPhone}\n`;
    if (customerCity) message += `🏙️ *City:* ${customerCity}\n`;
    if (customerAddress) message += `📍 *Complete Address:* ${customerAddress}\n\n`;
    message += `Please confirm my order. Thank you!`;
  } else {
    message += `Please confirm availability and take my delivery address for Cash on Delivery. Thank you!`;
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}

export function generateGeneralWhatsAppUrl(whatsappNumber: string, defaultText?: string): string {
  let cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  if (cleanNumber.startsWith('0')) {
    cleanNumber = '92' + cleanNumber.substring(1);
  } else if (!cleanNumber.startsWith('92')) {
    cleanNumber = '92' + cleanNumber;
  }

  const text = defaultText || 'Assalam-o-Alaikum Batool Market! I have an inquiry about your products.';
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
}
