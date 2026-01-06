import BusStop from "../models/Busstop";

const destinations = [
  { name: "Town", isHub: true },
  { name: "Kicukiro", isHub: false },
  { name: "Nyabugogo", isHub: true },
  { name: "Nyamirambo", isHub: false },
  { name: "Gikondo", isHub: false },
  { name: "Sonatube", isHub: false },
  { name: "Remera", isHub: true },
  { name: "Kimihurura", isHub: false },
  { name: "Nyamiranbo", isHub: false },
  { name: "Gisozi", isHub: false },
  { name: "Kacyiru", isHub: false },
  { name: "Muhima", isHub: false },
  { name: "Bibare", isHub: false },
  { name: "Kabeza", isHub: false },
  { name: "Gatenga", isHub: false },
  { name: "Kanombe", isHub: false },
  { name: "Masaka", isHub: false },
  { name: "Kibagabaga", isHub: false },
  { name: "Kimironko", isHub: true },
  { name: "Norvege", isHub: false },
  { name: "Kicukiro Center", isHub: false },
  { name: "Kicukiro Nyanza", isHub: true },
];

export async function seedBusStops() {
    for (const busStop of destinations)
    await BusStop.findOrCreate({
    where: { name: busStop.name },
    defaults: busStop
  });
  console.log("Bus stops seeded");
}
