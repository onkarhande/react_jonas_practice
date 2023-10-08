export default function Stats({ items }) {
  if (!items.length) {
    return (
      <footer className="stats">
        <em>Start adding some items in your packing list ✈</em>
      </footer>
    );
  }

  const totalItems = items.length;
  const packedItems = items.filter((o) => o.packed).length;
  let percentage = Math.round((packedItems / totalItems) * 100);
  console.log(packedItems, totalItems, percentage);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything... Ready to go 🚀"
          : `👜 You have ${totalItems} items on your list, and you have
        already packed ${packedItems} (${percentage}%)`}
      </em>
    </footer>
  );
}
