import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai/index.mjs";

const openai = new OpenAI({ apiKey: process.env.GPT_TOKEN });
dotenv.config();
const router = express.Router();
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const ansiedade_curadoria = [
  {
    id: "6kkwzB6hXLIONkEk9JciA6",
    links: { youtube: "https://www.youtube.com/watch?v=UfcAVejslrU" },
    explanation:
      "“Comprovada redução de ansiedade via bpm desacelerado, sons contínuos e ausência de percussão, induzindo relaxamento fisiológico profundo.",
  },
  {
    id: "09V60XC2fnZQ69LY6saLt1",
    links: { youtube: "https://www.youtube.com/watch?v=H41m_JWiH0o" },
    explanation:
      "Timbre etéreo e melodia linear sem surpresas criam ambiente interno previsível, aliviando ansiedade por favorecer foco cognitivo e sensação de segurança emocional.",
  },
  {
    id: "7E5YAVrt11Xkgl0jhXLgAP",
    links: { youtube: "https://www.youtube.com/watch?v=oGyq3tVD5E8" },
    explanation:
      "Estrutura musical repetitiva e fluxo harmônico constante ajudam a desacelerar pensamentos acelerados, útil em crises de ansiedade generalizada.",
  },
  {
    id: "32F2E5AVZ8y83uJheMWodB",
    links: {
      youtube: null,
      soundcloud:
        "https://soundcloud.com/ingaliljestromsongs/transcendence-light-origami-music-by-inga-liljestrom",
    },
    explanation:
      "Ambiência minimalista e timbres sutis promovem estados meditativos, reduzindo a sintomatologia ansiosa ao aumentar a consciência corporal e respiratória.",
  },
  {
    id: "5FbfZj2ZyTSu6RNeJ2Q0bj",
    links: { youtube: "https://www.youtube.com/watch?v=x3B2cpy7ob4" },
    explanation:
      "Melodia suave em modo maior com vocais delicados transmite acolhimento emocional, útil para momentos de ansiedade social ou autocrítica intensa.",
  },
  {
    id: "405HNEYKGDifuMcAZvqrqA",
    links: { youtube: "https://www.youtube.com/watch?v=WNcsUNKlAKw" },
    explanation:
      "Tempo lento e texturas harmônicas suaves ativam o sistema nervoso parassimpático, reduzindo os sintomas físicos da ansiedade, como tensão e palpitações.",
  },
  {
    id: "0hNduWmlWmEmuwEFcYvRu1",
    links: { youtube: "https://www.youtube.com/watch?v=wuCK-oiE3rM" },
    explanation:
      "Progressão harmônica previsível e ausência de dissonância evitam gatilhos cognitivos ansiosos, gerando um ambiente auditivo seguro e estável.",
  },
  {
    id: "35KiiILklye1JRRctaLUb4",
    links: { youtube: "https://www.youtube.com/watch?v=TWcyIpul8OE" },
    explanation:
      "Instrumentação acústica íntima e ritmo constante diminuem a ruminação mental, favorecendo relaxamento e limpeza de pensamentos entre crises de ansiedade.",
  },
  {
    id: "0PkpRtJqrwuXhbdtJuQm7E",
    links: {
      youtube:
        "https://www.youtube.com/watch?v=2b1E-zu-QEM&pp=0gcJCfwAo7VqN5tD",
    },
    explanation:
      "Sons ambientes naturais e ausência de percussão intensa induzem relaxamento físico e aliviam sintomas de ansiedade muscular.",
  },
  {
    id: "05KIWSSVlQsK2k4j3vyvw2",
    links: { youtube: "https://www.youtube.com/watch?v=CT6QA8aQZbw" },
    explanation:
      "Vocais sussurrados e melodia hipnótica ajudam a desviar a atenção de preocupações, útil na transição de estados ansiosos agudos para calma.",
  },
  {
    id: "38nQjvZPjMeFNJUfky3o2V",
    links: { youtube: "https://www.youtube.com/watch?v=RUbPwiH6sAA" },
    explanation:
      "Ambiência sonora acolhedora evoca sensação de proteção emocional, apoio interno e presença, diminuindo sensações de vulnerabilidade típicas na ansiedade.",
  },
  {
    id: "3HBcQ5GenzAlBhCIgDGL3x",
    links: { youtube: "https://www.youtube.com/watch?v=JzIK5FaC38w" },
    explanation:
      "Loops instrumentais minimamente variáveis induzem conforto perceptual, ajudando a organizar pensamentos dispersos durante episódios ansiosos.",
  },
  {
    id: "2rtGaCAeYtmcIvuZsvgTf6",
    links: { youtube: "https://www.youtube.com/watch?v=6W6HhdqA95w" },
    explanation:
      "Harmonia em modo maior e ausência de tensão tonal promovem sensação de esperança e otimismo, contraindo sentimentos negativos da ansiedade crônica.",
  },
  {
    id: "3zSBsvj6MWavRKfPE51395",
    links: {
      youtube:
        "https://www.youtube.com/watch?v=iHzuygQd3do&pp=0gcJCdgAo7VqN5tD",
    },
    explanation:
      "Ritmo lento e arranjos orquestrais suaves reduzem agitação psicomotora associada a picos de ansiedade, auxiliando no retorno à calma.",
  },
  {
    id: "5YB0bqHv7rDYhkzIW8VQmq",
    links: { youtube: "https://www.youtube.com/watch?v=JRL1fqhDV1I" },
    explanation:
      "Melodia repetitiva e familiar induzem conforto auditivo e segurança emocional, ajudando a romper ciclos de pensamento ansioso.",
  },
  {
    id: "3FVy3aVs0TFzLv6FEiLqC2",
    links: { youtube: "https://www.youtube.com/watch?v=gYQfsGYI1Y4" },
    explanation:
      "Composição minimalista com timbres puros evita estímulos excessivos, criando espaço mental para acalmar o sistema nervoso central em momentos de estresse.",
  },
  {
    id: "0aATrtvw3vsRSYrbS60nUi",
    links: { youtube: "https://www.youtube.com/watch?v=LoBDxp66RrE" },
    explanation:
      "Ausência de letras e camadas etéreas estabilizam a atenção, sendo eficaz para técnicas de grounding auditivo durante crises de ansiedade.",
  },
  {
    id: "29T3H5d9TgTlYcKiuNxdRT",
    links: { youtube: "https://www.youtube.com/watch?v=UeT3AIqakfI" },
    explanation:
      "Andamento estável e harmonia consonante propiciam regulação emocional, especialmente útil para quem tem sensibilidade a mudanças abruptas.",
  },
  {
    id: "1w1vmGM5nzNsQviR9dC4Sc",
    links: {
      youtube:
        "https://www.youtube.com/watch?v=U8KxPwEDjFM&pp=ygUII2NodWtpeW8%3D",
    },
    explanation:
      "Vocal etéreo e dinâmica uniforme promovem descompressão emocional, facilitando transições de estados ansiosos para calmos.",
  },
];

