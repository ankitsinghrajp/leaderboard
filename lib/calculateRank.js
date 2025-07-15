// lib/calculateRank.js

export default function calculateRanks(users) {
  const sorted = [...users].sort((a, b) => b.totalPoints - a.totalPoints);

  let rank = 1;
  let lastPoints = null;
  let skip = 0;

  return sorted.map((user, index) => {
    if (user.totalPoints === lastPoints) {
      skip++;
    } else {
      rank = index + 1;
      rank += skip;
      skip = 0;
    }
    lastPoints = user.totalPoints;
    return { ...user, rank };
  });
}
