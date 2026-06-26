import preguica from "@/assets/preguica-gigante.jpg";
import mastodonte from "@/assets/mastodonte.jpg";
import glyptodonte from "@/assets/glyptodonte.jpg";
import tigre from "@/assets/tigre-dentes-sabre.jpg";

export type Animal = {
  slug: string;
  nome: string;
  cientifico: string;
  imagem: string;
  resumo: string;
  descricao: string;
  curiosidades: string[];
  distribuicao: string;
  periodo: string;
  alimentacao: string;
  altura: string;
  peso: string;
};

export const megafauna: Animal[] = [
  {
    slug: "preguica-gigante",
    nome: "Preguiça-Gigante",
    cientifico: "Eremotherium laurillardi",
    imagem: preguica,
    resumo:
      "Herbívoro de até 6 metros que percorreu o Nordeste brasileiro durante o Pleistoceno, com fósseis abundantes nos tanques de Itapipoca.",
    descricao:
      "A Eremotherium laurillardi foi uma das maiores preguiças-terrícolas que já existiram. Habitava savanas e florestas tropicais da América do Sul e do Norte, sendo um dos mamíferos mais marcantes da megafauna pleistocênica do Ceará.",
    curiosidades: [
      "Podia ficar em pé sobre as patas traseiras para alcançar folhas no alto das árvores.",
      "Era exclusivamente herbívora, apesar do seu porte gigantesco.",
      "Seus fósseis estão entre os mais comuns nos tanques fossilíferos de Itapipoca.",
    ],
    distribuicao: "América do Sul e América Central, com ampla presença no Nordeste do Brasil.",
    periodo: "Pleistoceno tardio (≈ 126 mil – 11 mil anos atrás)",
    alimentacao: "Herbívoro folívoro",
    altura: "Até 6 m em pé",
    peso: "≈ 4 toneladas",
  },
  {
    slug: "mastodonte",
    nome: "Mastodonte",
    cientifico: "Notiomastodon platensis",
    imagem: mastodonte,
    resumo:
      "Proboscídeo de grande porte, aparentado dos elefantes atuais, que percorreu a América do Sul durante o Pleistoceno.",
    descricao:
      "O Notiomastodon platensis foi um mastodonte sul-americano amplamente distribuído, com registros importantes no Nordeste brasileiro. Pesava cerca de 4 toneladas e habitava ambientes abertos.",
    curiosidades: [
      "Suas presas chegavam a 3 metros de comprimento.",
      "Coexistiu com os primeiros humanos a chegarem à América do Sul.",
      "Foi extinto no fim do Pleistoceno, há aproximadamente 11 mil anos.",
    ],
    distribuicao: "Toda a América do Sul, da Venezuela à Patagônia.",
    periodo: "Pleistoceno (≈ 2,5 milhões – 11 mil anos atrás)",
    alimentacao: "Herbívoro generalista",
    altura: "≈ 2,8 m de altura na cernelha",
    peso: "3 a 4 toneladas",
  },
  {
    slug: "glyptodonte",
    nome: "Glyptodonte",
    cientifico: "Glyptotherium spp.",
    imagem: glyptodonte,
    resumo:
      "Mamífero gigante de carapaça óssea, parente distante dos tatus atuais, símbolo da megafauna sul-americana.",
    descricao:
      "Os gliptodontes eram herbívoros com carapaça óssea formada por placas fundidas, alguns com cauda armada. Em Itapipoca, são encontrados ostefólitos e fragmentos de cinturão que ajudam a reconstruir sua história.",
    curiosidades: [
      "A carapaça podia pesar mais de 400 kg.",
      "Algumas espécies tinham caudas com pontas espinhosas, usadas como armas.",
      "São aparentados próximos dos tatus modernos.",
    ],
    distribuicao: "América do Sul e parte da América do Norte.",
    periodo: "Pleistoceno",
    alimentacao: "Herbívoro",
    altura: "≈ 1,5 m",
    peso: "Até 1 tonelada",
  },
  {
    slug: "tigre-dentes-de-sabre",
    nome: "Tigre-Dentes-de-Sabre",
    cientifico: "Smilodon populator",
    imagem: tigre,
    resumo:
      "Maior felino predador da América do Sul no Pleistoceno, com caninos superiores de até 28 cm.",
    descricao:
      "Smilodon populator era um predador robusto, capaz de caçar megafauna como preguiças gigantes e mastodontes jovens. Sua presença na fauna nordestina é confirmada por fragmentos encontrados em tanques fossilíferos.",
    curiosidades: [
      "Pesava mais que um leão atual, podendo ultrapassar 400 kg.",
      "Seus caninos eram serrilhados e usados para golpes precisos.",
      "Conviveu com os humanos paleoíndios na América do Sul.",
    ],
    distribuicao: "América do Sul, incluindo o Nordeste brasileiro.",
    periodo: "Pleistoceno",
    alimentacao: "Carnívoro",
    altura: "≈ 1,2 m na cernelha",
    peso: "300 – 470 kg",
  },
];

export const findAnimal = (slug: string) => megafauna.find((a) => a.slug === slug);