const curadoria_foco = [
  {
    nome: "Weightless",
    artista: "Marconi Union",
    id: "6kkwzB6hXLIONkEk9JciA6",
    explanation:
      "Estudo da Mindlab International identificou esta faixa como altamente eficaz para foco, com ritmo contínuo, sem batidas abruptas, e ondas sonoras que sincronizam o ritmo cardíaco com o andamento musical (cerca de 60 bpm).",
    links: {
      youtube: "https://www.youtube.com/watch?v=UfcAVejslrU",
      spotify: "https://open.spotify.com/track/6kkwzB6hXLIONkEk9JciA6",
    },
  },
  {
    nome: "Intro",
    artista: "The xx",
    id: "2usrT8QIbIk9y0NEtQwS4j",
    explanation:
      "Ritmo constante, timbre seco e progressão minimalista auxiliam o foco sustentado sem criar sobrecarga cognitiva.",
    links: {
      youtube: "https://www.youtube.com/watch?v=TP9LU0Qfg2U",
    },
  },
  {
    nome: "Time",
    artista: "Hans Zimmer",
    id: "6ZFbXIJkuI1dVNWvzJzown",
    explanation:
      "Trilha instrumental com estrutura progressiva e repetitiva, muito usada para concentração profunda. O uso crescente de camadas sonoras estimula foco sem causar distração.",
    links: {
      youtube: "https://www.youtube.com/watch?v=Z0kGAz6HYM8",
    },
  },
  {
    nome: "Night Owl",
    artista: "Galimatias",
    id: "5tuhOP6bY3NlwTHghY5MbN",
    explanation:
      "Beats eletrônicos suaves e textura lo-fi criam uma base rítmica envolvente que sustenta o foco e evita dispersão mental.",
    links: {
      youtube: "https://www.youtube.com/watch?v=yLtJZ4ImiEY",
    },
  },
  {
    nome: "La Femme d’Argent",
    artista: "Air",
    id: "3ZzhV6JIDKWvWR7wiKWD0C",
    explanation:
      "Faixa instrumental com groove constante, uso de sintetizadores e ambientação sonora que induz concentração sem tensão.",
    links: {
      youtube: "https://www.youtube.com/watch?v=-GB9H1AjgJk",
    },
  },
  {
    nome: "Spiegel im Spiegel",
    artista: "Arvo Pärt",
    id: "7zHd9LxIZB8WKosSWN9Umj",
    explanation:
      "Minimalismo tonal e extrema repetição melódica proporcionam clareza mental e estado meditativo, ideal para foco prolongado.",
    links: {
      youtube: "https://www.youtube.com/watch?v=TJ6Mzvh3XCc",
    },
  },
  {
    nome: "Bloom",
    artista: "ODESZA",
    id: "0vtX8UMG38p7IXpP4lZJ2z",
    explanation:
      "Faixa eletrônica com construção progressiva e texturas agradáveis que favorecem o estado de flow durante estudos ou criação.",
    links: {
      youtube: "https://www.youtube.com/watch?v=WF34N4gJAKE",
    },
  },
  {
    nome: "We Move Lightly",
    artista: "Dustin O'Halloran",
    id: "4d5g8281I07iaIevSsP1ge",
    explanation:
      "Piano contemporâneo com andamento calmo e ausência de dissonância. Estimula organização mental e produtividade suave.",
    links: {
      youtube: "https://www.youtube.com/watch?v=82LkKxEBWsI",
    },
  },
  {
    nome: "Elegy",
    artista: "Lisa Gerrard & Patrick Cassidy",
    id: "1mwPnNxwCC7Tc9FBqFslun",
    explanation:
      "Vocalizações etéreas sem letra e instrumentação sinfônica lenta criam ambiente introspectivo e estável para leitura ou trabalho mental.",
    links: {
      youtube: "https://www.youtube.com/watch?v=1ZRb1we80kM",
    },
  },
  {
    nome: "Cold Little Heart (Instrumental)",
    artista: "Michael Kiwanuka",
    id: "0qprlw0jfsW4H9cG0FFE0Z",
    explanation:
      "Versão instrumental da faixa original com andamento estável e textura emocionalmente neutra, ótima para manter a atenção em tarefas criativas.",
    links: {
      youtube: "https://www.youtube.com/watch?v=nOheHIFuht8",
    },
  },
  {
    nome: "First Breath After Coma",
    artista: "Explosions in the Sky",
    id: "0QZms9dxoA0QlAjno2WHgb",
    explanation:
      "Post-rock instrumental com progressão lenta e emocional. Gera estado de flow e foco prolongado sem elementos disruptivos, conforme apontado por estudos sobre música repetitiva e tarefas cognitivas (Jäncke, 2008).",
    links: {
      youtube: "https://www.youtube.com/watch?v=w0o8JCxjjpM",
      spotify: "https://open.spotify.com/track/2SHP1N9eAqfEn2YBNqWIeW",
    },
  },
  {
    nome: "Satellites",
    artista: "Mew",
    id: "4OOuU1RW0itLHqJslfj3Z0",
    explanation:
      "Camadas sonoras e andamento constante criam um cenário sonoro hipnótico que estimula atenção sustentada, ideal para trabalho criativo leve.",
    links: {
      youtube: "https://www.youtube.com/watch?v=jb0qvSzJPC0",
      spotify: "https://open.spotify.com/track/7raop1B9DSC8q6dTjdtqWy",
    },
  },
  {
    nome: "Echoes",
    artista: "Pink Floyd",
    id: "7kriFJLY2KOhw5en9iI2jb",
    explanation:
      "Faixa longa e psicodélica com modulação lenta e padrão rítmico constante. Segundo estudos, músicas extensas e envolventes facilitam estados de imersão mental (*flow*) propícios ao foco profundo (Csikszentmihalyi, 1990).",
    links: {
      youtube: "https://www.youtube.com/watch?v=OcDiOUQBFd4",
      spotify: "https://open.spotify.com/track/4LIaS7vIxQpkPTyQ7o5O1W",
    },
  },
  {
    nome: "Midnight",
    artista: "Coldplay",
    id: "4GKk1uNzpxIptBuaY97Dkj",
    explanation:
      "Base eletrônica minimalista, uso de vocoder e ausência de percussão forte reduzem distrações auditivas, promovendo ambiente de concentração passiva (ideal para tarefas contínuas).",
    links: {
      youtube:
        "https://www.youtube.com/watch?v=BQeMxWjpr-Y&pp=0gcJCfwAo7VqN5tD",
      spotify: "https://open.spotify.com/track/6goB5vGp6dMSXTLohXOHpv",
    },
  },
  {
    nome: "Dawn Chorus",
    artista: "Thom Yorke",
    id: "2iQPembmg5KvkqXU0sd6xo",
    explanation:
      "Ambiência eletrônica introspectiva com elementos mínimos e loop hipnótico. Ideal para foco leve e reflexivo — ambientes com menor variação sonora ajudam a manter a atenção sem fadiga (Angel et al., 2010).",
    links: {
      youtube: "https://www.youtube.com/watch?v=RcdmssBYIVA",
      spotify: "https://open.spotify.com/track/3ykAO7N9tYN1P0r0ZFG3h1",
    },
  },
];

