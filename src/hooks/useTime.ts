import { useEffect, useState } from 'react';

// NOTE: Intl.DateTimeFormat... 言語に応じた日時のフォーマット
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
const formatter = Intl.DateTimeFormat("ja-JP", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  fractionalSecondDigits: 1,
});

export function useTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatter.format(new Date()));
    }, 100);
    return () => clearInterval(interval);
  });
  return time;
}