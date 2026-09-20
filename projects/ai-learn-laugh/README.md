# AI Learn & Laugh

A dependency-free static web project that combines safe humor with practical AI/tech education to attract, educate, and grow an audience.

## Concept

Each generated card blends:
- a safe public joke,
- a practical AI or tech market insight,
- a clear takeaway,
- a call-to-action for engagement,
- and a natural follow message.

This is designed for creators who want shareable content that is entertaining **and** useful.

## Joke API

This project fetches jokes from JokeAPI in safe mode:

`https://v2.jokeapi.dev/joke/Any?safe-mode`

The app supports both JokeAPI response formats:
- `single` jokes (`joke`)
- `twopart` jokes (`setup` + `delivery`)

## Run locally

Because this is static HTML/CSS/JS, you can run it with any static file server.

Example using Python:

```bash
cd projects/ai-learn-laugh
python3 -m http.server 8000
```

Then open: `http://localhost:8000`

## CORS note

JokeAPI is browser-safe, but network policies can still block requests in some environments (corporate proxies, strict browser settings, extensions, or local security tools). If fetch fails, the app shows an error state and lets the user retry.

## Ethical guidance for AI market opportunities

Insights should focus on legitimate value creation:
- solve real user pain points,
- improve productivity and accessibility,
- respect privacy and consent,
- avoid exploitative, deceptive, or harmful tactics,
- encourage human review for high-impact decisions.

Use these cards to educate and build trust, not to promote shortcuts that harm people or platforms.
