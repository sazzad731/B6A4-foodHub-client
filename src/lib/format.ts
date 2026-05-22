export const asNumber = (value: number | string | undefined | null) => {
  const numeric = Number(value ?? 0);
  return Number.isFinite(numeric) ? numeric : 0;
};

export const formatCurrency = (value: number | string | undefined | null) =>
  `Tk ${asNumber(value).toLocaleString("en-BD", {
    maximumFractionDigits: 0,
  })}`;

export const formatDate = (value?: string | Date | null) => {
  if (!value) {
    return "Not available";
  }

  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const getInitials = (name?: string | null) => {
  if (!name) {
    return "FH";
  }

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
};
