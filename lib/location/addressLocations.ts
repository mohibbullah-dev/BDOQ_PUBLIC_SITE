export interface IAddressCity {
  name: string;
  postalCodes: string[];
}

export interface IAddressDistrict {
  name: string;
  cities: IAddressCity[];
}

export interface IAddressState {
  name: string;
  districts: IAddressDistrict[];
}

export interface ICountryAddressProfile {
  labels: {
    state: string;
    district: string;
    city: string;
    postalCode: string;
  };
  states: IAddressState[];
}

function city(name: string, postalCodes: string[]): IAddressCity {
  return { name, postalCodes };
}

function district(name: string, postalCode: string, cities?: string[]): IAddressDistrict {
  const cityNames = cities?.length ? cities : [name];
  return {
    name,
    cities: cityNames.map((c) => city(c, [postalCode])),
  };
}

function state(name: string, districts: IAddressDistrict[]): IAddressState {
  return { name, districts };
}

/** Bangladesh — 8 divisions, 64 districts, district post codes. */
const BANGLADESH_PROFILE: ICountryAddressProfile = {
  labels: {
    state: "Division",
    district: "District",
    city: "City / Upazila",
    postalCode: "Postal code",
  },
  states: [
    state("Dhaka", [
      district("Dhaka", "1000", ["Dhaka", "Dhanmondi", "Gulshan", "Mirpur", "Uttara"]),
      district("Faridpur", "7800"),
      district("Gazipur", "1700", ["Gazipur", "Tongi", "Kaliakair"]),
      district("Gopalganj", "8100"),
      district("Kishoreganj", "2300"),
      district("Madaripur", "7900"),
      district("Manikganj", "1800"),
      district("Munshiganj", "1500"),
      district("Narayanganj", "1400"),
      district("Narsingdi", "1600"),
      district("Rajbari", "7700"),
      district("Shariatpur", "8000"),
      district("Tangail", "1900"),
    ]),
    state("Chattogram", [
      district("Bandarban", "4600"),
      district("Brahmanbaria", "3400"),
      district("Chandpur", "3600"),
      district("Chattogram", "4000", ["Chattogram", "Patiya", "Sitakunda"]),
      district("Cumilla", "3500"),
      district("Cox's Bazar", "4700"),
      district("Feni", "3900"),
      district("Khagrachhari", "4400"),
      district("Lakshmipur", "3700"),
      district("Noakhali", "3800"),
      district("Rangamati", "4500"),
    ]),
    state("Rajshahi", [
      district("Bogura", "5800"),
      district("Joypurhat", "5900"),
      district("Naogaon", "6500"),
      district("Natore", "6600"),
      district("Chapai Nawabganj", "6300"),
      district("Pabna", "6600"),
      district("Rajshahi", "6000"),
      district("Sirajganj", "6700"),
    ]),
    state("Khulna", [
      district("Bagerhat", "9300"),
      district("Chuadanga", "7200"),
      district("Jashore", "7400"),
      district("Jhenaidah", "7300"),
      district("Khulna", "9100"),
      district("Kushtia", "7000"),
      district("Magura", "7600"),
      district("Meherpur", "7100"),
      district("Narail", "7500"),
      district("Satkhira", "9400"),
    ]),
    state("Barishal", [
      district("Barguna", "8700"),
      district("Barishal", "8200"),
      district("Bhola", "8300"),
      district("Jhalokati", "8400"),
      district("Patuakhali", "8600"),
      district("Pirojpur", "8500"),
    ]),
    state("Sylhet", [
      district("Habiganj", "3300"),
      district("Moulvibazar", "3200"),
      district("Sunamganj", "3000"),
      district("Sylhet", "3100"),
    ]),
    state("Rangpur", [
      district("Dinajpur", "5200"),
      district("Gaibandha", "5700"),
      district("Kurigram", "5600"),
      district("Lalmonirhat", "5500"),
      district("Nilphamari", "5300"),
      district("Panchagarh", "5000"),
      district("Rangpur", "5400"),
      district("Thakurgaon", "5100"),
    ]),
    state("Mymensingh", [
      district("Jamalpur", "2000"),
      district("Mymensingh", "2200"),
      district("Netrokona", "2400"),
      district("Sherpur", "2100"),
    ]),
  ],
};

function intlState(
  name: string,
  places: Array<{ city: string; postal: string }>
): IAddressState {
  return {
    name,
    districts: [
      {
        name: name,
        cities: places.map((p) => city(p.city, [p.postal])),
      },
    ],
  };
}

