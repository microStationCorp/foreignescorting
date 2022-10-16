export const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

export const detailedDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function checkValidCombination({
  dest,
  dateNum,
}: {
  dest: string;
  dateNum: number;
}) {
  const data = {
    KLNB: [0, 4],
    DHCA: [2, 5],
  };

  if (
    (dest == "KLNB" && data.KLNB.includes(dateNum)) ||
    (dest == "DHCA" && data.DHCA.includes(dateNum))
  ) {
    return false;
  } else {
    return true;
  }
}
