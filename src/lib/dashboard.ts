import { TOrder } from "@/types";

export type DashboardChartPoint = {
  label: string;
  value: number;
  description?: string;
};

const getDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const buildCurrentMonthDailyOrderData = (
  orders: TOrder[],
  today = new Date(),
): DashboardChartPoint[] => {
  const ordersByDay = new Map<string, number>();

  orders.forEach((order) => {
    const createdAt = new Date(order.createdAt);

    if (
      Number.isNaN(createdAt.getTime()) ||
      createdAt.getFullYear() !== today.getFullYear() ||
      createdAt.getMonth() !== today.getMonth()
    ) {
      return;
    }

    const dateKey = getDateKey(createdAt);
    ordersByDay.set(dateKey, (ordersByDay.get(dateKey) || 0) + 1);
  });

  const monthFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
  });

  return Array.from({ length: today.getDate() }, (_, index) => {
    const date = new Date(today.getFullYear(), today.getMonth(), index + 1);

    return {
      label: String(index + 1),
      value: ordersByDay.get(getDateKey(date)) || 0,
      description: `${monthFormatter.format(date)} ${date.getDate()}`,
    };
  });
};
