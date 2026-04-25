import { convertToModelMessages, stepCountIs, streamText, tool, UIMessage } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

export const maxDuration = 30;

/**
 * AddisLife Chat API Route
 * 
 * Uses Google Gemini model for AI responses.
 * 
 * SETUP: Add your Google API key to .env.local:
 * GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
 * 
 * Get your API key from: https://makersuite.google.com/app/apikey
 */

// Language-aware system prompt
const getSystemPrompt = (language: string) => `You are AddisLife, an AI assistant helping people navigate daily life in Addis Ababa, Ethiopia. You are friendly, helpful, and knowledgeable about local services.

IMPORTANT LANGUAGE RULES:
- The user's preferred language is: ${language === "am" ? "Amharic (አማርኛ)" : language === "om" ? "Oromo (Afaan Oromoo)" : "English"}
- You MUST respond in the user's preferred language.
- If the user writes in a different language than their preference, still respond in their preferred language setting.
- Tool results are in English - you must translate them to the user's language when presenting.

Your capabilities include:
1. **Government Services**: Help users with document renewals (ID, passport, driver's license). Know Kebele offices, Immigration, and Transport Authority locations and procedures.

2. **Healthcare**: Find nearby clinics, hospitals, and pharmacies. Know about major hospitals like Tikur Anbessa, St. Paul's, and private facilities.

3. **Transportation**: Compare ride options (Ride, Feres, ZayRide) and minibus routes. Provide fare estimates.

4. **Water Delivery**: Help order drinking water from providers like Aqua Addis, Highland Water.

5. **Work Cafes**: Recommend cafes with WiFi, generators, and workspace in areas like Bole, Kazanchis, Sarbet.

Guidelines:
- Be concise and actionable
- Provide specific next steps with addresses and phone numbers when available
- If you don't know something, say so honestly
- Format responses clearly with bullet points or numbered lists when helpful

Current date: ${new Date().toLocaleDateString()}`;

