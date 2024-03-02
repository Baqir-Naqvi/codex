import dotenv from "dotenv";
dotenv.config();

export async function POST(req, res) {
  const formData = await req.formData();
    const file= formData.get("file");
    if (!formData) {
    return new Response("No file found", { status: 400 });
  }

  const accountID = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.NEXT_PUBLIC_CLOUDFLARE_API_KEY;
  if (!accountID || !apiToken) {
    console.error("Cloudflare credentials not found");
    return;
  }

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountID}/images/v1`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "X-Auth-Email": "B.naqvi99@gmail.com",
        "X-Auth-Key": "071d73fb49ade53c0c79de3a40f4240215e0f"
        
        ,
      },
        body: formData,
    }
  );

  const data = await response.json();
  console.log(data);
  if (data.success) {
    const imageURL = data.result.variants[0]

    return new Response(JSON.stringify({ imageURL }), {
        headers: { "Content-Type": "application/json" },
        });
  } else {
    return new Response("Error", { status: 500 });
  }
}
