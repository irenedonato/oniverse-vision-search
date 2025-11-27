import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { image, refinement } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing visual search request");

    // Call Lovable AI Gateway with vision capabilities
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a visual search assistant for Oniverse e-commerce platform. When given an image, identify the key visual elements (type of product, colors, patterns, style, materials) and match it to the available products.

Available products: a.jpg, b.jpg, c.jpg, d.jpg, e.jpg, f.jpg, g.jpg, h.jpg

Return ONLY valid JSON with this exact structure:
{
  "results": [
    {
      "name": "Product name",
      "category": "Category",
      "similarity": 0.95,
      "price": "$XX.XX",
      "image": "/products/a.jpg"
    }
  ]
}

Select the 5 most similar products from the available list. Use image paths like "/products/a.jpg", "/products/b.jpg", etc. Make similarity scores between 0.85-0.98. Be creative with product names and categories based on what you see in the image.

${refinement ? `IMPORTANT: The user has specified these preferences: "${refinement}". Prioritize products that match these specific requirements (fabric, color, style, material, etc.) while maintaining visual similarity.` : ''}`,
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Find 5 similar items to this image. Return only JSON.",
              },
              {
                type: "image_url",
                image_url: {
                  url: image,
                },
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI response received");

    const aiContent = data.choices?.[0]?.message?.content;
    if (!aiContent) {
      throw new Error("No content in AI response");
    }

    // Parse the JSON response from AI
    const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in AI response");
    }

    const searchResults = JSON.parse(jsonMatch[0]);

    return new Response(JSON.stringify(searchResults), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in visual-search function:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
