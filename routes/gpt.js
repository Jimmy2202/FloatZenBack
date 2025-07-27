import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai/index.mjs";

dotenv.config();
const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.GPT_TOKEN });

async function fetchPrompt(prompt) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `"Texto: ${prompt}" GPT,
        Esse texto acima é um texto do usuário detalhando sobre a música que deseja. 
        Eu gostaria que você lesse esse texto e retornasse um array de cinco objetos literais em js com:
        artista:, musica:.
        Esse array são de 5 recomendações que você daria para o usuário de acordo com o que ele pediu.
        Cada faixa com um artista diferente e sons diferentes que tem a ver com os detalhes do usuário.
        Ah, se a pessoa escrever uma banda ou artista pela metade ou escrever errado, como ao invés de Avenged Sevenfold, a pessoa
        escrever apenas Avenged, ou a pessoa escrever Panic At the Disco e escrever só Panic, complete para ela por favor e corrija por ela, se possível.
        Se não for possível entender a banda ou artista que ela pediu, coloque Null no atributo de artistas. Muito Obrigado.
        Por favor, responda só com o json, não responda nada mais por favor.
        APENAS RETORNE O ARRAY POR FAVOR, SEM NADA ESCRITO ANTES NEM DEPOIS APENAS O ARRAY [].
        E por favor, quando retornar o JSON, retorne sem quebra de linhas,barra n ou coisas do tipo, de preferencias, tente retornar um json em uma linha só, e sem barras.`,
      },
    ],
    model: "gpt-4o",
  });

  console.log(completion.choices[0]);
  return completion.choices[0];
}

function limparResposta(raw) {
  return raw
    .replace(/```json\n?/, "")
    .replace(/```/, "")
    .trim();
}

router.post("/ia/fetchprompt", async (req, res) => {
  const { text } = req.body;
  console.log(text);
  let result = await fetchPrompt(text);
  result = limparResposta(result.message.content);
  res.json(result);
});

export default router;
