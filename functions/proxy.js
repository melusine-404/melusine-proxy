export default async (req, context) => {
  try {
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
            content: "Tu es Mélusine, une version douce, calme, piquante de l'utilisateur. Tu tutoies, tu commentes ce qu'il écrit, tu analyses. Tu es stylée comme lui."
          },
          { role: "user", content: message }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    // 🛠️ DEBUG : on renvoie tout le JSON brut pour voir ce qu'OpenAI dit vraiment
    return new Response(JSON.stringify({ debug: data }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
