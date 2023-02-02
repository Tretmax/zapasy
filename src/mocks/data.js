export const data = [
  {
    id: 1,
    groupName: "zamorozka",
    isActive: true,
    isRedactGroup: false,
    items: [
      { name: "apple", targetValue: "100", etc: 'kg', value: "100", },
      { name: "kivi", targetValue: "100", etc: 'kg',  value: "1", isRedactItem: true },
      { name: "meat", targetValue: "100", etc: 'kg',  value: "12", isRedactItem: false },
    ],
  },
  {
    id: 2,
    groupName: "sfsdfzamorozka",
    isActive: true,
    isRedactGroup: true,
    items: [
      { name: "apple", targetValue: "100", value: "100 kg", isRedactItem: true },
      { name: "kivi", targetValue: "100", value: "1 kg", isRedactItem: true },
      { name: "meat", targetValue: "100", value: "12 kg", isRedactItem: true },
    ],
  },
];

export const todo = [
  { name: "apple", value: "100 kg" },
  { name: "kivi", value: "1 kg" },
  { name: "meat", value: "12 kg" },
];
