AddisLife — City Action Engine (PWA)

AddisLife is an AI-powered Progressive Web App (PWA) that acts as a City Action Engine for Addis Ababa.
Instead of just searching, it helps users complete real-world tasks like booking services, finding clinics, comparing transport, and monitoring government appointments.

Built for hackathons using:

⚡ Vercel (Deployment + AI Gateway)
🤖 AI SDK (GPT-4o / Claude)
🔌 MCP (Tool-based AI actions)
🔁 Workflow SDK (Background tasks)
🎨 v0 (UI generation)
🚀 Core Idea

Traditional apps = search results
AddisLife = action-based AI agent

Users can:

Book or find government office slots
Compare transport options (minibus vs ride apps)
Find clinics and work cafés
Request services like water delivery
Monitor tasks in the background until completion

The AI does not rely on pre-trained local data — it uses tools (MCP server) to fetch structured, real-time-like responses.

🧠 System Architecture
User (PWA UI)
   ↓
Next.js App (Vercel)
   ↓
AI SDK (GPT-4o / Claude)
   ↓
MCP Tool Server (AddisLife Tools)
   ↓
Mock City Data (Clinics, Offices, Transport, etc.)

For long-running tasks:

AI → Workflow SDK → Background Monitoring → Task Updates → UI
🎨 UI Design System

Color Palette:

Background: #B3CFE5
Primary Buttons / Nav: #4A7FA7
Cards: White / soft blue tint
Text on primary: White

Design principles:

Mobile-first (PWA)
Card-based UI
Chat-driven interaction
Action buttons inside responses
📱 Features
🏠 Home Dashboard
Quick action cards:
Renew Documents
Find Clinic
Get Home Fast
Water Delivery
Work Cafés
💬 AI Chat Agent

Users can ask:

“Find the fastest kebele ID office near Bole”
“Compare minibus vs ride to Piassa”
“Find a café with generator and fast WiFi”

The agent responds with:

Structured cards
Buttons (Book / Reserve / Compare)
Real-time tool results (via MCP)
📌 Tasks System
Background monitoring jobs
Example: “Watch for passport slot at Megenagna”
Status tracking:
Waiting
In Progress
Completed
Cancel anytime
⚙️ Settings
Language (future-ready)
Notifications
Saved locations
🔧 MCP Tools (City Engine)

The MCP server provides structured city data:

🏢 Government Office Tool
ID renewal
Passport
Driver’s license
Queue status & available slots
🏥 Clinic Finder
Location-based filtering
Specialty support
Open status
🚕 Transport Comparison
Minibus vs Ride apps
Price + time comparison
Step-by-step directions
🚰 Water Delivery
Request tanker delivery
ETA tracking
Order confirmation
☕ Work Café Finder
WiFi speed
Generator availability
Safety + seating capacity
🧱 Tech Stack
Frontend
Next.js (App Router)
React
Tailwind CSS
PWA (Manifest + Service Worker)
AI Layer
Vercel AI SDK
GPT-4o / Claude
AI Gateway API
Backend Tools
MCP Server (custom tools)
Workflow SDK (background tasks)
Deployment
Vercel (App + MCP server)
⚙️ Setup Guide
1. Clone Project
git clone https://github.com/your-username/addislife.git
cd addislife
npm install
2. Environment Variables

Create .env.local:

AI_GATEWAY_API_KEY=your_key_here
3. Run App
npm run dev

Open:

http://localhost:3000
4. MCP Server Setup
git clone https://github.com/your-username/addislife-mcp.git
cd addislife-mcp
npm install

Deploy to Vercel and copy the URL into:

createMCPClient({
  url: "https://your-mcp-url.vercel.app"
})
5. Deploy Frontend
git add .
git commit -m "Deploy AddisLife"
git push

Vercel auto-deploys your app.

🔁 Example User Flow
Example 1: Government Service

User:

“I need a kebele ID renewal near Bole”

AI:

Calls MCP tool
Returns available offices
Shows booking card
Example 2: Transport Comparison

User:

“Fastest way to Piassa”

AI:

Compares ride vs minibus
Shows price + time cards
Example 3: Monitoring Task

User:

“Notify me when passport slot opens”

AI:

Starts background workflow
Adds task to dashboard
Updates when slot is found
🧩 Key Innovation

This is not a chatbot.

It is a:

🧠 City Action Engine — an AI that executes real-world tasks

Instead of:

“Here are links”

It provides:

“Here is your option + action button + monitoring system”
📦 Project Structure
/app
  /api/chat
  /workflows
  /components
  /pages

/mcp-server
  /tools

/public
  manifest.json
  sw.js
🏁 Outcome

By building this project, you create:

A working AI super-app prototype for Addis Ababa
A tool-based AI system (not just prompts)
A PWA installable on mobile
A background task execution system
A real hackathon-ready product demo
🟦 Final Vision

AddisLife transforms AI from:

“Ask me anything”

to:

“I will help you get it done in your city.
