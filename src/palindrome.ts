const isPalindrome = (str: string): boolean => {
  const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const reversedStr = cleanedStr.split("").reverse().join("");
  return cleanedStr === reversedStr;
};

const testStrings = [
  "katak",
  "madam",
  "kasur rusak",
  "racecar",
  "sumur",
  "hello",
  "A man, a plan, a canal, Panama",
];
testStrings.forEach((str) => {
  console.log(`"${str}" is ${isPalindrome(str) ? "" : "not "}a palindrome`);
});
