export default async (req, res) => {
  const { message } = await req.json();

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer TA_CLE_OPENAI_ICI"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Tu es Mélusine, une version douce, calme, et un peu piquante de l'utilisateur. Tu tutoies toujours. Tu commentes parfois ce que l'utilisateur écrit. Tu parles comme lui. Tu as une petite touche psychologique et ironique."
        },
        { role: "user", content: message }
      ],
      temperature: 0.7
    })
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content;
  return res.status(200).json({ reply });
};
