const JOKE_API_URL = "https://v2.jokeapi.dev/joke/Any?safe-mode";

const insightPool = [
  {
    title: "Automate Boring Admin",
    tag: "AI Operations",
    insight: "Most small teams lose hours in repetitive admin before they lose money in strategy.",
    takeaway: "Turn one repeated weekly task into a simple AI-assisted workflow first.",
    cta: "Ask your audience: Which task should I automate next?"
  },
  {
    title: "Niche Beats Noise",
    tag: "AI Market Gap",
    insight: "General AI tools are crowded, but niche workflows still have underserved users.",
    takeaway: "Pick one industry pain point and build a tiny practical helper.",
    cta: "Invite followers to share niche pain points you can solve publicly."
  },
  {
    title: "Human Review Wins",
    tag: "Responsible AI",
    insight: "AI can draft quickly, but trust grows when humans check quality and context.",
    takeaway: "Use AI for speed and human judgment for final decisions.",
    cta: "Show one before/after example to teach your process and build trust."
  },
  {
    title: "Distribution is Product",
    tag: "Creator Growth",
    insight: "Great AI ideas fail quietly when creators skip consistent distribution.",
    takeaway: "Publish one useful idea daily in a repeatable format your audience recognizes.",
    cta: "Tell readers to follow for a daily build + lesson format."
  }
];

const elements = {
  generateButton: document.getElementById("generateButton"),
  copyButton: document.getElementById("copyButton"),
  status: document.getElementById("status"),
  title: document.getElementById("cardTitle"),
  tag: document.getElementById("cardTag"),
  joke: document.getElementById("cardJoke"),
  insight: document.getElementById("cardInsight"),
  takeaway: document.getElementById("cardTakeaway"),
  cta: document.getElementById("cardCta"),
  follow: document.getElementById("cardFollow")
};

let currentCardText = "";

function setStatus(message, isError = false) {
  elements.status.textContent = message;
  elements.status.classList.toggle("error", isError);
}

function getJokeText(payload) {
  if (!payload || payload.error) {
    return "";
  }

  if (payload.type === "single") {
    return payload.joke || "";
  }

  if (payload.type === "twopart") {
    const setup = payload.setup || "";
    const delivery = payload.delivery || "";
    return [setup, delivery].filter(Boolean).join(" — ");
  }

  return "";
}

function buildCardText(fields) {
  return [
    `Title: ${fields.title}`,
    `Tag: ${fields.tag}`,
    `Joke: ${fields.joke}`,
    `Insight: ${fields.insight}`,
    `Takeaway: ${fields.takeaway}`,
    `CTA: ${fields.cta}`,
    `Follow: ${fields.follow}`
  ].join("\n");
}

function renderCard(card) {
  elements.title.textContent = card.title;
  elements.tag.textContent = `Tag: ${card.tag}`;
  elements.joke.textContent = card.joke;
  elements.insight.textContent = card.insight;
  elements.takeaway.textContent = card.takeaway;
  elements.cta.textContent = card.cta;
  elements.follow.textContent = card.follow;
  currentCardText = buildCardText(card);
  elements.copyButton.disabled = false;
}

function randomInsight() {
  return insightPool[Math.floor(Math.random() * insightPool.length)];
}

async function generateCard() {
  elements.generateButton.disabled = true;
  elements.copyButton.disabled = true;
  setStatus("Loading a safe joke and matching AI insight...");

  try {
    const response = await fetch(JOKE_API_URL, { method: "GET" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const payload = await response.json();
    const joke = getJokeText(payload);

    if (!joke) {
      setStatus("No joke returned this time. Try again.");
      return;
    }

    const insight = randomInsight();
    const card = {
      title: insight.title,
      tag: insight.tag,
      joke,
      insight: insight.insight,
      takeaway: insight.takeaway,
      cta: insight.cta,
      follow: "Follow for more daily AI lessons, practical tech opportunities, and humor that helps you grow."
    };

    renderCard(card);
    setStatus("Card generated. You can copy and share it.");
  } catch (error) {
    setStatus("Could not fetch a joke right now. Please check your connection or CORS policy and try again.", true);
  } finally {
    elements.generateButton.disabled = false;
  }
}

async function copyCard() {
  if (!currentCardText) {
    setStatus("Generate a card before copying.");
    return;
  }

  try {
    await navigator.clipboard.writeText(currentCardText);
    setStatus("Card copied to clipboard.");
  } catch (error) {
    setStatus("Clipboard copy failed. You can manually select and copy the card text.", true);
  }
}

elements.generateButton.addEventListener("click", generateCard);
elements.copyButton.addEventListener("click", copyCard);
