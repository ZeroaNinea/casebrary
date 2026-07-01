export default function EntryEditorPage({ show }: { show: boolean }) {
  return (
    <div
      className={`absolute top-0 ${show ? 'left-0' : 'left-full'} bg-bg w-full transition-all duration-200`}
    >
      Entry Editor
    </div>
  );
}
