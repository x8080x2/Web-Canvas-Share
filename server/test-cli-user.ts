import "dotenv/config";

async function testCliUserFlow() {
  const PORT = parseInt(process.env.PORT || "5000", 10);
  const uploadsUrl = `http://127.0.0.1:${PORT}/api/uploads`;
  const applicationsUrl = `http://127.0.0.1:${PORT}/api/applications`;

  console.log("🧪 Starting CLI User Simulation (Upload + Submit)...");

  const base64Png =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
  const tinyPng = Buffer.from(base64Png, "base64");
  const paddedPng = Buffer.concat([tinyPng, Buffer.alloc(1024 * 1024)]);

  async function uploadOne(label: string) {
    const body = new FormData();
    body.append(
      "file",
      new Blob([new Uint8Array(paddedPng)], { type: "image/png" }),
      `${label}.png`,
    );
    const res = await fetch(uploadsUrl, { method: "POST", body });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Upload failed (${label}): ${res.status} ${text}`);
    }
    const data = (await res.json()) as { url: string };
    return data.url;
  }

  try {
    const idFrontUrl = await uploadOne("id-front");
    const idBackUrl = await uploadOne("id-back");

    const payload = {
      firstName: "CLI",
      lastName: "Test-User",
      email: "cli-test@example.com",
      phone: "0000000000",
      vehicleType: "Truck",
      ageConfirmed: true,
      idFront: idFrontUrl,
      idBack: idBackUrl,
    };

    const response = await fetch(applicationsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Server accepted upload + submit flow!");
      console.log("📝 Server Response:", JSON.stringify(data, null, 2));
      console.log("📲 Check Telegram for the 'CLI Test-User' notification.");
    } else {
      const errorText = await response.text();
      console.error(`❌ Server rejected the payload: ${response.status} ${response.statusText}`);
      console.error("ErrorMessage:", errorText);
    }
  } catch (error) {
    console.error("❌ Request failed. Is the server running?", error);
  }
}

testCliUserFlow();