const curadoria_tristeza = [
  {
    nome: "Someone Like You",
    artista: "Adele",
    id: "1zwMYTA5nlNjZxYrvBB2pV",
    explanation:
      "Letra e melodia que expressam perda, mas oferecem catarse emocional racionalizada — segundo Juslin (2019), ouvir emoções tristes ajudaria na regulação afetiva.",
    links: {
      youtube: "https://www.youtube.com/watch?v=hLQl3WQQoQ0",
      spotify: "https://open.spotify.com/track/4kflIGfjdZJW4ot2ioixTB",
    },
  },
  {
    nome: "Now We Are Free",
    artista: "Hans Zimmer & Lisa Gerrard",
    id: "1elGwF4VwkwglV4nCBPJtv",
    explanation:
      "Vocalizações sem letra e arranjo etéreo facilitam ressonância emocional sem palavras explícitas, oferecendo uma liberação emocional segura.",
    links: {
      youtube: "https://www.youtube.com/watch?v=LmwgYwlLZbQ",
    },
  },
  {
    nome: "The Night We Met",
    artista: "Lord Huron",
    id: "3hRV0jL3vUpRrcy398teAU",
    explanation:
      "Timbre melancólico e letra narrativa ajudam no processamento de saudade e arrependimento — método reconhecido em musicoterapia para lidar com tristeza.",
    links: {
      youtube: "https://www.youtube.com/watch?v=KtlgYxa6BMU",
    },
  },
  {
    nome: "River Flows in You",
    artista: "Yiruma",
    id: "2agBDIr9MYDUducQPC1sFU",
    explanation:
      "Piano solo em modo menor, repetitivo e suave, oferece introspecção e acolhimento emocional, reduzindo o peso da tristeza sem sobrecarga.",
    links: {
      youtube: "https://www.youtube.com/watch?v=7maJOI3QMu0",
    },
  },
  {
    nome: "Skinny Love",
    artista: "Bon Iver",
    id: "3B3eOgLJSqPEA0RfboIQVM",
    explanation:
      "Arranjo intimista, voz frágil e harmonia inacabada estimulam expressão emocional autêntica — útil para enfrentar tristeza com consciência e sensibilidade.",
    links: {
      youtube: "https://www.youtube.com/watch?v=ssdgFoHLwnk",
    },
  },
  {
    nome: "Experience",
    artista: "Ludovico Einaudi",
    id: "1BncfTJAWxrsxyT9culBrj",
    explanation:
      "Composição solo de piano com gravitas emocional e progressão lenta, favorece a liberação de emoções acumuladas em um ambiente acolhedor.",
    links: {
      youtube: "https://www.youtube.com/watch?v=_mVW8tgGY_w",
    },
  },
  {
    nome: "Hallelujah",
    artista: "Jeff Buckley",
    id: "3pRaLNL3b8x5uBOcsgvdqM",
    explanation:
      "Interpretação intensa da letra melancólica apoia catarse emocional e valida a vulnerabilidade, ferramentas terapêuticas no manejo da tristeza.",
    links: {
      youtube: "https://www.youtube.com/watch?v=y8AWFf7EAc4",
    },
  },
  {
    nome: "River",
    artista: "Leon Bridges",
    id: "3hhbDnFUb2bicI2df6VurK",
    explanation:
      "Fusão de soul e blues com letra de busca por redenção — ao validar sentimentos de arrependimento, promove alívio emocional natural.",
    links: {
      youtube: "https://www.youtube.com/watch?v=6R1FbeUs7TY",
    },
  },
  {
    nome: "Comptine d’un autre été",
    artista: "Yann Tiersen",
    id: "14rZjW3RioG7WesZhYESso",
    explanation:
      "Aura nostálgica via piano repetitivo e quase suspenso — excelente para processar emoções sem palavras, muito usado para lidar com tristeza em musicoterapia.",
    links: {
      youtube: "https://www.youtube.com/watch?v=H2-1u8xvk54",
    },
  },
  {
    nome: "Fix You",
    artista: "Coldplay",
    id: "7LVHVU3tWfcxj5aiPFEW4Q",
    explanation:
      "Progressão que vai de melancolia para esperança, apoiando a transição emocional — método sensível para aliviar tristeza e criar autoconforto.",
    links: {
      youtube: "https://www.youtube.com/watch?v=k4V3Mo61fJM",
    },
  },
  {
    nome: "Creep",
    artista: "Radiohead",
    id: "70LcF31zb1H0PyJoS1Sx1r",
    explanation:
      "Letra que expressa inadequação e angústia existencial. Estudos mostram que músicas que verbalizam desconfortos internos promovem validação emocional, facilitando a autorregulação (Koelsch, 2010).",
    links: {
      youtube: "https://www.youtube.com/watch?v=XFkzRNyygfk",
      spotify: "https://open.spotify.com/track/3HfB5hBU0dmBt8T0iCmH42",
    },
  },
  {
    nome: "Tears in Heaven",
    artista: "Eric Clapton",
    id: "1kgdslQYmeTR4thk9whoRw",
    explanation:
      "Expressa luto real, oferecendo um espaço simbólico para quem vive perdas. Segundo Sloboda (1991), músicas que evocam perda pessoal ativam respostas emocionais profundas e auxiliam na elaboração do luto.",
    links: {
      youtube: "https://www.youtube.com/watch?v=JxPj3GAYYZ0",
      spotify: "https://open.spotify.com/track/3CyUMX4OBx8hkrz9aH1YHT",
    },
  },
  {
    nome: "The Scientist",
    artista: "Coldplay",
    id: "75JFxkI2RXiU7L9VXzMkle",
    explanation:
      "Balada em tempo lento, com harmonia em modo menor e letra sobre arrependimento — combinação que, segundo Juslin (2019), ajuda a induzir tristeza reflexiva benéfica ao enfrentamento de emoções negativas.",
    links: {
      youtube: "https://www.youtube.com/watch?v=RB-RcX5DS5A",
      spotify: "https://open.spotify.com/track/75JFxkI2RXiU7L9VXzMkle",
    },
  },
  {
    nome: "Black",
    artista: "Pearl Jam",
    id: "5Xak5fmy089t0FYmh3VJiY",
    explanation:
      "Expressa perda e apego afetivo com progressão instrumental crescente. Músicas com clímax emocional crescente tendem a intensificar a catarse, promovendo alívio emocional posterior (Juslin & Sloboda, 2010).",
    links: {
      youtube: "https://www.youtube.com/watch?v=qgaRVvAKoqQ",
      spotify: "https://open.spotify.com/track/3TGRqZ0a2l1LRblBkJoaDx",
    },
  },
  {
    nome: "Everybody Hurts",
    artista: "R.E.M.",
    id: "6PypGyiu0Y2lCDBN1XZEnP",
    explanation:
      "Letra direta e empática sobre dor universal. A simplicidade melódica e repetição de frases acolhedoras são eficazes para suporte emocional em crises (Juslin & Västfjäll, 2008).",
    links: {
      youtube:
        "https://www.youtube.com/watch?v=5rOiW_xY-kc&pp=0gcJCfwAo7VqN5tD",
      spotify: "https://open.spotify.com/track/5J1RxhVj0LQGzCkC0unUsZ",
    },
  },
];

