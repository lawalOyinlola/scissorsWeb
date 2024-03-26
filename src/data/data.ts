import IconLink from "../images/icon-link.svg";
import IconWrite from "../images/icon-write.svg";
import IconApps from "../images/icon-apps.svg";
import IconVolt from "../images/icon-volt.svg";

export const analyticsData = [
  {
    name: "Users",
    number: "3M",
    stat: "Active users",
  },
  {
    name: "Creations",
    number: "60M",
    stat: "Links &amp; QR codes created",
  },
  {
    name: "Connections",
    number: "1B",
    stat: "Clicked and scanned connection",
  },
  {
    name: "Integration",
    number: "300K",
    stat: "App integrations",
  },
];

export const featuresData = [
  {
    iconSrc: IconLink,
    altText: "link icon",
    title: "URL Shortening",
    description:
      "Scissor allows you to shorten URLs of your business, events. Shorten your URL at scale, URL redirects.",
  },
  {
    iconSrc: IconWrite,
    altText: "notepad icon",
    title: "Custom URLs",
    description:
      "With Scissor, you can create custom URLs, with the length you want! A solution for socials and businesses.",
  },
  {
    iconSrc: IconApps,
    altText: "app icon",
    title: "QR Codes",
    description:
      "Generate QR codes to your business, events. Bring your audience and customers to your doorstep with this scan and go solution.",
  },
  {
    iconSrc: IconVolt,
    altText: "chart icon",
    title: "Data Analytics",
    description:
      "Receive data on the usage of either your shortened URL, custom URLs, or generated QR codes. Embedded to monitor progress.",
  },
];

export const faqsData = [
  {
    question: "How does URL shortening work?",
    answer:
      "URL shortening works by taking a long URL and creating a shorter, condensed version that redirects to the original URL. When a user clicks on the shortened link, they are redirected to the intended destination.",
  },
  {
    question:
      "Is it necessary to create an account to use the URL shortening service?",
    answer:
      "No, an account is not required. Our URL shortening service is hassle-free and allows you to shorten URLs without the need for account creation. Enjoy the convenience of quick link shortening for your needs.",
  },
  {
    question: "Are the shortened links permanent? Will they expire?",
    answer:
      "Yes, the shortened links are permanent and do not expire. Once created, your shortened URLs will remain accessible indefinitely, providing a reliable and persistent way to share and access your content.",
  },
  {
    question: "Are there any limitations on the number of URLs I can shorten?",
    answer:
      "No, there are no limitations on the number of URLs you can shorten. Feel free to use our service to shorten as many URLs as you need, providing a flexible solution for your link management.",
  },
  {
    question:
      "Can I customize the shortened URLs to reflect my brand or content?",
    answer:
      "Yes, customizing shortened URLs to reflect your brand or content is a feature available exclusively to our registered users. Create an account to enjoy the benefits of personalized and branded short links.",
  },
  {
    question: "Can I track the performance of my shortened URLs?",
    answer:
      "Yes, account holders can track the performance of their shortened URLs from the account dashboard. Our analytics feature provides valuable insights, allowing you to monitor clicks, geographic location, and more for each of your links, enhancing your link management experience.",
  },
  {
    question:
      "How secure is the URL shortening service? Are the shortened links protected against spam or malicious activity?",
    answer:
      "Our URL shortening service prioritizes security. Shortened links generated through our platform are designed to be secure and protect against spam or malicious activity. We implement measures to ensure the integrity and safety of your links, providing a trustworthy environment for your URL shortening needs.",
  },
  {
    question: "What is a QR code and what can it do?",
    answer:
      "A QR code, or Quick Response code, is a two-dimensional barcode that can store various types of information. It can encode text, URLs, contact information, and more. QR codes are widely used for quick access to information; users can scan the code with a smartphone camera to open a link, reveal contact details, or perform other actions, making them a versatile and efficient tool for information sharing.",
  },
  {
    question: "Why do I get an error when shortening a link? ",
    answer: `Users may encounter errors when shortening links if they fail to input a valid URL format. It's important to ensure that the link provided starts with either "http://" or "https://", as these are the standard protocols for web URLs. Additionally, avoid starting the link with "www." alone, as it may not be recognized as a complete URL. For example, instead of entering "www.example.com" or "example.com", ensure the link is entered as "http://example.com" or "https://example.com".`,
  },
  {
    question: "Why am I unable to create an alias for my link using Spoo.me?? ",
    answer: `Users may encounter alias creation errors with Spoo.me if the requested alias is invalid or already taken. The alias must be alphanumeric and under 15 characters. Anything beyond 15 characters would be stripped by the API. Ensure that the alias meets these criteria to avoid errors.`,
  },
  {
    question:
      "What should I do if I receive an error while trying to shorten a link using custom alias with Emojify? ",
    answer: `If you encounter an error when creating a custom emoji sequence alias with Emojify, ensure that the sequence contains only emojis. You may encounter alias creation errors if the requested alias is invalid or already taken. Custom emoji sequences must consist solely of emojis, with no other characters allowed. Validate the sequence to exclude any non-emoji characters or alphanumeric symbols to resolve the error.`,
  },
];

export const pricingData = [
  {
    type: "Basic",
    price: "Free",
    subtitle: "Free plan for all users",
    features: [
      "Unlimited URL Shortening",
      "Basic Link Analytics",
      "Customizable Short Links",
      "Standard Support",
      "Ad-supported",
    ],
  },
  {
    type: "Professional",
    price: "$15/month",
    subtitle: "Ideal for business creators",
    features: [
      "Enhanced Link Analytics",
      "Custom Branded Domains",
      "Advanced Link Customization",
      "Priority Support",
      "Ad-free Experience",
    ],
  },
  {
    type: "Teams",
    price: "$25/month",
    subtitle: "Share with up to 10 users",
    features: [
      "Team Collaboration",
      "User Roles and Permissions",
      "Enhanced Security",
      "API Access",
      "Dedicated Account Manager",
    ],
  },
];

export const footerData = [
  {
    category: "Why Scissor ?",
    items: ["Scissor 101", "Integrations & API", "Pricing"],
  },
  {
    category: "Solutions",
    items: [
      "Social Media",
      "Digital Marketing",
      "Customer Service",
      "For Developers",
    ],
  },
  {
    category: "Products",
    items: ["Link Management", "QR Codes", "Link-in-bio"],
  },
  {
    category: "Company",
    items: [
      "About Scissor",
      "Careers",
      "Partners",
      "Press",
      "Contact",
      "Reviews",
    ],
  },
  {
    category: "Resources",
    items: [
      "Blog",
      "Resource Library",
      "Developers",
      "App Connectors",
      "Support",
      "Trust Center",
      "Browser Extension",
      "Mobile App",
    ],
  },
  {
    category: "Features",
    items: [
      "Branded Links",
      "Mobile Links",
      "Campaign",
      " Management &",
      "Analytics",
      "QR Code generation",
    ],
  },
  {
    category: "Legal",
    items: [
      "Privacy Policy",
      "Cookie Policy",
      "Terms of Service",
      "Acceptable Use Policy",
      "Code of Conduct",
    ],
  },
];
