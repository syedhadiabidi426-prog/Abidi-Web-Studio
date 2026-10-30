export const BUSINESS_INFO = {
  name: 'Abidi Web Studio',
  founder: 'Syed Hadi Abidi',
  email: 'syedhadiabidi426@gmail.com',
  whatsappNumber: '+923293171559',
  whatsappRaw: '923293171559',
  instagram: 'https://www.instagram.com/abidiweb_studio?vrfl=d3hkdm1pamxiMWls',
  facebook: 'https://www.facebook.com/share/1F3vVA8nmn/',
  whatsappChatUrl: 'https://wa.me/923293171559',
  tagline: 'Websites Built to Make Your Business Stand Out.',
  subheadline: 'Abidi Web Studio creates modern, responsive websites, online stores, and custom web applications for ambitious businesses around the world.',
  targetMarkets: ['United States', 'United Kingdom', 'Canada', 'Australia', 'Pakistan']
};

export function getWhatsAppEnquiryUrl(customMessage?: string): string {
  const defaultMsg = 'Hello Abidi Web Studio, I would like to discuss a website project for my business. Please share your availability and package details.';
  const message = customMessage || defaultMsg;
  return `https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(message)}`;
}

export function getServiceWhatsAppUrl(serviceTitle: string): string {
  let text = `Hello Abidi Web Studio, I am interested in ${serviceTitle}. Please share your packages and quotation.`;
  if (serviceTitle.toLowerCase().includes('e-commerce')) {
    text = 'Hello Abidi Web Studio, I am interested in developing an e-commerce website. I would like to discuss my requirements and budget.';
  } else if (serviceTitle.toLowerCase().includes('custom')) {
    text = 'Hello Abidi Web Studio, I would like to discuss a custom web application. Please let me know the next steps.';
  } else if (serviceTitle.toLowerCase().includes('business')) {
    text = 'Hello Abidi Web Studio, I am interested in a business website. Please share your packages and quotation.';
  }
  return `https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(text)}`;
}