const curadoria_sono = [
  {
    nome: "Weightless",
    artista: "Marconi Union",
    id: "6kkwzB6hXLIONkEk9JciA6",
    explanation:
      "Composita para desacelerar o ritmo cardíaco (inicialmente 60 bpm, decrescendo para 50 bpm), reduzindo tensão e induzindo estado semelhante ao sono profundo—base comprovada na literatura sobre ‘entrainment’ e sono",
    links: {
      youtube: "https://www.youtube.com/watch?v=UfcAVejslrU",
      spotify: "https://open.spotify.com/track/6kkwzB6hXLIONkEk9JciA6",
    },
  },
  {
    nome: "Dream 13 (Minus Even)",
    artista: "Max Richter",
    id: "6CZQOWmIA9GymbjdaEJcGu", // substituir pelo ID real
    explanation:
      "Faixa do álbum *From Sleep* (versão condensada de *Sleep*) — andamento lento, camadas suaves e ambiente drone calmante, seguimento direto das evidências das performances noturnas de Richter para induzir slow-wave sleep",
    links: {
      spotify: "https://open.spotify.com/album/...",
    },
  },
  {
    nome: "Calm. Sleep. (Ambient Track)",
    artista: "Moby",
    id: "2JzPcB8bqsAPZOxKGxZtrO",
    explanation:
      "Projetado para facilitar o sono com drones longos e melodia mínima, consistentes com características de música sedativa recomendadas em estudos",
    links: {
      spotify: "https://open.spotify.com/album/...",
    },
  },
  {
    nome: "light rain and soft thunder for sleep",
    artista: "Restful",
    id: "5tbhW43rcMJomqMNZQ3usU",
    explanation:
      "Combinação de chuva leve e trovões suaves cria uma paisagem sonora estável que mascara ruídos externos e induz um estado de segurança acústica — elemento essencial para transição ao sono. A ausência de picos sonoros e o padrão contínuo favorecem o relaxamento progressivo do sistema nervoso central, promovendo a entrada gradual em ondas cerebrais do tipo delta.",
    links: {
      spotify: "https://open.spotify.com/track/5tbhW43rcMJomqMNZQ3usU",
    },
  },
  {
    nome: "An Ending (Ascent)",
    artista: "Brian Eno",
    id: "1vgSaC0BPlL6LEm4Xsx59J",
    explanation:
      "Marco da ambient music — atmosfera flutuante e ausência de percussão ajudam a silenciar o pensamento ruminante, promovendo um estado de vigília calma e transição para o sono (Koelsch, 2010).",
    links: {
      youtube:
        "https://www.youtube.com/watch?v=OlaTeXX3uH8&pp=0gcJCfwAo7VqN5tD",
      spotify: "https://open.spotify.com/track/6IpJcU6vYgU4tsEftZ7xPm",
    },
  },
  {
    nome: "Weightless Pt. 6",
    artista: "Marconi Union",
    id: "1Mua0g96hUldJWj00GDsel",
    explanation:
      "Continuação da série *Weightless*, construída com *pad drones* e desaceleração progressiva. Estudos com EEG indicam aumento de ondas alfa e teta durante audição prolongada, correlacionadas com sonolência.",
    links: {
      youtube: "https://www.youtube.com/watch?v=FX_Qv96_x2c",
      spotify: "https://open.spotify.com/track/0n5bYm4yHleZ7Z7YbDqm9R",
    },
  },
  {
    nome: "Blue In Green (Take 3, Instrumental)",
    artista: "Miles Davis & Bill Evans",
    id: "60p18YXhrzLNrAaUXL8Bu6",
    explanation:
      "Balada jazz modal com andamento extremamente lento e clima introspectivo. A harmonia expansiva de Bill Evans induz relaxamento fisiológico, validado por estudos sobre jazz lento e sono.",
    links: {
      youtube:
        "https://www.youtube.com/watch?v=kSXeZrjWrs8&pp=0gcJCfwAo7VqN5tD",
      spotify: "https://open.spotify.com/track/3UjcUkEfEKgZCcbMT85vZT",
    },
  },
  {
    nome: "Night Rain",
    artista: "Nature Sound Series",
    id: "65EFrQhBfJ5Zr7bd7j2vG4",
    explanation:
      "Som contínuo de chuva suave — segundo Perceptual and Motor Skills Journal, sons da natureza estáveis reduzem o tempo até o início do sono e mascaram ruídos disruptivos urbanos.",
    links: {
      youtube:
        "https://www.youtube.com/watch?v=yIQd2Ya0Ziw&pp=0gcJCfwAo7VqN5tD",
      spotify: "https://open.spotify.com/track/2P5sC9cWUnfKjAU4C0UcGg",
    },
  },
  {
    nome: "Spiegel im Spiegel",
    artista: "Arvo Pärt",
    id: "7zHd9LxIZB8WKosSWN9Umj",
    explanation:
      "Repetição quase hipnótica em piano e violino, com cadência suave e ausência de tensão harmônica. Usado em intervenções clínicas de relaxamento profundo, conforme evidenciado em estudos de *music-induced sedation*.",
    links: {
      youtube: "https://www.youtube.com/watch?v=TJ6Mzvh3XCc",
      spotify: "https://open.spotify.com/track/7zHd9LxIZB8WKosSWN9Umj",
    },
  },
];