function intlProfile(
  labels: ICountryAddressProfile["labels"],
  states: IAddressState[]
): ICountryAddressProfile {
  return { labels, states };
}

const UNITED_STATES_PROFILE = intlProfile(
  {
    state: "State",
    district: "County / Region",
    city: "City",
    postalCode: "ZIP code",
  },
  [
    intlState("Alabama", [{ city: "Birmingham", postal: "35203" }, { city: "Montgomery", postal: "36104" }]),
    intlState("Alaska", [{ city: "Anchorage", postal: "99501" }, { city: "Fairbanks", postal: "99701" }]),
    intlState("Arizona", [{ city: "Phoenix", postal: "85001" }, { city: "Tucson", postal: "85701" }]),
    intlState("California", [{ city: "Los Angeles", postal: "90001" }, { city: "San Francisco", postal: "94102" }]),
    intlState("Florida", [{ city: "Miami", postal: "33101" }, { city: "Orlando", postal: "32801" }]),
    intlState("Georgia", [{ city: "Atlanta", postal: "30301" }, { city: "Savannah", postal: "31401" }]),
    intlState("Illinois", [{ city: "Chicago", postal: "60601" }, { city: "Springfield", postal: "62701" }]),
    intlState("New York", [{ city: "New York", postal: "10001" }, { city: "Buffalo", postal: "14201" }]),
    intlState("Texas", [{ city: "Houston", postal: "77001" }, { city: "Dallas", postal: "75201" }]),
    intlState("Virginia", [{ city: "Virginia Beach", postal: "23450" }, { city: "Richmond", postal: "23219" }]),
  ]
);

const UNITED_KINGDOM_PROFILE = intlProfile(
  {
    state: "Nation / Region",
    district: "County",
    city: "City",
    postalCode: "Postcode",
  },
  [
    intlState("England", [{ city: "London", postal: "SW1A 1AA" }, { city: "Manchester", postal: "M1 1AE" }]),
    intlState("Scotland", [{ city: "Edinburgh", postal: "EH1 1YZ" }, { city: "Glasgow", postal: "G1 1XW" }]),
    intlState("Wales", [{ city: "Cardiff", postal: "CF10 1EP" }, { city: "Swansea", postal: "SA1 1RT" }]),
    intlState("Northern Ireland", [{ city: "Belfast", postal: "BT1 1AA" }, { city: "Derry", postal: "BT48 6BU" }]),
  ]
);

const CANADA_PROFILE = intlProfile(
  {
    state: "Province",
    district: "Region",
    city: "City",
    postalCode: "Postal code",
  },
  [
    intlState("Ontario", [{ city: "Toronto", postal: "M5H 2N2" }, { city: "Ottawa", postal: "K1P 1J1" }]),
    intlState("Quebec", [{ city: "Montreal", postal: "H2Y 1C6" }, { city: "Quebec City", postal: "G1R 4P5" }]),
    intlState("British Columbia", [{ city: "Vancouver", postal: "V6B 1A1" }, { city: "Victoria", postal: "V8W 1P6" }]),
    intlState("Alberta", [{ city: "Calgary", postal: "T2P 1J9" }, { city: "Edmonton", postal: "T5J 0N3" }]),
  ]
);

const INDIA_PROFILE = intlProfile(
  {
    state: "State",
    district: "District",
    city: "City",
    postalCode: "PIN code",
  },
  [
    intlState("West Bengal", [{ city: "Kolkata", postal: "700001" }, { city: "Siliguri", postal: "734001" }]),
    intlState("Delhi", [{ city: "New Delhi", postal: "110001" }, { city: "Delhi", postal: "110006" }]),
    intlState("Maharashtra", [{ city: "Mumbai", postal: "400001" }, { city: "Pune", postal: "411001" }]),
    intlState("Karnataka", [{ city: "Bengaluru", postal: "560001" }, { city: "Mysuru", postal: "570001" }]),
  ]
);

