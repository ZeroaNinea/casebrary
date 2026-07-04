import Entry from '@/types/entry.interface';

export default function EntriesList({ entries }: { entries: Entry[] }) {
  return (
    <ul>
      {entries.map((entry) => (
        <li key={entry.id}>
          <h1>{entry.title}</h1>
        </li>
      ))}
    </ul>
  );
}