// Tool definitions with realistic mock data for Addis Ababa
const localTools = {
  governmentOfficeTool: tool({
    description: "Get information about government offices for document services in Addis Ababa",
    inputSchema: z.object({
      service_type: z.enum(["id", "passport", "license", "birth_certificate", "business_license"]).describe("Type of government service needed"),
      location: z.string().optional().describe("Preferred area in Addis Ababa"),
    }),
    execute: async ({ service_type, location }) => {
      const offices: Record<string, object[]> = {
        id: [
          {
            name: "Bole Sub-City Kebele 03 Office",
            address: "Bole Road, near Edna Mall",
            phone: "+251 11 661 2345",
            status: "Open",
            nextAvailableSlot: "Tomorrow, 9:00 AM",
            requirements: ["Old ID or birth certificate", "2 passport photos", "Witness with valid ID"],
            fee: "ETB 100",
            processingTime: "1-3 working days"
          },
          {
            name: "Kirkos Sub-City Kebele 08 Office",
            address: "Mexico Square Area",
            phone: "+251 11 551 8900",
            status: "Open",
            nextAvailableSlot: "Today, 2:30 PM",
            requirements: ["Old ID or birth certificate", "2 passport photos", "Witness with valid ID"],
            fee: "ETB 100",
            processingTime: "1-3 working days"
          }
        ],
        passport: [
          {
            name: "Main Immigration Office",
            address: "Mexico Square, near Ghion Hotel",
            phone: "+251 11 551 0300",
            status: "Open",
            nextAvailableSlot: "Next week Monday",
            requirements: ["Valid ID card", "Birth certificate", "4 passport photos (5x5cm)", "Completed application form"],
            fee: "ETB 3,000 (regular) / ETB 6,000 (express)",
            processingTime: "2-4 weeks (regular) / 3-5 days (express)"
          }
        ],
        license: [
          {
            name: "Transport Authority - Megenagna Branch",
            address: "Megenagna, Yeka Sub-City",
            phone: "+251 11 646 2000",
            status: "Open",
            nextAvailableSlot: "Tomorrow, 8:30 AM",
            requirements: ["Valid ID card", "Medical fitness certificate", "Driving school certificate", "Eye test result"],
            fee: "ETB 500 (new) / ETB 200 (renewal)",
            processingTime: "1-2 weeks"
          }
        ],
        birth_certificate: [
          {
            name: "Vital Events Registration - Bole",
            address: "Bole Sub-City Office Complex",
            phone: "+251 11 662 1100",
            status: "Open",
            nextAvailableSlot: "Today, 3:00 PM",
            requirements: ["Hospital birth record", "Parents' ID cards", "Marriage certificate (if applicable)"],
            fee: "ETB 50",
            processingTime: "1-5 working days"
          }
        ],
        business_license: [
          {
            name: "Trade Bureau - Addis Ababa",
            address: "Kazanchis, near Hilton Hotel",
            phone: "+251 11 551 5500",
            status: "Open",
            nextAvailableSlot: "Next Tuesday",
            requirements: ["Valid ID", "TIN certificate", "Lease agreement", "Association letter"],
            fee: "ETB 500 - 5,000 (varies by business type)",
            processingTime: "1-2 weeks"
          }
        ]
      };
      return { 
        service_type, 
        preferredLocation: location || "Any",
        offices: offices[service_type] || offices.id 
      };
    },
  }),

  clinicFinderTool: tool({
    description: "Find clinics and hospitals near a location in Addis Ababa",
    inputSchema: z.object({
      location: z.string().describe("Area or neighborhood in Addis Ababa"),
      specialty: z.string().optional().describe("Medical specialty needed (e.g., dental, pediatric, emergency)"),
      open_now: z.boolean().optional().describe("Filter to only show currently open facilities"),
    }),
    execute: async ({ location, specialty, open_now }) => {
      const allClinics = [
        {
          name: "Bethzatha General Hospital",
          area: "Bole",
          address: "Bole Road, near Friendship Hotel",
          distance: "1.2 km",
          phone: "+251 11 661 8888",
          rating: 4.5,
          specialties: ["General", "Pediatric", "Dental", "Emergency"],
          hours: "24/7",
          isOpen: true
        },
        {
          name: "Hayat Medical Center",
          area: "Bole",
          address: "Atlas Area, Bole Sub-City",
          distance: "2.0 km",
          phone: "+251 11 662 0000",
          rating: 4.3,
          specialties: ["General", "Cardiology", "Orthopedic"],
          hours: "7:00 AM - 10:00 PM",
          isOpen: true
        },
        {
          name: "St. Gabriel Hospital",
          area: "Megenagna",
          address: "Megenagna, near 22 Mazoria",
          distance: "3.5 km",
          phone: "+251 11 646 1846",
          rating: 4.6,
          specialties: ["General", "Surgery", "Maternity", "Emergency"],
          hours: "24/7",
          isOpen: true
        },
        {
          name: "Kadisco General Hospital",
          area: "Kazanchis",
          address: "Kazanchis, near Ghion Hotel",
          distance: "4.0 km",
          phone: "+251 11 551 7788",
          rating: 4.4,
          specialties: ["General", "Dental", "Eye Care", "Laboratory"],
          hours: "8:00 AM - 8:00 PM",
          isOpen: true
        },
        {
          name: "Myungsung Christian Medical Center",
          area: "Kolfe",
          address: "Kolfe Keranio Sub-City",
          distance: "6.0 km",
          phone: "+251 11 273 5100",
          rating: 4.7,
          specialties: ["General", "Surgery", "Pediatric", "Emergency", "Cancer Treatment"],
          hours: "24/7",
          isOpen: true
        }
      ];

      let filtered = allClinics;
      
      if (location) {
        filtered = filtered.sort((a, b) => {
          const aMatch = a.area.toLowerCase().includes(location.toLowerCase());
          const bMatch = b.area.toLowerCase().includes(location.toLowerCase());
          return bMatch ? 1 : aMatch ? -1 : 0;
        });
      }

      if (specialty) {
        filtered = filtered.filter(c => 
          c.specialties.some(s => s.toLowerCase().includes(specialty.toLowerCase()))
        );
      }

      if (open_now) {
        filtered = filtered.filter(c => c.isOpen);
      }

      return { 
        searchLocation: location, 
        specialty: specialty || "General",
        clinics: filtered.slice(0, 4) 
      };
    },
  }),

  transportComparisonTool: tool({
    description: "Compare transport options (rideshare apps vs minibus) between two locations in Addis Ababa",
    inputSchema: z.object({
      origin: z.string().describe("Starting location/area"),
      destination: z.string().describe("Destination location/area"),
      preference: z.enum(["cheapest", "fastest", "comfort"]).optional().describe("User's preference for transport"),
    }),
    execute: async ({ origin, destination, preference }) => {
      // Simulate realistic pricing based on common routes
      const basePrice = 150 + Math.floor(Math.random() * 100);
      
      const options = [
        {
          provider: "Ride",
          type: "Rideshare App",
          price: `ETB ${basePrice}`,
          eta: "4-6 min",
          duration: "15-20 min",
          surgeActive: false,
          rating: 4.6,
          paymentMethods: ["Cash", "Telebirr", "CBE Birr"]
        },
        {
          provider: "Feres",
          type: "Rideshare App",
          price: `ETB ${basePrice - 20}`,
          eta: "6-8 min",
          duration: "15-20 min",
          surgeActive: false,
          rating: 4.4,
          paymentMethods: ["Cash", "Telebirr"]
        },
        {
          provider: "ZayRide",
          type: "Rideshare App",
          price: `ETB ${basePrice - 10}`,
          eta: "5-7 min",
          duration: "15-20 min",
          surgeActive: false,
          rating: 4.5,
          paymentMethods: ["Cash", "Telebirr", "CBE Birr"]
        },
        {
          provider: "Blue Taxi",
          type: "Street Taxi",
          price: `ETB ${basePrice + 50} - ${basePrice + 100}`,
          eta: "2-5 min",
          duration: "15-20 min",
          surgeActive: false,
          rating: 3.8,
          paymentMethods: ["Cash only"],
          note: "Negotiate fare before entering"
        },
        {
          provider: "Minibus",
          type: "Public Transport",
          price: "ETB 10-15",
          eta: "5-15 min (waiting)",
          duration: "25-40 min",
          surgeActive: false,
          rating: 3.5,
          paymentMethods: ["Cash only"],
          route: `${origin} → ${destination} via main road`
        }
      ];

      let sorted = [...options];
      if (preference === "cheapest") {
        sorted.sort((a, b) => parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, '')));
      } else if (preference === "fastest") {
        sorted.sort((a, b) => parseInt(a.eta) - parseInt(b.eta));
      }

      return { 
        origin, 
        destination, 
        preference: preference || "balanced",
        recommendation: preference === "cheapest" ? "Minibus" : "Feres or ZayRide",
        options: sorted 
      };
    },
  }),

  waterDeliveryTool: tool({
    description: "Order drinking water delivery to an address in Addis Ababa",
    inputSchema: z.object({
      address: z.string().describe("Delivery address"),
      litres: z.number().describe("Amount of water needed in liters"),
    }),
    execute: async ({ address, litres }) => {
      const providers = [
        {
          name: "Aqua Addis",
          pricePerLiter: 8,
          minimumOrder: 500,
          available: true,
          deliveryTime: "2-4 hours",
          phone: "+251 91 123 4567",
          rating: 4.5
        },
        {
          name: "Highland Spring Water",
          pricePerLiter: 7,
          minimumOrder: 1000,
          available: true,
          deliveryTime: "3-5 hours",
          phone: "+251 91 234 5678",
          rating: 4.3
        },
        {
          name: "Abyssinia Water",
          pricePerLiter: 6.5,
          minimumOrder: 2000,
          available: litres >= 2000,
          deliveryTime: "4-6 hours",
          phone: "+251 91 345 6789",
          rating: 4.4
        }
      ];

      const availableProviders = providers.filter(p => p.available && litres >= p.minimumOrder);
      const bestOption = availableProviders[0];
      const estimatedCost = bestOption ? litres * bestOption.pricePerLiter : litres * 8;

      return {
        address,
        litres,
        estimatedCost: `ETB ${estimatedCost.toLocaleString()}`,
        providers: availableProviders,
        recommendation: bestOption?.name || "Aqua Addis",
        note: "Call the provider directly to confirm availability and place order"
      };
    },
  }),

  workCafeTool: tool({
    description: "Find work-friendly cafes with WiFi and workspace in Addis Ababa",
    inputSchema: z.object({
      area: z.string().describe("Preferred area in Addis Ababa"),
      requires_generator: z.boolean().optional().describe("Must have backup generator for power cuts"),
      min_wifi_mbps: z.number().optional().describe("Minimum WiFi speed required"),
    }),
    execute: async ({ area, requires_generator, min_wifi_mbps }) => {
      const cafes = [
        {
          name: "Kaldi's Coffee - Bole",
          area: "Bole",
          address: "Bole Road, near Edna Mall",
          hasGenerator: true,
          wifiSpeed: 25,
          rating: 4.4,
          hours: "7:00 AM - 10:00 PM",
          priceRange: "$$",
          amenities: ["WiFi", "Power outlets", "Quiet area", "Meeting rooms"],
          phone: "+251 11 661 5500"
        },
        {
          name: "Tomoca Coffee - Piazza",
          area: "Piazza",
          address: "Piazza, Churchill Avenue",
          hasGenerator: false,
          wifiSpeed: 15,
          rating: 4.7,
          hours: "6:00 AM - 9:00 PM",
          priceRange: "$",
          amenities: ["WiFi", "Historic atmosphere"],
          phone: "+251 11 111 2233"
        },
        {
          name: "Garden of Coffee - Kazanchis",
          area: "Kazanchis",
          address: "Kazanchis, near Hilton",
          hasGenerator: true,
          wifiSpeed: 30,
          rating: 4.5,
          hours: "8:00 AM - 11:00 PM",
          priceRange: "$$",
          amenities: ["WiFi", "Power outlets", "Outdoor seating", "Food menu"],
          phone: "+251 11 551 6677"
        },
        {
          name: "Lime Tree Cafe",
          area: "Bole",
          address: "Bole Medhanialem Area",
          hasGenerator: true,
          wifiSpeed: 40,
          rating: 4.6,
          hours: "7:00 AM - 10:00 PM",
          priceRange: "$$$",
          amenities: ["Fast WiFi", "Power outlets", "Quiet", "Good for meetings"],
          phone: "+251 11 662 8899"
        },
        {
          name: "Boston Day Spa & Cafe",
          area: "Bole",
          address: "Bole Atlas Area",
          hasGenerator: true,
          wifiSpeed: 35,
          rating: 4.3,
          hours: "8:00 AM - 9:00 PM",
          priceRange: "$$",
          amenities: ["WiFi", "Power outlets", "Quiet workspace"],
          phone: "+251 11 661 9900"
        }
      ];

      let filtered = cafes.filter(c => 
        c.area.toLowerCase().includes(area.toLowerCase()) ||
        area.toLowerCase().includes(c.area.toLowerCase())
      );

      // If no exact match, return all sorted by relevance
      if (filtered.length === 0) {
        filtered = cafes;
      }

      if (requires_generator) {
        filtered = filtered.filter(c => c.hasGenerator);
      }

      if (min_wifi_mbps) {
        filtered = filtered.filter(c => c.wifiSpeed >= min_wifi_mbps);
      }

      return {
        searchArea: area,
        requirements: {
          generator: requires_generator || false,
          minWifi: min_wifi_mbps || "Any"
        },
        cafes: filtered.slice(0, 4),
        recommendation: filtered[0]?.name || "Kaldi's Coffee"
      };
    },
  }),
};

export async function POST(request: Request) {
  const { messages, language = "en" } = (await request.json()) as {
    messages: UIMessage[];
    language?: string;
  };

  const result = streamText({
    model: google("gemini-2.0-flash"),
    system: getSystemPrompt(language),
    messages: await convertToModelMessages(messages),
    tools: localTools,
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
}