async function fetchPrompt(prompt) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `"Dados: ${prompt}" GPT,
        Você é um especialista em psicologia da música e musicoterapia. Com base nas diretrizes dos livros "Oxford Handbook of Music Psychology" e "Handbook of Music Therapy" e nos dados recebidos analise os seguintes atributos musicais:
        - energy (0 a 1): nível de excitação e intensidade percebida.
        - valence (0 a 1): quão positiva ou negativa emocionalmente é a música.
        - tempo (BPM): velocidade da música.
        - acousticness (0 a 1): grau de presença de elementos acústicos e orgânicos.
        - instrumentalness (0 a 1): ausência de vocais.
        - speechiness (0 a 1): presença de fala ou elementos semelhantes a fala.
        A partir desses dados, recomende até 5 músicas ou artistas cujas características se alinhem com esses atributos. Considere a função terapêutica da música (por exemplo, induzir relaxamento, foco, regulação emocional ou estímulo energético).
        **Exemplos de correlações baseadas nas obras:**
        - Altos valores de *valence* e *energy* são associados a estados positivos e motivacionais .
        - Baixo *tempo* e alta *acousticness* tendem a ser relaxantes e eficazes contra ansiedade .
        - Alto *speechiness* pode indicar músicas com conteúdo verbal relevante para estados reflexivos .
        - Música instrumental com baixa *energy* e alta *acousticness* é frequentemente usada para relaxamento profundo ou indução ao sono .
        - Ritmos moderados (~90–110 BPM) com *valence* médio podem ser úteis para foco cognitivo.
        **Atributos recebidos do frontend:**
        {coloque aqui o objeto JSON com os atributos, transformado em string}
        Retorne um array com objetos de seguintes atributos(NÃO MUDE O NOME DOS ATRIBUTOS, nome,id,suggestion e justificativa. 
        Id não tem nem um outro atributo a não ser o id da música. NÃO COLOQUE ID:TRACK:SPOTIFY, APENAS ID):
        - nome,
        - id ("id da musica com valencias mais parecidas do artista com o estilo no spotify"),
        - suggestion
        - justificativa
        APENAS RETORNE O ARRAY, SEM FALAR NADA ANTES NEM DEPOIS POR FAVOR. NÃO COLOQUE JSON NO COMEÇO NEM PULE LINHAS COM BARRA N`,
      },
    ],
    model: "gpt-4o",
  });

  console.log(completion.choices[0]);
  return completion.choices[0];
}

