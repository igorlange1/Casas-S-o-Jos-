
const WHATSAPP_URL = "https://api.whatsapp.com/send/?phone=555185159241&text=Olá,%20vim%20pelo%20site%20da%20Casas%20São%20José%20e%20tenho%20interesse%20nos%20modelos%20de%20casas.%20Gostaria%20de%20mais%20informações.&type=phone_number&app_absent=0";

const PROJECTS_DB = [
  {
    id: "tupandi",
    title: "Modelo Tupandi",
    detail: "Madeira Nobre • 51m²",
    description: "O Modelo Tupandi foi projetado para oferecer uma experiência única de integração com a natureza. Com um design que prioriza a ventilação cruzada e a iluminação natural, esta residência em madeira nobre combina elegância clássica com funcionalidade moderna.",
    img: "https://i.ibb.co/99D2z0xr/11-Whats-App-Image-2026-04-10-at-17-06-30.jpg",
    area: "51.0 m²",
    rooms: "02 Dormitórios",
    bathrooms: "01 Unid.",
    material: "Madeira de Lei",
    price: "R$ 74.900,00",
    delivery: "75 dias úteis",
    category: 'madeira',
    gallery: [
      "https://i.ibb.co/99D2z0xr/11-Whats-App-Image-2026-04-10-at-17-06-30.jpg",
      "https://i.ibb.co/zHFLk2fp/2-Whats-App-Image-2026-04-10-at-17-06-30.jpg",
      "https://i.ibb.co/cK8m6zF0/6-Whats-App-Image-2026-04-10-at-17-06-31.jpg",
      "https://i.ibb.co/Ldd1kFYC/3-Whats-App-Image-2026-04-10-at-17-06-31.jpg",
      "https://i.ibb.co/0j6K37JP/5-Whats-App-Image-2026-04-10-at-17-06-31.jpg",
      "https://i.ibb.co/3YN4nmJ3/7-Whats-App-Image-2026-04-10-at-17-06-31.jpg",
      "https://i.ibb.co/Cs8KM1xP/Whats-App-Image-2026-04-10-at-17-06-30.jpg",
      "https://i.ibb.co/v6d0Dw2F/4-Whats-App-Image-2026-04-10-at-17-06-31.jpg",
      "https://i.ibb.co/VX7f0jn/1-Whats-App-Image-2026-04-10-at-17-06-30.jpg"
    ],
    specifications: [
      "Metragem Casa 6x8: 48 m²",
      "Área 3x1: 3 m²",
      "Total construído: 51 m²",
      "Madeira de Lei",
      "Telha barro natural com manta térmica",
      "Piso cerâmico",
      "Duplagem pinus com nós",
      "Forro PVC",
      "Banheiro luxo 1,5x2,0",
      "Lavanderia em madeira",
      "Parede azulejada na cozinha"
    ]
  },
  {
    id: "vale-verde",
    title: "Modelo Vale Verde",
    detail: "Madeira Nobre • 70m²",
    description: "O Modelo Vale Verde é a nossa mais nova obra-prima. Unindo a robustez da madeira de lei com um design que valoriza a entrada de luz natural e a integração total com o jardim. Um projeto que respira natureza, conforto e sofisticação em cada detalhe da sua estrutura em madeira nobre.",
    img: "https://i.ibb.co/DPBkFqDD/Vale-verde-mara-iv.jpg",
    area: "70.0 m²",
    rooms: "02 Dormitórios",
    bathrooms: "02 Unid.",
    material: "Madeira Nobre",
    price: "R$ 96.850,00",
    delivery: "90 dias úteis",
    category: 'madeira',
    gallery: [
      "https://i.ibb.co/b0nNLJW/vale-verde-mara-lll.jpg",
      "https://i.ibb.co/GfYbj050/Vale-verde-mara-l.jpg",
      "https://i.ibb.co/JNHh805/Vale-verde-mara-ll.jpg",
      "https://i.ibb.co/3mq9dcW9/casa-alvenaria-10.jpg"
    ],
    specifications: [
      "Esquadrias em madeira",
      "Telhado colonial",
      "Instalações elétricas e hidráulicas internas",
      "Paredes Externas em Madeira Nobre",
      "Piso cerâmico incluso",
      "Duplada em pinus",
      "Banheiro de luxo"
    ]
  },
  {
    id: "farroupilha",
    title: "Modelo Farroupilha",
    detail: "Madeira Nobre • 58m²",
    description: "O Modelo Farroupilha é uma homenagem à tradição e robustez. Com um design imponente e acabamento em madeira nobre, esta residência oferece um ambiente acolhedor e espaçoso, ideal para quem busca qualidade de vida e um toque rústico sofisticado.",
    img: "https://i.ibb.co/KjN9kwT7/image.png",
    area: "58.0 m²",
    rooms: "03 Dormitórios",
    bathrooms: "01 Unid.",
    material: "Madeira Nobre",
    price: "R$ 88.600,00",
    delivery: "95 dias úteis",
    category: 'madeira',
    gallery: [
      "https://i.ibb.co/RTNH6yd7/image.png",
      "https://i.ibb.co/KjN9kwT7/image.png",
      "https://i.ibb.co/WWs0v2Pn/image.png",
      "https://i.ibb.co/99vvDH1S/489ee388-e924-47ad-bbcc-d20714d3ea27.jpg"
    ],
    specifications: [
      "Piso cerâmico Classe A",
      "Telhas de Barro Natural",
      "Aberturas em madeira padrão luxo",
      "Instalações elétricas e hidráulicas internas",
      "Varanda frontal integrada",
      "Banheiro de luxo",
      "Porta balcão"
    ]
  },
  {
    id: "chale-aurora",
    title: "Chalé Aurora",
    detail: "Madeira • 51m²",
    description: "O Chalé Aurora é a solução ideal para quem busca praticidade e economia sem abrir mão do conforto. Oferece excelente resistência e durabilidade. Com 51m², possui uma planta otimizada para aproveitar cada espaço, sendo perfeito para casas de hóspedes ou refúgios compactos.",
    img: "https://i.ibb.co/bRrCCNKg/2-1.jpg",
    area: "51.0 m²",
    rooms: "02 Dormitórios",
    bathrooms: "01 Unid.",
    material: "Madeira",
    price: "R$ 65.000,00",
    delivery: "60 dias úteis",
    category: 'madeira',
    gallery: [
      "https://i.ibb.co/1fy8D2dS/2-2.jpg",
      "https://i.ibb.co/JjwXJB1d/2-3.jpg",
      "https://i.ibb.co/3mq9dcW9/casa-alvenaria-10.jpg"
    ],
    specifications: [
      "Piso cerâmico incluso",
      "Telha 5mm",
      "Aberturas em madeira padrão",
      "Instalações elétricas e hidráulicas internas",
      "Banheiro de luxo",
      "Lavanderia"
    ]
  },
  {
    id: "serrano",
    title: "Chalé Serrano",
    detail: "Madeira Nobre • 94,5m²",
    description: "Ideal para quem busca o máximo aproveitamento de espaço com sofisticação. O Chalé Serrano oferece uma planta inteligente com varandas amplas e acabamento em madeira nobre, projetado para durabilidade e conforto térmico excepcional.",
    img: "https://i.ibb.co/HTm2dkHW/bae4e0b4-96f5-4785-a89b-d768796e72d2.png",
    area: "94,5 m²",
    rooms: "03 Quartos",
    bathrooms: "01 Unid.",
    material: "Madeira Nobre",
    price: "R$ 118.500,00",
    delivery: "120 dias úteis",
    category: 'madeira',
    gallery: [
      "https://i.ibb.co/B54yjhY0/1.jpg",
      "https://i.ibb.co/cSZTJ6XC/3.jpg",
      "https://i.ibb.co/ZpZ1TMGx/2.jpg",
      "https://i.ibb.co/LdMhmrB3/4.jpg"
    ],
    specifications: [
      "Casa 6,5x9",
      "Lavanderia 1,5x2,0",
      "Varanda lateral 1,5x8,5",
      "Área frontal 1,5x3,0",
      "Deck frontal 1,5x3,5",
      "Madeira nobre",
      "Telha 5mm",
      "Piso cerâmico",
      "Duplada pinus",
      "2 portas balcão",
      "Varanda lateral e frontal",
      "Deck frontal com guarda corpo",
      "Banheiro de luxo",
      "Total construído 94,5m²"
    ]
  },
  {
    id: "residencial",
    title: "Residencial Moderno",
    detail: "Madeira Itaúba • 80.5m²",
    description: "Uma residência que une o estilo clássico da madeira com uma planta otimizada de 80.5m². Perfeita para famílias que buscam praticidade, segurança com abrigo para carro e o conforto de uma área frontal embutida.",
    img: "https://i.ibb.co/nMTw3bqk/FOTO001.jpg",
    area: "80.5 m²",
    rooms: "02 Dormitórios",
    bathrooms: "02 Unid.",
    material: "Madeira Itaúba",
    price: "R$ 135.000,00",
    delivery: "85 dias úteis",
    category: 'madeira',
    gallery: [
      "https://i.ibb.co/wN7KxTBt/Whats-App-Image-2023-02-13-at-10-56-31-1.jpg",
      "https://i.ibb.co/KjpbYMMJ/Whats-App-Image-2023-02-13-at-10-56-30.jpg",
      "https://i.ibb.co/zdjjWff/Whats-App-Image-2023-02-13-at-10-56-30-1.jpg",
      "https://i.ibb.co/MDR0YW7f/Whats-App-Image-2023-02-13-at-10-56-29.jpg",
      "https://i.ibb.co/QvYGry9B/Whats-App-Image-2023-02-13-at-10-56-31.jpg"
    ],
    specifications: [
      "Área total 80.5m²",
      "02 Dormitórios (sendo 01 suíte)",
      "Sala de estar",
      "Cozinha integrada",
      "Banheiro social",
      "Lavanderia",
      "Área Frontal Embutida",
      "Abrigo para Carro",
      "Piso cerâmico incluso",
      "Instalações elétricas e hidráulicas internas",
      "Banheiro de luxo"
    ]
  },
  {
    id: "alvenaria-confort",
    title: "Casa de Alvenaria",
    detail: "Alvenaria • 80m²",
    description: "Construção sólida em alvenaria com acabamento refinado. Projetada para quem busca a segurança e a longevidade da construção tradicional com um toque de modernidade e excelente isolamento térmico. (Imagens e projeto meramente ilustrativos).",
    img: "https://i.ibb.co/xqwL3Kr2/18e7a977-32d5-4ac6-8dee-8c94ce323954.png",
    area: "80.0 m²",
    rooms: "02 Quartos",
    bathrooms: "01 Unid.",
    material: "Alvenaria",
    price: "A partir de R$ 140.000,00",
    delivery: "110 dias úteis",
    category: 'alvenaria',
    gallery: [
      "https://i.ibb.co/RJMZ9Qb/casa-alvenaria-10.jpg",
      "https://i.ibb.co/B2cWZzmp/casa-alvenaria-11.jpg",
      "https://i.ibb.co/6c9sLcB0/Whats-App-Image-2024-10-19-at-16-10-27.jpg",
      "https://i.ibb.co/m5JgT976/casa-alvenaria-1.jpg"
    ],
    specifications: [
      "Estrutura em alvenaria convencional",
      "Laje de concreto ou forro PVC/Madeira",
      "Piso cerâmico Classe A",
      "Telhas esmaltadas ou fibrocimento",
      "Aberturas em alumínio ou madeira",
      "Instalações elétricas e hidráulicas internas",
      "Banheiro de luxo"
    ]
  }
];

// Helper to generate WhatsApp URL with model name
function getWhatsAppUrlForModel(modelName) {
    const baseUrl = "https://api.whatsapp.com/send/?phone=555185159241&text=";
    const text = `Olá, vim pelo site da Casas São José e tenho interesse no modelo ${modelName}. Gostaria de mais informações.`;
    return baseUrl + encodeURIComponent(text) + "&type=phone_number&app_absent=0";
}
