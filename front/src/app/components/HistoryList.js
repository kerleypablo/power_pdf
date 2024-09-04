import HistoryItem from './HistoryItem';

export default function HistoryList({ history }) {
  return (
    <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-700">
      <ul className="mt-4">
        {history.map((item) => (
          <HistoryItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}