const PAKISTAN_PROFILE = intlProfile(
  {
    state: "Province",
    district: "District",
    city: "City",
    postalCode: "Postal code",
  },
  [
    intlState("Punjab", [{ city: "Lahore", postal: "54000" }, { city: "Rawalpindi", postal: "46000" }]),
    intlState("Sindh", [{ city: "Karachi", postal: "74000" }, { city: "Hyderabad", postal: "71000" }]),
    intlState("Khyber Pakhtunkhwa", [{ city: "Peshawar", postal: "25000" }, { city: "Abbottabad", postal: "22010" }]),
    intlState("Balochistan", [{ city: "Quetta", postal: "87300" }, { city: "Gwadar", postal: "91200" }]),
  ]
);

const SAUDI_ARABIA_PROFILE = intlProfile(
  {
    state: "Region",
    district: "Province",
    city: "City",
    postalCode: "Postal code",
  },
  [
    intlState("Riyadh", [{ city: "Riyadh", postal: "11564" }, { city: "Diriyah", postal: "13711" }]),
    intlState("Makkah", [{ city: "Makkah", postal: "24231" }, { city: "Jeddah", postal: "21432" }]),
    intlState("Eastern Province", [{ city: "Dammam", postal: "32241" }, { city: "Khobar", postal: "31952" }]),
  ]
);

const UAE_PROFILE = intlProfile(
  {
    state: "Emirate",
    district: "Area",
    city: "City",
    postalCode: "Postal code",
  },
  [
    intlState("Dubai", [{ city: "Dubai", postal: "00000" }, { city: "Deira", postal: "00000" }]),
    intlState("Abu Dhabi", [{ city: "Abu Dhabi", postal: "00000" }, { city: "Al Ain", postal: "00000" }]),
    intlState("Sharjah", [{ city: "Sharjah", postal: "00000" }]),
  ]
);

const MALAYSIA_PROFILE = intlProfile(
  {
    state: "State",
    district: "District",
    city: "City",
    postalCode: "Postcode",
  },
  [
    intlState("Selangor", [{ city: "Shah Alam", postal: "40000" }, { city: "Petaling Jaya", postal: "46000" }]),
    intlState("Kuala Lumpur", [{ city: "Kuala Lumpur", postal: "50000" }]),
    intlState("Johor", [{ city: "Johor Bahru", postal: "80000" }]),
  ]
);

const AUSTRALIA_PROFILE = intlProfile(
  {
    state: "State",
    district: "Region",
    city: "City",
    postalCode: "Postcode",
  },
  [
    intlState("New South Wales", [{ city: "Sydney", postal: "2000" }, { city: "Newcastle", postal: "2300" }]),
    intlState("Victoria", [{ city: "Melbourne", postal: "3000" }, { city: "Geelong", postal: "3220" }]),
    intlState("Queensland", [{ city: "Brisbane", postal: "4000" }, { city: "Gold Coast", postal: "4217" }]),
  ]
);

const QATAR_PROFILE = intlProfile(
  {
    state: "Municipality",
    district: "Area",
    city: "City",
    postalCode: "Postal code",
  },
  [
    intlState("Doha", [{ city: "Doha", postal: "00000" }, { city: "Al Wakrah", postal: "00000" }]),
    intlState("Al Rayyan", [{ city: "Al Rayyan", postal: "00000" }]),
  ]
);

const JAPAN_PROFILE = intlProfile(
  {
    state: "Prefecture",
    district: "Region",
    city: "City",
    postalCode: "Postal code",
  },
  [
    intlState("Tokyo", [{ city: "Tokyo", postal: "100-0001" }, { city: "Shinjuku", postal: "160-0022" }]),
    intlState("Osaka", [{ city: "Osaka", postal: "530-0001" }]),
  ]
);

const GERMANY_PROFILE = intlProfile(
  {
    state: "State",
    district: "District",
    city: "City",
    postalCode: "PLZ",
  },
  [
    intlState("Berlin", [{ city: "Berlin", postal: "10115" }]),
    intlState("Bavaria", [{ city: "Munich", postal: "80331" }, { city: "Nuremberg", postal: "90402" }]),
  ]
);

const INDONESIA_PROFILE = intlProfile(
  {
    state: "Province",
    district: "Regency",
    city: "City",
    postalCode: "Postal code",
  },
  [
    intlState("Jakarta", [{ city: "Central Jakarta", postal: "10110" }]),
    intlState("West Java", [{ city: "Bandung", postal: "40111" }]),
  ]
);

const TURKEY_PROFILE = intlProfile(
  {
    state: "Province",
    district: "District",
    city: "City",
    postalCode: "Postal code",
  },
  [
    intlState("Istanbul", [{ city: "Istanbul", postal: "34000" }]),
    intlState("Ankara", [{ city: "Ankara", postal: "06000" }]),
  ]
);