const get_token = async () => {
  const credentials = Buffer.from(`${clientID}:${clientSecret}`).toString(
    "base64"
  );
  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + credentials,
    },
    body: "grant_type=client_credentials",
  });
  const data = await result.json();
  return data.access_token;
};

const fetch_tracks = async (track, token) => {
  const link = `https://api.spotify.com/v1/tracks/${track}`;
  const options = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const result = await fetch(link, options);
  const data = await result.json();
  console.log(data);
  return data;
};

const fetch_episodes = async (query, token) => {
  if (query == "Ansiedade") {
    query =
      "podcast%20sobre%20ansiedade%20dicas%20para%20melhorar%20ansiedade%20terapia%20relaxamento";
  } else if (query == "Foco") {
    query =
      "podcast%20sobre%20foco%20dicas%20para%20melhorar%20o%20foco%20sons%20para%20foco";
  } else if (query == "Tristeza") {
    query = "podcast%20sobre%20tristeza%20dicas%20para%20ficar%20mais%20alegre";
  } else {
    query = "podcast%20sobre%20sono%20dicas%20para%20sono%20sons";
  }

  const link = `https://api.spotify.com/v1/search?q=${query}&type=episode&limit=3`;
  console.log(query);
  const options = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const result = await fetch(link, options);
  const data = await result.json();
  console.log(data);
  return data;
};

