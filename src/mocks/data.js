export const data = [
  {
    group: "zamorozka",
    isActive: true,
    isRedactGroup: false,
    items: [
      { name: "apple", targetValue: "100", etc: 'kg', value: "100", },
      { name: "kivi", targetValue: "100", etc: 'kg',  value: "1", isRedact: true },
      { name: "meat", targetValue: "100", etc: 'kg',  value: "12", isRedact: false },
    ],
  },
  {
    group: "sfsdfzamorozka",
    isActive: true,
    isRedactGroup: true,
    items: [
      { name: "apple", targetValue: "100", value: "100 kg", isRedact: true },
      { name: "kivi", targetValue: "100", value: "1 kg", isRedact: true },
      { name: "meat", targetValue: "100", value: "12 kg", isRedact: true },
    ],
  },
];

export const todo = [
  { name: "apple", value: "100 kg" },
  { name: "kivi", value: "1 kg" },
  { name: "meat", value: "12 kg" },
];