const EGYPT_PROFILE = intlProfile(
  {
    state: "Governorate",
    district: "District",
    city: "City",
    postalCode: "Postal code",
  },
  [
    intlState("Cairo", [{ city: "Cairo", postal: "11511" }]),
    intlState("Alexandria", [{ city: "Alexandria", postal: "21500" }]),
  ]
);

const SINGAPORE_PROFILE = intlProfile(
  {
    state: "Region",
    district: "Planning area",
    city: "City",
    postalCode: "Postal code",
  },
  [
    intlState("Central", [{ city: "Singapore", postal: "018956" }]),
    intlState("East", [{ city: "Bedok", postal: "460001" }]),
  ]
);

const NEW_ZEALAND_PROFILE = intlProfile(
  {
    state: "Region",
    district: "District",
    city: "City",
    postalCode: "Postcode",
  },
  [
    intlState("Auckland", [{ city: "Auckland", postal: "1010" }]),
    intlState("Wellington", [{ city: "Wellington", postal: "6011" }]),
  ]
);

const MEXICO_PROFILE = intlProfile(
  {
    state: "State",
    district: "Municipality",
    city: "City",
    postalCode: "Postal code",
  },
  [
    intlState("Mexico City", [{ city: "Mexico City", postal: "06000" }]),
    intlState("Jalisco", [{ city: "Guadalajara", postal: "44100" }]),
  ]
);

const FRANCE_PROFILE = intlProfile(
  {
    state: "Region",
    district: "Department",
    city: "City",
    postalCode: "Postal code",
  },
  [
    intlState("Île-de-France", [{ city: "Paris", postal: "75001" }, { city: "Versailles", postal: "78000" }]),
    intlState("Provence", [{ city: "Marseille", postal: "13001" }]),
  ]
);

const LOCATION_BY_COUNTRY: Record<string, ICountryAddressProfile> = {
  Bangladesh: BANGLADESH_PROFILE,
  "United States": UNITED_STATES_PROFILE,
  "United Kingdom": UNITED_KINGDOM_PROFILE,
  Canada: CANADA_PROFILE,
  India: INDIA_PROFILE,
  Pakistan: PAKISTAN_PROFILE,
  "Saudi Arabia": SAUDI_ARABIA_PROFILE,
  UAE: UAE_PROFILE,
  Malaysia: MALAYSIA_PROFILE,
  Australia: AUSTRALIA_PROFILE,
  Qatar: QATAR_PROFILE,
  Japan: JAPAN_PROFILE,
  Germany: GERMANY_PROFILE,
  Indonesia: INDONESIA_PROFILE,
  Turkey: TURKEY_PROFILE,
  Egypt: EGYPT_PROFILE,
  Singapore: SINGAPORE_PROFILE,
  "New Zealand": NEW_ZEALAND_PROFILE,
  Mexico: MEXICO_PROFILE,
  France: FRANCE_PROFILE,
};

export function getCountryAddressProfile(
  country: string
): ICountryAddressProfile | null {
  return LOCATION_BY_COUNTRY[country] ?? null;
}

export function hasStructuredAddress(country: string): boolean {
  return Boolean(getCountryAddressProfile(country));
}

export function getStatesForCountry(country: string): IAddressState[] {
  return getCountryAddressProfile(country)?.states ?? [];
}

export function getDistrictsForState(
  country: string,
  stateName: string
): IAddressDistrict[] {
  const stateMatch = getStatesForCountry(country).find((s) => s.name === stateName);
  return stateMatch?.districts ?? [];
}

export function getCitiesForDistrict(
  country: string,
  stateName: string,
  districtName: string
): IAddressCity[] {
  return (
    getDistrictsForState(country, stateName).find((d) => d.name === districtName)
      ?.cities ?? []
  );
}

export function getPostalCodesForCity(
  country: string,
  stateName: string,
  districtName: string,
  cityName: string
): string[] {
  return (
    getCitiesForDistrict(country, stateName, districtName).find(
      (c) => c.name === cityName
    )?.postalCodes ?? []
  );
}

export function getAddressFieldLabels(country: string): ICountryAddressProfile["labels"] {
  return (
    getCountryAddressProfile(country)?.labels ?? {
      state: "State / Province",
      district: "District / Region",
      city: "City / Town",
      postalCode: "Post code",
    }
  );
}
