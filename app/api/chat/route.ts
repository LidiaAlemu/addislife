import { streamText, tool } from "ai";
import { z } from "zod";

export const maxDuration = 30;

// System prompt for AddisLife assistant
const systemPrompt = `You are AddisLife, an AI assistant helping people navigate daily life in Addis Ababa, Ethiopia. You are friendly, helpful, and knowledgeable about local services.

Your capabilities include:
1. **Document Services**: Help users renew IDs, passports, driver's licenses, and other government documents. Know the locations of Kebele offices, Immigration offices, and Transport Authority.

2. **Healthcare**: Find nearby clinics, hospitals, and pharmacies. Know about Tikur Anbessa, St. Paul's, and major private hospitals.

3. **Transportation**: Compare ride options (Ride, Feres, ZayRide), know taxi rates, and public transport routes.

4. **Water Delivery**: Help order drinking water from local providers like Aqua Addis.

5. **Work Cafes**: Recommend cafes with good WiFi and workspace in areas like Bole, Kazanchis, and Sarbet.

Guidelines:
- Be concise and actionable
- When users ask about services, provide specific next steps
- If you don't know something, say so and suggest alternatives
- Support conversations in English, Amharic (አማርኛ), and Oromo (Afaan Oromoo)
- Use the appropriate language based on what the user writes in

Current date: ${new Date().toLocaleDateString()}`;

export async function POST(request: Request) {
  const { messages } = await request.json();

  const result = streamText({
    model: "openai/gpt-4o-mini",
    system: systemPrompt,
    messages,
    tools: {
      findClinic: tool({
        description: "Search for clinics or hospitals near a location in Addis Ababa",
        parameters: z.object({
          area: z.string().describe("The area or neighborhood in Addis Ababa"),
          specialty: z.string().optional().describe("Medical specialty needed"),
        }),
        execute: async ({ area, specialty }) => {
          // Mock clinic data - would connect to real API
          const clinics = [
            {
              name: "Bethzatha General Hospital",
              area: "Bole",
              distance: "1.2 km",
              rating: 4.5,
              phone: "+251 11 661 8888",
            },
            {
              name: "Hayat Medical Center",
              area: "Bole",
              distance: "2.0 km",
              rating: 4.3,
              phone: "+251 11 662 0000",
            },
            {
              name: "St. Gabriel Hospital",
              area: "Megenagna",
              distance: "3.5 km",
              rating: 4.6,
              phone: "+251 11 646 1846",
            },
          ];
          return { clinics, searchArea: area, specialty };
        },
      }),
      compareTransport: tool({
        description: "Compare ride prices and ETAs between different transport apps",
        parameters: z.object({
          from: z.string().describe("Pickup location"),
          to: z.string().describe("Destination"),
        }),
        execute: async ({ from, to }) => {
          // Mock transport data
          const options = [
            { provider: "Ride", price: "ETB 180", eta: "5 min", surge: false },
            { provider: "Feres", price: "ETB 165", eta: "8 min", surge: false },
            { provider: "ZayRide", price: "ETB 175", eta: "6 min", surge: false },
            { provider: "Taxi", price: "ETB 200-250", eta: "3 min", surge: false },
          ];
          return { options, from, to };
        },
      }),
      findCafe: tool({
        description: "Find work-friendly cafes with WiFi in Addis Ababa",
        parameters: z.object({
          area: z.string().describe("Preferred area in Addis Ababa"),
          requirements: z.array(z.string()).optional().describe("Requirements like WiFi, quiet, power outlets"),
        }),
        execute: async ({ area, requirements }) => {
          // Mock cafe data
          const cafes = [
            {
              name: "Kaldi's Coffee",
              area: "Bole",
              wifi: true,
              quiet: true,
              rating: 4.4,
              hours: "7AM - 10PM",
            },
            {
              name: "Tomoca Coffee",
              area: "Piazza",
              wifi: true,
              quiet: false,
              rating: 4.7,
              hours: "6AM - 9PM",
            },
            {
              name: "Garden of Coffee",
              area: "Kazanchis",
              wifi: true,
              quiet: true,
              rating: 4.5,
              hours: "8AM - 11PM",
            },
          ];
          return { cafes, searchArea: area, requirements };
        },
      }),
      orderWater: tool({
        description: "Order drinking water delivery",
        parameters: z.object({
          liters: z.number().describe("Amount of water in liters"),
          address: z.string().describe("Delivery address"),
        }),
        execute: async ({ liters, address }) => {
          // Mock water delivery
          const providers = [
            { name: "Aqua Addis", pricePerLiter: "ETB 8", available: true },
            { name: "Highland Water", pricePerLiter: "ETB 7", available: true },
          ];
          const estimatedTotal = liters * 8;
          return { providers, liters, address, estimatedTotal: `ETB ${estimatedTotal}` };
        },
      }),
      getDocumentInfo: tool({
        description: "Get information about government document services",
        parameters: z.object({
          documentType: z.enum(["id", "passport", "license", "birth_certificate"]).describe("Type of document"),
        }),
        execute: async ({ documentType }) => {
          const info: Record<string, object> = {
            id: {
              office: "Local Kebele Office",
              requirements: ["Old ID or birth certificate", "2 passport photos", "Witness"],
              fee: "ETB 100",
              processingTime: "1-3 days",
            },
            passport: {
              office: "Immigration Office, Mexico Square",
              requirements: ["ID card", "Birth certificate", "4 passport photos", "Application form"],
              fee: "ETB 3,000",
              processingTime: "2-4 weeks",
            },
            license: {
              office: "Transport Authority",
              requirements: ["ID card", "Medical certificate", "Driving test completion"],
              fee: "ETB 500-2,000",
              processingTime: "1-2 weeks",
            },
            birth_certificate: {
              office: "Vital Events Registration Office",
              requirements: ["Hospital birth record", "Parent IDs"],
              fee: "ETB 50",
              processingTime: "1-5 days",
            },
          };
          return { documentType, ...info[documentType] };
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