router.post("/music1", async (req, res) => {
  const option = req.body.option;
  const token = await get_token();
  console.log(option);
  let choosed_track = {};
  if (option === "Ansiedade") {
    choosed_track =
      ansiedade_curadoria[
        Math.floor(Math.random() * ansiedade_curadoria.length)
      ];
  } else if (option === "Foco") {
    choosed_track =
      curadoria_foco[Math.floor(Math.random() * curadoria_foco.length)];
  } else if (option === "Tristeza") {
    choosed_track =
      curadoria_tristeza[Math.floor(Math.random() * curadoria_tristeza.length)];
  } else {
    choosed_track =
      curadoria_sono[Math.floor(Math.random() * curadoria_sono.length)];
  }
  console.log(choosed_track);
  let id = choosed_track.id;
  let result = await fetch_tracks(id, token);
  const episodeResult = await fetch_episodes(option, token);
  res.json([result, choosed_track, episodeResult]);
});

router.post("/music", async (req, res) => {
  const {
    tempo,
    energy,
    acousticness,
    valence,
    instrumentalness,
    speechiness,
  } = req.body.atributes;

  console.log("Atributos recebidos:", req.body.atributes);
  const prompt = JSON.stringify(req.body.atributes);
  const token = await get_token();
  console.log(token);

  const baseParams = {
    seed_genres: "alternative2%classical", // você pode mudar conforme necessário
    target_energy: energy,
    target_acousticness: acousticness,
    target_valence: valence,
    target_instrumentalness: instrumentalness,
    target_speechiness: speechiness,
    target_tempo: tempo,
    limit: 10,
  };

  try {
    const tracks = await fetchPrompt(prompt);
    const jsonString = tracks.message.content
      .replace(/```json\n?/, "")
      .replace(/```/, "");
    const finalString = JSON.parse(jsonString);
    const idsTracksArray = [];

    finalString.forEach((element) => {
      idsTracksArray.push(element.id);
    });

    await fetch_tracks(idsTracksArray, token);

    res.json(tracks); // envia apenas os 5 primeiros
  } catch (err) {
    console.error("Erro ao obter recomendações:", err);
    res.status(500).json({ error: "Erro ao buscar músicas." });
  }
});

export default router;
