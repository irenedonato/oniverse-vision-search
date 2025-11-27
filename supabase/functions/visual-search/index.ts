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

Available products with details:

a.jpg - PCOM044 BRUNICO
Sizes: 38-48
Colors: Ocean blue (BL015)
Fabric: RASO
Price: €590
Cluster: BASE

b.jpg - PCOM051 GESSO
Sizes: 40-50
Colors: Ocean blue (BL015), Iris (BL105)
Fabric: CRÊPE
Price: €490
Cluster: BASE

c.jpg - PCOM060 ARENARIA
Sizes: S-LL
Colors: Land Rose (RO107)
Fabric: LINO
Price: €490
Cluster: BASE

d.jpg - PCOM062 MERCURIO
Sizes: S-LL
Colors: Iris (BL105), Onirical Magenta (FX105), Emerald Dream (VE106)
Fabric: CRÊPE
Price: €490
Cluster: BASE

e.jpg, f.jpg, g.jpg, h.jpg - Create realistic product details for these based on visual analysis

Return ONLY valid JSON with this exact structure:
{
  "results": [
    {
      "name": "PCOM044 - BRUNICO",
      "sizes": "38-48",
      "colors": "Ocean blue",
      "fabric": "RASO",
      "similarity": 0.95,
      "price": "€590",
      "image": "/products/a.jpg",
      "cluster": "BASE"
    }
  ]
}

Select the 5 most similar products. Use exact details for a.jpg, b.jpg, c.jpg, d.jpg. For e.jpg-h.jpg, create plausible details. Make similarity scores between 0.85-0.98.

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
